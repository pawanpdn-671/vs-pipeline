import { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeField, NodeInput, NodeSelect, NodeText } from "..";
import { MdTimer } from "react-icons/md";

export const TimerNode = ({ id, data }) => {
	const [delay, setDelay] = useState(data?.delay || "1000");
	const [unit, setUnit] = useState(data?.unit || "ms");

	return (
		<BaseNode id={id} title="Delay" icon={<MdTimer />} enableInput={true} enableOutput={true}>
			<NodeField label="Duration">
				<NodeInput type="number" value={delay} onChange={(e) => setDelay(e.target.value)} placeholder="1000" />
			</NodeField>
			<NodeField label="Unit">
				<NodeSelect
					value={unit}
					onChange={(e) => setUnit(e.target.value)}
					options={[
						{ value: "ms", label: "Milliseconds" },
						{ value: "s", label: "Seconds" },
					]}
				/>
			</NodeField>
			<NodeText>
				Waits for {delay}
				{unit} before proceeding.
			</NodeText>
		</BaseNode>
	);
};
