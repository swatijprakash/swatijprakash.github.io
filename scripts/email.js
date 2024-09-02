var encEmail = "c3dhdGlqcHJha2FzaEBnbWFpbC5jb20=";
const emailButton = document.querySelector("#email");
emailButton.setAttribute("href", "mailto:".concat(atob(encEmail)));
