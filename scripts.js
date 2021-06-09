function aboutBtn() {
    // document.getElementById("greetingLinks").style.opacity = "0";
    // document.getElementById("psWrapper").style.opacity = "0";
    // document.getElementById("aboutBox").style.opacity = "1";
    // document.getElementById("nbAbout").innerHTML = " <label>About Me</label>";
    // document.getElementById("nbHome").innerHTML = " <label>Home</label>";
    // document.getElementById("nbProjects").innerHTML = " <label>My Projects</label>";
    // document.getElementById("nbAbout").style.font = "25px FLNTFILL";
    // document.getElementById("nbHome").style.font = "25px FLNTREG";
    // document.getElementById("nbProjects").style.font = "25px FLNTREG";
    // document.getElementById("greetingLinks").style.pointerEvents = "none";
    // document.getElementById("psWrapper").style.pointerEvents = "none";
    // document.getElementById("aboutBox").style.pointerEvents = "auto";

    window.location.href = 'about.html';
}

function homeBtn() {
    // document.getElementById("greetingLinks").style.opacity = "1";
    // document.getElementById("psWrapper").style.opacity = "0";
    // document.getElementById("aboutBox").style.opacity = "0";
    // document.getElementById("nbAbout").innerHTML = " <label>About Me</label>";
    // document.getElementById("nbHome").innerHTML = " <label>Home</label>";
    // document.getElementById("nbProjects").innerHTML = " <label>My Projects</label>";
    // document.getElementById("nbAbout").style.font = "25px FLNTREG";
    // document.getElementById("nbHome").style.font = "25px FLNTFILL";
    // document.getElementById("nbProjects").style.font = "25px FLNTREG";
    // document.getElementById("greetingLinks").style.pointerEvents = "auto";
    // document.getElementById("psWrapper").style.pointerEvents = "none";
    // document.getElementById("aboutBox").style.pointerEvents = "none";

    window.location.href = 'index.html';
}

function projectsBtn() {
    // document.getElementById("greetingLinks").style.opacity = "0";
    // document.getElementById("psWrapper").style.opacity = "1";
    // document.getElementById("aboutBox").style.opacity = "0";
    // document.getElementById("nbAbout").innerHTML = " <label>About Me</label>";
    // document.getElementById("nbHome").innerHTML = " <label>Home</label>";
    // document.getElementById("nbProjects").innerHTML = " <label>My Projects</label>";
    // document.getElementById("nbAbout").style.font = "25px FLNTREG";
    // document.getElementById("nbHome").style.font = "25px FLNTREG";
    // document.getElementById("nbProjects").style.font = "25px FLNTFILL";
    // document.getElementById("greetingLinks").style.pointerEvents = "none";
    // document.getElementById("psWrapper").style.pointerEvents = "auto";
    // document.getElementById("aboutBox").style.pointerEvents = "none";

    window.location.href = 'projects.html';
}

fetch('projectSums/1.txt')
    .then(response => response.text())
    .then(ps1Data => {
    document.getElementById("pbDesc1").innerHTML = ps1Data;
});

fetch('projectSums/2.txt')
    .then(response => response.text())
    .then(ps2Data => {
    document.getElementById("pbDesc2").innerHTML = ps2Data;
});

fetch('projectSums/3.txt')
    .then(response => response.text())
    .then(ps3Data => {
    document.getElementById("pbDesc3").innerHTML = ps3Data;
});

fetch('projectSums/4.txt')
    .then(response => response.text())
    .then(ps4Data => {
    document.getElementById("pbDesc4").innerHTML = ps4Data;
});

fetch('projectSums/5.txt')
    .then(response => response.text())
    .then(ps5Data => {
    document.getElementById("pbDesc5").innerHTML = ps5Data;
});

fetch('projectSums/6.txt')
    .then(response => response.text())
    .then(ps6Data => {
    document.getElementById("pbDesc6").innerHTML = ps6Data;
});