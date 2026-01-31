import { useEffect, useRef } from "react";
import { useStore } from "../store/store";
import { extractVariables, extractVariableMatches, findNodeByName, getNodeBaseName } from "../utils/variableUtils";

export const useEdgeSync = (nodeId, text, setText) => {
	const processedEdgesRef = useRef(new Set());

	// Optimization: Select only necessary node data to prevent re-renders on position changes
	const nodes = useStore(
		(state) =>
			state.nodes.map((n) => ({
				id: n.id,
				type: n.type,
				data: { inputName: n.data?.inputName, outputType: n.data?.outputType },
			})),
		(oldState, newState) => JSON.stringify(oldState) === JSON.stringify(newState),
	);
	const edges = useStore(
		(state) => state.edges,
		(oldState, newState) => JSON.stringify(oldState) === JSON.stringify(newState),
	);
	const onEdgesChange = useStore((state) => state.onEdgesChange);
	const addEdgeProgrammatic = useStore((state) => state.addEdgeProgrammatic);

	useEffect(() => {
		// 1. Sync Edges -> Text: Auto-insert variable when edge is connected
		const connectedEdges = edges.filter((edge) => edge.target === nodeId && edge.targetHandle === "input");

		connectedEdges.forEach((edge) => {
			if (!processedEdgesRef.current.has(edge.id)) {
				const sourceNode = nodes.find((n) => n.id === edge.source);
				if (sourceNode) {
					const nodeName = getNodeBaseName(sourceNode);
					let outputName = "text";
					if (sourceNode.data?.outputType === "File") outputName = "file";
					if (sourceNode.type === "llm") outputName = "response";

					const variableString = `{{${nodeName}.${outputName}}}`;

					const currentVars = extractVariables(text);
					if (!text.includes(variableString) && !currentVars.includes(nodeName)) {
						setText((prev) => {
							const separator = prev.length > 0 && !prev.endsWith(" ") ? " " : "";
							return prev + separator + variableString;
						});
					}
					processedEdgesRef.current.add(edge.id);
				}
			}
		});

		// 2. Sync Text -> Edges: Auto-create edge when variable is typed
		const variableMatches = extractVariableMatches(text);
		variableMatches.forEach(({ nodeName }) => {
			if (!nodeName) return;

			const sourceNode = findNodeByName(nodeName);
			if (sourceNode) {
				const edgeExists = edges.some(
					(edge) => edge.source === sourceNode.id && edge.target === nodeId && edge.targetHandle === "input",
				);

				if (!edgeExists) {
					addEdgeProgrammatic(sourceNode.id, "output", nodeId, "input");
				}
			}
		});

		// 3. Cleanup: Remove edges when variables are deleted from text
		const uniqueVars = extractVariables(text);
		const edgesToRemove = connectedEdges.filter((edge) => {
			const sourceNode = nodes.find((n) => n.id === edge.source);
			if (!sourceNode) return true;
			const nodeName = getNodeBaseName(sourceNode);
			return !uniqueVars.includes(nodeName);
		});

		if (edgesToRemove.length > 0) {
			onEdgesChange(edgesToRemove.map((edge) => ({ id: edge.id, type: "remove" })));
			edgesToRemove.forEach((edge) => processedEdgesRef.current.delete(edge.id));
		}
	}, [edges, nodes, nodeId, text, setText, onEdgesChange, addEdgeProgrammatic]);
};
