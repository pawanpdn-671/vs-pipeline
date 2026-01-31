import { LuBrainCircuit } from "react-icons/lu";
import { MdDataObject, MdInput, MdOutput, MdTimer, MdTextFields } from "react-icons/md";
import { TbArrowFork, TbArrowsJoin, TbMathFunction } from "react-icons/tb";

export const TOOLBAR_NODES = [
	{ type: "customInput", label: "Input", icon: MdInput },
	{ type: "llm", label: "LLM", icon: LuBrainCircuit },
	{ type: "customOutput", label: "Output", icon: MdOutput },
	{ type: "text", label: "Text", icon: MdTextFields },
	{ type: "filter", label: "Filter", icon: MdDataObject },
	{ type: "math", label: "Math", icon: TbMathFunction },
	{ type: "timer", label: "Delay", icon: MdTimer },
	{ type: "split", label: "Splitter", icon: TbArrowFork },
	{ type: "merge", label: "Joiner", icon: TbArrowsJoin },
];
