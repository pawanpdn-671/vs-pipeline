import { useState, useCallback, useRef } from "react";
import { getAvailableNodes, getNodeOutputs, parseCursorContext } from "../utils/variableUtils";

export const useVariableAutocomplete = (text, setText, textareaRef, nodeRef) => {
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
	const [selectionStep, setSelectionStep] = useState(1);
	const [selectedNode, setSelectedNode] = useState(null);
	const [availableNodes, setAvailableNodes] = useState([]);
	const [availableOutputs, setAvailableOutputs] = useState([]);

	const blurTimeoutRef = useRef(null);

	const handleTextChange = useCallback(
		(e) => {
			const newText = e.target.value;
			const cursorPos = e.target.selectionStart;
			setText(newText);

			// Check if we are inside a {{ variable }} context
			const context = parseCursorContext(newText, cursorPos);
			if (context.isInsideVariable) {
				// Position the dropdown relative to the cursor/node
				if (textareaRef.current) {
					const rect = textareaRef.current.getBoundingClientRect();
					let top = rect.bottom + window.scrollY + 5;
					let left = rect.left + window.scrollX;

					if (nodeRef && nodeRef.current) {
						const nodeRect = nodeRef.current.getBoundingClientRect();
						top = rect.bottom - nodeRect.top + 5;
						left = rect.left - nodeRect.left;
					}

					setDropdownPosition({
						top,
						left,
						width: rect.width,
					});
				}
				const typedText = context.content;
				const nodeList = getAvailableNodes();

				// If user typed dot (e.g. "input_1."), switch to Step 2 (Outputs)
				if (typedText.includes(".")) {
					const [nodeName] = typedText.split(".");
					const matchingNode = nodeList.find((n) => n.nodeName.toLowerCase() === nodeName.toLowerCase());
					if (matchingNode) {
						setSelectedNode(matchingNode);
						setAvailableOutputs(getNodeOutputs(matchingNode));
						setSelectionStep(2);
						setAvailableNodes(nodeList);
						setShowSuggestions(true);
						return;
					}
				} else {
					// Otherwise, Step 1: Filter nodes by name
					const filtered = nodeList.filter((n) => n.nodeName.toLowerCase().includes(typedText.toLowerCase()));
					setAvailableNodes(filtered);
					setSelectionStep(1);
					setSelectedNode(null);
					setShowSuggestions(filtered.length > 0);
					return;
				}
			}
			setShowSuggestions(false);
		},
		[setText, textareaRef, nodeRef],
	);

	const selectItem = useCallback(
		(item) => {
			if (blurTimeoutRef.current) {
				clearTimeout(blurTimeoutRef.current);
				blurTimeoutRef.current = null;
			}

			const activeElement = textareaRef.current;
			if (!activeElement) return;
			const cursorPosition = activeElement.selectionStart;

			const context = parseCursorContext(text, cursorPosition);

			// Step 2 is more lenient as we might have just typed a dot which breaks simple context parsing
			// const isSafe = context.isInsideVariable || selectionStep === 2;

			// if (!isSafe) {
			// Fallback or abort if context is lost
			// }

			if (selectionStep === 1) {
				// Step 1: User selected a Node from the list
				const nodeInfo = item;

				let startPos = context.isInsideVariable ? context.start : text.lastIndexOf("{{", cursorPosition);
				if (startPos === -1) return;

				const contentStart = startPos + 2;
				const beforeBrace = text.substring(0, contentStart);
				const textAfterCursor = text.substring(cursorPosition);

				// Insert "NodeName." and move cursor after the dot
				const newText = `${beforeBrace}${nodeInfo.nodeName}.${textAfterCursor}`;
				const newCursorPos = beforeBrace.length + nodeInfo.nodeName.length + 1;

				setText(newText);
				setSelectedNode(nodeInfo);
				setAvailableOutputs(getNodeOutputs(nodeInfo));
				setSelectionStep(2);

				setShowSuggestions(true);

				// Restore focus and cursor position
				setTimeout(() => {
					if (textareaRef.current) {
						textareaRef.current.focus();
						textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
					}
				}, 0);
			} else {
				// Step 2: User selected an Output from the list
				const output = item;
				const textBeforeCursor = text.substring(0, cursorPosition);
				const lastOpenBrace = textBeforeCursor.lastIndexOf("{{");

				if (lastOpenBrace !== -1) {
					const textAfterCursor = text.substring(cursorPosition);
					const closingBraceIndex = textAfterCursor.indexOf("}}");
					const afterBrace =
						closingBraceIndex !== -1 ? textAfterCursor.substring(closingBraceIndex + 2) : textAfterCursor;

					// Construct final variable: {{NodeName.OutputName}}
					const variable = `${output.baseName}.${output.outputName}`;
					const beforeBrace = text.substring(0, lastOpenBrace + 2);

					const newText = `${beforeBrace}${variable}}}${afterBrace}`;

					setText(newText);
					setShowSuggestions(false);
					setSelectionStep(1);

					setTimeout(() => {
						if (textareaRef.current) {
							textareaRef.current.focus();
							const newPos = beforeBrace.length + variable.length + 2;
							textareaRef.current.setSelectionRange(newPos, newPos);
						}
					}, 0);
				}
			}
		},
		[text, selectionStep, setText, textareaRef],
	);

	const closeSuggestions = useCallback(() => setShowSuggestions(false), []);

	const handleBlur = useCallback(() => {
		if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
		blurTimeoutRef.current = setTimeout(() => {
			setShowSuggestions(false);
		}, 200);
	}, []);

	return {
		showSuggestions,
		dropdownPosition,
		selectionStep,
		selectedNode,
		availableNodes,
		availableOutputs,
		handleTextChange,
		handleBlur,
		selectNode: selectItem,
		selectOutput: selectItem,
		closeSuggestions,
	};
};
