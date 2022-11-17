import {
	displayHtml,
	getElementsOfClass,
	getFirstElementOfClass,
	loadSnippet
} from "./ajax-utility.js";

export const homeScript = () => {
	assignListeners();
};

function assignListeners() {
	getFirstElementOfClass("diploma-training-card__label").addEventListener(
		"click",
		() => {
			loadSnippet("training");
		}
	);
	getElementsOfClass("event-banner__button").forEach((button) => {
		button.addEventListener("click", () => {
			loadSnippet("training");
		});
	});
	document
		.getElementById("events-link-to-clinic")
		.addEventListener("click", () => {
			loadSnippet("student clinic");
		});
}
