// ==UserScript==
// @name         Kusto Extension
// @namespace    https://github.com/zhouyuzhe88/monkey/blob/master/Kusto%20Extension.js
// @version      0.1
// @description  Kusto Extension
// @author       Yuzhe Zhou
// @match        https://ailoganalyticsportal-privatecluster.cloudapp.net/
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

/*(function() {
    'use strict';
    console.log("Running Kusto Extension");

    // Your code here...
})();*/

let markIDSet = new Set();

function addDblclick() {
    console.log('Add double click listener');
    $("tbody").on("dblclick", "tr", function () {
        let uid = this.getAttribute("data-uid");
        if (markIDSet.has(uid)) {
            this.style.background = null;
            markIDSet.delete(uid);
        }
        else {
            this.style.background = "red";
            markIDSet.add(uid);
        }
        console.log(markIDSet);
    });

    $("tbody").bind("DOMSubtreeModified", function () {
        console.log('Tabel data updated');
        let rows = this.rows;
        for (var i = 0; i < rows.length; i++) {
            let row = rows[i];
            let uid = row.getAttribute("data-uid");
            if (markIDSet.has(uid)) {
                row.style.background = "red";
            }
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function addButton() {
    await sleep(5000);
    let buttons = document.getElementsByClassName("ibiza-navbar");
    if (buttons.length) {
        console.log('Add Button');
        let btn = document.createElement("BUTTON");
        btn.appendChild(document.createTextNode("烫烫烫"));
        btn.onclick = addDblclick;
        btn.classList.add("command-button");
        buttons[0].append(btn);
    }
}

(function () {
    'use strict';
    console.log("Running Kusto Extension");
    $(document).ready(function () {
        console.log("Document is ready");
        addButton();
    });
})();
