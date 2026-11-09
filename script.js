// 1. Efek Ketik di Halaman Utama (Hanya jalan jika elemen #typed-text ada)
const typedTextElement = document.getElementById("typed-text");

if (typedTextElement) {
    const roles = [
        "Informatics Engineering Student",
        "Cloud & DevOps Enthusiast",
        "Software & Game Developer",
        "System Architecture Builder"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 35 : 75;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    document.addEventListener("DOMContentLoaded", typeEffect);
}

// 2. Toggle Sidebar Menu (Via Tombol 3 Garis Vertikal & Tombol TAB)
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const menuTrigger = document.getElementById("menu-trigger");
const closeBtn = document.getElementById("close-sidebar");

function toggleSidebar() {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
}

function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}

menuTrigger.addEventListener("click", toggleSidebar);
closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

// Tutup sidebar otomatis saat link di dalam sidebar diklik
document.querySelectorAll(".sidebar-link").forEach(link => {
    link.addEventListener("click", closeSidebar);
});

// 3. Keyboard Shortcuts (TAB untuk Sidebar Menu, ESC untuk ke atas / tutup menu)
document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
        e.preventDefault(); // Mencegah fokus loncat-loncat agar berfungsi seperti menu in-game
        toggleSidebar();
    } else if (e.key === "Escape") {
        if (sidebar.classList.contains("active")) {
            closeSidebar();
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }
});

// 4. Filter Project Cards (Berfungsi untuk filter General di index maupun Spesifik di projects.html)
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        projectCards.forEach(card => {
            if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
});