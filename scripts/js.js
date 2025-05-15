// import { renderSquircle } from 'corner-smoothing';

$(function () {
    const isLocal =
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1" ||
        location.hostname === "::1" ||
        /^[0-9.]+$/.test(location.hostname); // IP like 192.168.x.x

    if (isLocal) {
        console.log("🛠 Running locally (development mode)");

        // $('a').each(function () {
        //     let href = $(this).attr('href');
        //     $(this).attr('href', '..' + href + '/index.html');
        // });

        // You can run local-only code here
    } else {
        console.log("🌐 Running publicly (live site)");
        console.log('Hey, thanks for visiting! ❤️')
        console.log('With love from Gavin (Futur3Sn0w)')
    }
});

let musicRotationInterval;

$(window).on('load', function () {
    loadTabs();

    $(document).on('click', '.outlink', function (e) {
        e.preventDefault();
        $('.subhead').text($(this).attr('title'));
        const $tile = $(this);

        // Clone the tile
        const $clone = $tile.clone().appendTo('body');
        $tile.css('opacity', 0);
        const rect = $tile[0].getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        $clone.css({
            position: 'absolute',
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
            width: rect.width,
            height: rect.height,
            overflow: "hidden",
            margin: 0,
            zIndex: 10000,
            transformOrigin: 'center center',
            perspective: '1000px',
            borderColor: "none",
            "pointer-events": "none"
        });

        // Animate the clone
        gsap.to($clone, {
            duration: 1,
            rotationY: 360,
            width: window.innerWidth,
            height: window.innerHeight,
            top: 0,
            left: 0,
            ease: 'power4.inOut',
            onStart: () => {
                // Animate internal element(s)
                gsap.to($clone.find('p'), {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power1.out'
                });

                gsap.to($clone.find('img'), {
                    opacity: 0,
                    filter: "blur(40px)",
                    duration: 0.5,
                    ease: 'power1.out'
                });

                gsap.to($clone.find('i'), {
                    opacity: 1,
                    fontSize: "100px",
                    color: "var(--root-text)",
                    paddingBottom: 0,
                    paddingLeft: 0,
                    duration: 0.75,
                    ease: 'none'
                });
            },
            onComplete: () => {
                setTimeout(() => {
                    gsap.to($clone, {
                        duration: 0.5,
                        opacity: 0,
                        onComplete: () => {
                            $('[data-barba="container"]').addClass('loaded');
                            setTimeout(() => {
                                $clone.remove();
                            }, 500);
                        }
                    });
                }, 1000);
            }
        });
    });

    // Fade-out animation for clicking .gthNav.home before navigation
    $(document).on('click', '.gthNav.home', function (e) {
        e.preventDefault();
        const href = $(this).attr('href');

        $('[data-barba="container"]').removeClass('loaded');

        setTimeout(() => {
            window.location.href = href;
        }, 500);
    });

    barba.init({
        transitions: [{
            name: 'app-launch',
            leave(data) {
                // Prevent default leave animation
                return Promise.resolve();
            },
            enter(data) {
                // Immediately fade in new container
                return gsap.fromTo(data.next.container, { opacity: 0 }, {
                    opacity: 1,
                    duration: 0.5
                });
            }
        }]
    });

    barba.hooks.afterEnter((data) => {
        // Run your page-specific JS here
        let namespace = data.next.namespace;

        if (namespace === "music") {
            // reinitialize music page scripts
            $('.gthHeader .subHead').text('my music');
            $.getScript('/scripts/music.js');
        }
        else if (namespace === 'futur3sn0w') {
            $('.gthHeader .subHead').text('my brand');
            $.getScript('/scripts/fs.js');
        }
        else if (namespace === 'about') {
            $('.gthHeader .subHead').text('about me');
        }
        else if (namespace === 'home') {
            $('.gthHeader .subHead').text('home');
            rotateMusicPreview();
            loadSocials();
            loadTabs();
        }

        setTimeout(() => {
            if (!$('[data-barba="container"]').hasClass('loaded')) {
                $('[data-barba="container"]').addClass('loaded');
            }
        }, 1000);
    });

    $('body').addClass('loaded');

    $(document).on('click', '.gthNav', function () {
        $('.subhead').text($(this).attr('title'));
    })
})

function loadSocials() {
    $.getJSON('../futur3sn0w/socials.json', function (data) {
        data.forEach(function (item) {
            const $a = $('<a>', {
                href: item.href,
                class: "tile " + item.class,
                'data-tileName': item.tileName,
                html: $('<i>', { class: item.icon })
            }).append($('<p>').text(item.tileName));
            $('#socialList').append($a);
        });
    });
}

function loadTabs() {
    if ($('.tab-btn').length === 0) {
        const tabs = ['sites', 'socials'];
        const tabButtons = $('.tab-buttons');
        const pill = $('<div>', { class: 'pill-highlight' }).appendTo(tabButtons);
        tabs.forEach(tab => {
            let thisButton = $('<button></button>', {
                html: `<p>${tab}</p>`,
                class: 'tab-btn button',
                for: tab,
                click: () => {
                    $('.tab-btn').not(thisButton).removeClass('selected');
                    thisButton.addClass('selected');

                    const selected = tabButtons.find('.tab-btn.selected');
                    const offset = selected.position();
                    pill.css({
                        left: offset.left
                    });
                },
                mouseover: () => {
                    const hovered = tabButtons.find('.tab-btn:hover');
                    const offsetH = hovered.position();
                    pill.css({
                        left: offsetH.left
                    });
                },
                mouseout: () => {
                    const selected = tabButtons.find('.tab-btn.selected');
                    const offsetH = selected.position();
                    pill.css({
                        left: offsetH.left
                    });
                }
            }).appendTo(tabButtons);
        });
        $('.tab-btn').first().addClass('selected');
    }
}


// Rotating preview for main page music image
function rotateMusicPreview() {
    if (musicRotationInterval) clearInterval(musicRotationInterval);

    $.getJSON('music/source.json', function (data) {
        const entries = [...(data.tracks || []), ...(data.mixes || []), ...(data.sets || [])];
        let currentIndex = 0;
        const $musicImg = $('.my-music img');

        function updateImage() {
            if (entries.length === 0) return;

            const entry = entries[currentIndex];
            let type = '';
            if ((data.tracks || []).some(e => e.id === entry.id)) {
                type = 'tracks';
            } else if ((data.mixes || []).some(e => e.id === entry.id)) {
                type = 'mixes';
            } else if ((data.sets || []).some(e => e.id === entry.id)) {
                type = 'sets';
            }
            $('.infoLabels .type').text(type);

            const imageUrl = `../img/albart/${entry.id}.${entry.format}`;
            $musicImg.addClass('tempHide');

            setTimeout(() => {
                if (imageUrl) {
                    $musicImg.attr('src', imageUrl);

                    // Load the image and get dominant color
                    const img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.src = imageUrl;
                    img.onload = function () {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                        let r = 0, g = 0, b = 0, count = 0;

                        for (let i = 0; i < imageData.length; i += 4 * 100) { // sample every 100th pixel
                            r += imageData[i];
                            g += imageData[i + 1];
                            b += imageData[i + 2];
                            count++;
                        }

                        r = Math.round(r / count);
                        g = Math.round(g / count);
                        b = Math.round(b / count);

                        const rgb = `rgb(${r}, ${g}, ${b})`;
                        $('.my-music').css('--dominant-color', rgb);
                    };
                }

                // $('.infoLabels .type').text(entry.title);
                $('.infoLabels .title').text(entry.title);
                $('.infoLabels .date').text(entry.lastUpdate);
                $musicImg.removeClass('tempHide');
            }, 200);

            currentIndex = (currentIndex + 1) % entries.length;
        }

        updateImage();
        musicRotationInterval = setInterval(updateImage, 10000);
    });
}