import { createWithEqualityFn } from "zustand/traditional";
import { addEdge, applyNodeChanges, applyEdgeChanges, MarkerType } from "reactflow";

export const useStore = createWithEqualityFn((set, get) => ({
	nodes: [],
	edges: [],
	getNodeID: (type) => {
		const nodes = get().nodes;
		let prefix = `${type}-`;
		if (type === "text") {
			prefix = "text_";
		} else if (type === "customInput") {
			prefix = "input_";
		}

		const existingIds = new Set(nodes.filter((node) => node.id.startsWith(prefix)).map((node) => node.id));

		let num = 1;
		while (existingIds.has(`${prefix}${num}`)) {
			num += 1;
		}
		return `${prefix}${num}`;
	},
	addNode: (node) => {
		set({
			nodes: [...get().nodes, node],
		});
	},
	onNodesChange: (changes) => {
		set({
			nodes: applyNodeChanges(changes, get().nodes),
		});
	},
	onEdgesChange: (changes) => {
		set({
			edges: applyEdgeChanges(changes, get().edges),
		});
	},
	onConnect: (connection) => {
		set({
			edges: addEdge(
				{
					...connection,
					type: "smoothstep",
					animated: true,
					markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
				},
				get().edges,
			),
		});
	},
	updateNodeField: (nodeId, fieldName, fieldValue) => {
		set({
			nodes: get().nodes.map((node) => {
				if (node.id === nodeId) {
					return {
						...node,
						data: { ...node.data, [fieldName]: fieldValue },
					};
				}
				return node;
			}),
		});
	},
	addEdgeProgrammatic: (sourceNodeId, sourceHandleId, targetNodeId, targetHandleId) => {
		const connection = {
			source: sourceNodeId,
			sourceHandle: sourceHandleId,
			target: targetNodeId,
			targetHandle: targetHandleId,
		};
		set({
			edges: addEdge(
				{
					...connection,
					type: "smoothstep",
					animated: true,
					markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
				},
				get().edges,
			),
		});
	},
	removeEdgesByTarget: (targetNodeId, targetHandleId) => {
		set({
			edges: get().edges.filter((edge) => !(edge.target === targetNodeId && edge.targetHandle === targetHandleId)),
		});
	},
	deleteNode: (nodeId) => {
		set({
			nodes: get().nodes.filter((node) => node.id !== nodeId),
			edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
		});
	},
}));
