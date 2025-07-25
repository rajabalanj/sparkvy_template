// scripts/loadComponents.js
function loadComponent(selector, path) {
  return new Promise((resolve, reject) => {
    $(selector).load(path, function(response, status) {
      if (status === "success") {
        resolve();
      } else {
        reject(`Failed to load ${path}`);
      }
    });
  });
}

function loadAllComponents() { // No mainContentPath argument
  return Promise.all([
    loadComponent("#header-container", "components/header.html"),
    loadComponent("#navbar-container", "components/navbar.html"),
    loadComponent("#sidebar", "components/sidebar.html"),
    // Removed: loadComponent("#main-content", mainContentPath),
    loadComponent("#footer", "components/footer.html")
  ]);
}