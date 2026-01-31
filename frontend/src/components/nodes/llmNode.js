import { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeField, NodeTextarea, NodeOutputDisplay } from "..";
import { LuBrainCircuit } from "react-icons/lu";

export const LLMNode = ({ id, data }) => {
	const [systemText, setSystemText] = useState(data?.system || "You are a helpful assistant.");
	const [promptText, setPromptText] = useState(data?.prompt || "{{input}}");

	return (
		<BaseNode
			id={id}
			title="LLM"
			icon={<LuBrainCircuit />}
			enableInput={true}
			enableOutput={true}
			width={320}
			rightPanel={
				<NodeOutputDisplay outputs={[{ id: "response", name: "response", type: "Text" }]}>
					<div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
						The response from the LLM.
					</div>
				</NodeOutputDisplay>
			}>
			<NodeField label="System">
				<NodeTextarea
					value={systemText}
					onChange={(e) => setSystemText(e.target.value)}
					placeholder="System instructions..."
					minHeight="40px"
					style={{ marginBottom: "8px" }}
				/>
			</NodeField>
			<NodeField label="Prompt">
				<NodeTextarea
					value={promptText}
					onChange={(e) => setPromptText(e.target.value)}
					placeholder="User prompt..."
					minHeight="60px"
				/>
			</NodeField>
		</BaseNode>
	);
};
