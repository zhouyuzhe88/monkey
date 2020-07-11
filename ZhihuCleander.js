// ==UserScript==
// @name         Zhihu cleander
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Alpha Zhou
// @match        https://www.zhihu.com/
// @grant        none
// ==/UserScript==

 function remove() {
     var list = document.getElementById('TopstoryContent')
     var recommend = list.getElementsByClassName('Topstory-recommend')[0].childNodes[0]
     console.log(recommend.childNodes.length)
     recommend.childNodes.forEach(row => {
         var rich = row.getElementsByClassName('RichContent-cover-play')
         var button = row.getElementsByClassName('Button VoteButton VoteButton--up')[0]
         if (button) {
             var title = button.getAttribute('aria-label')
             var res = /.*?(\d+)/g.exec(title)
             if (res) {
                 var count = parseInt(res[1])
                 if (count < 100) {
                     row.style.display = 'none'
                 }
                 if (rich.length > 0) {
                     row.style.display = 'none'
                 }
             }
             else {
                 row.style.display = 'none'
             }
         }
     })
 }

(function() {
    'use strict';

    setInterval(function () {
        remove()
    }, 1000);

})();
