import { useState, useEffect } from "react";
import { BaseNode } from "./BaseNode";
import { NodeField, NodeSelect, NodeText } from "..";
import { TbMathFunction } from "react-icons/tb";
import { useStore } from "../../store/store";

export const MathNode = ({ id, data }) => {
	const updateNodeField = useStore((state) => state.updateNodeField);
	const [operation, setOperation] = useState(data?.operation || "add");

	useEffect(() => {
		updateNodeField(id, "operation", operation);
	}, [operation, id, updateNodeField]);

	return (
		<BaseNode id={id} title="Math" icon={<TbMathFunction />} enableInput={true} enableOutput={true}>
			<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
				<NodeField label="Operation">
					<NodeSelect
						value={operation}
						onChange={(e) => setOperation(e.target.value)}
						options={[
							{ value: "add", label: "Add" },
							{ value: "sub", label: "Subtract" },
							{ value: "mul", label: "Multiply" },
							{ value: "div", label: "Divide" },
						]}
					/>
				</NodeField>
				<NodeText>
					Calculates:{" "}
					{operation === "add"
						? "Sum of all connected values"
						: operation === "mul"
							? "Product of all connected values"
							: operation === "sub"
								? "Subtracts other values from the first connected value"
								: "Divides first connected value by others"}
				</NodeText>
			</div>
		</BaseNode>
	);
};
