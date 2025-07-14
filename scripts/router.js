// scripts/router.js

const router = {
    // Defines routes: maps URL paths to the actual HTML content files
    routes: {
        '/': 'components/main/index.html', // Home page content
        '/index.html': 'components/main/index.html', // Handle direct index.html access as home
        '/Synthesis.html': 'components/main/synthesis.html', // Content for Synthesis page
        '/Characterization.html': 'components/main/characterization.html', // Content for Characterization page
        '/electrochem_studies.html': 'components/main/electrochem_studies.html', // Content for Electrochemical Studies
        '/nanomaterial_synthesis.html': 'components/main/nanomaterial_synthesis.html', // Content for Nanomaterial Synthesis
        '/energy_conversion_application.html': 'components/main/energy_conversion_application.html', // Content for Energy Conversion Application
        '/optical_studies.html': 'components/main/optical_studies.html', // Content for Optical Studies
        '/morphological_studies.html': 'components/main/morphological_studies.html', // Content for Morphological Studies
        '/structural_studies.html': 'components/main/structural_studies.html', // Content for Structural Studies
        '/photocatalytic_studies.html': 'components/main/photocatalytic_studies.html', // Content for Photocatalytic Studies
        '/InternshipOpportunities.html': 'components/main/internshipopportunities.html', // Content for Internship Opportunities
        '/HandsOnTraining.html': 'components/main/handsontraining.html', // Content for Hands-on Training
        '/Charges.html': 'components/main/charges.html', // Content for Charges
        '/feedback.html': 'components/main/feedback.html', // Content for Feedback form
        '/career.html': 'components/main/career.html', // Content for To Walk with us (assuming 'career.html' is the main one)
        '/contact.html': 'components/main/contact.html', // Content for Contact us
        '/workwithus.html': 'components/main/workwithus.html', // If 'workwithus.html' is a distinct page from 'career.html'
    },

    // Initializes the router, loads initial content, and sets up event listeners
    init: function() {
        // Load content based on the initial URL path
        this.loadContent(window.location.pathname);

        // Listen for browser's back/forward button events
        window.addEventListener('popstate', () => {
            this.loadContent(window.location.pathname);
        });

        // Listen for clicks on the entire document body
        document.body.addEventListener('click', e => {
            // Check if the clicked element (or its parent) is a navigation link
            // with a 'data-route' attribute
            const target = e.target.closest('[data-route]');
            if (target) {
                e.preventDefault(); // Prevent default link behavior (full page reload)

                const path = target.getAttribute('data-route');
                // Update the URL in the browser's address bar without reloading
                history.pushState({}, '', path);
                // Load the new content
                this.loadContent(path);
            }
        });
    },

    // Fetches and loads content into the main content area
    loadContent: function(path) {
        // Get the content file path from the routes, default to home if not found
        const contentPath = this.routes[path] || this.routes['/'];

        if (contentPath) {
            // Fetch the HTML content
            fetch(contentPath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    // Inject the fetched HTML into the main content area
                    document.getElementById('main-content').innerHTML = html;

                    // Re-initialize any scripts or event listeners that apply to the newly loaded content
                    // For example, if 'read_more.js' needs to be re-run for content on new pages:
                    if (typeof initializeReadMoreToggles === 'function') {
                        initializeReadMoreToggles();
                    }
                    // If you have any other scripts that manipulate content within #main-content, call them here.
                    // For example, if AOS animations need to be re-initialized for new content:
                    AOS.refresh();
                })
                .catch(error => {
                    console.error('Error loading content:', error);
                    // Optionally load a 404 page or display an error message
                    document.getElementById('main-content').innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Error loading page: ${error.message}. Please try again later.
                        </div>
                    `;
                });
        } else {
            console.warn('Route not found:', path);
            // Handle 404 or redirect to home page, e.g.:
            // history.replaceState({}, '', '/');
            // this.loadContent('/');
            document.getElementById('main-content').innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Page not found!
                </div>
            `;
        }
    }
};