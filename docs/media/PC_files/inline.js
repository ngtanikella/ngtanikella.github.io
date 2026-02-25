/**
 * +------------------------------------------------------------------------+
 * | Global Settings                                                        |
 * +------------------------------------------------------------------------+
 */
(function() {
	// TODO: Fix if the user has switched their system preferences. 
	// Only set cookie in settings page.	
	function setFontSize(value) {
		if (value) {
			document.documentElement.classList.remove(window.mtuFontSize);
			document.documentElement.classList.add(value);
			window.mtuFontSize = value;
		}
	}

	function setReducedMotion(value) {
		if (value) {
			document.documentElement.classList.add("reduce-animations");
		} else {
			document.documentElement.classList.remove("reduce-animations");
		}
	}

	function setTheme(value) {
		if (value) {
			document.documentElement.classList.remove(window.mtuTheme);
			document.documentElement.classList.add(value);
			window.mtuTheme = value;
		}
	}
	
	const animQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

	let mtuAnimations;
	let mtuFontSize;
	let mtuTheme;

	try {
		mtuAnimations = localStorage.getItem("mtuAnimations");
		mtuFontSize = localStorage.getItem("mtuFontSize");
		mtuTheme = localStorage.getItem("mtuTheme");
	} catch (error) {
		console.error(error);
		return;
	}

	setFontSize(mtuFontSize);
	setReducedMotion(mtuAnimations === "reduced" || animQuery.matches);

	if (mtuTheme === "system") {
		mtuTheme = darkQuery.matches ? "dark" : "light";
	}

	if (mtuTheme === "dark") {
		const link = document.createElement("link");
		link.href = "/mtu_resources/assets/css/app-dark.css";
		link.rel = "stylesheet";
		link.type = "text/css";

		document.head.append(link);
	}

	setTheme(mtuTheme);
})();

/**
 * +------------------------------------------------------------------------+
 * | Global Header and Navigation                                           |
 * +------------------------------------------------------------------------+
 */
(function() {
	function adjustNav() {
		let navBar = document.querySelector('.nav-bar');
		if (navBar) {
			let navCount = navBar.querySelectorAll('.menu_item').length;
			let height = navBar.clientHeight;	

			if (height > 50) {
			  navBar.style.setProperty('--navCount', navCount);
			  navBar.classList.add('nav-tall');
			} else {
			  navBar.style.removeProperty('--navCount');
			  navBar.classList.remove('nav-tall');
			}	
		}
	}
	
	// Adjust header height right away.
	adjustNav();
	
	// Re-adjust header height as content loads.
	window.addEventListener("DOMContentLoaded", adjustNav);
	window.addEventListener("load", adjustNav);
	
	// Setting up some space for items after the nav to be seen.
	function onResize() {
		let header = document.querySelector(".nav, .mtu-nav");
		let headerHeight;
		
		if (header) {
			headerHeight = header.clientHeight + "px";
			document.documentElement.style.setProperty("--mtu-header-height", headerHeight);
		}
	}
	
	// Create --mtu-header-height now.
	onResize();
	
	// Update --mtu-header-height on load.
	window.addEventListener("DOMContentLoaded", onResize);
	window.addEventListener("load", onResize);
	
	// Update --mtu-header-height on resize.
	let frameId;
	window.addEventListener("resize", function() {
		// Debounce the resize event.
		if (frameId) {
			window.cancelAnimationFrame(frameId);
		}
		
		frameId = window.requestAnimationFrame(onResize);
	});
})();

/**
 * Defers execution of the given function until after jQuery is loaded.
 */
function defer(fn) {
	if (window.jsSet) {
		fn();
		return;
	}
	
	setTimeout(function() {
		defer(fn);
	}, 100);
}
