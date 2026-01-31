import { useState } from "react";
import { getInputStyles } from "../styles/nodeStyles";

export const NodeSelect = ({ value, onChange, options = [] }) => {
	const [focused, setFocused] = useState(false);

	const selectStyles = {
		...getInputStyles(focused),
		cursor: "pointer",
		appearance: "none",
		backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23A8A2B6' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "right 10px center",
		paddingRight: "32px",
	};

	return (
		<select
			value={value}
			onChange={onChange}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			style={selectStyles}>
			{options.map((opt) => (
				<option
					key={opt.value}
					value={opt.value}
					style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>
					{opt.label}
				</option>
			))}
		</select>
	);
};
