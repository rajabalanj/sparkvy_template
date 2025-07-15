// responsive-loader.js

// Track if the script is already loaded
let dropdownHoverLoaded = false;

function loadScript(url) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onload = () => {
      dropdownHoverLoaded = true;
      resolve();
    };
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

function unloadScript(url) {
  const script = document.querySelector(`script[src="${url}"]`);
  if (script) {
    script.remove();
    dropdownHoverLoaded = false;
  }
}

// Check for large screens (lg) in Bootstrap 5
const lgScreen = window.matchMedia('(min-width: 992px)');

async function handleScreenChange(e) {
  try {
    if (e.matches) {
      // Load only if not already loaded
      if (!dropdownHoverLoaded) {
        await loadScript('scripts/dropdownHover.js');
        console.log('Dropdown hover script loaded for large screens.');
        
        // Initialize if the function exists
        if (typeof enableDropdownHover === 'function') {
          enableDropdownHover();
        }
      }
    } else {
      // Unload when screen is too small
      unloadScript('scripts/dropdownHover.js');
      
      // Close any open dropdowns when switching to mobile
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        const dropdown = bootstrap.Dropdown.getInstance(menu.closest('.dropdown-toggle'));
        if (dropdown) dropdown.hide();
      });
    }
  } catch (error) {
    console.error('Error handling screen change:', error);
  }
}

// Initial check when the page loads
handleScreenChange(lgScreen);

// Listen for changes in screen size
lgScreen.addEventListener('change', handleScreenChange);

// Also handle initial page load in case of resize during load
window.addEventListener('DOMContentLoaded', () => {
  handleScreenChange(lgScreen);
});