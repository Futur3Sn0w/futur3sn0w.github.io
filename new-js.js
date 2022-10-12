window.onload = function () {
    var width = $('body').width();
    var height = $('body').height();

    if (height > width) {
        // alert('portrait')
        $('.navBar').addClass('portrait');
        $('.navBar').removeClass('landscape');
        $('.content').addClass('portrait');
        $('.content').removeClass('landscape');
    } else if (height < width) {
        // alert('landscape')
        $('.navBar').addClass('landscape');
        $('.navBar').removeClass('portrait');
        $('.content').addClass('landscape');
        $('.content').removeClass('portrait');
    }
}

function setPageIcon() {
    var page = $('.content').slick('slickCurrentSlide');

    if (page == 0) {
        $('#pageIcon').prop('class', "fa-solid fa-house");
    } else if (page == 1) {
        $('#pageIcon').prop('class', "fa-brands fa-twitter");
    } else if (page == 2) {
        $('#pageIcon').prop('class', "fa-solid fa-box");
    } else if (page == 3) {
        $('#pageIcon').prop('class', "fa-solid fa-users");
    } else if (page == 4) {
        $('#pageIcon').prop('class', "fa-solid fa-download");
    }

}

$('.content').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    setPageIcon();
});

$('.fs').click(function () {
    $('.page').toggleClass('fs');
    $('.content').toggleClass('fs');
    $('.fs i').toggleClass('fa-expand');
    $('.fs i').toggleClass('fa-compress');
    $('.pageNav').toggle();
});

// Slicc

$(document).ready(function () {
    $('.content').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 5,
        dots: true,
        draggable: false,
        swipeToSlide: true,
        speed: 400,
        cssEase: 'ease',
        // autoplay: true,
        autoplaySpeed: 6000
    });
    slickStuff();
})

function slickStuff() {
    $('.slick-arrow').appendTo('.navBar').addClass('navBtn').text('');
    $('.slick-next').prepend('<i class="fa-solid fa-chevron-right"></i>');
    $('.slick-prev').prepend('<i class="fa-solid fa-chevron-left"></i>');
}