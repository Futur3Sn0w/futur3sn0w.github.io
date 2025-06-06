var container = $('.right.half');
var leftContainer = $('.left.half');
var currentPath = [];
var musicData = null;


$(document).on('click', (e) => {
    const viewer = $('.left.half.viewer');
    if (viewer.length && !viewer.is(e.target) && viewer.has(e.target).length === 0) {
        $('.music-entry').removeClass('selected');
    }
});


function renderEntries(entries) {
    container.addClass('tempHide')

    container.find('.entry-list').empty();
    const entryList = container.find('.entry-list');

    entries.forEach(entry => {
        var imageUrl = `../img/albart/${entry.id}.${entry.format}`;
        var imageFound = !!entry.format;

        var div = $('<div></div>', {
            class: 'music-entry',
            'data-description': entry.description
        });

        div.click(() => {
            leftContainer.addClass('tempHide');
            setTimeout(() => {
                leftContainer.empty();
                $('.music-entry').removeClass('selected');
                div.addClass('selected');
                let musicInfo = $('<div>').addClass('musicInfo');
                $('<h2></h2>', {
                    text: entry.title,
                    subtitle: entry.subtitle,
                    class: "title"
                }).appendTo(musicInfo);
                $('<p></p>', {
                    text: entry.description,
                    class: "desc"
                }).prepend($('<p></p>', {
                    text: entry.lastUpdate,
                    class: "date"
                })).appendTo(musicInfo);
                let displayImgContainer = $('<div>').addClass('displayImgContainer');
                let displayImg = $('<img>', { class: 'albImg displayImg' }).appendTo(displayImgContainer);
                let backImg = $('<img>', { class: 'albImg backImg' }).appendTo(leftContainer);

                $('<i>', {
                    class: 'fas fa-close closeBtn',
                    click: () => {
                        $('.music-entry').removeClass('selected');
                    }
                }).appendTo(leftContainer);
                if (imageUrl) {
                    displayImg.attr('src', imageUrl);
                    backImg.attr('src', imageUrl);

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

                        // const rgb = `rgb(${r}, ${g}, ${b})`;
                        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                        const contrastText = luminance > 0.5 ? 'black' : 'white';
                        $('.left.half').css('--dominant-color', `rgb(${r}, ${g}, ${b})`);
                        $('.left.half').css('--dominant-text', contrastText);
                    };
                }
                if (entry.embed) {
                    $('<div>', {
                        class: 'embedWrapper',
                        html: entry.embed
                    }).appendTo(displayImgContainer);
                }

                if (entry.tracks && Array.isArray(entry.tracks)) {
                    const trackList = $('<ol>', { class: 'track-list' });
                    entry.tracks.forEach((track, i) => {
                        const li = $('<li>', {
                            class: track.embed ? 'clickable' : 'disabled',
                            click: function () {
                                trackList.find('li').removeClass('selected');
                                displayImgContainer.find('.embedWrapper').remove();
                                if (!track.embed) return;
                                li.addClass('selected');
                                $('<div>', {
                                    class: 'embedWrapper',
                                    html: track.embed
                                }).appendTo(displayImgContainer);
                            }
                        }).append($(`<p>${track.title}</p>`));
                        trackList.append(li);
                    });
                    musicInfo.append(trackList);
                }

                if (entry.dataOpen) {
                    $('<button></button>', {
                        click: function () {
                            window.open(entry.dataOpen, "_blank");
                        },
                        text: 'Open',
                        class: 'button entry-btn'
                    }).appendTo(musicInfo);
                }

                displayImgContainer.appendTo(leftContainer)
                musicInfo.appendTo(leftContainer);
                leftContainer.removeClass('tempHide')
            }, 200);
        });

        if (imageFound) {
            $('<div>', {
                class: "albArt"
            }).append($('<img>', {
                src: imageUrl,
                alt: entry.title
            })).appendTo(div);
        }

        var prodInfo = $('<div>', {
            class: "prodInfo"
        }).appendTo(div);

        $('<span>', {
            class: "prodTitle",
            text: entry.title,
            subtitle: entry.subtitle
        }).appendTo(prodInfo);

        $('<span>', {
            class: "prodDate",
            text: entry.lastUpdate
        }).appendTo(prodInfo);

        $('<span>', {
            class: "prodDesc",
            text: entry.description
        }).appendTo(prodInfo);

        entryList.append(div);

        setTimeout(() => {
            div.addClass('show');
        }, 50 * entryList.find('.music-entry').length);
    });

    setTimeout(() => {
        container.removeClass('tempHide')
    }, 200);
}

function renderTree() {
    container.addClass('tempHide');

    setTimeout(() => {
        if ($('.filter-buttons').length === 0) {
            const filters = ['all', 'personal', 'mixes', 'sets'];
            const filterWrapper = $('<div>').addClass('filter-buttons').appendTo(container);
            const pill = $('<div>', { class: 'pill-highlight' }).appendTo(filterWrapper);
            filters.forEach(filter => {
                let thisButton = $('<button></button>', {
                    html: `<p>${filter.charAt(0).toUpperCase() + filter.slice(1)}</p>`,
                    class: 'tree-btn',
                    click: () => {
                        $('.tree-btn').removeClass('selected');
                        thisButton.addClass('selected');
                        currentPath = filter === 'all' ? [] : [filter];
                        renderTree();

                        const selected = filterWrapper.find('.tree-btn.selected');
                        const offset = selected.position();
                        pill.css({
                            left: offset.left
                        });
                    },
                    mouseover: () => {
                        const hovered = filterWrapper.find('.tree-btn:hover');
                        const offsetH = hovered.position();
                        pill.css({
                            left: offsetH.left
                        });
                    },
                    mouseout: () => {
                        const selected = filterWrapper.find('.tree-btn.selected');
                        const offsetH = selected.position();
                        pill.css({
                            left: offsetH.left
                        });
                    }
                }).appendTo(filterWrapper);
            });

            $('<div>').addClass('entry-list').appendTo(container);
        }

        if (!$('.tree-btn').hasClass('selected')) {
            $('.tree-btn').first().addClass('selected');
        }

        const entryList = container.find('.entry-list');
        entryList.empty();

        let allEntries = [];
        if (musicData) {
            if (currentPath.length === 0 || currentPath[0] === 'all') {
                allEntries = [...(musicData.personal || []), ...(musicData.mixes || []), ...(musicData.sets || [])];
            } else {
                allEntries = [...(musicData[currentPath[0]] || [])];
            }

            const monthToIndex = {
                January: 0, February: 1, March: 2, April: 3,
                May: 4, June: 5, July: 6, August: 7,
                September: 8, October: 9, November: 10, December: 11
            };

            allEntries.sort((a, b) => {
                const [monthA, yearA] = a.lastUpdate.split(' ');
                const [monthB, yearB] = b.lastUpdate.split(' ');
                const dateA = new Date(parseInt(yearA), monthToIndex[monthA]);
                const dateB = new Date(parseInt(yearB), monthToIndex[monthB]);
                return dateB - dateA;
            });
        }

        renderEntries(allEntries);

        container.removeClass('tempHide');
    }, 200);
}

$.getJSON('../music/source.json', function (data) {
    musicData = data;
    renderTree();
});