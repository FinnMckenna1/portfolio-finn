// live clock (Perth)
function tick(){
    const t = new Date().toLocaleTimeString('en-AU', { hour12:false, timeZone:'Australia/Perth' });
    const el = document.getElementById('clock');
    if (el) el.textContent = 'PER ' + t;
  }
  tick();
  setInterval(tick, 1000);
  
  // staggered reveal on scroll + load
  const items = [...document.querySelectorAll('.reveal')];
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .12 });
  items.forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i, 6) * 70) + 'ms';
    io.observe(el);
  });
  

  // mobile burger menu
(function () {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    if (!burger || !nav) return;
  
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
  
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 720) setOpen(false); });
  })();
  
  const cards = document.querySelectorAll('.howto-card');
  console.log('[howto] cards found:', cards.length);

  cards.forEach((card, i) => {
    const video = card.querySelector('video');
    if (!video) {
      console.warn('[howto] no video in card', i);
      return;
    }

    card.addEventListener('mouseenter', () => {
      console.log('[howto] hover', i, 'src:', video.currentSrc || video.src);
      video.play().then(
        () => console.log('[howto] playing', i),
        (err) => console.error('[howto] play failed', i, err)
      );
    });

    card.addEventListener('mouseleave', () => video.pause());
  });