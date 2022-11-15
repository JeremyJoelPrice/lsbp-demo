import { ajaxUtils, displayHtml } from "./ajax-utility.js";

// load the navbar
ajaxUtils.sendRequest("../html/navbar.html", (html) => {
	displayHtml(html, "#navbar-placeholder");
	assignHamburgerListeners();
	assignNavbarButtonListeners();
	setHomeButtonActive();
	ajaxUtils.sendRequest("../html/home.html", displayHtml);
});

function assignHamburgerListeners() {
	// nav menu toggle when user clicks hamburger icon
	document.querySelector("#hamburger-menu").addEventListener("click", () => {
		document
			.querySelector("#navbar-buttons-container")
			.classList.toggle("active");
	});

	// nav menu closes when user clicks away
	window.addEventListener("click", (event) => {
		if (
			event.target.id !== "hamburger-menu" &&
			event.target.parentElement?.id !== "hamburger-menu"
		) {
			document
				.querySelector("#navbar-buttons-container")
				.classList.remove("active");
		}
	});
}

function assignNavbarButtonListeners() {
	// add onclick to each navbar button
	getNavbarButtons().forEach((button) => {
		button.addEventListener("click", (event) => {
			setAsOnlyActiveButton(button);

			const destination = event.target.innerText.toLowerCase();
			ajaxUtils.sendRequest(`../html/${destination}.html`, (html) => {
				displayHtml(html);
			});
		});
	});
}

function setHomeButtonActive() {
	document.getElementById("home-button").classList.add("active");
}

// utility functions
function setAsOnlyActiveButton(clickedButton) {
	getNavbarButtons().forEach((button) => {
		if (button !== clickedButton) {
			button.classList.remove("active");
		} else {
			button.classList.add("active");
		}
	});
}

function getNavbarButtons() {
	return [...document.getElementsByClassName("navbar-button")];
}