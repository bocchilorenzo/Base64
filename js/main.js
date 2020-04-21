//Variable used to change the eventListeners for the encode button and the "live" toggle
var eventEncode = true;

function encode() {
    var str = document.getElementById("text").value;
    document.getElementById("result").value = btoaUTF8(str, autoBOMit = false);
}

function decode() {
    var str = document.getElementById("text2").value;
    document.getElementById("result2").value = atobUTF8(str, keepBOM = false);
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

function clearFields() {
    document.getElementById("text").value = "";
    document.getElementById("result").value = "";
    document.getElementById("text2").value = "";
    document.getElementById("result2").value = "";
    document.getElementById("live").checked = false;
    liveEncodeDecode("e");
}

window.addEventListener("load", clearFields);
document.getElementById("live").addEventListener("click", function () { liveEncodeDecode("e"); });
document.getElementById("encode").addEventListener("click", encode);
document.getElementById("encodeTab").addEventListener("click", function () { switchEncodeDecode(this, "e"); });
document.getElementById("decodeTab").addEventListener("click", function () { switchEncodeDecode(this, "d"); });