gsap.registerPlugin(ScrollTrigger);

// 1. Hero Intro
const heroTl = gsap.timeline();
heroTl.from('.badge', { opacity: 0, y: -20, duration: 0.6 })
      .from('.hero h1', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .from('.hero p', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('.btn-secondary', { opacity: 0, y: 15, duration: 0.6, ease: 'power3.out' }, '-=0.5');

// 2. Animaciones de Entrada para Secciones
gsap.from('.benefit-card', {
  scrollTrigger: {
    trigger: '.benefits-grid',
    start: 'top 80%',
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out'
});

gsap.from('.about-container', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.about-section',
    start: 'top 80%',
  }
});

gsap.from('.timeline-item', {
  scrollTrigger: {
    trigger: '.timeline',
    start: 'top 80%',
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.25,
  ease: 'power3.out'
});

gsap.from('.contact-container', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.contact-section',
    start: 'top 80%',
  }
});

// 3. Contador Numérico al hacer Scroll
const counters = document.querySelectorAll('.counter');
counters.forEach((counter) => {
  const target = +counter.getAttribute('data-target');
  gsap.to(counter, {
    innerText: target,
    duration: 2,
    ease: 'power2.out',
    snap: { innerText: 1 },
    scrollTrigger: {
      trigger: '.metrics-card',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
});

// 4. Floating Icons Animation & Parallax 3D
gsap.to('.icon-1', { y: -12, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
gsap.to('.icon-2', { y: 14, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.3 });
gsap.to('.icon-3', { y: -10, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.2 });
gsap.to('.icon-4', { y: 12, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });

const heroSection = document.querySelector('.hero');
const icons = document.querySelectorAll('.floating-icon');

if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = heroSection.getBoundingClientRect();
    const xPos = ((e.clientX - left) / width - 0.5) * 2;
    const yPos = ((e.clientY - top) / height - 0.5) * 2;

    icons.forEach((icon, index) => {
      const depth = (index + 1) * 15;
      gsap.to(icon, {
        x: xPos * depth,
        y: yPos * depth,
        rotationX: -yPos * 10,
        rotationY: xPos * 10,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  });

  heroSection.addEventListener('mouseleave', () => {
    icons.forEach((icon) => {
      gsap.to(icon, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    });
  });
}

// 5. Dynamic Infinite Marquee Scroll para la sección Work con "Pause on Hover"
const rowRightTrack = document.querySelector('.row-right .work-track');
const rowLeftTrack = document.querySelector('.row-left .work-track');
const workContainer = document.querySelector('.work-marquee-container');

if (rowRightTrack && rowLeftTrack) {
  const tweenRight = gsap.fromTo(rowRightTrack, 
    { xPercent: -50 }, 
    { xPercent: 0, repeat: -1, duration: 25, ease: 'none' }
  );

  const tweenLeft = gsap.fromTo(rowLeftTrack, 
    { xPercent: 0 }, 
    { xPercent: -50, repeat: -1, duration: 25, ease: 'none' }
  );

  if (workContainer) {
    workContainer.addEventListener('mouseenter', () => {
      tweenRight.pause();
      tweenLeft.pause();
    });

    workContainer.addEventListener('mouseleave', () => {
      tweenRight.play();
      tweenLeft.play();
    });
  }
}

// 6. Favicon Dinámico
const updateFavicon = (theme) => {
  const favicon = document.querySelector("link[rel='icon']");
  if (!favicon) return;
  
  if (theme === 'light') {
    favicon.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23f4f4f7'/><text x='50%' y='65%' font-family='sans-serif' font-weight='900' font-size='42' fill='%234f46e5' text-anchor='middle'>JS.</text></svg>";
  } else {
    favicon.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%2308080a'/><text x='50%' y='65%' font-family='sans-serif' font-weight='900' font-size='42' fill='%236366f1' text-anchor='middle'>JS.</text></svg>";
  }
};

// 7. Toggle de Tema Claro / Oscuro
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
  document.body.classList.add('light-theme');
  if (themeToggleBtn) themeToggleBtn.textContent = '🌙 Dark';
  updateFavicon('light');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    const theme = isLight ? 'light' : 'dark';
    
    themeToggleBtn.textContent = isLight ? '🌙 Dark' : '☀️ Light';
    localStorage.setItem('theme', theme);
    updateFavicon(theme);
  });
}