import React from "react";
import { Handle, Position } from "reactflow";
import { MdClose } from "react-icons/md";
import {
	handleStyles,
	headerStyles,
	iconContainerStyles,
	deleteButtonStyles,
	rightPanelBaseStyles,
	getNodeShadow,
} from "../../styles/nodeStyles";

export const InputHandle = () => {
	return (
		<Handle
			type="target"
			position={Position.Left}
			id="input"
			isConnectable={true}
			style={{
				...handleStyles,
				position: "absolute",
				left: -6,
				top: "50%",
				transform: "translateY(-50%)",
				zIndex: 101,
			}}
		/>
	);
};

export const OutputHandle = () => {
	return (
		<div
			style={{
				position: "absolute",
				right: "-6px",
				top: "50%",
				transform: "translateY(-50%)",
				display: "flex",
				alignItems: "center",
				zIndex: 100,
			}}>
			<Handle
				type="source"
				position={Position.Right}
				id="output"
				isConnectable={true}
				style={{
					...handleStyles,
					position: "relative",
					right: 0,
					top: 0,
					transform: "none",
					zIndex: 101,
				}}
			/>
		</div>
	);
};

export const NodeHeader = ({ icon, title, onDelete, isHovered }) => (
	<div style={{ ...headerStyles, position: "relative" }}>
		{icon && <div style={iconContainerStyles}>{icon}</div>}
		{title}
		{isHovered && (
			<button
				style={deleteButtonStyles}
				onClick={(e) => {
					e.stopPropagation();
					onDelete();
				}}
				onMouseDown={(e) => e.stopPropagation()}
				title="Delete node">
				<MdClose size={16} />
			</button>
		)}
	</div>
);

export const RightPanel = ({ children, isHovered }) => (
	<div style={{ ...rightPanelBaseStyles, boxShadow: getNodeShadow(isHovered) }}>{children}</div>
);
