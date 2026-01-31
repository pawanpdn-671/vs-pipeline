export const getInputStyles = (focused) => ({
	width: "100%",
	padding: "6px 10px",
	fontSize: "12px",
	color: "var(--text-primary)",
	backgroundColor: "var(--bg-input)",
	border: `1px solid ${focused ? "var(--color-primary)" : "var(--border-subtle)"}`,
	borderRadius: "var(--radius-input)",
	outline: "none",
	boxSizing: "border-box",
	transition: "all 0.15s ease",
	boxShadow: focused ? "0 0 0 2px rgba(124, 58, 237, 0.2)" : "none",
});

export const handleStyles = {
	width: 12,
	height: 12,
	backgroundColor: "var(--color-primary)",
	border: "2px solid var(--bg-surface)",
	borderRadius: "50%",
};

export const labelStyles = {
	display: "block",
	marginBottom: "4px",
	fontSize: "11px",
	fontWeight: 500,
	color: "var(--text-muted)",
	textTransform: "uppercase",
	letterSpacing: "0.05em",
};

export const nodeContainerStyles = {
	minWidth: 200,
	minHeight: 80,
	background: "var(--bg-surface)",
	fontFamily: "var(--font-sans)",
	transition: "all 0.15s ease",
	position: "relative",
	overflow: "visible",
};

export const headerStyles = {
	padding: "8px 12px",
	fontWeight: 600,
	fontSize: "13px",
	color: "#fff",
	background: "var(--color-header)",
	display: "flex",
	alignItems: "center",
	gap: "8px",
};

export const contentStyles = {
	padding: "12px",
	fontSize: "12px",
	color: "var(--text-muted)",
	flex: 1,
	background: "var(--bg-surface)",
};

export const getNodeShadow = (isHovered) => (isHovered ? "var(--shadow-node-hover)" : "var(--shadow-node)");

export const getNodeBorder = (isHovered) => `1px solid ${isHovered ? "var(--border-hover)" : "var(--border-subtle)"}`;

export const getBorderRadius = (hasRightPanel) =>
	hasRightPanel ? "var(--radius-node) 0 0 var(--radius-node)" : "var(--radius-node)";

export const getInnerBorderRadius = (hasRightPanel) =>
	hasRightPanel
		? "calc(var(--radius-node) - 1px) 0 0 calc(var(--radius-node) - 1px)"
		: "calc(var(--radius-node) - 1px)";

export const inputLabelStyles = {
	position: "absolute",
	left: "8px",
	transform: "translateY(-50%)",
	fontSize: "11px",
	color: "var(--text-muted)",
	whiteSpace: "nowrap",
	pointerEvents: "none",
	background: "var(--bg-surface)",
	padding: "2px 4px",
	borderRadius: "4px",
	opacity: 0.9,
	zIndex: 102,
};

export const iconContainerStyles = {
	width: "16px",
	height: "16px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: "rgba(255, 255, 255, 0.8)",
};

export const innerWrapperStyles = {
	overflow: "hidden",
	display: "flex",
	flexDirection: "column",
	height: "100%",
};

export const rightPanelBaseStyles = {
	width: "240px",
	minHeight: "100px",
	background: "var(--bg-surface)",
	borderTopRightRadius: "var(--radius-node)",
	borderBottomRightRadius: "var(--radius-node)",
	border: "1px solid var(--border-subtle)",
	borderLeft: "none",
	display: "flex",
	flexDirection: "column",
	position: "relative",
	transition: "all 0.15s ease",
};

export const outputHandleContainerStyles = {
	position: "absolute",
	right: "-6px",
	transform: "translateY(-50%)",
	display: "flex",
	alignItems: "center",
	flexDirection: "row-reverse",
	zIndex: 100,
	pointerEvents: "all",
};

export const outputLabelStyles = {
	marginRight: "8px",
	fontSize: "11px",
	color: "var(--text-muted)",
	position: "absolute",
	right: "14px",
	whiteSpace: "nowrap",
	pointerEvents: "none",
	textAlign: "right",
	transform: "translateX(-2px)",
	zIndex: 102,
};

export const deleteButtonStyles = {
	position: "absolute",
	top: "50%",
	right: "6px",
	transform: "translateY(-50%)",
	width: "18px",
	height: "18px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	background: "rgba(255, 255, 255, 0.15)",
	border: "none",
	borderRadius: "50%",
	cursor: "pointer",
	color: "rgba(255, 255, 255)",
	fontSize: "14px",
	transition: "all 0.15s ease",
	zIndex: 200,
	padding: "4px",
};
