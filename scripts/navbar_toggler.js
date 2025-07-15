function initNavbarToggler() {
    // Wait a brief moment to ensure DOM is fully loaded
    setTimeout(() => {
        const navbarCollapse = document.getElementById('navbarNav');
        const navbarToggler = document.querySelector('[data-bs-target="#navbarNav"]');
        
        if (!navbarCollapse || !navbarToggler) {
            console.warn('Navbar elements not found');
            return;
        }

        // Close navbar when clicking regular nav links (not dropdown toggles)
        document.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item').forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close if clicking a dropdown toggle
                if (e.target.classList.contains('dropdown-toggle')) {
                    return;
                }
                
                if (navbarCollapse.classList.contains('show')) {
                    // Use Bootstrap's collapse method
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            });
        });
    }, 100);
}