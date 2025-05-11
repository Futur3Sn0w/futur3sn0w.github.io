$.getJSON('../futur3sn0w/projects.json', function (data) {
    $('.back-btn').addClass('hide');
    function createProjectBox(project, projectType) {
        return $('<div class="projectBox"></div>')
            .attr('id', project.id)
            .attr('data-open', project.dataOpen || '')
            .attr('data-type', projectType) // Add project type as a data attribute
            .append(
                $('<div class="projImg"></div>')
                    .append($('<img>').attr('src', `../futur3sn0w/imgs/${project.imageSrc}`).attr('alt', project.title)),
                $('<div class="projTitle"></div>').text(project.title),
                $('<div class="projDesc"></div>').text(project.description).attr('data-lastUpdate', project.lastUpdate || '')
            )
            .on('click', function () {
                $('.projectBox').removeClass('selected');

                $(this).addClass('selected')
                createProjectView(project, projectType);
                $('.projects-header').addClass('showProject');
                $('.back-btn').removeClass('hide');
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
            actionsDiv.append(
                $('<div class="projAction button project-code"></div>')
                    .append($('<i class="fa-brands fa-github"></i>'))
                    .append($('<p>').text('Source'))  // Set the button text
                    .on('click', function () {
                        window.open('https://source.gth.zip/' + project.dataOpen);
                    })
            );

            var openButton = $('<div class="projAction button project-open"></div>')
                .append($('<i>').addClass('fa-solid fa-up-right-from-square'))  // Use correct icon class
                .on('click', function () {
                    if (project.dataOpen.startsWith('http')) {
                        window.open(project.dataOpen);
                    } else {
                        window.open('https://gth.zip/' + project.dataOpen);
                    }
                })
                .append($('<p>').text('Open'));  // Set the button text

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
                $('<div class="projImg projElem"></div>')
                    .on('click', function () {
                        $(this).toggleClass('largeView');
                    })
                    .append($('<img>')
                        .attr('src', `../futur3sn0w/imgs/${imageSrc}`)
                        .attr('alt', project.title)),
                $('<div class="projInfo projElem"></div>').append(
                    $('<div class="projTitle projElem"></div>').text(project.title).attr('data-lastUpdate', project.lastUpdate || ''),
                    $('<div class="projDesc projElem"></div>').append($('<p>').text(project.description), tileIcn),
                    actionsDiv // Add the actions div with either "Source" and "Open", or just "Play
                )
            );

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
                    const box = createProjectBox(project, section.name);
                    box.addClass('stagger-hidden');
                    tileRow.append(box);

                    // Stagger show animation
                    setTimeout(() => {
                        box.removeClass('stagger-hidden').addClass('stagger-visible');
                    }, i * 100);
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
        var sectionDivBtn = $('<div class="sectionBtn button"></div>')
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

$('.back-btn').off('click').on('click', () => {
    if ($('body').has('main[data-barba-namespace="futur3sn0w"]')) {
        $('.back-btn').addClass('hide');
        $('.projVisor').addClass('temphide');
        setTimeout(() => {
            // $('.projElem').remove();
            $('.projectBox').removeClass('selected');
            $('.projects-header').removeClass('showProject');
            setTimeout(() => {
                $('.projVisor').removeClass('temphide');
            }, 50);
        }, 150);
    }
});