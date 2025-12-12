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
let projectsRotationInterval;

$(window).on('load', function () {
    loadTabs();

    // Initialize magnetic effect on tiles (desktop only)
    if (!isTouchDevice()) {
        initMagneticEffect();
    }

    $(document).on('click', '.outlink', function (e) {
        e.preventDefault();
        $('.subhead').text($(this).attr('title'));
        const $tile = $(this);
        const $wrapper = $tile.closest('.outlink-wrapper');

        // Clone the tile
        const $clone = $tile.clone().appendTo('body');
        $tile.css('opacity', 0);

        // Reset magnetic effect on wrapper during transition
        if ($wrapper.length) {
            $wrapper.css({
                '--mag-x': '0px',
                '--mag-y': '0px'
            });
        }
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

                // Hide project-specific elements
                gsap.to($clone.find('.project-icon-container, .infoLabels'), {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power1.out'
                });

                gsap.to($clone.find('> i'), {
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
        else if (namespace === 'projects') {
            $('.gthHeader .subHead').text('my projects');
            $.getScript('/scripts/projects.js');
        }
        else if (namespace === 'home') {
            $('.gthHeader .subHead').text('home');
            rotateMusicPreview();
            rotateProjectsPreview();
            loadSocials();
            loadTabs();
        }

        setTimeout(() => {
            if (!$('[data-barba="container"]').hasClass('loaded')) {
                $('[data-barba="container"]').addClass('loaded');
            }
        }, 1000);
    });

    // Delay adding 'loaded' class to allow orbs to fade in first
    // Wait for last orb to finish: 50ms initial + 800ms stagger + 1000ms animation = ~1850ms
    setTimeout(() => {
        $('body').addClass('loaded');
    }, 1700);

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
            });

            const $label = $('<p>', {
                class: 'tile-label',
                text: item.tileName
            });

            // Wrap tile and label in a wrapper for magnetic effect
            const $wrapper = $('<div>', { class: 'tile-wrapper' })
                .append($a, $label);

            $('#socialList').append($wrapper);
        });

        // Initialize magnetic effect for social tiles (desktop only)
        if (!isTouchDevice()) {
            initSocialTilesMagneticEffect();
        }
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
            $('.my-music .infoLabels .type').text(type);

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

                // $('.my-music .infoLabels .type').text(entry.title);
                $('.my-music .infoLabels .title').text(entry.title);
                $('.my-music .infoLabels .date').text(entry.lastUpdate);
                $musicImg.removeClass('tempHide');
            }, 200);

            currentIndex = (currentIndex + 1) % entries.length;
        }

        updateImage();
        musicRotationInterval = setInterval(updateImage, 10000);
    });
}

// Rotating preview for main page projects tile
function rotateProjectsPreview() {
    if (projectsRotationInterval) clearInterval(projectsRotationInterval);

    $.getJSON('projects/apps.json', function (data) {
        const apps = data.apps || [];
        if (apps.length === 0) return;

        let currentIndex = 0;
        const $projectIcon = $('.my-projects .project-icon-large');

        function updateProject() {
            const project = apps[currentIndex];

            $projectIcon.addClass('tempHide');

            setTimeout(() => {
                // Update icon (preserve project-icon-large class)
                $projectIcon.attr('class', 'project-icon-large ' + project.icon);

                // Update container background color
                $('.my-projects .project-icon-container').css('background-color', project.color);

                // Update info labels
                $('.my-projects .infoLabels .type').text(project.category);
                $('.my-projects .infoLabels .title').text(project.name);
                $('.my-projects .infoLabels .date').text(project.lastUpdate);

                $projectIcon.removeClass('tempHide');
            }, 200);

            currentIndex = (currentIndex + 1) % apps.length;
        }

        updateProject();
        projectsRotationInterval = setInterval(updateProject, 10000);
    });
}

// Detect if device has touch capability
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

// Magnetic hover effect for tiles
function initMagneticEffect() {
    const wrappers = document.querySelectorAll('.outlink-wrapper');

    wrappers.forEach(wrapper => {
        const strength = 12; // How much the tile moves (in pixels)
        const tile = wrapper.querySelector('.outlink:not(.app-card)');

        wrapper.addEventListener('mousemove', function (e) {
            const rect = tile.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate relative position from center
            const relX = e.clientX - centerX;
            const relY = e.clientY - centerY;

            // Calculate movement (proportional to distance from center)
            const moveX = (relX / rect.width) * strength;
            const moveY = (relY / rect.height) * strength;

            // Apply transform to wrapper
            wrapper.style.setProperty('--mag-x', `${moveX}px`);
            wrapper.style.setProperty('--mag-y', `${moveY}px`);
        });

        wrapper.addEventListener('mouseleave', function () {
            // Reset position when mouse leaves
            wrapper.style.setProperty('--mag-x', '0px');
            wrapper.style.setProperty('--mag-y', '0px');
        });
    });
}

// Magnetic hover effect for social tiles
function initSocialTilesMagneticEffect() {
    const wrappers = document.querySelectorAll('.tile-wrapper');

    wrappers.forEach(wrapper => {
        const strength = 12; // How much the tile moves (in pixels)
        const tile = wrapper.querySelector('.tile');

        if (!tile) return;

        wrapper.addEventListener('mousemove', function (e) {
            const rect = tile.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate relative position from center
            const relX = e.clientX - centerX;
            const relY = e.clientY - centerY;

            // Calculate movement (proportional to distance from center)
            const moveX = (relX / rect.width) * strength;
            const moveY = (relY / rect.height) * strength;

            // Apply transform to wrapper
            wrapper.style.setProperty('--mag-x', `${moveX}px`);
            wrapper.style.setProperty('--mag-y', `${moveY}px`);
        });

        wrapper.addEventListener('mouseleave', function () {
            // Reset position when mouse leaves
            wrapper.style.setProperty('--mag-x', '0px');
            wrapper.style.setProperty('--mag-y', '0px');
        });
    });
}