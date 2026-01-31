export const getHandleTop = (index, total) => {
	if (total === 1) return "50%";
	return `${(100 / (total + 1)) * (index + 1)}%`;
};
