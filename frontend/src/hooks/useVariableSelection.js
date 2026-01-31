import { extractVariables } from "../utils/variableUtils";
import { useEdgeSync } from "./useEdgeSync";
import { useVariableAutocomplete } from "./useVariableAutocomplete";

export const useVariableSelection = (nodeId, text, setText, textareaRef, nodeRef) => {
	useEdgeSync(nodeId, text, setText);

	const autocomplete = useVariableAutocomplete(text, setText, textareaRef, nodeRef);

	return {
		variables: extractVariables(text),
		...autocomplete,
	};
};
