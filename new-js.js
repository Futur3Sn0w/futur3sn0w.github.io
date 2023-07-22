window.onload = function () {
    portraitLandscape();
    $('.slider').dragNscroll()
    $('.subTiles2').dragNscroll()

    // $('.metoken').tilt({
    //     glare: true,
    //     maxGlare: .5,
    //     maxTilt: 8
    // })

    floatLinks();
    autoSlider();

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        $('.subTiles').addClass('dark');
    }
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

function autoSlider() {
    var slider = $(".slider");
    var sliderChildren = slider.children();
    var si = 0;
    var refreshInMs = 10000;
    var intervalId = setInterval(function () {
        if (!slider.is(":hover") && !$('.projects-header').hasClass('shrink')) {
            sliderChildren[si].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            si++;
            if (si >= sliderChildren.length) {
                si = 0;
            }
        }
    }, refreshInMs);


    slider.hover(function () {
        clearInterval(intervalId);
    }, function () {
        intervalId = setInterval(function () {
            if (!slider.is(":hover") && !$('.projects-header').hasClass('shrink')) {
                sliderChildren[si].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
                si++;
                if (si >= sliderChildren.length) {
                    si = 0;
                }
            }
        }, refreshInMs);
    });
}

$('.slider').scroll(function () {
    // var scrollPercentage = 100 * $(this).scrollLeft() / ($(this).children().width() - $(this).width());
    function getHorizontalScrollPercent() {
        var h = document.getElementById('slider'),
            b = document.body,
            st = 'scrollLeft',
            sw = 'scrollWidth';
        return (h[st] || b[st]) / ((h[sw] || b[sw]) - h.clientWidth) * 100;
    }
    $('.bar').width(Math.round(getHorizontalScrollPercent()) + "%");

    var scrollX = $('.slider').scrollLeft();
    if (scrollX > 0) {
        $('.progress').addClass('scroll')
    } else {
        $('.progress').removeClass('scroll')
    }
});

// Dark mode stuff

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newColorScheme = event.matches ? "dark" : "light";

    // alert(newColorScheme);
    if (newColorScheme == 'dark') {
        $('.subTiles').addClass('dark');
    } else if (newColorScheme == 'light') {
        $('.subTiles').removeClass('dark');
    }
});

// Float 'recent updates' to top of row

function floatLinks() {
    $('.projectBox.ru').prependTo('#webProjects');
    $('#webProjects .pbIndex').prependTo('#webProjects');
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
    $('.projectHighlight .projType').text($(this).parent().children('.pbIndex').text().replace(' Show all', '').replace(' Collapse', ''));
    $('.projectHighlight .projTitle').attr('data-lastUpdate', $(this).children('.projDesc').attr('data-lastUpdate'));
    $('.projectHighlight .projImg').attr('src', $(this).children('.projImg').attr('src').replace('/projCovers/', '/projImgs/'));
})

// $(document).on('click', function (e) {
//     var element = $(".projectBox");
//     var element2 = $(".projectBox *");
//     var element3 = $(".projectHighlight");
//     var element4 = $(".projectHighlight *");

//     if (!element.is(e.target) && !element2.is(e.target) && !element3.is(e.target) && !element4.is(e.target)) {
//         $('.projectHighlight .close').click();
//         if ($('.projectBox').hasClass('selected')) {

//         } else {
//             setTimeout(() => {
//                 $('.subTiles2').addClass('ss').scrollLeft(0).removeClass('ss');
//             }, 1000);
//         }
//     }
// })

$('.projectHighlight .close').on('click', function () {
    $('.projectHighlight').removeClass('visible');
    $('.projectBox').removeClass('selected')
    $('.subTiles').removeClass('small');
    $('.projects-header').addClass('transition').removeClass('hide').removeClass('transition')
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
    var perc = (50 / 100) * $('body').height();
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
        $('.slider').addClass('ss').scrollLeft(0).removeClass('ss').addClass('freeze')
    } else {
        $('.subTiles').removeClass('hide');
        $('.slider').removeClass('freeze')
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
    $('.projects-header').addClass('transition').toggleClass('aboutme').removeClass('transition');
    $('.content').toggleClass('aboutme');
    $('.navBar').toggleClass('aboutme');
    $('.orbs').toggleClass('paused')

    if ($('.projects-header').hasClass('hide')) {
        $('.projectHighlight .close').click();
    }

    if ($('.content').hasClass('aboutme')) {
        VanillaTilt.init(document.querySelector(".projects-header"), {
            max: 10,
            speed: 200,
            glare: true,
            "max-glare": .35
        });
    } else {
        document.querySelector('.projects-header').vanillaTilt.destroy();
    }

    // $('.subTiles').addClass('hide');
    // $('.navBar.aboutme').on('click', function () {
    //     $('.subTiles').removeClass('hide');
    // })
})

// If row has overscroll, enable showall btn


// if ($('.subTiles2').scrollWidth() > $('.subTiles2').clientWidth()) {
$('.showallBtn').addClass('show')
// } else {
// $('.showallBtn').removeClass('show')
// }

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

