// ==UserScript==
// // @name         remove bing ads
// // @namespace    http://tampermonkey.net/
// // @version      0.1
// // @description  try to take over the world!
// // @author       Alpha Zhou
// // @match        http://www.bing.com/search*
// // @grant        none
// // ==/UserScript==
//
(function() {
	ads = document.getElementsByClassName("b_ad");
	for (i = 0; i < ads.length; ++i) {
		ads[i].style.display = "none";
	}
})();
