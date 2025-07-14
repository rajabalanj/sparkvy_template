document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    once: false,
    mirror: true,
  });

  // Refresh AOS when Bootstrap collapse is shown (like the accordion)
  document.querySelectorAll('.collapse').forEach(el => {
    el.addEventListener('shown.bs.collapse', () => AOS.refresh());
  });
});
