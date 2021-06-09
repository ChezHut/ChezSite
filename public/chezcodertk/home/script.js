window.addEventListener("load", function() {
    setTimeout(function() {
        typist();
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

function getWidth() {
    return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
}

function getHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight);
}
function randomInt(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

function typist() {
    let typist = document.getElementById("typist");
    let typer = "ChezCoder.tk";
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