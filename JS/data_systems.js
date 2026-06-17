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
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    function goTo(n) {
      current = (n + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dotsWrap.querySelectorAll('.img-dot').forEach((d, i) =>
        d.classList.toggle('active', i === current));
      counter.textContent = `${current + 1} / ${total}`;
      prevBtn.classList.toggle('hidden', total <= 1);
      nextBtn.classList.toggle('hidden', total <= 1);
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // hide buttons if only one image
    if (total <= 1) {
      prevBtn.classList.add('hidden');
      nextBtn.classList.add('hidden');
      dotsWrap.style.display = 'none';
    }

    goTo(0);
});