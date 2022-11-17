import { displayHtml, getFirstElementOfClass, loadSnippet } from "./ajax-utility.js";

export const homeScript = () => {
	assignListeners();
};

function assignListeners() {
	getFirstElementOfClass("diploma-training-card__label").addEventListener("click", () => {
		loadSnippet("training");
	});
}