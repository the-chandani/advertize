// navbar toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');

    // Toggle navigation when button is clicked
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
    });

    // Close navigation when clicking on the nav area
    nav.addEventListener('click', () => {
        nav.classList.remove('active');
    });

    // Prevent closing when clicking on nav items
    const navChild1 = document.getElementById('nav-child1');
    navChild1.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});