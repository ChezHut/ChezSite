window.addEventListener("load", function () {
    setInterval(function () {
        if (document.getElementById("password").value) {
            if (document.getElementById("password").value == document.getElementById("confpassword").value) {
                document.getElementById("signup").removeAttribute("disabled");
            } else {
                document.getElementById("signup").setAttribute("disabled", "");
            }
        } else {
            document.getElementById("signup").setAttribute("disabled", "");
        }
    });

    initPlaceholders();
    initLoginPanel();
});

function initLoginPanel() {
    document.getElementById("signup").addEventListener("mouseup", function() {
        let usnm = document.getElementById("username").value;
        let pswd = document.getElementById("password").value;

        let gateway = new XMLHttpRequest();
        gateway.open("POST", "/accounts");
        gateway.setRequestHeader("Content-Type", "application/json");
        gateway.send(JSON.stringify({
            action: "signup"
        }));
    });
}

function initPlaceholders() {
    document.getElementById("username").addEventListener("focus", handlePlaceholders);
    document.getElementById("password").addEventListener("focus", handlePlaceholders);
    document.getElementById("confpassword").addEventListener("focus", handlePlaceholders);
    document.getElementById("username").addEventListener("blur", handlePlaceholders);
    document.getElementById("password").addEventListener("blur", handlePlaceholders);
    document.getElementById("confpassword").addEventListener("blur", handlePlaceholders);

    function handlePlaceholders(e) {
        if (e.type == "focus") {
            if (e.target.id == "username") {
                if (e.target.hasAttribute("placeholder")) {
                    e.target.value = "";
                    e.target.style.color = "black";
                }
            } else if (e.target.id == "password") {
                if (e.target.hasAttribute("placeholder")) {
                    e.target.value = "";
                    e.target.type = "password";
                    e.target.style.color = "black";
                }
            } else if (e.target.id == "confpassword") {
                if (e.target.hasAttribute("placeholder")) {
                    e.target.value = "";
                    e.target.type = "password";
                    e.target.style.color = "black";
                }
            }
        } else {
            if (e.target.id == "username") {
                if (e.target.value == "") {
                    e.target.value = "Username";
                    e.target.setAttribute("placeholder", "");
                    e.target.style.color = "gray";
                } else {
                    e.target.removeAttribute("placeholder");
                }
            } else if (e.target.id == "password") {
                if (e.target.value == "") {
                    e.target.type = "text";
                    e.target.value = "Password";
                    e.target.setAttribute("placeholder", "");
                    e.target.style.color = "gray";
                } else {
                    e.target.removeAttribute("placeholder");
                }
            } else if (e.target.id == "confpassword") {
                if (e.target.value == "") {
                    e.target.type = "text";
                    e.target.value = "Confirm Password";
                    e.target.setAttribute("placeholder", "");
                    e.target.style.color = "gray";
                } else {
                    e.target.removeAttribute("placeholder");
                }
            }
        }
    }
}