function aboutBtn() {
    window.location.href = 'about.html';
}

function liveFeedBtn() {
    window.location.href = 'liveFeed.html';
}

function homeBtn() {
    window.location.href = 'index.html';
}

function projectsBtn() {
    window.location.href = 'projects.html';
}

function pbFilter() {
    var pbx1 = document.getElementById("projectBox1");
    var pbx2 = document.getElementById("projectBox2");
    var pbx3 = document.getElementById("projectBox3");
    var pbx4 = document.getElementById("projectBox4");
    var pbx5 = document.getElementById("projectBox5");
    var pbx6 = document.getElementById("projectBox6");
    var pbx7 = document.getElementById("projectBox7");
    var pbx8 = document.getElementById("projectBox8");
    var pbx9 = document.getElementById("projectBox9");
    var pbx10 = document.getElementById("projectBox10");
    var pbx11 = document.getElementById("projectBox11");
    var pbx12 = document.getElementById("projectBox12");
    var pbx13 = document.getElementById("projectBox13");
    var pbx14 = document.getElementById("projectBox14");
    var pbx15 = document.getElementById("projectBox15");
    var pbx16 = document.getElementById("projectBox16");
    var pbx17 = document.getElementById("projectBox17");
    var pbx18 = document.getElementById("projectBox18");
    var clearBtn = document.getElementById("pfClear");

       if (document.getElementById("projFilterBox").value == "1") {
        clearBtn.style.display = "flex";
        pbx1.classList.add("hidden");
        pbx2.classList.add("hidden");
        pbx3.classList.remove("hidden");
        pbx4.classList.add("hidden");
        pbx5.classList.remove("hidden");
        pbx6.classList.add("hidden");
        pbx7.classList.add("hidden");
        pbx8.classList.add("hidden");
        pbx9.classList.remove("hidden");
        pbx10.classList.remove("hidden");
        pbx11.classList.add("hidden");
        pbx12.classList.add("hidden");
        pbx13.classList.add("hidden");
        pbx14.classList.add("hidden");
        pbx15.classList.add("hidden");
        pbx16.classList.add("hidden");
        pbx17.classList.remove("hidden");
        pbx18.classList.remove("hidden");
       } else if (document.getElementById("projFilterBox").value == "2"){
        clearBtn.style.display = "flex";
        pbx1.classList.add("hidden");
        pbx2.classList.add("hidden");
        pbx3.classList.add("hidden");
        pbx4.classList.remove("hidden");
        pbx5.classList.add("hidden");
        pbx6.classList.remove("hidden");
        pbx7.classList.add("hidden");
        pbx8.classList.remove("hidden");
        pbx9.classList.add("hidden");
        pbx10.classList.add("hidden");
        pbx11.classList.add("hidden");
        pbx12.classList.add("hidden");
        pbx13.classList.add("hidden");
        pbx14.classList.add("hidden");
        pbx15.classList.add("hidden");
        pbx16.classList.add("hidden");
        pbx17.classList.add("hidden");
        pbx18.classList.add("hidden");
       } else if (document.getElementById("projFilterBox").value == "3"){
        clearBtn.style.display = "flex";
        pbx1.classList.add("hidden");
        pbx2.classList.add("hidden");
        pbx3.classList.add("hidden");
        pbx4.classList.add("hidden");
        pbx5.classList.add("hidden");
        pbx6.classList.add("hidden");
        pbx7.classList.add("hidden");
        pbx8.classList.add("hidden");
        pbx9.classList.add("hidden");
        pbx10.classList.add("hidden");
        pbx11.classList.add("hidden");
        pbx12.classList.add("hidden");
        pbx13.classList.add("hidden");
        pbx14.classList.add("hidden");
        pbx15.classList.add("hidden");
        pbx16.classList.add("hidden");
        pbx17.classList.add("hidden");
        pbx18.classList.remove("hidden");
       } else if (document.getElementById("projFilterBox").value == "4"){
        clearBtn.style.display = "flex";
        pbx1.classList.add("hidden");
        pbx2.classList.add("hidden");
        pbx3.classList.add("hidden");
        pbx4.classList.add("hidden");
        pbx5.classList.add("hidden");
        pbx6.classList.add("hidden");
        pbx7.classList.add("hidden");
        pbx8.classList.add("hidden");
        pbx9.classList.add("hidden");
        pbx10.classList.add("hidden");
        pbx11.classList.remove("hidden");
        pbx12.classList.add("hidden");
        pbx13.classList.add("hidden");
        pbx14.classList.add("hidden");
        pbx15.classList.remove("hidden");
        pbx16.classList.remove("hidden");
        pbx17.classList.add("hidden");
        pbx18.classList.add("hidden");
       } else if (document.getElementById("projFilterBox").value == "5"){
        clearBtn.style.display = "flex";
        pbx1.classList.add("hidden");
        pbx2.classList.remove("hidden");
        pbx3.classList.add("hidden");
        pbx4.classList.add("hidden");
        pbx5.classList.add("hidden");
        pbx6.classList.add("hidden");
        pbx7.classList.add("hidden");
        pbx8.classList.add("hidden");
        pbx9.classList.add("hidden");
        pbx10.classList.add("hidden");
        pbx11.classList.add("hidden");
        pbx12.classList.remove("hidden");
        pbx13.classList.add("hidden");
        pbx14.classList.add("hidden");
        pbx15.classList.add("hidden");
        pbx16.classList.add("hidden");
        pbx17.classList.add("hidden");
        pbx18.classList.add("hidden");
       } else if (document.getElementById("projFilterBox").value == "6"){
        clearBtn.style.display = "flex";
        pbx1.classList.remove("hidden");
        pbx2.classList.add("hidden");
        pbx3.classList.add("hidden");
        pbx4.classList.add("hidden");
        pbx5.classList.add("hidden");
        pbx6.classList.add("hidden");
        pbx7.classList.remove("hidden");
        pbx8.classList.add("hidden");
        pbx9.classList.add("hidden");
        pbx10.classList.add("hidden");
        pbx11.classList.add("hidden");
        pbx12.classList.add("hidden");
        pbx13.classList.add("hidden");
        pbx14.classList.add("hidden");
        pbx15.classList.add("hidden");
        pbx16.classList.add("hidden");
        pbx17.classList.add("hidden");
        pbx18.classList.add("hidden");
       } else if (document.getElementById("projFilterBox").value == "7"){
        clearBtn.style.display = "flex";
        pbx1.classList.add("hidden");
        pbx2.classList.add("hidden");
        pbx3.classList.add("hidden");
        pbx4.classList.add("hidden");
        pbx5.classList.add("hidden");
        pbx6.classList.add("hidden");
        pbx7.classList.add("hidden");
        pbx8.classList.add("hidden");
        pbx9.classList.add("hidden");
        pbx10.classList.add("hidden");
        pbx11.classList.add("hidden");
        pbx12.classList.add("hidden");
        pbx13.classList.add("hidden");
        pbx14.classList.remove("hidden");
        pbx15.classList.add("hidden");
        pbx16.classList.add("hidden");
        pbx17.classList.add("hidden");
        pbx18.classList.add("hidden");
       } else {
        clearBtn.style.display = "none";
        pbx1.classList.remove("hidden");
        pbx2.classList.remove("hidden");
        pbx3.classList.remove("hidden");
        pbx4.classList.remove("hidden");
        pbx5.classList.remove("hidden");
        pbx6.classList.remove("hidden");
        pbx7.classList.remove("hidden");
        pbx8.classList.remove("hidden");
        pbx9.classList.remove("hidden");
        pbx10.classList.remove("hidden");
        pbx11.classList.remove("hidden");
        pbx12.classList.remove("hidden");
        pbx13.classList.remove("hidden");
        pbx14.classList.remove("hidden");
        pbx15.classList.remove("hidden");
        pbx16.classList.remove("hidden");
        pbx17.classList.remove("hidden");
        pbx18.classList.remove("hidden");
       }
}

function resetFilter() {
    document.getElementById("projFilterBox").selectedIndex = 0;
    pbFilter();
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