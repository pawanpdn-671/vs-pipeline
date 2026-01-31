import { labelStyles } from "../styles/nodeStyles";

export const NodeField = ({ label, children }) => (
	<div style={{ marginBottom: "10px" }}>
		{label && <label style={labelStyles}>{label}</label>}
		{children}
	</div>
);
