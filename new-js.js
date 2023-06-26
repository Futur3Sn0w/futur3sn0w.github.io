window.onload = function () {
    portraitLandscape();
    // $('input.linkToggle').click();
}

$(window).resize(function () {
    portraitLandscape();
})

function portraitLandscape() {
    var width = $('body').width();
    var height = $('body').height();
    if (height > width) {
        // alert('portrait')
        $('.navBar').addClass('portrait');
        $('.content').addClass('portrait');
        $('.background').addClass('portrait');
        $('.splitPage').addClass('portrait');
        $('.headsup').addClass('portrait');
    } else if (height < width) {
        // alert('landscape')
        $('.navBar').removeClass('portrait');
        $('.content').removeClass('portrait');
        $('.background').removeClass('portrait');
        $('.splitPage').removeClass('portrait');
        $('.headsup').removeClass('portrait');
    }
}

// Toggle links

$('.linkToggle').on('change', function () {
    // alert('pp');
    if (!$('input.linkToggle').is(':checked')) {
        $('a').each(function () {
            $(this).attr('data-href2', $(this).attr('href'));
            $(this).attr('href', "#");
        });
        $('.projectBox').on('click', function () {

        })
    } else if ($('input.linkToggle').is(':checked')) {
        $('a').each(function () {
            $(this).attr('href', $(this).attr('data-href2'));
        });
        $('.projectBox').on('click', function () {
            // var name = $(this).attr('data-open');
            // window.open('https://futur3sn0w.me/' + name);
        })
    }
})

// Close headsup

$('#hu-close').on('click', function () {
    localStorage.setItem('headsup', '0');
    $('.headsup').hide();
});

// ProjectBox action 

$('.projectBox').on('click', function () {
    $('.navBar').addClass('stretch');
    $('.projectBox').removeClass('selected');
    $(this).addClass('selected');
    $('.projectHighlight').addClass('visible');
    $('.subTiles').addClass('small');
    $('.projects-header').addClass('hide')
    $('.project-open').attr('data-open', $(this).attr('data-open'));
    $('.project-code').attr('data-open', $(this).attr('data-open'));
    $('.projectHighlight .projTitle').text($(this).children('.projTitle').text());
    $('.projectHighlight .projDesc').text($(this).children('.projDesc').text());
    $('.projectHighlight .projTitle').attr('data-lastUpdate', $(this).children('.projDesc').attr('data-lastUpdate'));
    $('.projectHighlight .projImg').attr('src', $(this).children('.projImg').attr('src'));
})

$(document).on('click', function (e) {
    var element = $(".projectBox");
    var element2 = $(".projectBox *");
    var element3 = $(".projectHighlight");
    var element4 = $(".projectHighlight *");
    if (!element.is(e.target) && !element2.is(e.target) && !element3.is(e.target) && !element4.is(e.target)) {
        $('.projectHighlight .close').click();
    }
})

$('.projectHighlight .close').on('click', function () {
    $('.navBar').removeClass('stretch');
    $('.projectHighlight').removeClass('visible');
    $('.projectBox').removeClass('selected')
    $('.subTiles').removeClass('small');
    $('.projects-header').removeClass('hide')
})

$('.project-open').on('click', function () {
    var name = $(this).attr('data-open');
    window.open('https://futur3sn0w.me/' + name);
})

$('.project-code').on('click', function () {
    var name = $(this).attr('data-open');
    window.open('https://github.com/futur3sn0w/' + name);
})

setInterval(() => {
    $('.ph-slide.slide1').toggleClass('hide');
    $('.ph-slide.slide2').toggleClass('hide');
}, 5000);