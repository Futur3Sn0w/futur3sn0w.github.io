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

fetch('projectSums/7.txt')
    .then(response => response.text())
    .then(ps7Data => {
    document.getElementById("pbDesc7").innerHTML = ps7Data;
});

fetch('projectSums/8.txt')
    .then(response => response.text())
    .then(ps8Data => {
    document.getElementById("pbDesc8").innerHTML = ps8Data;
});

fetch('projectSums/9.txt')
    .then(response => response.text())
    .then(ps9Data => {
    document.getElementById("pbDesc9").innerHTML = ps9Data;
});

fetch('projectSums/10.txt')
    .then(response => response.text())
    .then(ps10Data => {
    document.getElementById("pbDesc10").innerHTML = ps10Data;
});

fetch('projectSums/11.txt')
    .then(response => response.text())
    .then(ps11Data => {
    document.getElementById("pbDesc11").innerHTML = ps11Data;
});

fetch('projectSums/12.txt')
    .then(response => response.text())
    .then(ps12Data => {
    document.getElementById("pbDesc12").innerHTML = ps12Data;
});

fetch('projectSums/13.txt')
    .then(response => response.text())
    .then(ps13Data => {
    document.getElementById("pbDesc13").innerHTML = ps13Data;
});

fetch('projectSums/14.txt')
    .then(response => response.text())
    .then(ps14Data => {
    document.getElementById("pbDesc14").innerHTML = ps14Data;
});

fetch('projectSums/15.txt')
    .then(response => response.text())
    .then(ps15Data => {
    document.getElementById("pbDesc15").innerHTML = ps15Data;
});

fetch('projectSums/16.txt')
    .then(response => response.text())
    .then(ps16Data => {
    document.getElementById("pbDesc16").innerHTML = ps16Data;
});

fetch('projectSums/17.txt')
    .then(response => response.text())
    .then(ps17Data => {
    document.getElementById("pbDesc17").innerHTML = ps17Data;
});

fetch('projectSums/18.txt')
    .then(response => response.text())
    .then(ps18Data => {
    document.getElementById("pbDesc18").innerHTML = ps18Data;
});