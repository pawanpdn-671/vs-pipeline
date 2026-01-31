import { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeText, NodeField, NodeSelect, NodeInput } from "..";
import { MdDataObject } from "react-icons/md";

export const FilterNode = ({ id, data }) => {
	const [condition, setCondition] = useState(data?.condition || "contains");
	const [value, setValue] = useState(data?.value || "");

	return (
		<BaseNode id={id} title="Filter" icon={<MdDataObject />} enableInput={true} enableOutput={true}>
			<NodeField label="Condition">
				<NodeSelect
					value={condition}
					onChange={(e) => setCondition(e.target.value)}
					options={[
						{ value: "contains", label: "Contains" },
						{ value: "equals", label: "Equals" },
						{ value: "starts_with", label: "Starts With" },
						{ value: "ends_with", label: "Ends With" },
					]}
				/>
			</NodeField>
			<NodeField label="Value">
				<NodeInput value={value} onChange={(e) => setValue(e.target.value)} placeholder="Comparison value..." />
			</NodeField>
			<NodeText>Routes input to Pass/Fail.</NodeText>
		</BaseNode>
	);
};
