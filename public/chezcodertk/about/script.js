var inProgress = [false];

window.addEventListener("load", function() {
    setTimeout(function() {
        typist();
        loadKnowledgeBase();
    }, 1000);

    setInterval(function() {
        if (document.getElementsByClassName("loading-animation")) {
            Array.from(document.getElementsByClassName("loading-animation")).forEach(function(el) {
                el.textContent += ".";
                if (el.textContent == "Loading....") el.textContent = "Loading";
            });
        }
    }, 200);
});

window.addEventListener("mousemove", function(e) {
    var arialabel = document.getElementById("ariaLabel");
    arialabel.style.left = e.pageX + "px";
    arialabel.style.top = (e.pageY - 80) + "px";

    if (e.target.getAttribute("aria-label")) {
        arialabel.textContent = e.target.getAttribute("aria-label");
        arialabel.style.opacity = 1;
    } else {
        arialabel.style.opacity = 0;
    }
});

window.addEventListener("mouseup", function(e) {
    if (e.target.id.endsWith("_langName")) {
        let langCard = document.getElementById(e.target.textContent + "_langCard");

        if (!langCard.hasAttribute("open")) {
            let timeout = 0;

            Array.from(document.getElementsByClassName("lang-card")).forEach(function(el) {
                if (el.hasAttribute("open")) timeout = 1000;
                
                el.style.height = "0px";
                el.style.paddingTop = "0px";
                el.style.paddingBottom = "0px";
                el.removeAttribute("open");
            });

            if (inProgress[0]) return;
            inProgress[0] = true;

            setTimeout(function() {
                langCard.style.height = "100px";
                langCard.style.paddingTop = "10px";
                langCard.style.paddingBottom = "10px";
                langCard.setAttribute("open", "");
                inProgress[0] = false;
            }, timeout);
        } else {
            langCard.style.height = "0px";
            langCard.style.paddingTop = "0px";
            langCard.style.paddingBottom = "0px";
            langCard.removeAttribute("open");
        }
    }
});

function getWidth() {
    return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
}

function getHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight);
}

function loadKnowledgeBase() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "./knowledgebase.json");
    xhr.send();

    xhr.addEventListener("readystatechange", function(e) {
        if (e.target.readyState == 4 && e.target.status == 200) {
            parseKnowledgebase(JSON.parse(e.target.responseText));
        }
    });
}

function parseKnowledgebase(json) {
    let container = document.getElementById("knowledgebase");
    let body = [];
    container.style.display = "none";

    Object.keys(json).forEach(function(sectionName, _i) {
        let result = "";

        result += `<div class="knowledgebase-section" id="ksection${_i}">`;
        result += `<span class="section-name">${sectionName}</span>`;
        result += `<div class="lang-names">`;
        Object.keys(json[sectionName]).forEach(function(langName) {
            result += `<span title="Click for more information" aria-label="Click for more information" class="lang-name" id="${langName}_langName">${langName}</span>`;
        });
        result += `</div>`;
        result += `<div class="lang-cards">`;
        Object.keys(json[sectionName]).forEach(function(langName) {
            result += `<span class="lang-card rating-${json[sectionName][langName][1]}" id="${langName}_langCard">${json[sectionName][langName][0]}</span>`;
        });
        result += `</div>`;
        result += `</div>`;

        container.innerHTML += result;
        body.push(document.getElementById("ksection" + _i));
    });

    document.getElementById("loadKnowledgebase").style.transition = "opacity 0.5s";
    
    setTimeout(function() {
        document.getElementById("loadKnowledgebase").style.opacity = 0;
        container.style.display = "block";
    }, 100);

    setTimeout(function() {
        for(let i = 0;i < body.length;i++) {
            setTimeout(function() {
                console.log(body[i].style.opacity)
                body[i].style.opacity = "1";
                console.log(body[i].style.opacity)
            }, 200 * i);
        }

        document.getElementById("loadKnowledgebase").remove();
    }, 300);
}

setTimeout(function() {
    console.log(document.getElementById("ksection0"));
}, 3000);

function randomInt(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

function typist() {
    let typist = document.getElementById("typist");
    let typer = "About Me";
    let nextTimes = 0;
    let blinkTimes = 4;

    for(let i = 0;i < typer.length;i++) {
        setTimeout(function() {
            typist.textContent = typer.substr(0, i + 1) + "|";
        }, 100 * (i + 1));
    }

    nextTimes += 100 * typer.length;

    let blinkerOn = false;

    for(let i = 0;i < blinkTimes;i++) {
        setTimeout(function() {
            if (blinkerOn) typist.textContent = typer + "|";
            else typist.textContent = typer;

            blinkerOn = !blinkerOn;
        }, nextTimes + (500 * (i + 1)));
    }

    nextTimes += 500 * blinkTimes;

    for(let i = typer.length + 1;i > 0;i--) {
        setTimeout(function() {
            typist.textContent = typer.substr(0, i - 1) + "|";
        }, nextTimes + (100 * (typer.length - i)));
    }

    nextTimes += 100 * typer.length;

    blinkerOn = false;

    for(let i = 0;i < blinkTimes;i++) {
        setTimeout(function() {
            if (blinkerOn) typist.textContent = "|";
            else typist.innerHTML = "&nbsp;";

            blinkerOn = !blinkerOn;
        }, nextTimes + (500 * (i + 1)));
    }

    nextTimes += 500 * blinkTimes;

    setTimeout(function() {
        typistHelper();
    }, nextTimes);
}

function typistHelper() {
    document.getElementById("typist").textContent = "|";
    typist();
}