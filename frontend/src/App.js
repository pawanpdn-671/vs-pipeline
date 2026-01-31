import { ThemeProvider } from "./context/ThemeContext";
import { Header } from "./components/Header";
import { PipelineToolbar } from "./components/Toolbar";
import { PipelineUI } from "./pages/PipelineUI";

function App() {
	return (
		<ThemeProvider>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100vh",
					background: "var(--bg-app)",
					overflow: "hidden",
				}}>
				<Header />
				<PipelineToolbar />
				<div style={{ flex: 1, position: "relative" }}>
					<PipelineUI />
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
