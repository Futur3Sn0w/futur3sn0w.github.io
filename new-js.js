window.onload = function () {
    portraitLandscape();

    $.getJSON('projects.json', function (data) {
        function createProjectBox(project, projectType) {
            return $('<div class="projectBox"></div>')
                .attr('id', project.id)
                .attr('data-open', project.dataOpen || '')
                .attr('data-type', projectType) // Add project type as a data attribute
                .append(
                    $('<div class="projImg"></div>')
                        .append($('<img>').attr('src', `imgs/${project.imageSrc}`).attr('alt', project.title)),
                    $('<div class="projTitle"></div>').text(project.title),
                    $('<div class="projDesc"></div>').text(project.description).attr('data-lastUpdate', project.lastUpdate || '')
                )
                .on('click', function () {
                    $('.projectBox').removeClass('selected');
                    $(this).addClass('selected')
                    createProjectView(project, projectType);  // Pass projectType to the function
                });
        }

        function createProjectView(project, projectType) {
            // Check if projView already exists
            var projView = $('.projVisor');

            // Clear existing projElem items in the projView
            $('.projVisor').addClass('temphide');
            setTimeout(() => {
                $('.projElem').remove();

                // Create actions for the project, conditional on projectType
                var actionsDiv = $('<div class="actions projElem"></div>');

                // If projectType is not 'Bounce', add the source button
                if (projectType !== 'Bounce') {
                    actionsDiv.append(
                        $('<div class="projAction project-code" data-label="Source"></div>')
                            .append($('<i class="fa-brands fa-github"></i>'))
                            .on('click', function () {
                                window.open('https://github.com/futur3sn0w/' + project.dataOpen);
                            })
                    );
                }

                // Create the open/play button with different icon for 'Bounce'
                var openButtonIconClass = projectType === 'Bounce' ? 'fa-solid fa-play' : 'fa-solid fa-up-right-from-square';
                var openButtonLabel = projectType === 'Bounce' ? 'Play' : 'Open';

                var openButton = $('<div class="projAction project-open"></div>')
                    .append($('<i>').addClass(openButtonIconClass))  // Use correct icon class
                    .on('click', function () {
                        if (project.dataOpen.startsWith('http')) {
                            window.open(project.dataOpen);
                        } else {
                            window.open('https://futur3sn0w.github.io/' + project.dataOpen);
                        }
                    })
                    .attr('data-label', openButtonLabel);  // Set the button text

                actionsDiv.append(openButton);

                // Modify imageSrc if projectType is 'Cloud'
                var imageSrc = project.imageSrc;
                if (projectType === 'Cloud') {
                    imageSrc = imageSrc.replace('projCovers', 'projImgs');
                }

                var tileIcn = $(`<div class="backIcn"></div>`);
                tileIcn.addClass($('.sectionBtn.selected i').attr('class'))
                // Add new content to the projView
                projView.append(
                    $('<img>', {
                        src: `imgs/${imageSrc}`,  // Use the modified imageSrc
                        alt: project.title,
                        class: 'projImg projElem'
                    }),
                    $('<div class="projInfo projElem"></div>').append(
                        $('<div class="projTitle projElem"></div>').text(project.title).attr('data-lastUpdate', project.lastUpdate || ''),
                        $('<div class="projDesc projElem"></div>').text(project.description),
                        $('<div class="projIndex pbIndex"></div>').html($('.pbIndex').html()),
                        actionsDiv, // Add the actions div with either "Source" and "Open", or just "Play"
                        tileIcn
                    )
                );

                // Make sure the projView is shown
                $('.projects-header').addClass('hide');
                setTimeout(() => {
                    $('.projVisor').removeClass('temphide');
                }, 50);
            }, 150);
        }

        function displaySection(index) {
            $('.subTileRows').addClass('temphide');
            setTimeout(() => {

                var section = data[index];
                var tileRow = $('<div class="tileRow"></div>').attr('id', section.id);
                var pbIndex = $('<div class="pbIndex"></div>')
                    .append($('<div class="projTitle"></div>')
                        .attr('subTitle', section.subtitle)
                        .attr('title', section.name)
                        .append(`<div class='sep'></div>`));

                // tileRow.append(tileIcn);

                $('.subTileRows').children('.pbIndex').remove();
                $('.subTileRows').append(pbIndex);

                $.each(section.projects, function (i, project) {
                    if (project.id && project.title && project.description) {
                        tileRow.append(createProjectBox(project, section.name)); // Pass the section name as the project type
                    }
                });

                $('.subTileRows').children('.tileRow').remove();
                $('.subTileRows').append(tileRow);
                setTimeout(() => {
                    $('.subTileRows').removeClass('temphide')
                }, 50);
            }, 200);
        }

        $.each(data, function (index, section) {
            var sectionDivBtn = $('<div class="sectionBtn"></div>')
                .attr('data-btnTitle', section.name)  // Add the 'data-btnTitle' attribute with the section name
                .append(
                    $('<i></i>') // Create the 'i' element
                        .addClass('fa-solid') // Add 'fa-solid' class
                        .addClass(section.iconClass) // Add the class from the 'iconClass' field in JSON
                );

            sectionDivBtn.on('click', function () {
                $('.sectionBtn').removeClass('selected');

                $(this).addClass('selected');
                displaySection(index);

                if ($('.projElem').length > 0) {
                    $('.projVisor').addClass('temphide');
                    setTimeout(() => {
                        $('.projElem').remove();
                        setTimeout(() => {
                            $('.projVisor').removeClass('temphide');
                        }, 50);
                    }, 150);
                }
            });

            $('.sectionController').append(sectionDivBtn);
        });


        $('.sectionBtn').first().click();  // Set the first button as selected by default
    }).fail(function () {
        console.error("Error loading projects.json");
    });

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

$('.content').on('scroll', function () {
    var scrollY = $('.content').scrollTop()

    if (scrollY > 200) {
        $('.subTiles').addClass('hide');
        $('.bga').css('animation-play-state', 'paused');

        $('.projects-header').addClass('showProject');
    } else {
        $('.subTiles').removeClass('hide');
        $('.bga').css('animation-play-state', 'running');


        $('.projVisor').addClass('temphide');
        setTimeout(() => {
            $('.projElem').remove();
            $('.projectBox').removeClass('selected');
            $('.projects-header').removeClass('showProject');
            setTimeout(() => {
                $('.projVisor').removeClass('temphide');
            }, 50);
        }, 150);
    }
});

// Aboutme

$('.navBar').on('click', function () {
    $('.content').scrollTop(0)
    $('.projects-header').toggleClass('aboutme');
    $('.content').toggleClass('aboutme');
    $('.navBar').toggleClass('aboutme');
})