const dropdownStyles = {
	container: {
		position: "fixed",
		background: "var(--bg-surface)",
		border: "1px solid var(--border-subtle)",
		borderRadius: "8px",
		boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
		zIndex: 9999,
		overflow: "hidden",
	},
	header: {
		padding: "10px 14px",
		borderBottom: "1px solid var(--border-subtle)",
		display: "flex",
		alignItems: "center",
		gap: "8px",
		background: "var(--bg-input)",
	},
	stepIndicator: (isActive) => ({
		width: "20px",
		height: "20px",
		borderRadius: "50%",
		background: isActive ? "var(--color-primary)" : "var(--bg-hover)",
		color: isActive ? "#fff" : "var(--text-muted)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "11px",
		fontWeight: 600,
	}),
	stepLabel: (isActive) => ({
		fontSize: "12px",
		fontWeight: 500,
		color: isActive ? "var(--text-primary)" : "var(--text-muted)",
	}),
	divider: {
		width: "20px",
		height: "1px",
		background: "var(--border-subtle)",
	},
	listContainer: {
		maxHeight: "200px",
		overflowY: "auto",
	},
	listItem: {
		padding: "10px 14px",
		cursor: "pointer",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		transition: "background 0.1s ease",
		background: "var(--bg-surface)",
	},
	itemIcon: {
		width: "20px",
		height: "20px",
		borderRadius: "4px",
		background: "rgba(124, 58, 237, 0.15)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "var(--color-primary)",
		fontSize: "12px",
	},
	itemName: {
		fontSize: "13px",
		fontWeight: 500,
		color: "var(--text-primary)",
	},
	itemDescription: {
		fontSize: "11px",
		color: "var(--text-muted)",
		marginTop: "2px",
	},
	badge: {
		fontSize: "11px",
		padding: "3px 10px",
		borderRadius: "4px",
		background: "var(--color-primary)",
		color: "#fff",
		fontWeight: 500,
	},
	emptyState: {
		padding: "20px",
		textAlign: "center",
		color: "var(--text-muted)",
		fontSize: "13px",
	},
};

const StepIndicator = ({ step, currentStep, label }) => (
	<div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
		<div style={dropdownStyles.stepIndicator(currentStep === step)}>{step}</div>
		<span style={dropdownStyles.stepLabel(currentStep === step)}>{label}</span>
	</div>
);

const NodeListItem = ({ node, onClick, isLast }) => (
	<div
		onMouseDown={(e) => {
			e.preventDefault();
			e.stopPropagation();
		}}
		onClick={() => onClick(node)}
		style={{
			...dropdownStyles.listItem,
			borderBottom: isLast ? "none" : "1px solid var(--border-subtle)",
		}}
		onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
		onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg-surface)")}>
		<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
			<div style={dropdownStyles.itemIcon}>⊃</div>
			<span style={dropdownStyles.itemName}>{node.nodeName}</span>
		</div>
		<span style={dropdownStyles.badge}>Input</span>
	</div>
);

const OutputListItem = ({ output, onClick, isLast }) => (
	<div
		onMouseDown={(e) => {
			e.preventDefault();
			e.stopPropagation();
		}}
		onClick={() => onClick(output)}
		style={{
			...dropdownStyles.listItem,
			borderBottom: isLast ? "none" : "1px solid var(--border-subtle)",
		}}
		onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
		onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg-surface)")}>
		<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
			<div style={dropdownStyles.itemIcon}>↳</div>
			<div>
				<div style={dropdownStyles.itemName}>{output.outputName}</div>
				<div style={dropdownStyles.itemDescription}>{output.description}</div>
			</div>
		</div>
		<span style={dropdownStyles.badge}>{output.type}</span>
	</div>
);

export const VariableSuggestionDropdown = ({
	show,
	position,
	selectionStep,
	availableNodes,
	availableOutputs,
	selectedNode,
	onSelectNode,
	onSelectOutput,
}) => {
	if (!show) return null;

	return (
		<div
			style={{
				...dropdownStyles.container,
				position: "absolute", // Changed from fixed
				top: position.top,
				left: position.left,
				width: Math.max(position.width, 280),
			}}>
			<div style={dropdownStyles.header}>
				<StepIndicator step={1} currentStep={selectionStep} label="Select Node" />
				<div style={dropdownStyles.divider} />
				<StepIndicator step={2} currentStep={selectionStep} label="Select Output" />
			</div>

			{selectionStep === 1 && (
				<div style={dropdownStyles.listContainer}>
					{availableNodes.map((node, index) => (
						<NodeListItem
							key={index}
							node={node}
							onClick={onSelectNode}
							isLast={index === availableNodes.length - 1}
						/>
					))}
					{availableNodes.length === 0 && (
						<div style={dropdownStyles.emptyState}>No Input nodes found. Add an Input node first.</div>
					)}
				</div>
			)}

			{selectionStep === 2 && selectedNode && (
				<div style={dropdownStyles.listContainer}>
					{availableOutputs.map((output, index) => (
						<OutputListItem
							key={index}
							output={output}
							onClick={onSelectOutput}
							isLast={index === availableOutputs.length - 1}
						/>
					))}
				</div>
			)}
		</div>
	);
};
