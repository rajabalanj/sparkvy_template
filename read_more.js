function initializeReadMoreToggles() {
    var readMoreButtons = document.querySelectorAll('.read-more-btn');

    readMoreButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior (page jump)

            var targetId = this.dataset.target; // Get the ID of the target span from data-target
            var fullTextSpan = document.getElementById(targetId); // Find the span by its ID

            if (fullTextSpan) {
                if (fullTextSpan.style.display === 'none' || fullTextSpan.style.display === '') {
                    fullTextSpan.style.display = 'inline'; // Show the full text
                    this.textContent = 'Read Less'; // Change button text
                } else {
                    fullTextSpan.style.display = 'none'; // Hide the full text
                    this.textContent = 'Read More'; // Change button text back
                }
            }
        });
    });
}
