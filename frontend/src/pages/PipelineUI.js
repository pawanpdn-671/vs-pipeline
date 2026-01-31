import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "../store/store";
import { shallow } from "zustand/shallow";
import { useTheme } from "../context/ThemeContext";
import { InputNode } from "../components/nodes/inputNode";
import { LLMNode } from "../components/nodes/llmNode";
import { OutputNode } from "../components/nodes/outputNode";
import { TextNode } from "../components/nodes/textNode";
import { FilterNode } from "../components/nodes/filterNode";
import { MathNode } from "../components/nodes/mathNode";
import { TimerNode } from "../components/nodes/timerNode";
import { SplitNode } from "../components/nodes/splitNode";
import { MergeNode } from "../components/nodes/mergeNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
	customInput: InputNode,
	llm: LLMNode,
	customOutput: OutputNode,
	text: TextNode,
	filter: FilterNode,
	math: MathNode,
	timer: TimerNode,
	split: SplitNode,
	merge: MergeNode,
};

const selector = (state) => ({
	nodes: state.nodes,
	edges: state.edges,
	getNodeID: state.getNodeID,
	addNode: state.addNode,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnect: state.onConnect,
});

export const PipelineUI = () => {
	const reactFlowWrapper = useRef(null);
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
	const { isDark } = useTheme();

	const defaultEdgeOptions = {
		style: {
			stroke: isDark ? "#6b6280" : "#94a3b8",
			strokeWidth: 1.5,
		},
		type: "smoothstep",
		animated: false,
		markerEnd: { type: "arrow", width: 0, height: 0 },
	};

	const getInitNodeData = (nodeID, type) => {
		return { id: nodeID, nodeType: `${type}` };
	};

	const onDrop = useCallback(
		(event) => {
			event.preventDefault();

			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
			if (event?.dataTransfer?.getData("application/reactflow")) {
				const appData = JSON.parse(event.dataTransfer.getData("application/reactflow"));
				const type = appData?.nodeType;

				if (typeof type === "undefined" || !type) {
					return;
				}

				const position = reactFlowInstance.project({
					x: event.clientX - reactFlowBounds.left,
					y: event.clientY - reactFlowBounds.top,
				});

				const nodeID = getNodeID(type);
				const newNode = {
					id: nodeID,
					type,
					position,
					data: getInitNodeData(nodeID, type),
				};

				addNode(newNode);
			}
		},
		[reactFlowInstance],
	);

	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	return (
		<div
			ref={reactFlowWrapper}
			style={{
				width: "100%",
				height: "100%",
				background: isDark ? "#131018" : "#f8fafc",
			}}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onDrop={onDrop}
				onDragOver={onDragOver}
				onInit={setReactFlowInstance}
				nodeTypes={nodeTypes}
				proOptions={proOptions}
				snapGrid={[gridSize, gridSize]}
				connectionLineType="smoothstep"
				connectionLineStyle={{ stroke: "#7C3AED", strokeWidth: 2 }}
				defaultEdgeOptions={defaultEdgeOptions}>
				<Background
					color={isDark ? "#5b556f" : "#94a3b8"}
					gap={gridSize}
					size={1}
					style={{ backgroundColor: isDark ? "#131018" : "#f8fafc" }}
				/>
				<Controls />
				<MiniMap
					style={{
						backgroundColor: isDark ? "#1a1625" : "#ffffff",
						border: `1px solid ${isDark ? "#2d2640" : "#e2e8f0"}`,
						borderRadius: "8px",
					}}
					nodeColor={() => "#7C3AED"}
					maskColor={isDark ? "rgba(19, 16, 24, 0.8)" : "rgba(248, 250, 252, 0.8)"}
				/>
			</ReactFlow>
		</div>
	);
};
