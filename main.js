gsap.registerPlugin(ScrollTrigger);

// 0. Preferencia de movimiento reducido (accesibilidad)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Hero Intro (con split-text palabra por palabra en el H1)
const heroTl = gsap.timeline();
heroTl.from('.badge', { opacity: 0, y: -20, duration: 0.6 })
      .from('.split-word', {
        opacity: 0,
        y: prefersReducedMotion ? 0 : 40,
        rotateX: prefersReducedMotion ? 0 : -40,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out'
      }, '-=0.3')
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
if (!prefersReducedMotion) {
  gsap.to('.icon-1', { y: -12, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.icon-2', { y: 14, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.3 });
  gsap.to('.icon-3', { y: -10, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.2 });
  gsap.to('.icon-4', { y: 12, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });
}

const heroSection = document.querySelector('.hero');
const icons = document.querySelectorAll('.floating-icon');

if (heroSection && !prefersReducedMotion) {
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

if (rowRightTrack && rowLeftTrack && !prefersReducedMotion) {
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
  document.documentElement.classList.add('light-theme'); // ya lo puso el script anti-flash del <head>, se sincroniza igual
  if (themeToggleBtn) themeToggleBtn.textContent = '🌙 Dark';
  updateFavicon('light');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    document.documentElement.classList.toggle('light-theme', isLight);
    const theme = isLight ? 'light' : 'dark';

    themeToggleBtn.textContent = isLight ? '🌙 Dark' : '☀️ Light';
    localStorage.setItem('theme', theme);
    updateFavicon(theme);
  });
}

// 8. Botón Magnético (CTA del hero)
const magneticBtn = document.querySelector('.magnetic-btn');

if (magneticBtn && !prefersReducedMotion) {
  const strength = 0.4;

  magneticBtn.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = magneticBtn.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * strength;
    const y = (e.clientY - top - height / 2) * strength;

    gsap.to(magneticBtn, { x, y, scale: 1.12, duration: 0.4, ease: 'power2.out' });
    gsap.to(magneticBtn.querySelector('.magnetic-btn-text'), { x: x * 0.4, y: y * 0.4, duration: 0.4, ease: 'power2.out' });
  });

  magneticBtn.addEventListener('mouseleave', () => {
    gsap.to(magneticBtn, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    gsap.to(magneticBtn.querySelector('.magnetic-btn-text'), { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  });
}

// 9. Formulario de Contacto (envío real vía Formspree + UI animada)
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const contactSuccess = document.getElementById('contact-success');
const contactResetBtn = document.getElementById('contact-reset');

// 👉 Reemplazá esto por tu endpoint real de Formspree (Paso 3 de la guía)
const FORM_ENDPOINT = 'https://formspree.io/f/xljdgrrr';

if (contactForm && formFeedback) {
  const submitBtn = contactForm.querySelector('.btn-submit');

  const showFeedback = (text, isError) => {
    formFeedback.textContent = text;
    formFeedback.classList.toggle('is-error', !!isError);
    formFeedback.classList.remove('is-visible');
    void formFeedback.offsetWidth; // reinicia la transición
    formFeedback.classList.add('is-visible');
  };

  const shakeInvalidFields = (fields) => {
    fields.forEach((field) => {
      const group = field.closest('.form-group');
      if (!group) return;
      group.classList.remove('has-error');
      void group.offsetWidth; // reinicia la animación si ya tenía la clase
      group.classList.add('has-error');
    });
  };

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();

    const emptyFields = [nameField, emailField, messageField].filter((f) => !f.value.trim());

    if (emptyFields.length) {
      shakeInvalidFields(emptyFields);
      showFeedback('Please fill in all fields before sending.', true);
      return;
    }

    submitBtn.classList.remove('is-success');
    submitBtn.classList.add('is-loading');
    formFeedback.classList.remove('is-visible');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      });

      if (response.ok) {
        submitBtn.classList.remove('is-loading');
        submitBtn.classList.add('is-success');

        // Espera a que termine la animación del check antes de mostrar el panel
        setTimeout(() => {
          contactForm.reset();
          submitBtn.classList.remove('is-success');
          contactForm.style.display = 'none';
          contactSuccess.classList.add('is-visible');
        }, 900);
      } else {
        submitBtn.classList.remove('is-loading');
        shakeInvalidFields([nameField, emailField, messageField]);
        showFeedback('Something went wrong. Please try again or email me directly.', true);
      }
    } catch (err) {
      submitBtn.classList.remove('is-loading');
      shakeInvalidFields([nameField, emailField, messageField]);
      showFeedback('Network error — please check your connection and try again.', true);
    }
  });

  // Limpia el shake de error apenas el usuario vuelve a escribir
  contactForm.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('input', () => {
      field.closest('.form-group')?.classList.remove('has-error');
    });
  });
}

if (contactResetBtn && contactForm && contactSuccess) {
  contactResetBtn.addEventListener('click', () => {
    contactSuccess.classList.remove('is-visible');
    contactForm.style.display = '';
  });
}

// 10. Menú Mobile (hamburguesa)
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const menuOverlay = document.getElementById('menu-overlay');

const closeMobileMenu = () => {
  menuToggle?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  mainNav?.classList.remove('is-open');
  menuOverlay?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

const openMobileMenu = () => {
  menuToggle?.classList.add('is-open');
  menuToggle?.setAttribute('aria-expanded', 'true');
  mainNav?.classList.add('is-open');
  menuOverlay?.classList.add('is-open');
  document.body.classList.add('menu-open');
};

if (menuToggle && mainNav && menuOverlay) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.contains('is-open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  menuOverlay.addEventListener('click', closeMobileMenu);

  // Cierra el menú al navegar a una sección
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Si el usuario agranda la ventana con el menú abierto, lo cerramos
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileMenu();
  });
}

// 11. Scroll-Spy: resalta en el nav la sección visible
const spySections = ['home', 'work', 'about', 'benefits', 'experience', 'contact']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const spyLinks = spySections.map((section) =>
  document.querySelector(`#main-nav a[href="#${section.id}"]`)
);

const setActiveLink = (activeSection) => {
  spySections.forEach((section, i) => {
    spyLinks[i]?.classList.toggle('is-active', section === activeSection);
  });
};

if (spySections[0]) setActiveLink(spySections[0]); // "Home" activo al cargar

spySections.forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => setActiveLink(section),
    onEnterBack: () => setActiveLink(section),
  });
});

// 12. Fallback táctil para el overlay de proyecto en el marquee (sin :hover en touch)
const hasHover = window.matchMedia('(hover: hover)').matches;

if (!hasHover) {
  const marqueeCards = document.querySelectorAll('.work-card');

  marqueeCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const wasActive = card.classList.contains('is-touched');
      marqueeCards.forEach((c) => c.classList.remove('is-touched'));
      if (!wasActive) {
        e.preventDefault();
        card.classList.add('is-touched');
      }
    });
  });

  // Cierra el overlay activo al tocar fuera de cualquier tarjeta
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.work-card')) {
      marqueeCards.forEach((c) => c.classList.remove('is-touched'));
    }
  });
}
