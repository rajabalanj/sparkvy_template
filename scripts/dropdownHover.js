// dropdownHover.js
function enableDropdownHover() {
    // Only enable if screen is large enough
    if (window.innerWidth < 992) return;

    const dropdownToggles = document.querySelectorAll('.navbar .dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        let timeout;

        toggle.addEventListener('mouseenter', function() {
            clearTimeout(timeout);
            const dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(this);
            dropdownInstance.show();
        });

        const dropdownParent = toggle.closest('.dropdown');
        if (dropdownParent) {
            dropdownParent.addEventListener('mouseleave', function() {
                timeout = setTimeout(() => {
                    const dropdownInstance = bootstrap.Dropdown.getInstance(toggle);
                    if (dropdownInstance) {
                        dropdownInstance.hide();
                    }
                }, 100);
            });
        }

        // Keep original click behavior
        toggle.addEventListener('click', function(e) {
            const dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(this);
            dropdownInstance.toggle();
        });

        // Close when dropdown item is clicked
        const dropdownMenu = toggle.nextElementSibling;
        if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
            dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', function() {
                    const dropdownInstance = bootstrap.Dropdown.getInstance(toggle);
                    if (dropdownInstance) {
                        dropdownInstance.hide();
                    }
                });
            });
        }
    });
}

// Make function available globally
window.enableDropdownHover = enableDropdownHover;

// Add responsive behavior
window.addEventListener('resize', function() {
    if (window.innerWidth >= 992) {
        enableDropdownHover();
    }
});