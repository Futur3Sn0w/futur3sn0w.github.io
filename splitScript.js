var width = document.body.clientWidth;
var height = document.body.clientHeight;

if (width > height) {
    // landscape
    $('.split').width = "50%";
    $('.split').height = "100%";
} else if (width < height) {
    // portrait
    document.body.style.flexDirection = "column";
} else {
    // else
}