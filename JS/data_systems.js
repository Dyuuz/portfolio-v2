document.querySelectorAll('.img-carousel').forEach(carousel => {
  const track    = carousel.querySelector('.img-track');
  const imgs     = carousel.querySelectorAll('.img-track img');
  const prevBtn  = carousel.querySelector('.img-btn.prev');
  const nextBtn  = carousel.querySelector('.img-btn.next');
  const dotsWrap = carousel.querySelector('.img-dots');
  const counter  = carousel.querySelector('.img-counter');
  const total    = imgs.length;
  let current    = 0;

  // build dots
  imgs.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'img-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(i);
    });
    dotsWrap.appendChild(dot);
  });

  function goTo(n) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll('.img-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current));
    if (counter) counter.textContent = `${current + 1} / ${total}`;
    prevBtn.classList.toggle('hidden', total <= 1);
    nextBtn.classList.toggle('hidden', total <= 1);
  }

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goTo(current - 1);
  });
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goTo(current + 1);
  });

  // hide controls if only one image
  if (total <= 1) {
    prevBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    dotsWrap.style.display = 'none';
  }

  goTo(0);
});

// Card-level navigation to each project's post page.
// Clicks on carousel controls, dots, or explicit links (.no-nav) are excluded
// so they keep their own behaviour instead of triggering card navigation.
document.querySelectorAll('.project-card').forEach(card => {
  const dest = card.dataset.href;
  if (!dest) return;

  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');

  card.addEventListener('click', (e) => {
    if (e.target.closest('.no-nav')) return;
    window.location.href = dest;
  });

  card.addEventListener('keydown', (e) => {
    if (e.target.closest('.no-nav')) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = dest;
    }
  });
});