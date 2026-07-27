var elements = document.querySelectorAll('p');
Array.prototype.forEach.call(elements, function(el, i){
    if(el.innerHTML=='[expand]') {
        var parentcontent = el.parentNode.innerHTML.replace('<p>[expand]</p>','<div class="expand" style="display: none; height: 0; overflow: hidden;">').replace('<p>[/expand]</p>','</div>');
        el.parentNode.innerHTML = parentcontent;
    }
});

var elements = document.querySelectorAll('div.expand');
Array.prototype.forEach.call(elements, function(el, i){
    el.previousElementSibling.innerHTML = el.previousElementSibling.innerHTML + '<span><br>... <a href="#" style="cursor: pointer; color: #ff00ff"  onclick="this.parentNode.parentNode.nextElementSibling.style.display = \'block\'; this.parentNode.parentNode.nextElementSibling.style.height = \'auto\'; this.parentNode.style.display = \'none\'; return false;">Leer&nbsp;más&nbsp;&rarr;</a></span>';
});
