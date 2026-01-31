import { useState, useMemo, useEffect } from "react";
import { MdInput } from "react-icons/md";
import { BaseNode } from "./BaseNode";
import { NodeField, NodeInput, NodeSelect, NodeOutputDisplay } from "..";
import { useStore } from "../../store/store";

export const InputNode = ({ id, data }) => {
	const [currName, setCurrName] = useState(data?.inputName || id.replace("customInput-", "input_"));
	const [inputType, setInputType] = useState(data?.inputType || "Text");

	const updateNodeField = useStore((state) => state.updateNodeField);

	useEffect(() => {
		updateNodeField(id, "inputName", currName);
	}, [id, currName]);

	useEffect(() => {
		updateNodeField(id, "inputType", inputType);
	}, [id, inputType]);

	const outputs = useMemo(() => {
		if (inputType === "Text") {
			return [{ id: "text", name: "text", type: "Text" }];
		} else if (inputType === "File") {
			return [
				{ id: "processed_text", name: "processed_text", type: "Text" },
				{ id: "file", name: "file", type: "File" },
			];
		}
		return [];
	}, [inputType]);

	const getOutputDescriptions = () => {
		if (inputType === "Text") {
			return (
				<div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "8px", lineHeight: "1.5" }}>
					<div style={{ marginBottom: "6px" }}>
						<strong style={{ color: "var(--text-primary)" }}>text:</strong> The inputted text
					</div>
					<div
						style={{
							background: "var(--bg-input)",
							padding: "6px 8px",
							borderRadius: "4px",
							fontFamily: "monospace",
							fontSize: "10px",
						}}>
						Example: {`{{${currName}.text}}`}
					</div>
				</div>
			);
		} else if (inputType === "File") {
			return (
				<div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "8px", lineHeight: "1.5" }}>
					<div style={{ marginBottom: "4px" }}>
						<strong style={{ color: "var(--text-primary)" }}>processed_text:</strong> File contents as text
					</div>
					<div style={{ marginBottom: "6px" }}>
						<strong style={{ color: "var(--text-primary)" }}>file:</strong> The uploaded file
					</div>
					<div
						style={{
							background: "var(--bg-input)",
							padding: "6px 8px",
							borderRadius: "4px",
							fontFamily: "monospace",
							fontSize: "10px",
						}}>
						<div>Example: {`{{${currName}.processed_text}}`}</div>
						<div>Example: {`{{${currName}.file}}`}</div>
					</div>
				</div>
			);
		}
		return null;
	};

	return (
		<BaseNode
			id={id}
			title="Input"
			icon={<MdInput />}
			enableInput={false}
			enableOutput={true}
			width={240}
			rightPanel={<NodeOutputDisplay outputs={outputs}>{getOutputDescriptions()}</NodeOutputDisplay>}>
			<NodeField label="Name">
				<NodeInput value={currName} onChange={(e) => setCurrName(e.target.value)} placeholder="Input name..." />
			</NodeField>
			<NodeField label="Type">
				<NodeSelect
					value={inputType}
					onChange={(e) => setInputType(e.target.value)}
					options={[
						{ value: "Text", label: "Text" },
						{ value: "File", label: "File" },
					]}
				/>
			</NodeField>
		</BaseNode>
	);
};
