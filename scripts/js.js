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
let socialsLoadToken = 0;
let socialsRequest = null;

// Set initial hidden/blur state for home elements to prep entrance animation
function setHomeInitialState() {
    const $homePages = $('.homePages');
    const $homeTiles = $('.homePages .outlink-wrapper');
    const $tabs = $('.tab-buttons');
    const $wordmark = $('.head');
    gsap.set([$homePages, $homeTiles, $tabs, $wordmark], {
        opacity: 0,
        y: 10,
        scale: 0.97,
        filter: 'blur(6px)',
        clearProps: 'willChange'
    });
}

function initHomePage() {
    $('.gthHeader .subhead').text('home');
    clearInterval(musicRotationInterval);
    clearInterval(projectsRotationInterval);
    $('#socialList').empty().removeData('loaded').removeData('loading');
    $('.tab-buttons').empty();
    rotateMusicPreview();
    rotateProjectsPreview();
    return Promise.all([loadTabs(), loadSocials()]).then(() => {
        if (!isTouchDevice()) {
            initMagneticEffect();
        }

        // Set initial state IMMEDIATELY after tabs and content are loaded (no delay)
        setHomeInitialState();

        // Fallback: if socials or tabs didn't populate, try once more
        setTimeout(() => {
            const needsSocials = $('#socialList').children().length === 0;
            const needsTabs = $('.tab-buttons').children().length === 0;
            if (needsSocials || needsTabs) {
                $('#socialList').removeData('loaded').removeData('loading');
                Promise.all([
                    needsTabs ? loadTabs() : Promise.resolve(),
                    needsSocials ? loadSocials() : Promise.resolve()
                ]).then(() => {
                    if (!isTouchDevice()) {
                        initMagneticEffect();
                    }
                });
            }
        }, 800);
    });
}

$(window).on('load', function () {
    const isHomePage = $('main[data-barba-namespace="home"]').length > 0;
    const $container = $('[data-barba="container"]');

    if (isHomePage) {
        // Load and animate (setHomeInitialState is called after tabs are created)
        initHomePage().then(() => {
            requestAnimationFrame(() => {
                $container.addClass('loaded');
                animateHomeEnter();
            });
        });
    } else {
        loadTabs().then(() => {
            if (!isTouchDevice()) {
                initMagneticEffect();
            }
            $container.addClass('loaded');
        });
    }

    $(document).on('click', '.outlink', function (e) {
        // Skip portal animation for links that explicitly disable it (e.g., projects icon view)
        if ($(this).data('disable-portal')) {
            return;
        }

        e.preventDefault();
        e.stopImmediatePropagation();
        if (barba.transitions && barba.transitions.isRunning) {
            return;
        }

        const $tile = $(this);
        const href = $tile.attr('href');
        const $wrapper = $tile.closest('.outlink-wrapper');
        const $overlay = getPortalOverlay();
        const $sparkleLayer = $overlay.find('.portal-sparkles');
        const isHome = $('main[data-barba-namespace="home"]').length > 0;
        const $homeChrome = isHome ? $('.homePages, .tab-buttons, .head') : $();
        if (isHome) {
            $('body').addClass('portal-active-home');
            gsap.killTweensOf($homeChrome);
            gsap.set($homeChrome, {
                willChange: 'opacity, transform, filter',
                pointerEvents: 'none'
            });
            gsap.to($homeChrome, {
                duration: 0.18,
                opacity: 0,
                scale: 0.94,
                filter: 'blur(6px)',
                ease: 'power2.out'
            });
        }

        $('.subhead').text($tile.attr('title'));

        // Clone the tile (kept neutral; original stays visible)
        const $clone = $tile.clone().appendTo('body');
        $tile.css('opacity', 1);

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
            borderColor: "none",
            "pointer-events": "none",
            willChange: 'transform, opacity, filter'
        });

        const destinationX = (window.innerWidth / 2) - (rect.width / 2);
        const destinationY = (window.innerHeight / 2) - (rect.height / 2);

        $sparkleLayer.empty();

        const startAt = isHome ? 0.12 : 0;

        const tl = gsap.timeline({
            defaults: { ease: 'power2.out' },
            onComplete: () => {
                $('[data-barba="container"]').addClass('loaded');
                $overlay.hide().css('opacity', 0);
                $clone.remove();
                $('body').removeClass('portal-active-home');
                if (isHome) {
                    gsap.set($homeChrome, { clearProps: 'opacity,scale,filter,willChange,pointerEvents' });
                }
            }
        });

        tl.set($overlay, { display: 'block' }, startAt);
        tl.fromTo($overlay, { opacity: 0 }, { opacity: 1, duration: 0.2 }, startAt);
        tl.add(() => burstSparkles($sparkleLayer[0], rect), startAt);

        if (isHome) {
            const $voidTargets = $('.homePages .outlink-wrapper, .subTiles, .tab-buttons, .head').not($wrapper);
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            gsap.killTweensOf($voidTargets);
            gsap.set($voidTargets, { willChange: 'transform, opacity, filter' });
            tl.to($voidTargets, {
                duration: 0.45,
                opacity: 0,
                scale: 0.65,
                x: (_, el) => {
                    const r = el.getBoundingClientRect();
                    return cx - (r.left + r.width / 2);
                },
                y: (_, el) => {
                    const r = el.getBoundingClientRect();
                    return cy - (r.top + r.height / 2);
                },
                filter: 'blur(12px)',
                ease: 'power3.in',
                stagger: 0.03
            }, startAt + 0.02);
        }

        tl.add(() => {
            if (barba && typeof barba.go === 'function') {
                barba.go(href);
            } else {
                window.location.href = href;
            }
        }, startAt + 0.05);

        tl.to($overlay, { opacity: 0, duration: 0.35, ease: 'power1.inOut' }, 0.65);
        tl.to($clone, { opacity: 0, duration: 0.35, filter: 'blur(14px)' }, 0.65);
    });

    // Fade out current page before navigating home
    $(document).on('click', '.gthNav.home', function (e) {
        e.preventDefault();
        if (barba.transitions && barba.transitions.isRunning) {
            return;
        }
        const href = $(this).attr('href');
        const $container = $('[data-barba="container"]');
        const $header = $('.gthHeader');

        // Quick fade-out animation for both container and header
        const tl = gsap.timeline({
            onComplete: () => {
                barba.go(href);
            }
        });

        tl.to([$container, $header], {
            opacity: 0,
            filter: 'blur(6px)',
            scale: 0.98,
            duration: 0.25,
            ease: 'power2.in'
        });
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

    barba.hooks.beforeLeave((data) => {
        if (data.current.namespace === 'home') {
            clearInterval(musicRotationInterval);
            clearInterval(projectsRotationInterval);
            // Invalidate any in-flight socials load before leaving home
            socialsLoadToken++;
            if (socialsRequest && socialsRequest.abort) {
                socialsRequest.abort();
            }
        }
    });

    barba.hooks.afterEnter((data) => {
        // Run your page-specific JS here
        let namespace = data.next.namespace;
        const $nextContainer = $(data.next.container);

        if (namespace === "music") {
            // reinitialize music page scripts
            $('.gthHeader .subhead').text('my music');
            $.getScript('/scripts/music.js');
        }
        else if (namespace === 'futur3sn0w') {
            $('.gthHeader .subhead').text('my brand');
            $.getScript('/scripts/fs.js');
        }
        else if (namespace === 'about') {
            $('.gthHeader .subhead').text('about me');
        }
        else if (namespace === 'projects') {
            $('.gthHeader .subhead').text('my projects');
            $.getScript('/scripts/projects.js');
        }
        else if (namespace === 'home') {
            initHomePage().then(() => {
                requestAnimationFrame(() => {
                    $nextContainer.addClass('loaded');
                    animateHomeEnter();
                });
            });
            return;
        }

        // Non-home: mark loaded immediately
        $nextContainer.addClass('loaded');
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
    return new Promise((resolve) => {
        const socialList = $('#socialList');
        if (socialList.length === 0) {
            resolve();
            return;
        }

        // Skip if already populated or currently loading
        if (socialList.data('loading')) {
            resolve();
            return;
        }
        if (socialList.data('loaded') && socialList.children().length > 0) {
            resolve();
            return;
        }

        const token = ++socialsLoadToken;
        socialList.data('loading', true);
        socialsRequest = $.getJSON('/futur3sn0w/socials.json', function (data) {
            if (token !== socialsLoadToken) {
                return;
            }
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

                socialList.append($wrapper);
            });

            // Initialize magnetic effect for social tiles (desktop only)
            if (!isTouchDevice()) {
                initSocialTilesMagneticEffect();
            }
            socialList.data('loaded', true);
            resolve();
        }).fail(() => resolve())
            .always(() => {
                if (token === socialsLoadToken) {
                    socialList.data('loading', false);
                }
            });
    });
}

function loadTabs() {
    return new Promise((resolve) => {
        const tabButtons = $('.tab-buttons');
        if (tabButtons.length === 0) {
            resolve();
            return;
        }

        tabButtons.empty();
        const tabs = ['sites', 'socials'];
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
                        left: offset.left,
                        width: selected.outerWidth()
                    });
                },
                mouseover: () => {
                    const hovered = tabButtons.find('.tab-btn:hover');
                    const offsetH = hovered.position();
                    pill.css({
                        left: offsetH.left,
                        width: hovered.outerWidth()
                    });
                },
                mouseout: () => {
                    const selected = tabButtons.find('.tab-btn.selected');
                    const offsetH = selected.position();
                    pill.css({
                        left: offsetH.left,
                        width: selected.outerWidth()
                    });
                }
            }).appendTo(tabButtons);
        });
        const firstBtn = $('.tab-btn').first();
        firstBtn.addClass('selected');
        requestAnimationFrame(() => {
            const initial = tabButtons.find('.tab-btn.selected');
            if (initial.length) {
                pill.css({ left: initial.position().left, width: initial.outerWidth() });
            }
            resolve();
        });
    });
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

// Shared portal overlay for quicker, sparkly launches
function getPortalOverlay() {
    let $overlay = $('.portal-overlay');
    if ($overlay.length) return $overlay;

    $overlay = $('<div>', { class: 'portal-overlay', 'aria-hidden': 'true' });
    const $blobLayer = $('<div>', { class: 'portal-blobs' }).appendTo($overlay);
    const colors = ['#7af0ff', '#ff98f3', '#8d9dff'];

    colors.forEach(color => {
        $('<span>', { class: 'portal-blob' }).css('--blob-color', color).appendTo($blobLayer);
    });

    $('<div>', { class: 'portal-sparkles' }).appendTo($overlay);
    $('body').append($overlay);

    // Keep the blobs lazily drifting for a lava-lamp feel
    gsap.utils.toArray($blobLayer.find('.portal-blob')).forEach((blob, index) => {
        gsap.to(blob, {
            duration: gsap.utils.random(5, 7),
            x: 'random(-80, 80)',
            y: 'random(-60, 60)',
            scale: 'random(0.9, 1.2)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
        });
    });

    return $overlay;
}

function burstSparkles(layer, rect) {
    if (!layer || !rect) return;

    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const $layer = $(layer);

    for (let i = 0; i < 26; i++) {
        const size = gsap.utils.random(4, 10);
        const $sparkle = $('<span>', { class: 'sparkle' }).css({
            width: size,
            height: size,
            left: originX,
            top: originY
        }).appendTo($layer);

        gsap.fromTo($sparkle, {
            opacity: 1,
            scale: 0.3
        }, {
            duration: 0.65,
            opacity: 0,
            scale: 1.4,
            x: gsap.utils.random(-160, 160),
            y: gsap.utils.random(-120, 120),
            ease: 'power2.out',
            onComplete: () => $sparkle.remove()
        });
    }
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

// Home re-entry animation to avoid static re-render
function animateHomeEnter() {
    const $homePages = $('.homePages');
    const $homeTiles = $('.homePages .outlink-wrapper');
    const $tabs = $('.tab-buttons');
    const $wordmark = $('.head');

    gsap.killTweensOf([$homePages, $homeTiles, $tabs, $wordmark]);
    gsap.set([$homePages, $homeTiles, $tabs, $wordmark], { willChange: 'opacity, transform, filter' });

    requestAnimationFrame(() => {
        const tl = gsap.timeline();
        tl.fromTo($wordmark, { opacity: 0, y: -10, scale: 0.96, filter: 'blur(6px)' }, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'drop-shadow(-5px -5px 10px var(--root-back-alpha)) drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.2)) blur(0px) saturate(1.1) brightness(1.05)',
            duration: 0.3,
            ease: 'power2.out'
        });
        tl.fromTo($tabs, { opacity: 0, y: -6, scale: 0.96, filter: 'blur(6px)' }, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.25,
            ease: 'power2.out'
        }, '-=0.12');
        tl.fromTo($homePages, { opacity: 0, y: 0, scale: 1, filter: 'blur(6px)' }, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.3,
            ease: 'power2.out'
        }, '-=0.15');
        tl.fromTo($homeTiles, { opacity: 0, y: 12, scale: 0.96, filter: 'blur(6px)' }, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.35,
            ease: 'power2.out',
            stagger: 0.04
        }, '-=0.1').set([$homePages, $homeTiles, $tabs, $wordmark], { clearProps: 'willChange,transform' });
    });
}
