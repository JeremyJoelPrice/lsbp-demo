import { ajaxUtils, displayHtml } from "./ajax-utility.js";
import { homeScript } from "./home.js";

// load the navbar
ajaxUtils.sendRequest("../html/navbar.html", (html) => {
	displayHtml(html, "#navbar-destination");
	assignHamburgerListeners();
	assignNavbarButtonListeners();
	setHomeButtonActive();
	ajaxUtils.sendRequest("../html/home.html", displayHtml);
	// load the home snippet
	loadSnippet("home");
});

function assignHamburgerListeners() {
	// nav menu toggle when user clicks hamburger icon
	getFirstElementOfClass("navbar__hamburger-menu").addEventListener(
		"click",
		() => {
			getFirstElementOfClass(
				"navbar__buttons-container"
			).classList.toggle("navbar__buttons-container--active");
		}
	);

	// nav menu closes when user clicks away
	window.addEventListener("click", (event) => {
		if (
			event.target.classList[0] !== "navbar__hamburger-menu" &&
			event.target.parentElement?.classList[0] !==
				"navbar__hamburger-menu"
		) {
			getFirstElementOfClass(
				"navbar__buttons-container"
			).classList.remove("navbar__buttons-container--active");
		}
	});
}

function assignNavbarButtonListeners() {
	getElementsOfClass("navbar__button").forEach((button) => {
		button.addEventListener("click", (event) => {
			setAsOnlyActiveButton(button);
			loadSnippet(event.target.innerText.toLowerCase());
		});
	});
}

function setHomeButtonActive() {
	getFirstElementOfClass("navbar__home-button").classList.add(
		"navbar__home-button--active"
	);
}

// utility functions
function setAsOnlyActiveButton(clickedButton) {
	getElementsOfClass("navbar__button").forEach((button) => {
		if (button !== clickedButton) {
			button.classList.remove("navbar__button--active");
		} else {
			button.classList.add("navbar__button--active");
		}
	});
}

function loadSnippet(page) {
	ajaxUtils.sendRequest(`../html/${page}.html`, (html) => {
		displayHtml(html);
		getPageLoadScript(page)();
	});
}

function getPageLoadScript(page) {
	switch (page) {
		case "home":
			return homeScript;
		default:
			return () => {};
	}
}

function getElementsOfClass(className) {
	return [...document.getElementsByClassName(className)];
}

function getFirstElementOfClass(className) {
	const elements = [...document.getElementsByClassName(className)];
	return elements[0];
}
