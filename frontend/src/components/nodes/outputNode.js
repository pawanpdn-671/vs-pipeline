import { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeField, NodeInput, NodeSelect } from "..";
import { MdOutput } from "react-icons/md";

export const OutputNode = ({ id, data }) => {
	const [currName, setCurrName] = useState(data?.outputName || id.replace("customOutput-", "output_"));
	const [outputType, setOutputType] = useState(data.outputType || "Text");

	return (
		<BaseNode id={id} title="Output" icon={<MdOutput />} enableInput={true} enableOutput={false}>
			<NodeField label="Name">
				<NodeInput value={currName} onChange={(e) => setCurrName(e.target.value)} placeholder="Output name..." />
			</NodeField>
			<NodeField label="Type">
				<NodeSelect
					value={outputType}
					onChange={(e) => setOutputType(e.target.value)}
					options={[
						{ value: "Text", label: "Text" },
						{ value: "Image", label: "Image" },
					]}
				/>
			</NodeField>
		</BaseNode>
	);
};
