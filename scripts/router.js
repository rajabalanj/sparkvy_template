// scripts/router.js
const router = {
    routes: {
        '/': 'components/main/index.html',
        '/aboutus.html': 'components/main/aboutus.html',
        '/index.html': 'components/main/index.html',
        '/products.html': 'components/main/products.html',
        '/Synthesis.html': 'components/main/synthesis.html',
        '/Characterization.html': 'components/main/characterization.html',
        '/electrochem_studies.html': 'components/main/electrochem_studies.html',
        '/nanomaterial_synthesis.html': 'components/main/nanomaterial_synthesis.html',
        '/energy_conversion_application.html': 'components/main/energy_conversion_application.html',
        '/optical_studies.html': 'components/main/optical_studies.html',
        '/morphological_studies.html': 'components/main/morphological_studies.html',
        '/structural_studies.html': 'components/main/structural_studies.html',
        '/photocatalytic_studies.html': 'components/main/photocatalytic_studies.html',
        '/InternshipOpportunities.html': 'components/main/internshipopportunities.html',
        '/HandsOnTraining.html': 'components/main/handsontraining.html',
        '/Charges.html': 'components/main/charges.html',
        '/feedback.html': 'components/main/feedback.html',
        '/career.html': 'components/main/career.html',
        '/contact.html': 'components/main/contact.html',
        '/workwithus.html': 'components/main/workwithus.html',
    },

    init: function() {
        this.loadContent(location.hash.slice(1) || '/');

        window.addEventListener('hashchange', () => {
            this.loadContent(location.hash.slice(1) || '/');
        });

        document.body.addEventListener('click', e => {
            const target = e.target.closest('[data-route]');
            if (target) {
                e.preventDefault();

                // Close all open dropdowns using Bootstrap's Dropdown API
                const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
                openDropdowns.forEach(dropdown => {
                    const dropdownInstance = bootstrap.Dropdown.getInstance(dropdown.previousElementSibling);
                    if (dropdownInstance) {
                        dropdownInstance.hide();
                    }
                });

                // Change the route
                const path = target.getAttribute('data-route');
                location.hash = path;
            }
        });
    },

    loadContent: function(path) {
        const contentPath = this.routes[path] || this.routes['/'];

        if (contentPath) {
            fetch(contentPath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    document.getElementById('main-content').innerHTML = html;

                    if (typeof initializeReadMoreToggles === 'function') {
                        initializeReadMoreToggles();
                    }
                })
                .catch(error => {
                    console.error('Error loading content:', error);
                    document.getElementById('main-content').innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Error loading page: ${error.message}. Please try again later.
                        </div>
                    `;
                });
        } else {
            console.warn('Route not found:', path);
            document.getElementById('main-content').innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Page not found!
                </div>
            `;
        }
    }
};