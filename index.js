document.getElementById("date").textContent = new Date().getFullYear();

window.addEventListener("scroll", function () {
	const header = this.document.querySelector(".header");

	if (this.window.pageYOffset > 0) {
		header.classList.add("scroll");
		document.documentElement.style.setProperty("--clr-nav-text", "#fff");
	} else {
		header.classList.remove("scroll");
		document.documentElement.style.setProperty("--clr-nav-text", "#000");
	}
});
