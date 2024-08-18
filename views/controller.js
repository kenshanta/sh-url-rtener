// controller.js
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
console.log(isDarkMode, "----------------here--------------------");
res.render("index", { isDarkMode: isDarkMode });
