import { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeText, NodeField, NodeInput } from "..";
import { TbArrowFork } from "react-icons/tb";

export const SplitNode = ({ id, data }) => {
	const [separator, setSeparator] = useState(data?.separator || ",");
	const [maxSplits, setMaxSplits] = useState(data?.maxSplits || "");

	return (
		<BaseNode id={id} title="Text Splitter" icon={<TbArrowFork />} enableInput={true} enableOutput={true}>
			<NodeField label="Separator">
				<NodeInput value={separator} onChange={(e) => setSeparator(e.target.value)} placeholder="e.g. , or \n" />
			</NodeField>
			<NodeField label="Max Splits">
				<NodeInput
					type="number"
					value={maxSplits}
					onChange={(e) => setMaxSplits(e.target.value)}
					placeholder="All"
				/>
			</NodeField>
			<NodeText>Splits text into chunks.</NodeText>
		</BaseNode>
	);
};
