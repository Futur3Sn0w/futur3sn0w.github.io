window.onload = function () {
    portraitLandscape();
}

$(window).resize(function () {
    portraitLandscape();
})

$(document).ready(function () {
    slickStuff();
    setSpecs();
})

function portraitLandscape() {
    var width = $('body').width();
    var height = $('body').height();
    if (height > width) {
        // alert('portrait')
        $('.navBar').addClass('portrait');
        $('.content').addClass('portrait');
        $('.splitPage').addClass('portrait');
    } else if (height < width) {
        // alert('landscape')
        $('.navBar').removeClass('portrait');
        $('.content').removeClass('portrait');
        $('.splitPage').removeClass('portrait');
    }
}

$('.content').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    setSpecs();
});

function setSpecs() {
    var page = $('.content').slick('slickCurrentSlide');
    $('.pagePill').css('background-color', 'var(--page' + page + ")");
    $('body').css('background-color', "var(--page" + $('.content').slick('slickCurrentSlide') + ")");

    if (page == 0) {
        $('#pageIcon').prop('class', "fa-solid fa-house");
        $('.bg').show();
    } else if (page == 1) {
        $('#pageIcon').prop('class', "fa-solid fa-globe");
        $('.bg').show();
    } else if (page == 2) {
        $('#pageIcon').prop('class', "fa-solid fa-compact-disc");
        $('.bg').show();
    } else if (page == 3) {
        $('#pageIcon').prop('class', "fa-solid fa-users");
        $('.bg').show();
    } else if (page == 4) {
        $('#pageIcon').prop('class', "fa-solid fa-download");
        $('.bg').hide();
    }
}

// Slicc

function slickStuff() {
    $('.content').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 5,
        // dots: true,
        arrows: false,
        // swipeToSlide: true,
        speed: 400,
        cssEase: 'ease',
        fade: true,
        autoplaySpeed: 6000
    });
    // $('.slick-dots').appendTo('.navBar');
    // $('.slick-arrow').appendTo('.directns').addClass('navBtn').text('');
    // $('.slick-next').prepend('<i class="fa-solid fa-chevron-right"></i>');
    // $('.slick-prev').prepend('<i class="fa-solid fa-chevron-left"></i>');
}

$('.pb').click(function (e) {
    // alert();
    $('.content').slick('slickGoTo', $(this).attr('data-slickpageid'));
    $('.pbs').removeClass('pbs')
    $(this).addClass('pbs');
    $('.bap').css('background-color', $('.pbs').css('background-color'));
})

// Hover glow

// $('.socials').on('mouseover', function (e) {
//     $('.hoverGlow').removeClass('hidden');
//     $(document).on('mousemove', function (e) {
//         $('.hoverGlow').css({
//             left: e.pageX,
//             top: e.pageY
//         })
//     })
// })

// $('.socials').on('mouseout', function (e) {
//     $('.hoverGlow').addClass('hidden');
// })

// Toggle links

$('input.linkToggle').on('change', function () {
    // alert('pp');
    if (!$('input.linkToggle').is(':checked')) {
        $('a').each(function () {
            $(this).attr('data-href2', $(this).attr('href'));
            $(this).attr('href', "#");
        });
    } else if ($('input.linkToggle').is(':checked')) {
        $('a').each(function () {
            $(this).attr('href', $(this).attr('data-href2'));
        });
    }
})