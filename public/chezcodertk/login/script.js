window.addEventListener("load", function() {
    placeholders();
});

function form() {}

function placeholders() {
    document.getElementById("username").addEventListener("focus", handlePlaceholders);
    document.getElementById("password").addEventListener("focus", handlePlaceholders);
    document.getElementById("username").addEventListener("blur", handlePlaceholders);
    document.getElementById("password").addEventListener("blur", handlePlaceholders);

    function handlePlaceholders(e) {
        if (e.type == "focus") {
            if (e.target.id == "username") {
                if (e.target.hasAttribute("placeholder")) {
                    e.target.value = "";
                    e.target.style.color = "black";
                }
            } else {
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
            } else {
                if (e.target.value == "") {
                    e.target.type = "text";
                    e.target.value = "Password";
                    e.target.setAttribute("placeholder", "");
                    e.target.style.color = "gray";
                } else {
                    e.target.removeAttribute("placeholder");
                }
            }
        }
    }
}