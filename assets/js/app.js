(function () {
    const KEY = "irondenker_theme";
    const html = document.documentElement;
    const btn = document.getElementById("themeToggle");

    function setTheme(theme) {
        if (!theme) {
            html.removeAttribute("data-theme");
            localStorage.removeItem(KEY);
            return;
        }
        html.setAttribute("data-theme", theme);
        localStorage.setItem(KEY, theme);
    }

    // 저장된 값 우선 적용
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") setTheme(saved);

    btn.addEventListener("click", () => {
        const cur = html.getAttribute("data-theme");
        if (cur === "dark") setTheme("light");
        else if (cur === "light") setTheme("dark");
        else {
            // 시스템값을 읽어서 반대로 토글
            const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(prefersDark ? "light" : "dark");
        }
    });
})();