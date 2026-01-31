import { useStore } from "../store/store";

/**
 * Regex pattern to match variables in format {{nodeName.output}}
 * Capture Group 1: Node Name (content before dot or closing brace)
 * Capture Group 2: Output Name (optional content after dot)
 */
export const VARIABLE_REGEX = /\{\{\s*([^{}.]+?)(?:\.([^{}.]+?))?\s*\}\}/g;

export const extractVariables = (text) => {
	const matches = [...text.matchAll(VARIABLE_REGEX)];
	return [...new Set(matches.map((m) => m[1].trim()))];
};

export const extractVariableMatches = (text) => {
	const matches = [...text.matchAll(VARIABLE_REGEX)];
	return matches.map((match) => ({
		nodeName: match[1]?.trim(),
		sourceHandle: match[2]?.trim(),
	}));
};

/**
 * Parses the text around the cursor to determine if we are inside a variable definition {{...}}
 * and what the content is.
 * Used to trigger autocomplete suggestions.
 */
export const parseCursorContext = (text, cursorPosition) => {
	const textBeforeCursor = text.substring(0, cursorPosition);
	const lastOpenBrace = textBeforeCursor.lastIndexOf("{{");
	const lastCloseBrace = textBeforeCursor.lastIndexOf("}}");

	// If we found an open brace that hasn't been closed before the cursor, we are inside a variable
	if (lastOpenBrace !== -1 && lastOpenBrace > lastCloseBrace) {
		const contentStart = lastOpenBrace + 2;
		const content = text.substring(contentStart, cursorPosition); // Text between {{ and cursor
		return {
			isInsideVariable: true,
			content: content.trim(),
			start: lastOpenBrace,
			contentStart: contentStart,
		};
	}

	return { isInsideVariable: false };
};

/**
 * Helper to replace a variable string range with new content
 */
export const replaceVariable = (text, start, end, newContent) => {
	return text.substring(0, start) + newContent + text.substring(end);
};

/**
 * Standardizes getting a display name for a node, falling back to ID processing if no custom name exists.
 */
export const getNodeBaseName = (node) => {
	if (node.data?.inputName) return node.data.inputName;
	if (node.type === "customInput") return node.id.replace("customInput-", "input_");
	if (node.type === "text") return node.id.replace("customText-", "text_");
	if (node.type === "llm") return node.id.replace("llm-", "llm_");
	return node.id;
};

export const getAvailableNodes = () => {
	const nodes = useStore.getState().nodes;
	const validTypes = ["customInput", "text", "llm"];
	const inputNodes = nodes.filter((node) => validTypes.includes(node.type));

	return inputNodes.map((node) => {
		return {
			nodeId: node.id,
			nodeName: getNodeBaseName(node),
			nodeType: node.type === "customInput" ? node.data?.inputType || "Text" : node.type,
		};
	});
};

export const getNodeOutputs = (nodeInfo) => {
	const outputs = [];

	if (nodeInfo.nodeType === "Text" || nodeInfo.nodeType === "text") {
		outputs.push({
			nodeId: nodeInfo.nodeId,
			outputId: "text",
			outputName: "text",
			description: "The inputted text",
			type: "Text",
			baseName: nodeInfo.nodeName,
		});
	} else if (nodeInfo.nodeType === "File") {
		outputs.push({
			nodeId: nodeInfo.nodeId,
			outputId: "processed_text",
			outputName: "processed_text",
			description: "File contents as text",
			type: "Text",
			baseName: nodeInfo.nodeName,
		});
		outputs.push({
			nodeId: nodeInfo.nodeId,
			outputId: "file",
			outputName: "file",
			description: "The uploaded file",
			type: "File",
			baseName: nodeInfo.nodeName,
		});
	} else if (nodeInfo.nodeType === "llm") {
		outputs.push({
			nodeId: nodeInfo.nodeId,
			outputId: "response",
			outputName: "response",
			description: "The LLM response",
			type: "Text",
			baseName: nodeInfo.nodeName,
		});
	}

	return outputs;
};

export const findNodeByName = (nodeName) => {
	const { nodes } = useStore.getState();
	return nodes.find((n) => getNodeBaseName(n) === nodeName);
};
