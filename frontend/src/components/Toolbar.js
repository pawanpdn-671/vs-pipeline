import { DraggableNode } from "./DraggableNode";
import { useTheme } from "../context/ThemeContext";
import { TOOLBAR_NODES } from "../utils/toolbarNodes";

export const PipelineToolbar = () => {
	const { isDark } = useTheme();

	return (
		<div
			style={{
				background: isDark ? "rgba(26, 22, 37, 0.8)" : "rgba(255, 255, 255, 0.8)",
				backdropFilter: "blur(20px)",
				borderBottom: `1px solid ${isDark ? "#2d2640" : "#e5e7eb"}`,
				padding: "16px 20px",
			}}>
			<div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
				{TOOLBAR_NODES.map(({ type, label, icon: Icon }) => (
					<DraggableNode key={type} type={type} label={label} icon={<Icon />} />
				))}
			</div>
		</div>
	);
};
