// project.js — shared across all project detail pages
// Reads image data from data-src and data-alt attributes on .gallery-item elements

(function () {

  // Build gallery map from DOM
  // Each .gallery-grid has a data-gallery="name" attribute
  // Each .gallery-item inside it has data-src and data-alt
  const galleries = {};

  document.querySelectorAll('.gallery-grid').forEach(grid => {
    const name = grid.dataset.gallery;
    if (!name) return;

    galleries[name] = Array.from(grid.querySelectorAll('.gallery-item')).map(item => ({
      src: item.dataset.src,
      alt: item.dataset.alt || '',
    }));
  });

  let activeGallery = null;
  let activeIndex   = 0;

  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');

  // attach click to every gallery item
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const grid  = item.closest('.gallery-grid');
      const name  = grid.dataset.gallery;
      const index = Array.from(grid.querySelectorAll('.gallery-item')).indexOf(item);
      openLightbox(name, index);
    });
  });

  function openLightbox(gallery, index) {
    activeGallery = gallery;
    activeIndex   = index;
    renderLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function shiftLightbox(dir) {
    const items = galleries[activeGallery];
    activeIndex = (activeIndex + dir + items.length) % items.length;
    renderLightbox();
  }

  function renderLightbox() {
    const items = galleries[activeGallery];
    const item  = items[activeIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCounter.textContent = `${activeIndex + 1} / ${items.length}${item.alt ? ' — ' + item.alt : ''}`;
  }

  // expose shift and close for inline onclick on buttons
  window.closeLightbox = closeLightbox;
  window.shiftLightbox = shiftLightbox;

  // backdrop click
  lightbox.addEventListener('click', function (e) {
    if (e.target === this) closeLightbox();
  });

  // keyboard
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  shiftLightbox(-1);
    if (e.key === 'ArrowRight') shiftLightbox(1);
    if (e.key === 'Escape')     closeLightbox();
  });

})();