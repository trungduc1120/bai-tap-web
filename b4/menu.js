const nav = document.querySelector(".main-nav");
const menuButton = document.querySelector(".menu-toggle");

function closeMenu() {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Mở menu");
}

if (nav && menuButton) {
    menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (!nav.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("is-open")) {
            closeMenu();
            menuButton.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 640) {
            closeMenu();
        }
    });
}
