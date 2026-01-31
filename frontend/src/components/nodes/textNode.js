import { useState, useRef, useEffect } from "react";
import { useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "./BaseNode";
import { NodeField, NodeOutputDisplay, NodeInput, VariableSuggestionDropdown, NodeTextarea } from "..";
import { MdTextFields } from "react-icons/md";
import { useStore } from "../../store/store";
import { useVariableSelection } from "../../hooks";

export const TextNode = ({ id, data }) => {
	const [currText, setCurrText] = useState(data?.text || "");
	const [currName, setCurrName] = useState(data?.inputName || id.replace("customText-", "text_"));
	const textareaRef = useRef(null);

	const updateNodeField = useStore((state) => state.updateNodeField);
	const updateNodeInternals = useUpdateNodeInternals();

	const nodeRef = useRef(null);

	const {
		variables,
		showSuggestions,
		dropdownPosition,
		selectionStep,
		selectedNode,
		availableNodes,
		availableOutputs,
		handleTextChange,
		handleBlur,
		selectNode,
		selectOutput,
	} = useVariableSelection(id, currText, setCurrText, textareaRef, nodeRef);

	useEffect(() => {
		updateNodeField(id, "inputName", currName);
	}, [id, currName, updateNodeField]);

	useEffect(() => {
		if (variables.length > 0 && updateNodeInternals) {
			updateNodeInternals(id);
		}
	}, [variables, id, updateNodeInternals]);

	return (
		<div ref={nodeRef} style={{ position: "relative" }}>
			<BaseNode
				id={id}
				title="Text"
				icon={<MdTextFields />}
				enableInput={true}
				enableOutput={true}
				width={300}
				rightPanel={
					<NodeOutputDisplay outputs={[{ id: "output", name: "text", type: "Text" }]}>
						<div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
							The text from the node.
						</div>
					</NodeOutputDisplay>
				}>
				<NodeField label="Name">
					<NodeInput value={currName} onChange={(e) => setCurrName(e.target.value)} placeholder="Node Name" />
				</NodeField>
				<NodeField label="Text">
					<div style={{ position: "relative" }}>
						<NodeTextarea
							ref={textareaRef}
							value={currText}
							onChange={handleTextChange}
							onBlur={handleBlur}
							placeholder="Type {{ to insert variables..."
							minHeight="60px"
						/>
					</div>
				</NodeField>
			</BaseNode>

			<VariableSuggestionDropdown
				show={showSuggestions}
				position={dropdownPosition}
				selectionStep={selectionStep}
				availableNodes={availableNodes}
				availableOutputs={availableOutputs}
				selectedNode={selectedNode}
				onSelectNode={selectNode}
				onSelectOutput={selectOutput}
			/>
		</div>
	);
};
