function close_menu() {
  var m;
  m = (document.getElementById("leftmenu") || document.getElementById("sidenav"));
  m.style.display = "none";  
  if (document.getElementsByClassName) {
    x = document.getElementsByClassName("chapter")
    for (i = 0; i < x.length; i++) {
      x[i].style.visibility = "visible";
    }
    x = document.getElementsByClassName("nav")
    for (i = 0; i < x.length; i++) {
      x[i].style.visibility = "visible";
    }
    x = document.getElementsByClassName("sharethis")
    for (i = 0; i < x.length; i++) {
      x[i].style.visibility = "visible";
    }            
  }
}
if (window.addEventListener) {
  window.addEventListener("scroll", function () {fix_sidemenu(); });
  window.addEventListener("resize", function () {fix_sidemenu(); });  
  window.addEventListener("touchmove", function () {fix_sidemenu(); });  
  window.addEventListener("load", function () {fix_sidemenu(); });
} else if (window.attachEvent) {
  window.attachEvent("onscroll", function () {fix_sidemenu(); });
  window.attachEvent("onresize", function () {fix_sidemenu(); });  
  window.attachEvent("ontouchmove", function () {fix_sidemenu(); });
  window.attachEvent("onload", function () {fix_sidemenu(); });
}
function fix_sidemenu() {
  var w, top;
  w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  top = scrolltop()    
  if (w < 993 && w > 600) {
    if (top == 0) {
      document.getElementById("sidenav").style.top = "144px";
    }
    if (top > 0 && top < 100) {
      document.getElementById("sidenav").style.top = (144 - top) + "px";      
    }
    if (top > 100) {
      document.getElementById("sidenav").style.top = document.getElementById("topnav").offsetHeight + "px";
      document.getElementById("belowtopnav").style.paddingTop = "44px";    
      document.getElementById("topnav").style.position = "fixed";    
      document.getElementById("topnav").style.top = "0";
      
    } else {
      document.getElementById("belowtopnav").style.paddingTop = "0";
      document.getElementById("topnav").style.position = "relative";
      
    }
    document.getElementById("leftmenuinner").style.paddingTop = "0"; //SCROLLNYTT
  } else {
    if (top == 0) {
      document.getElementById("sidenav").style.top = "112px";      
    }
    if (top > 0 && top < 66) {
      document.getElementById("sidenav").style.top = (112 - top) + "px";      
    }
    if (top > 66) {
      document.getElementById("sidenav").style.top = "44px";
      if (w > 992) {document.getElementById("leftmenuinner").style.paddingTop = "44px";} //SCROLLNYTT
      document.getElementById("belowtopnav").style.paddingTop = "44px";    
      document.getElementById("topnav").style.position = "fixed";
      document.getElementById("topnav").style.top = "0";
      
    } else {
      if (w > 992) { document.getElementById("leftmenuinner").style.paddingTop = (112 - top) + "px";} //SCROLLNYTT
      document.getElementById("belowtopnav").style.paddingTop = "0";
      document.getElementById("topnav").style.position = "relative";
      
    }
  }
}
function sidemenuitemintoview() {
  var a, b, i = 0;
  a = document.getElementById("leftmenuinnerinner");
  if (!a || !a.getElementsByClassName) {return false;}
  b = a.getElementsByClassName("active");
  if (b.length < 1) {return false;}  
  while (!isIntoView(a, b[0])) {
    i++
    if (i > 1000) {break;}
    a.scrollTop += 10;
  }
}
function isIntoView(x, y) {
  var a = x.scrollTop;
  var b = a + window.innerHeight;
  var ytop = y.offsetTop;
  var ybottom = ytop + 140;
  return ((ybottom <= b) && (ytop >= a));
}
function scrolltop() {
  var top = 0;
  if (typeof(window.pageYOffset) == "number") {
    top = window.pageYOffset;
  } else if (document.body && document.body.scrollTop) {
    top = document.body.scrollTop;
  } else if (document.documentElement && document.documentElement.scrollTop) {
    top = document.documentElement.scrollTop;
  }
  return top;
}

function w3_open_nav(x) {
  var contentNode, h, menuHeight;
  if (document.getElementById("nav_" + x).style.display == "block") {
    w3_close_nav(x);
  } else {
    w3_close_all_nav();
    document.getElementById("nav_" + x).style.display = "block";    
    if (document.getElementById("topnavbtn_" + x)) {
      document.getElementById("topnavbtn_" + x).getElementsByTagName("i")[0].style.display = "none";
      document.getElementById("topnavbtn_" + x).getElementsByTagName("i")[1].style.display = "inline";        
      //document.getElementById("nav_" + x).getElementsByTagName("h3")[0].focus();
    }
  }
  h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  menuHeight = document.getElementById("nav_" + x).offsetHeight;
  if (menuHeight > h) {
    document.getElementById("nav_" + x).style.height = (h - 106) + "px";
  }
}
function w3_close_nav(x) {
  document.getElementById("nav_" + x).style.display = "none";
  if (document.getElementById("topnavbtn_" + x)) {
    document.getElementById("topnavbtn_" + x).getElementsByTagName("i")[0].style.display = "inline";
    document.getElementById("topnavbtn_" + x).getElementsByTagName("i")[1].style.display = "none";        
    document.getElementById("nav_" + x).style.height = "";
  }
}
function w3_close_all_nav() {
  w3_close_all_topnav();
  close_menu();
}
function w3_close_all_topnav() {
  w3_close_nav("demos");
  w3_close_nav("marketing");
  w3_close_nav("tecnologia");
}
(function () {
  var x, y, i, a, b, c, cc, d, m;
  m = (document.getElementById("leftmenu") || document.getElementById("sidenav"));
  x = m.getElementsByTagName("A");
  d = document.location.href;
  for (i = 0; i < x.length; i++) {
    if (d.indexOf(x[i].href) >= 0) {
      x[i].className = "active";
      y = x[i].nextElementSibling;
      if (y && (y.className.indexOf("ref_overview") > -1 || y.className.indexOf("tut_overview") > -1)) {
        y.style.display = "block";
        if (y.className.indexOf("tut_overview") > -1) {
          x[i].className = "active_overview";
          y.getElementsByTagName("a")[0].className = "active";
        }
        if (x[i].addEventListener) {
          cc = true;
          x[i].addEventListener("click", function () {
            if (cc == true) {
              y.style.display = "none";
              event.preventDefault();
              cc = false;
            } else {
              y.style.display = "block";
              cc = true;
              event.preventDefault();
            }
          });
        }
      } else if (x[i].parentElement.className.indexOf("ref_overview") > -1) {
        x[i].parentElement.style.display = "block";
        x[i].parentElement.previousElementSibling.className = "activesub";
      } else if (x[i].parentElement.className.indexOf("tut_overview") > -1) {
        x[i].parentElement.style.display = "block";
        x[i].parentElement.previousElementSibling.className = "active_overview";
      }
      break;
    } else if (d.indexOf("/tags/att_") > -1) {
       c = d.substring(d.indexOf("/tags/att_") + 10, d.lastIndexOf("_"));
       if (x[i].href == d.substr(0, d.indexOf("/tags/")) + "/tags/tag_" + c + ".asp") {
         x[i].className = "active";
       }
    } else if (d.indexOf("/howto/default_page") > -1) {
       if (x[i].href.indexOf("default.asp") > -1) {
         x[i].className = "active";
       }
    }
  }
  sidemenuitemintoview()
  x = document.getElementById("topnav").getElementsByTagName("A");
  for (i = 0; i < x.length; i++) {
    a = document.location.pathname;
    b = x[i].pathname;
    if ((x[i].parentNode.tagName == "LI" || x[i].parentNode.className.indexOf("w3-bar") > -1) && a.substr(0, a.indexOf("/",1)) ==  b.substr(0, b.indexOf("/",1))) {
      x[i].className += " active";
    }
  }
  if (window.addEventListener) { 
    document.getElementById("main").addEventListener("click", w3_close_all_nav, true);
    m.addEventListener("click", w3_close_all_topnav, true);
    document.getElementById("right").addEventListener("click", w3_close_all_nav, true);
    document.getElementById("main").addEventListener("wheel", w3_close_all_nav, true);
    document.getElementById("main").addEventListener("touchstart", w3_close_all_nav, true);
  } else if (window.attachEvent) {         
    document.getElementById("main").attachEvent("onclick", w3_close_all_nav);
    m.attachEvent("onclick", w3_close_all_topnav);
    document.getElementById("right").attachEvent("onclick", w3_close_all_nav);
  }
  if ('ontouchstart' in window || 'onmsgesturechange' in window) {
    document.getElementById("leftmenuinnerinner").style.overflowY = "scroll";
  }
})();


function clickFBLike() {
  document.getElementById("fblikeframe").style.display = 'block';
  document.getElementById("popupDIV").innerHTML = "<iframe src='/fblike.html?r=" + Math.random() + "' frameborder='no' style='height:200px;width:250px;'></iframe><br><button onclick='hideFBLike()' class='w3-btn w3-black'>Cerrar</button>";
}
function hideFBLike() {
  document.getElementById("fblikeframe").style.display = 'none';
}

function clicksearch() {
  document.getElementById("searchframe").style.display = 'block';
  document.getElementById("popup-DIV").innerHTML = "<iframe src='/search.html?r=" + Math.random() + "' frameborder='no' style='height:200px;width:250px;'></iframe><br><button onclick='hidesearch()' class='w3-btn w3-black'>Cerrar</button>";
}
function hidesearch() {
  document.getElementById("searchframe").style.display = 'none';
}
