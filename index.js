// Get current Year and display at bottom of page
document.getElementById("date").textContent = new Date().getFullYear();
const space = document.querySelector("header.header").offsetHeight + 100;
const navLinks = document.querySelectorAll(".navbar a");
let scrollY = window.pageYOffset;

function changeNavColor(scrollY) {
	const header = this.document.querySelector(".header");
	if (scrollY > 0) {
		header.classList.add("scroll");
		document.documentElement.style.setProperty("--clr-nav-text", "#fff");
	} else {
		header.classList.remove("scroll");
		document.documentElement.style.setProperty("--clr-nav-text", "#000");
	}
}

function navChangeOnScroll() {
	scrollY = window.pageYOffset;

	changeNavColor(scrollY);

	const sections = document.querySelectorAll("main section");
	sections.forEach((section) => {
		const sectionDistanceFromTop = section.offsetTop;
		const sectionHeight = section.offsetHeight;
		const id = section.getAttribute("id");
		if (scrollY >= sectionDistanceFromTop - sectionHeight / 3) {
			navLinks.forEach((link) => {
				link.classList.remove("active");
			});
			document
				.querySelector(`.navbar a[href="#${id}"]`)
				.classList.add("active");
		}
	});
}
function makeLinkActive(activeLink) {
	navLinks.forEach((link) => {
		link.classList.remove("active");
	});
	activeLink.classList.add("active");
}
async function typeIntro() {
	const typedText = document.querySelector(".intro .typed-text");
	const cursor = document.querySelector(".intro .cursor");
	const words = [
		"an enthusiastic coder",
		"a web developer",
		"also available for hiring",
	];
	let word = "";
	let wordDelay = 800; // in millisecond
	let charDelay = 70; // in millisecond

	function sleep(time) {
		return new Promise((resolve) => {
			setTimeout(resolve, time);
		});
	}

	async function type(word) {
		if (!cursor.classList.contains("editing")) {
			cursor.classList.add("editing");
		}
		for (let charIndex = 0; charIndex < word.length; charIndex++) {
			await sleep(charDelay);
			typedText.textContent += word[charIndex];
		}
		cursor.classList.remove("editing");
	}

	async function erase() {
		if (!cursor.classList.contains("editing")) {
			cursor.classList.add("editing");
		}
		for (let charIndex = word.length - 1; charIndex >= 0; charIndex--) {
			word = typedText.textContent;
			await sleep(charDelay);
			typedText.textContent = word.slice(0, -1);
		}
		cursor.classList.remove("editing");
	}

	while (true) {
		for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
			word = words[wordIndex];
			await type(word);
			await sleep(wordDelay);
			await erase();
			await sleep(wordDelay);
		}
	}
}

// Change the navbar background color and navlinks color on scroll
window.addEventListener("scroll", navChangeOnScroll);

// Add "active" class to nav link when clicked
navLinks.forEach((navLink) => {
	navLink.addEventListener("click", function (event) {
		makeLinkActive(event.target);
	});
});
// typing effect on intro text
window.addEventListener("DOMContentLoaded", () => {
	typeIntro();
	changeNavColor(scrollY);
});
