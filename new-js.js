window.onload = function () {
    scrollDot();
}

$('.content').scroll(function () {
    $('.selected').removeClass('selected');
    if (touch_detect()) {
    } else {
        $('.page').addClass('scrolling');
    }
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function () {
        scrollDot();
        $('.page').removeClass('scrolling');
    }, 250));
});

function touch_detect() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

function scrollDot() {
    var pagesNum = $('.page').length;
    var contentSize = $('.content').prop('scrollWidth');
    var pageSize = contentSize / pagesNum;

    var scroll = $('.content').scrollLeft();

    if (scroll == 0) {
        $('.dot-1').toggleClass('selected');
        localStorage.setItem('currentpage', '1');
    } else if (scroll == pageSize - 5) {
        $('.dot-2').toggleClass('selected');
        localStorage.setItem('currentpage', '2');
    } else if (scroll == pageSize * 2 - 10) {
        $('.dot-3').toggleClass('selected');
        localStorage.setItem('currentpage', '3');
    }
}