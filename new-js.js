window.onload = function () {
    portraitLandscape();
    // $('input.linkToggle').click();
    $(function () {
        $('.subTiles2').dragNscroll()
    });

    // setInterval(() => {
    //     $('.mtImg').toggleClass('v')
    // }, 5000);

    $('.metoken').tilt({
        glare: true,
        maxGlare: .5,
        maxTilt: 8
    })
}

$(window).resize(function () {
    portraitLandscape();
})

function portraitLandscape() {
    var width = $('body').width();
    var height = $('body').height();
    if (height > width) {
        // alert('portrait')
        $('body').addClass('portrait');
    } else if (height < width) {
        // alert('landscape')
        $('body').removeClass('portrait');
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

// ProjectBox action 

$('.projectBox').on('click', function () {
    $('.projectBox').removeClass('selected');
    $(this).addClass('selected');
    $('.projectHighlight').addClass('visible');
    $('.projects-header').addClass('transition').addClass('hide').removeClass('transition')

    if ($(this).parent().attr('id') !== 'webProjects') {
        $('.project-code').hide();
    } else {
        $('.project-code').show();
    }

    if ($(this).parent().attr('id') == 'musicProjects') {
        $('.project-open i').removeClass('fa-up-right-from-square').addClass('fa-play')
    } else {
        $('.project-open i').addClass('fa-up-right-from-square').removeClass('fa-play')
    }

    if ($(this).attr('data-open') == undefined) {
        $('.project-open').hide();
    } else {
        $('.project-open').show();
    }

    $('.project-open').attr('data-open', $(this).attr('data-open'));
    $('.project-code').attr('data-open', $(this).attr('data-open'));
    $('.projectHighlight .projTitle').text($(this).children('.projTitle').text());
    $('.projectHighlight .projDesc').text($(this).children('.projDesc').text());
    $('.projectHighlight .projType').text($(this).parent().children('.pbIndex').text().replace(' Show all', ''));
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
        if ($('.projectBox').hasClass('selected')) {

        } else {
            setTimeout(() => {
                $('.subTiles2').addClass('ss').scrollLeft(0).removeClass('ss');
            }, 1000);
        }
    }
})

$('.projectHighlight .close').on('click', function () {
    $('.projectHighlight').removeClass('visible');
    $('.projectBox').removeClass('selected')
    $('.subTiles').removeClass('small');
    $('.projects-header').removeClass('hide')
})

$('.project-open').on('click', function () {
    var name = $(this).attr('data-open');
    if (name.startsWith('http')) {
        // alert('yes')
        window.open(name);
    } else {
        // alert('no')
        window.open('https://futur3sn0w.me/' + name);
    }
})

$('.project-code').on('click', function () {
    var name = $(this).attr('data-open');
    window.open('https://github.com/futur3sn0w/' + name);
})

$('.content').on('scroll', function () {
    $('.projects-header').addClass('transition');

    var $header = $('.projects-header');
    var scrollY = $('.content').scrollTop();
    var perc = (40 / 100) * $('body').height();
    $header.height(perc - scrollY)
    if (scrollY > 100) {
        $('.orbs').addClass('paused')
        $header.addClass('shrink');
        $('.projectHighlight').addClass('shrink');
        $('.ph-slide').attr('subtext', "Click a project for more info")
    } else {
        $('.orbs').removeClass('paused')
        $header.removeClass('shrink');
        $('.projectHighlight').removeClass('shrink');
        $('.ph-slide').attr('subtext', "Scroll to view my work")
    }

    if (scrollY > 0) {
        $('.subTiles').addClass('hide');
    } else {
        $('.subTiles').removeClass('hide');
    }
});

$('.subTiles2').on('scroll', function () {
    // var $header = $('.projects-header');
    var scrollLeft = this.scrollLeft;
    var scrollX = this.scrollLeft / (this.scrollWidth - this.clientWidth);
    var percentX = scrollX * -1 + 1;
    $(this).children('.pbIndex').css('opacity', percentX)
    if (scrollLeft > 170) {
        $(this).children('.pbIndex').addClass('hide');
    } else {
        $(this).children('.pbIndex').removeClass('hide');
    }
});

$('.subTiles2').on('mouseleave', function () {
    if (!$('.projectBox').hasClass('selected')) {
        setTimeout(() => {
            $(this).addClass('ss').scrollLeft(0).removeClass('ss');
        }, 1000);
    }
})

// Aboutme

$('.navBar').on('click', function () {
    $('.content').scrollTop(0)
    $('.aboutinfo').toggleClass('aboutme');
    $('.projects-header').toggleClass('aboutme');
    $('.content').toggleClass('aboutme');
    $('.navBar').toggleClass('aboutme');
    $('.orbs').toggleClass('paused')

    // $('.subTiles').addClass('hide');
    // $('.navBar.aboutme').on('click', function () {
    //     $('.subTiles').removeClass('hide');
    // })
})

// If row has overscroll, enable showall btn

// $(document).on('load', function () {
//     if ($('.subTiles2').scrollWidth > $('.subTiles2').clientWidth) {
//         $('.showallBtn').addClass('show')
//     } else {
//         $('.showallBtn').removeClass('show')
//     }
// })

$('.showallBtn').on('click', function () {
    if ($(this).parent().parent().hasClass('showall')) {
        $(this).parent().parent().toggleClass('showall')
    } else {
        $('.showall').removeClass('showall')
        $(this).parent().parent().toggleClass('showall')
    }

    if ($(this).text() == 'Show all') {
        $(this).text('Collapse')
    } else {
        $(this).text('Show all')
    }
})