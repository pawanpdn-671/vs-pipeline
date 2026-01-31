import { useTheme } from "../context/ThemeContext";
import { useStore } from "../store/store";

export const Header = () => {
	const { isDark, toggleTheme } = useTheme();
	const { nodes, edges } = useStore((state) => ({
		nodes: state.nodes,
		edges: state.edges,
	}));

	const handleRunPipeline = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ nodes, edges }),
			});

			const data = await response.json();

			alert(
				`Pipeline Analysis Results:\n\nNumber of Nodes: ${data.num_nodes}\nNumber of Edges: ${data.num_edges}\nIs DAG: ${data.is_dag ? "Yes" : "No"}`,
			);
		} catch (error) {
			console.error("Error parsing pipeline:", error);
			alert("Failed to run the pipeline. Please try again!");
		}
	};

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "12px 20px",
				background: isDark ? "rgba(26, 22, 37, 0.9)" : "rgba(255, 255, 255, 0.9)",
				backdropFilter: "blur(20px)",
				borderBottom: `1px solid ${isDark ? "#2d2640" : "#e5e7eb"}`,
			}}>
			<div
				style={{
					fontSize: "16px",
					fontWeight: 700,
					color: isDark ? "#E6DDFD" : "#1f2937",
				}}>
				Pipeline Editor
			</div>

			<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
				<button
					onClick={toggleTheme}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "32px",
						height: "32px",
						background: isDark ? "#221d2e" : "#f3f4f6",
						border: `1px solid ${isDark ? "#2d2640" : "#e5e7eb"}`,
						borderRadius: "8px",
						cursor: "pointer",
						transition: "all 0.15s ease",
						color: isDark ? "#E6DDFD" : "#1f2937",
						fontSize: "16px",
					}}>
					{isDark ? "☀️" : "🌙"}
				</button>

				<button
					type="button"
					onClick={handleRunPipeline}
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "8px",
						padding: "8px 16px",
						fontSize: "13px",
						fontWeight: 600,
						color: "white",
						background: "linear-gradient(135deg, #7C3AED 0%, #6d28d9 100%)",
						border: "none",
						borderRadius: "8px",
						cursor: "pointer",
						transition: "all 0.15s ease",
					}}>
					<span>▶</span>
					Run Pipeline
				</button>
			</div>
		</div>
	);
};
