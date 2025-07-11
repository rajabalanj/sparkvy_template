function loadAllComponents(mainContentPath) {
  // Load header first
  $("#header-container").load("components/header.html", function() {
    // Then load navbar as a sibling
    $("#navbar-container").load("components/navbar.html");
  });
  
  // Load sidebar
  $("#sidebar").load("components/sidebar.html");
  
  // Load main content
  $("#main-content").load(mainContentPath);
  
  // Load footer
  $("#footer").load("components/footer.html");
}