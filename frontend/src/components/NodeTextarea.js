import React, { useRef, useLayoutEffect } from "react";

const textareaStyles = {
	width: "100%",
	padding: "8px",
	fontSize: "12px",
	color: "var(--text-primary)",
	backgroundColor: "var(--bg-input)",
	border: "1px solid var(--border-subtle)",
	borderRadius: "var(--radius-input)",
	outline: "none",
	resize: "none",
	fontFamily: "monospace",
	overflow: "hidden",
};

export const NodeTextarea = React.forwardRef(
	({ value, onChange, placeholder, minHeight = "40px", style = {}, ...props }, ref) => {
		const internalRef = useRef(null);
		const textRef = ref || internalRef;

		useLayoutEffect(() => {
			if (textRef.current) {
				textRef.current.style.height = "auto";
				textRef.current.style.height = textRef.current.scrollHeight + "px";
			}
		}, [value, textRef]);

		return (
			<textarea
				ref={textRef}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				style={{
					...textareaStyles,
					minHeight,
					...style,
				}}
				{...props}
			/>
		);
	},
);

NodeTextarea.displayName = "NodeTextarea";
