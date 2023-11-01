// Get current Year and display at bottom of page
document.getElementById("date").textContent = new Date().getFullYear();
const space = document.querySelector("header.header").offsetHeight;
const navLinks = document.querySelectorAll(".navbar a");

async function typeIntro() {
	const typedText = document.querySelector(".intro .typed-text");
	const cursor = document.querySelector(".intro .cursor");
	const words = [
		"an enthusiastic coder",
		"a web developer",
		"available for hiring",
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

// Add "active" class to nav link when clicked
function makeLinkActive(activeLink) {
	document.querySelector(".active").classList.remove("active");
	activeLink.classList.add("active");
}
navLinks.forEach((navLink) => {
	navLink.addEventListener("click", function (event) {
		makeLinkActive(event.target);
	});
});

const introSection = document.querySelector(".intro");
const header = this.document.querySelector(".header");
const introSectionObserver = new IntersectionObserver(
	function (entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				header.classList.remove("scroll");
				document.documentElement.style.setProperty("--clr-nav-text", "#000");
			} else {
				header.classList.add("scroll");
				document.documentElement.style.setProperty("--clr-nav-text", "#fff");
			}
		});
	},
	{
		threshold: 0.95,
	}
);

const fadeObserver = new IntersectionObserver(
	function (entries) {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				entry.target.classList.remove("appear");
				return;
			}
			entry.target.classList.add("appear");
			// fadeObserver.unobserve(entry.target);
		});
	},
	{ threshold: [0.3, 0.6, 0.9, 1], rootMargin: "200px 0px 0px 0px" }
);

const faders = document.querySelectorAll(".fade");

faders.forEach((fader) => {
	fadeObserver.observe(fader);
});

const slideObserver = new IntersectionObserver(
	function (entries) {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				// entry.target.classList.remove("appear");
				return;
			} else {
				entry.target.classList.add("appear");
				slideObserver.unobserve(entry.target);
			}
		});
	},
	{
		threshold: 0,
		rootMargin: "0px 0px -100px 0px",
	}
);

const sliders = document.querySelectorAll(".slide-in");

function toggleExpand() {
	const expandBtns = document.querySelectorAll(".project .expand-btn");

	expandBtns.forEach((btn) => {
		let isExpanded = false;
		btn.addEventListener("click", function () {
			if (!isExpanded) {
				this.textContent = "-";
				isExpanded = true;
			} else {
				this.textContent = "+";
				isExpanded = false;
			}
			let cardDetails = btn.parentNode.nextElementSibling;
			cardDetails.classList.toggle("show");
		});
	});
}

// typing effect on intro text
window.addEventListener("DOMContentLoaded", () => {
	typeIntro();
	toggleExpand();
	introSectionObserver.observe(introSection);
	sliders.forEach((slider) => {
		slideObserver.observe(slider);
	});
});
