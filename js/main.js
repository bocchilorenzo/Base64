function encode() {
    var str = document.getElementById("text").value;
    document.getElementById("result").value = Base64.encode(str);
}

function decode() {
    var str = document.getElementById("text").value;
    document.getElementById("result").value = Base64.decode(str);
}

function liveEncodeDecode() {
    if (document.getElementById("live").checked == true) {
        document.getElementById("text").addEventListener("input", encode);
    }
    else {
        document.getElementById("text").removeEventListener("input", encode);
    }
}

document.getElementById("live").addEventListener("click", liveEncodeDecode);
document.getElementById("encode").addEventListener("click", encode);