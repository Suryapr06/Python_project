// SILDIA Corporate Website Interactivity & Visual Effects

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initHeaderScroll();
  initScrollReveal();
  initHeroCanvas();
  initFormValidation();
});

/* ==========================================
   Mobile Navigation Menu
   ========================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = navMenu.querySelectorAll('a');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* ==========================================
   Header Scroll State Change
   ========================================== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const checkScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Run once initially
}

/* ==========================================
   Intersection Observer for Scroll Reveal & Active Navigation
   ========================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-btn)');

  // Reveal observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optional: stop observing once revealed
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(element => {
    revealObserver.observe(element);
  });

  // Active section nav link highlighting & URL masking
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Dynamic URL masking
        if (id === 'home') {
          history.replaceState(null, null, window.location.pathname);
        } else {
          const cleanPath = window.location.pathname.replace(/\/$/, '') + '/' + id;
          history.replaceState(null, null, cleanPath);
        }
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '-20% 0px -40% 0px'
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Intercept anchor clicks for smooth scroll & clean URL rewrite
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          
          // Update URL bar immediately
          if (targetId === 'home') {
            history.replaceState(null, null, window.location.pathname);
          } else {
            const cleanPath = window.location.pathname.replace(/\/$/, '') + '/' + targetId;
            history.replaceState(null, null, cleanPath);
          }
        }
      }
    });
  });
}

/* ==========================================
   Interactive Hero Canvas Network Graph
   ========================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  // Set size
  const resizeCanvas = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Particle Settings
  const particles = [];
  const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000));
  const connectionDistance = 120;
  
  // Color configuration
  const primaryColor = '242, 153, 74';  // Orange
  const secondaryColor = '33, 150, 83'; // Green

  // Mouse Interaction
  const mouse = {
    x: null,
    y: null,
    radius: 150
  };

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? primaryColor : secondaryColor;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Boundary check
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Mouse interactive push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Subtly push particles away
          this.x -= dx / dist * force * 0.8;
          this.y -= dy / dist * force * 0.8;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, 0.8)`;
      ctx.fill();
    }
  }

  // Generate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation Loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const opacity = (1 - (dist / connectionDistance)) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          // Interpolate line colors or use mid-point color
          ctx.strokeStyle = `rgba(${particles[i].color}, ${opacity})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // Dynamic cursor connection lines
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const opacity = (1 - (dist / mouse.radius)) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${secondaryColor}, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

/* ==========================================
   Contact Form Validation & State Handlers
   ========================================== */
function initFormValidation() {
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (!form) return;

  const inputs = form.querySelectorAll('.form-input');
  
  // Reset error displays on input/change
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const errorSpan = document.getElementById(`${input.id}-error`);
      if (errorSpan) {
        errorSpan.style.display = 'none';
        input.style.borderColor = '';
      }
    });

    if (input.tagName === 'SELECT') {
      input.addEventListener('change', () => {
        const errorSpan = document.getElementById(`${input.id}-error`);
        if (errorSpan) {
          errorSpan.style.display = 'none';
          input.style.borderColor = '';
        }
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Full Name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
      showError('name');
      isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      showError('email');
      isValid = false;
    }

    // Validate Company
    const company = document.getElementById('company');
    if (!company.value.trim()) {
      showError('company');
      isValid = false;
    }

    // Validate Selected Service
    const service = document.getElementById('service');
    if (!service.value) {
      showError('service');
      isValid = false;
    }

    // Validate Message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
      showError('message');
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... <span style="display:inline-block; animation: spin-clockwise 1s infinite linear;">&#9696;</span>`;

      setTimeout(() => {
        // Fade out form and fade in success message
        form.style.opacity = '0';
        setTimeout(() => {
          form.style.display = 'none';
          formSuccess.style.display = 'block';
          formSuccess.style.opacity = '0';
          // Trigger layout repaint
          formSuccess.offsetHeight;
          formSuccess.style.transition = 'opacity 0.4s ease';
          formSuccess.style.opacity = '1';
        }, 300);
      }, 1200);
    }
  });

  function showError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.getElementById(`${fieldId}-error`);
    if (field && errorSpan) {
      errorSpan.style.display = 'block';
      field.style.borderColor = '#ef4444';
      field.focus();
    }
  }
}

/* ==========================================
   Dynamic Light/Dark Theme Switcher
   ========================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Apply saved theme preference on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    // Save theme preference to local storage
    if (document.body.classList.contains('light-theme')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });
}

// Deter right-click inspect
document.addEventListener('contextmenu', event => event.preventDefault());

// Deter common DevTools shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J, Ctrl+U)
document.addEventListener('keydown', event => {
  if (
    event.key === 'F12' ||
    (event.ctrlKey && event.shiftKey && ['I', 'C', 'J'].includes(event.key.toUpperCase())) ||
    (event.ctrlKey && event.key.toUpperCase() === 'U')
  ) {
    event.preventDefault();
  }
});
