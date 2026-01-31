import { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeText, NodeField, NodeSelect, NodeInput } from "..";
import { TbArrowsJoin } from "react-icons/tb";

export const MergeNode = ({ id, data }) => {
	const [separator, setSeparator] = useState(data?.separator || "newline");
	const [customSeparator, setCustomSeparator] = useState(data?.customSeparator || "");

	return (
		<BaseNode id={id} title="Text Joiner" icon={<TbArrowsJoin />} enableInput={true} enableOutput={true}>
			<NodeField label="Join With">
				<NodeSelect
					value={separator}
					onChange={(e) => setSeparator(e.target.value)}
					options={[
						{ value: "newline", label: "New Line (\\n)" },
						{ value: "space", label: "Space ( )" },
						{ value: "comma", label: "Comma (,)" },
						{ value: "custom", label: "Custom" },
					]}
				/>
			</NodeField>
			{separator === "custom" && (
				<NodeField label="Custom Separator">
					<NodeInput
						value={customSeparator}
						onChange={(e) => setCustomSeparator(e.target.value)}
						placeholder="separator"
					/>
				</NodeField>
			)}
			<NodeText>Joins multiple inputs into one text.</NodeText>
		</BaseNode>
	);
};
