//Variable used to change the eventListeners for the encode button and the "live" toggle
var eventEncode = true;

var first = 0;

function unescape(str) {
    return (str + '==='.slice((str.length + 3) % 4))
        .replace(/-/g, '+')
        .replace(/_/g, '/');
}

function escape(str) {
    return str.replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function encodeUrl() {
    var str = document.getElementById("text").value;
    document.getElementById("result").innerHTML = escape(converter.base64Encode(str));
}

function decodeUrl() {
    document.getElementById("result2").innerHTML = anchorme({
        input: escape(converter.base64Decode(document.getElementById("text2").value)),
        // use some options
        options: {
            attributes: {
                target: "_blank"
            },
            //truncate: 40,
            endTruncation: true
        },
    });
}

function encode() {
    var str = document.getElementById("text").value;
    document.getElementById("result").innerHTML = converter.base64Encode(str);
}

function decode() {
    document.getElementById("result2").innerHTML = anchorme({
        input: converter.base64Decode(document.getElementById("text2").value),
        // use some options
        options: {
            attributes: {
                target: "_blank"
            },
            //truncate: 40,
            endTruncation: true
        },
    });
}

function liveEncodeDecode(mode) {
    if (mode == "e") {
        if (document.getElementById("live").checked) {
            if (document.getElementById("url").checked) {
                document.getElementById("text").removeEventListener("keyup", encode);
                document.getElementById("text").addEventListener("keyup", encodeUrl);
                encodeUrl();
            }
            else {
                document.getElementById("text").removeEventListener("keyup", encodeUrl);
                document.getElementById("text").addEventListener("keyup", encode);
                encode();
            }
        }
        else {
            document.getElementById("text").removeEventListener("keyup", encodeUrl);
            document.getElementById("text").removeEventListener("keyup", encode);
        }
    }
    else {
        if (document.getElementById("live").checked) {
            if (document.getElementById("url").checked) {
                document.getElementById("text2").removeEventListener("keyup", decode);
                document.getElementById("text2").addEventListener("keyup", decodeUrl);
                decodeUrl();
            }
            else {
                document.getElementById("text2").removeEventListener("keyup", decodeUrl);
                document.getElementById("text2").addEventListener("keyup", decode);
                decode();
            }
        }
        else {
            document.getElementById("text2").removeEventListener("keyup", decodeUrl);
            document.getElementById("text2").removeEventListener("keyup", decode);
        }
    }
}

function urlEncodeDecode(mode) {
    if (mode == "e") {
        liveEncodeDecode("e")
        if (document.getElementById("url").checked) {
            document.getElementById("encode").removeEventListener("click", encode);
            document.getElementById("encode").addEventListener("click", encodeUrl);
        }
        else {
            document.getElementById("encode").removeEventListener("click", encodeUrl);
            document.getElementById("encode").addEventListener("click", encode);
        }
    }
    else {
        liveEncodeDecode("e")
        if (document.getElementById("url").checked) {
            document.getElementById("encode").removeEventListener("click", decode);
            document.getElementById("encode").addEventListener("click", decodeUrl);
        }
        else {
            document.getElementById("encode").removeEventListener("click", decodeUrl);
            document.getElementById("encode").addEventListener("click", decode);
        }
    }
}

function switchEncodeDecode(clicked, mode) {
    clearFields(mode);
    document.getElementById("text2").removeEventListener("keyup", decode);
    document.getElementById("text").removeEventListener("keyup", encode);
    var classString = clicked.children[0].className;
    if (classString != "active") {
        var newClass = classString.concat("active");
        clicked.children[0].className = newClass;
    }
    document.getElementById("live").checked = false;
    document.getElementById("url").checked = false;
    if (mode == "e") {
        document.getElementById("live").removeEventListener("click", function () { liveEncodeDecode("d"); });
        document.getElementById("url").removeEventListener("click", function () { urlEncodeDecode("d"); });
        document.getElementById("encode").removeEventListener("click", decode);
        document.getElementById("live").addEventListener("click", function () { liveEncodeDecode("e"); });
        document.getElementById("url").addEventListener("click", function () { urlEncodeDecode("e"); });
        document.getElementById("encode").addEventListener("click", encode);
        document.getElementById("decodeTab").children[0].className = "";
        document.getElementById("encode").innerHTML = "encode";
        document.getElementsByClassName("switch")[0].children[0].innerHTML = "Live encode";
        document.getElementById("decodeDiv").style.display = "none";
        document.getElementById("encodeDiv").style.display = "block";
        liveEncodeDecode("e");
    }
    else {
        document.getElementById("live").removeEventListener("click", function () { liveEncodeDecode("e"); });
        document.getElementById("url").removeEventListener("click", function () { urlEncodeDecode("e"); });
        document.getElementById("encode").removeEventListener("click", encode);
        document.getElementById("live").addEventListener("click", function () { liveEncodeDecode("d"); });
        document.getElementById("url").addEventListener("click", function () { urlEncodeDecode("d"); });
        document.getElementById("encode").addEventListener("click", decode);
        document.getElementById("encodeTab").children[0].className = "";
        document.getElementById("encode").innerHTML = "decode";
        document.getElementsByClassName("switch")[0].children[0].innerHTML = "Live decode";
        document.getElementById("encodeDiv").style.display = "none";
        document.getElementById("decodeDiv").style.display = "block";
        liveEncodeDecode("d");
    }
}

function themeSet() {
    let theme = localStorage.getItem('theme');
    if (theme == "dark") {
        document.getElementsByTagName("body")[0].classList.add("darkTheme");
    }
}

function toggleTheme() {
    let theme = localStorage.getItem('theme');
    if (theme == "light" || theme == null) {
        dark();
    }
    else {
        light();
    }
}

function dark() {
    localStorage.setItem('theme', 'dark');
    document.getElementsByTagName("body")[0].classList.add("darkTheme");
}

function light() {
    localStorage.setItem('theme', 'light');
    document.getElementsByTagName("body")[0].classList.remove("darkTheme");
}

function clearFields(mode) {
    document.getElementById("text").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("text2").value = "";
    document.getElementById("result2").innerHTML = "";
    liveEncodeDecode(mode);
    if (first == 0) {
        themeSet();
        first++;
    }
}

function copy(mode) {
    var copyText = "";
    if (mode == 'e') {
        copyText = document.getElementById("result").innerHTML;
    }
    else {
        copyText = converter.base64Decode(document.getElementById("text2").value);
    }
    var tmp = document.createElement('input');
    document.body.appendChild(tmp);
    tmp.value = copyText;
    tmp.select();
    tmp.setSelectionRange(0, 99999);
    document.execCommand("copy", false);
    tmp.remove();
    M.toast({ html: 'Copied!', displayLength: 2000 })
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.getItem('theme') == null) {
        dark();
    }
});

window.addEventListener("load", function () { clearFields("e"); });
document.getElementById("live").addEventListener("click", function () { liveEncodeDecode("e"); });
document.getElementById("url").addEventListener("click", function () { urlEncodeDecode("e"); });
document.getElementById("encode").addEventListener("click", encode);
document.getElementById("encodeTab").addEventListener("click", function () { switchEncodeDecode(this, "e"); });
document.getElementById("decodeTab").addEventListener("click", function () { switchEncodeDecode(this, "d"); });