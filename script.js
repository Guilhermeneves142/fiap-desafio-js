import Header from "./components/header/Header.js";

(async function init() {
	const header = new Header(document.getElementById('app'));
	await header.render();
})();