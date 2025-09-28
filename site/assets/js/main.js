"use strict";

(function() {
	function onReady(fn) {
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", fn);
		} else {
			fn();
		}
	}

	onReady(function initSite() {
		var navToggleButton = document.getElementById("navToggle");
		var primaryNav = document.getElementById("primaryNav");
		if (navToggleButton && primaryNav) {
			navToggleButton.addEventListener("click", function() {
				var isOpen = primaryNav.classList.toggle("nav--open");
				navToggleButton.setAttribute("aria-expanded", String(isOpen));
			});

			primaryNav.addEventListener("click", function(event) {
				var target = event.target;
				if (target && target.matches("a.nav__link")) {
					primaryNav.classList.remove("nav--open");
					navToggleButton.setAttribute("aria-expanded", "false");
				}
			});
		}

		var yearEl = document.getElementById("year");
		if (yearEl) {
			yearEl.textContent = String(new Date().getFullYear());
		}
	});
})();