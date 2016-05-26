// ==UserScript==
// @name         Clear LeetCode
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Alpha Zhou
// @match        https://leetcode.com/problemset/algorithms/
// @grant        none
// ==/UserScript==

BanDif = ["Easy", "Medium", "Hard"];

function IsLock(tr) {
    return tr.cells[2].children.length == 2;
}

function IsAcWithDifficulty(tr, dif) {
    return tr.cells[0].children[0].getAttribute("class") == "ac" && tr.cells[6].innerHTML == dif;
}

function ShouldBan(tr) {
    for (var i in BanDif) {
        if (IsAcWithDifficulty(tr, BanDif[i])) {
            return true;
        }
    }
    return IsLock(tr);
}

function Ban() {
    var tableObj = document.getElementById("problemList");
    for (var i = 1; i < tableObj.rows.length; i++) {
        tr = tableObj.rows[i];
        if (ShouldBan(tr)) {
            tr.style.display="none";
        }
    }
}

Ban();