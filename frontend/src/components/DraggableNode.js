import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const DraggableNode = ({ type, label, icon }) => {
	const [isHovered, setIsHovered] = useState(false);
	const { isDark } = useTheme();

	const onDragStart = (event, nodeType) => {
		const appData = { nodeType };
		event.target.style.cursor = "grabbing";
		event.dataTransfer.setData("application/reactflow", JSON.stringify(appData));
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<div
			className={type}
			onDragStart={(event) => onDragStart(event, type)}
			onDragEnd={(event) => (event.target.style.cursor = "grab")}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				cursor: "grab",
				minWidth: "60px",
				height: "60px",
				display: "flex",
				alignItems: "center",
				borderRadius: "8px",
				background: isDark ? "#1a1625" : "#ffffff",
				justifyContent: "center",
				flexDirection: "column",
				gap: "4px",
				border: `1px solid ${isDark ? "#2d2640" : "#e5e7eb"}`,
				boxShadow: isHovered ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "0 1px 2px rgba(0,0,0,0.05)",
				transition: "all 0.2s ease",
			}}
			draggable>
			<div
				style={{
					color: isDark ? "#A8A2B6" : "#64748b",
					height: "20px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "18px",
				}}>
				{icon}
			</div>
			<span
				style={{
					color: isDark ? "#A8A2B6" : "#475569",
					fontSize: "11px",
					fontWeight: 500,
					fontFamily: "var(--font-sans)",
				}}>
				{label}
			</span>
		</div>
	);
};
