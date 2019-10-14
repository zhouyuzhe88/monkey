// ==UserScript==
// @name         Update OMCI Build: auto release note title
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://rink.hockeyapp.net/manage/apps/780843/app_versions/*/release
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById("notes").value = 'Please send us bug report and feedback by shaking your phone.\n\nMajor changes included in this build:';
})();
