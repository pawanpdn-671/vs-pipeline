import { useState } from "react";
import { useStore } from "../../store/store";
import {
	nodeContainerStyles,
	contentStyles,
	getNodeShadow,
	getNodeBorder,
	getBorderRadius,
	getInnerBorderRadius,
	innerWrapperStyles,
} from "../../styles/nodeStyles";
import { InputHandle, OutputHandle, NodeHeader, RightPanel } from "./BaseNodeComponents";

export const BaseNode = ({
	id,
	title = "Node",
	icon,
	enableInput = true,
	enableOutput = true,
	children,
	width = 200,
	rightPanel,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const deleteNode = useStore((state) => state.deleteNode);
	const hasRightPanel = Boolean(rightPanel);

	const handleDelete = () => {
		deleteNode(id);
	};

	const containerStyles = {
		...nodeContainerStyles,
		width,
		borderRadius: getBorderRadius(hasRightPanel),
		boxShadow: getNodeShadow(isHovered),
		border: getNodeBorder(isHovered),
	};

	const NodeContentBox = (
		<div style={containerStyles} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<div style={{ ...innerWrapperStyles, borderRadius: getInnerBorderRadius(hasRightPanel) }}>
				<NodeHeader icon={icon} title={title} onDelete={handleDelete} isHovered={isHovered} />
				<div style={contentStyles}>{children}</div>
			</div>

			{enableOutput && !hasRightPanel && <OutputHandle />}
		</div>
	);

	if (hasRightPanel) {
		return (
			<div style={{ display: "flex", gap: "0px", alignItems: "flex-start", position: "relative" }}>
				{enableInput && <InputHandle />}

				<div style={{ zIndex: 1 }}>{NodeContentBox}</div>
				<RightPanel isHovered={isHovered}>{rightPanel}</RightPanel>

				{enableOutput && <OutputHandle />}
			</div>
		);
	}

	return (
		<div style={{ position: "relative" }}>
			{enableInput && <InputHandle />}
			{NodeContentBox}
		</div>
	);
};
