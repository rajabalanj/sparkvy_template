// Add this function, perhaps in your router.js or a new script file like `dropdownHover.js`

function enableDropdownHover() {
    const dropdownToggles = document.querySelectorAll('.navbar .dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        let timeout; // To manage the delay for closing on mouse leave

        toggle.addEventListener('mouseenter', function() {
            clearTimeout(timeout); // Clear any pending hide
            const dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(this);
            dropdownInstance.show();
        });

        // Add mouseleave to the parent dropdown item to handle cases where the mouse moves off the toggle but stays on the menu
        const dropdownParent = toggle.closest('.dropdown');
        if (dropdownParent) {
            dropdownParent.addEventListener('mouseleave', function() {
                // Add a small delay before hiding to prevent accidental closes when moving between toggle and menu
                timeout = setTimeout(() => {
                    const dropdownInstance = bootstrap.Dropdown.getInstance(toggle);
                    if (dropdownInstance) {
                        dropdownInstance.hide();
                    }
                }, 100); // Adjust delay as needed (e.g., 100ms)
            });
        }

        // Keep the click behavior for accessibility and mobile, and ensure it also hides the dropdown
        toggle.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior if href="#"
            const dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(this);
            dropdownInstance.toggle(); // Toggle visibility on click
        });

        // Ensure dropdown closes when an item inside is clicked and route changes
        const dropdownMenu = toggle.nextElementSibling; // Get the dropdown menu
        if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
            dropdownMenu.querySelectorAll('.dropdown-item[data-route]').forEach(item => {
                item.addEventListener('click', function() {
                    const dropdownInstance = bootstrap.Dropdown.getInstance(toggle);
                    if (dropdownInstance) {
                        dropdownInstance.hide(); // Hide the dropdown when an item is clicked
                    }
                });
            });
        }
    });
}

// You need to call this function after your navbar is loaded.
// In index.html, modify the script block:
