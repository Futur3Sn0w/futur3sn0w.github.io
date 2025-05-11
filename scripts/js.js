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

    // // If the user loaded a direct subpage, ensure the appropriate script is loaded manually
    // const path = window.location.pathname;
    // if (path.includes('/music')) {
    //     $.getScript('/scripts/music.js');
    // } else if (path.includes('/futur3sn0w')) {
    //     $.getScript('/scripts/fs.js');
    // }

    barba.init({
        transitions: [{
            name: 'crossfade',
            async leave(data) {
                // Start fading out the old container
                await gsap.to(data.current.container, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out"
                });
            },
            enter(data) {
                // Instantly set new container opacity to 0
                gsap.set(data.next.container, {
                    opacity: 0
                });

                // Then fade it in
                return gsap.to(data.next.container, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out"
                });
            },
            once(data) {
                // This is for the first page load
                gsap.set(data.next.container, {
                    opacity: 1
                });
            }
        }]
    });

    barba.hooks.afterEnter((data) => {
        // Run your page-specific JS here
        let namespace = data.next.namespace;

        if (namespace === "music") {
            // reinitialize music page scripts
            $.getScript('/scripts/music.js');
        }
        else if (namespace === 'futur3sn0w') {
            $.getScript('/scripts/fs.js');
        }
        else if (namespace === 'home') {
            rotateMusicPreview();

            $.getJSON('../futur3sn0w/socials.json', function (data) {
                data.forEach(function (item) {
                    const $a = $('<a>', {
                        href: item.href,
                        class: item.class,
                        'data-tileName': item.tileName,
                        html: $('<i>', { class: item.icon })
                    });
                    $('#socialList').append($a);
                });
            });
        }
    });

    $('body').addClass('loaded');

    $('.gthNav').on('click', function () {
        $('.subhead').text($(this).attr('title'));
    })

    $('.outlink').on('click', function () {
        $('.subhead').text($(this).attr('title'));
    })
})


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