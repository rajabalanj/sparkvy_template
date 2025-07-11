document.addEventListener('DOMContentLoaded', function() {
    // Mobile-specific dropdown handling
    const handleMobileDropdowns = () => {
        if (window.innerWidth < 992) {
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                // Remove previous listeners to prevent duplicates
                toggle.removeEventListener('click', mobileDropdownHandler);
                toggle.addEventListener('click', mobileDropdownHandler);
            });
        }
    };

    const mobileDropdownHandler = function(e) {
        // Get the dropdown instance
        const dropdown = bootstrap.Dropdown.getOrCreateInstance(this);
        
        // Toggle the dropdown
        if (this.classList.contains('show')) {
            dropdown.hide();
        } else {
            dropdown.show();
        }
        
        // Prevent default to avoid conflict with Bootstrap's handler
        e.preventDefault();
        e.stopImmediatePropagation();
    };

    // Initialize and handle resize
    handleMobileDropdowns();
    window.addEventListener('resize', handleMobileDropdowns);
});

// Debug dropdown events (keep this separate)
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('show.bs.dropdown', (e) => {
        console.log('Dropdown showing', e.target);
    });
    toggle.addEventListener('hide.bs.dropdown', (e) => {
        console.log('Dropdown hiding', e.target);
    });
});
