window.addEventListener("load", async function() {
    await initLink();
    await initMeta();
    await initNavbar();
    await initScripts();

    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 500);
});

window.addEventListener("beforeunload", function() {
    document.getElementsByTagName("nav")[0].style.transform = "translateY(-60px)";
    document.getElementsByTagName("main")[0].style.opacity = 1;
});


function noticeLabel(e) {
    let img = document.querySelector(".notice > img");
    let span = document.querySelector(".notice > span");

    if (e.type == "mouseover") {
        span.style.opacity = 1;
    } else if (e.type == "mouseout") {
        span.style.opacity = 0;
    }
}

function initScripts() {
    setTimeout(function() {
        document.getElementsByTagName("main")[0].style.transition = "opacity 0.5s";
        document.getElementsByTagName("main")[0].style.opacity = 1;

        document.querySelector(".notice > img").addEventListener("mouseover", noticeLabel);
        document.querySelector(".notice > img").addEventListener("mouseout", noticeLabel);
    }, 500);
}

function initMeta() {
    let metas = {
        "og:title": "ChezCoderTK",
        "og:type": "website",
        "og:url": location.href,
        "og:image": "/assets/bok.png"
    }

    Object.keys(metas).forEach(function(property) {
        let currentMeta = document.createElement("meta");
        currentMeta.setAttribute("property", property);
        currentMeta.content = metas[property];

        document.head.appendChild(currentMeta);
    });

    let themeColor = document.createElement("meta");
    themeColor.name = "theme-color";
    themeColor.content = "#18FEE8";

    document.head.appendChild(themeColor);
}

function initLink() {
    let links = {
        "stylesheet": "/templates/nav/css",
        "icon": "/assets/bok.png"
    }

    Object.keys(links).forEach(function(rel) {
        let currentLink = document.createElement("link");
        currentLink.rel = rel;
        currentLink.href = links[rel];

        document.head.appendChild(currentLink);
    });
}

function initNavbar() {
    let navXHR = {};
    let header = document.getElementsByTagName("header")[0]

    navXHR = new XMLHttpRequest();
    navXHR.open("get", "/templates/nav/html");
    navXHR.send();

    xhrReadyStateChange(navXHR).then(function(xhr) {
        header.innerHTML += navXHR.responseText;

        let currNav;

        let pageHref = location.pathname.replace(/\//g, "");

        Array.from(document.getElementsByClassName("nav-panel")[0].children).forEach(function(el) {
            let linkHref = new URL(el.href).pathname.replace(/\//g, "");

            if (linkHref.toLowerCase() == pageHref.toLowerCase()) {
                currNav = el;
            }
        });

        Array.from(document.getElementsByClassName("account-panel")[0].children).forEach(function(el) {
            let linkHref = new URL(el.href).pathname.replace(/\//g, "");

            if (linkHref.toLowerCase() == pageHref.toLowerCase()) {
                currNav = el;
            }
        });

        document.getElementById("pfp").style.display = "none";

        setTimeout(function() {
            if (currNav) currNav.style.color = "#f0f0f0";
        });


        setTimeout(function() {
            document.getElementsByTagName("nav")[0].style.transition = "transform 0.3s";
            document.getElementsByTagName("nav")[0].style.transform = "translateY(0px)";
        }, 200);

    }).catch(console.log);


    function xhrReadyStateChange(e) {
        let xhrPromise = new Promise(function(resolve, reject) {
            if (!e.readyState) xhr = e.target;
            else xhr = e;

            if (!xhr.readyState) return reject(xhr);

            xhr.addEventListener("readystatechange", function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    return resolve(xhr);
                } else {
                    if (xhr.readyState == 4) {
                        return reject(new Error("XMLHttpRequest Error: Status " + xhr.status));
                    }
                }
            });
        });

        return xhrPromise;
    }
}