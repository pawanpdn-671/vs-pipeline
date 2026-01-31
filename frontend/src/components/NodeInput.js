import { useState } from "react";
import { getInputStyles } from "../styles/nodeStyles";

export const NodeInput = ({ value, onChange, placeholder = "", type = "text" }) => {
	const [focused, setFocused] = useState(false);

	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			style={getInputStyles(focused)}
		/>
	);
};
