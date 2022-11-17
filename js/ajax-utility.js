import { homeScript } from "./home.js";

export const ajaxUtils = {};

ajaxUtils.sendRequest = (url, callback) => {
	displayHtml("<div><img id='loadingWheelGif' src='img/loading.gif'></div>");

	const request = getRequestObject();
	request.onreadystatechange = () => {
		handleResponse(request, callback);
	};
	request.open("GET", url);
	request.send(null);
};

function getRequestObject() {
	if (window.XMLHttpRequest) return new XMLHttpRequest();
	else if (window.ActiveXObject)
		return new ActiveXObject("Microsoft.XMLHTTP");
	else {
		// For the unlikely event that Ajax is not supported.
		window.alert("Ajax is not supported!");
		return null;
	}
}

function handleResponse(request, callback) {
	const stateDone = 4;
	if (request.readyState == stateDone && request.status == 200) {
		callback(request.responseText);
	}
}

export const displayHtml = (html, targetElement="#main-destination") => {
	document.querySelector(targetElement).innerHTML = html;
};

export function loadSnippet(page) {
	ajaxUtils.sendRequest(`../html/${page}.html`, (html) => {
		displayHtml(html);
		getPageLoadScript(page)();
	});
}

export function getPageLoadScript(page) {
	switch (page) {
		case "home":
			return homeScript;
		default:
			return () => {};
	}
}

export function getElementsOfClass(className) {
	return [...document.getElementsByClassName(className)];
}

export function getFirstElementOfClass(className) {
	const elements = [...document.getElementsByClassName(className)];
	return elements[0];
}
