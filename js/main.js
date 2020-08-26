//Variable used to change the eventListeners for the encode button and the "live" toggle
var eventEncode = true;

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
            truncate: 40,
            // characters will be taken out of the middle
            endTruncation: true
        },
    });
}

function liveEncodeDecode(mode) {
    if (mode == "e") {
        if (document.getElementById("live").checked == true) {
            document.getElementById("text").addEventListener("keyup", encode);
        }
        else {
            document.getElementById("text").removeEventListener("keyup", encode);
        }
    }
    else {
        if (document.getElementById("live").checked == true) {
            document.getElementById("text2").addEventListener("keyup", decode);
        }
        else {
            document.getElementById("text2").removeEventListener("keyup", decode);
        }
    }
}

function switchEncodeDecode(clicked, mode) {
    clearFields();
    var classString = clicked.children[0].className;
    if (classString != "active") {
        var newClass = classString.concat("active");
        clicked.children[0].className = newClass;
    }
    if (mode == "e") {
        document.getElementById("decodeTab").children[0].className = "";
        document.getElementById("live").addEventListener("click", function () { liveEncodeDecode("e"); });
        document.getElementById("encode").addEventListener("click", encode);
        document.getElementById("encode").innerHTML = "encode";
        document.getElementsByClassName("switch")[0].children[0].innerHTML = "Live encode";
        document.getElementById("live").checked = false;
        document.getElementById("decodeDiv").style.display = "none";
        document.getElementById("encodeDiv").style.display = "block";
        if (!eventEncode) {
            document.getElementById("live").removeEventListener("click", function () { liveEncodeDecode("d"); });
            document.getElementById("encode").removeEventListener("click", decode);
            document.getElementById("live").addEventListener("click", function () { liveEncodeDecode("e"); });
            document.getElementById("encode").addEventListener("click", encode);
            eventEncode = true;
        }
    }
    else {
        document.getElementById("encodeTab").children[0].className = "";
        document.getElementById("live").addEventListener("click", function () { liveEncodeDecode("d"); });
        document.getElementById("encode").addEventListener("click", decode);
        document.getElementById("encode").innerHTML = "decode";
        document.getElementsByClassName("switch")[0].children[0].innerHTML = "Live decode";
        document.getElementById("live").checked = false;
        document.getElementById("encodeDiv").style.display = "none";
        document.getElementById("decodeDiv").style.display = "block";
        if (eventEncode) {
            document.getElementById("live").removeEventListener("click", function () { liveEncodeDecode("e"); });
            document.getElementById("encode").removeEventListener("click", encode);
            document.getElementById("live").addEventListener("click", function () { liveEncodeDecode("d"); });
            document.getElementById("encode").addEventListener("click", decode);
            eventEncode = false;
        }
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
        localStorage.setItem('theme', 'dark');
        document.getElementsByTagName("body")[0].classList.add("darkTheme");
    }
    else {
        localStorage.setItem('theme', 'light');
        document.getElementsByTagName("body")[0].classList.remove("darkTheme");
    }
}

function clearFields() {
    document.getElementById("text").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("text2").value = "";
    document.getElementById("result2").innerHTML = "";
    document.getElementById("live").checked = false;
    liveEncodeDecode("e");
    themeSet();
}

function copy(mode) {
    if (mode == 'e') {
        navigator.clipboard.writeText(document.getElementById("result").innerHTML)
            .then(() => {
                M.toast({ html: 'Copied!', displayLength: 2000 })
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
    }
    else {
        navigator.clipboard.writeText(converter.base64Decode(document.getElementById("text2").value))
            .then(() => {
                M.toast({ html: 'Copied!', displayLength: 2000 })
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
    }
}


document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

window.addEventListener("load", clearFields);
document.getElementById("live").addEventListener("click", function () { liveEncodeDecode("e"); });
document.getElementById("encode").addEventListener("click", encode);
document.getElementById("encodeTab").addEventListener("click", function () { switchEncodeDecode(this, "e"); });
document.getElementById("decodeTab").addEventListener("click", function () { switchEncodeDecode(this, "d"); });