// =============================
// ELEMENTOS DE LA PÁGINA
// =============================

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const currentYear = document.getElementById("currentYear");


// =============================
// MENÚ PARA CELULAR
// =============================

function closeMenu() {
    if (!navLinks || !menuToggle || !menuIcon) return;

    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuIcon.textContent = "☰";
}

if (menuToggle && navLinks && menuIcon) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        document.body.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuIcon.textContent = isOpen ? "✕" : "☰";
    });
}


// Cierra el menú cuando se presiona un enlace

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
});


// =============================
// ENCABEZADO AL HACER SCROLL
// =============================

function updateScrollEffects() {
    const scrollPosition = window.scrollY;

    if (header) {
        header.classList.toggle("scrolled", scrollPosition > 30);
    }

    if (backToTop) {
        backToTop.classList.toggle("visible", scrollPosition > 600);
    }
}

window.addEventListener("scroll", updateScrollEffects);

updateScrollEffects();


// =============================
// BOTÓN PARA VOLVER ARRIBA
// =============================

if (backToTop) {
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// =============================
// ANIMACIONES AL BAJAR
// =============================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


// =============================
// AÑO AUTOMÁTICO DEL FOOTER
// =============================

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}