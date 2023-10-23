// Get current Year and display at bottom of page
document.getElementById("date").textContent = new Date().getFullYear();
const space = document.querySelector("header.header").offsetHeight + 100;

function navChangeOnScroll() {
	const header = this.document.querySelector(".header");
	let scrollY = window.pageYOffset;

	if (scrollY > 0) {
		header.classList.add("scroll");
		document.documentElement.style.setProperty("--clr-nav-text", "#fff");
	} else {
		header.classList.remove("scroll");
		document.documentElement.style.setProperty("--clr-nav-text", "#000");
	}

	const sections = document.querySelectorAll("main section");
	sections.forEach((section) => {
		const sectionDistanceFromTop = section.offsetTop - space;
		const sectionHeight = section.offsetHeight;
		const id = section.getAttribute("id");
		if (
			scrollY >= sectionDistanceFromTop &&
			scrollY < sectionHeight + sectionDistanceFromTop
		) {
			document
				.querySelector(`.navbar a[href="#${id}"]`)
				.classList.add("active");
		} else {
			document
				.querySelector(`.navbar a[href="#${id}"]`)
				.classList.remove("active");
		}
	});
}

// Change the navbar background color and navlinks color on scroll
window.addEventListener("scroll", function () {
	navChangeOnScroll();
});

// Add "active" class to nav link when clicked
const navLinks = document.querySelectorAll(".navbar a");
navLinks.forEach((navLink) => {
	navLink.addEventListener("click", function (event) {
		const activeLink = event.target;
		navLinks.forEach((link) => {
			link.classList.remove("active");
		});
		activeLink.classList.add("active");
	});
});
