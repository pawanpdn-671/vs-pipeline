export const NodeOutputDisplay = ({ outputs = [], children }) => {
	return (
		<>
			<div
				style={{
					padding: "10px 12px",
					borderBottom: "1px solid var(--border-subtle)",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					background: "rgba(124, 58, 237, 0.05)",
					borderTopRightRadius: "var(--radius-node)",
				}}>
				<div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
					<span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)" }}>Outputs</span>
				</div>
				<div style={{ color: "var(--text-muted)", fontSize: "12px" }}>↗</div>
			</div>

			<div style={{ padding: "12px", display: "flex", flexDirection: "column", flex: 1 }}>
				<div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "12px", lineHeight: "1.4" }}>
					Type `{`{{`}` in downstream nodes to leverage output fields.
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						fontSize: "11px",
						fontWeight: 600,
						color: "var(--text-primary)",
						marginBottom: "8px",
						paddingBottom: "4px",
						borderBottom: "1px solid var(--border-subtle)",
					}}>
					<span>Output Fields</span>
					<span>Type</span>
				</div>

				{outputs.map((output) => (
					<OutputRow key={output.id} output={output} />
				))}
				{children}
			</div>
		</>
	);
};

const OutputRow = ({ output }) => (
	<div
		style={{
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			position: "relative",
			marginBottom: "6px",
		}}>
		<span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-primary)" }}>{output.name}</span>

		<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
			<span
				style={{
					fontSize: "10px",
					padding: "2px 6px",
					borderRadius: "4px",
					background: "var(--color-primary)",
					color: "white",
					fontWeight: 500,
				}}>
				{output.type}
			</span>
		</div>
	</div>
);
