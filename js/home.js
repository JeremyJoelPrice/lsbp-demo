import { getElementsOfClass } from "./ajax-utility.js";

export const homeScript = () => {
	assignListeners();
};

function assignListeners() {
	getElementsOfClass("link").forEach((link) => {
		link.addEventListener("click", () => {
			alert("if you hire Jeremy, all links will work");
		});
	});
}
