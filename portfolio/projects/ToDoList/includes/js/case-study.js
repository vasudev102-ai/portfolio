document.addEventListener('DOMContentLoaded', () => {

  console.log('case study js loaded');

  const navImages = document.querySelectorAll('.shoe-nav img');
  const sections = document.querySelectorAll('#hero, .case-section');

  // Click → scroll
  navImages.forEach(img => {
    img.addEventListener('click', () => {
      const targetId = img.dataset.target;
      const section = document.getElementById(targetId);

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Scroll → active highlight
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          navImages.forEach(img => {
            img.classList.toggle(
              'active',
              img.dataset.target === id
            );
          });
        }
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach(section => observer.observe(section));

});
