import {
	ajaxUtils,
	displayHtml,
	getElementsOfClass,
	getFirstElementOfClass,
	loadSnippet
} from "./ajax-utility.js";

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
