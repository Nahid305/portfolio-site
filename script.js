document.addEventListener('DOMContentLoaded', function() {
  // Initialize custom cursor
  initCustomCursor();
  
  // Initialize 3D Background
  initThreeJS();
  
  // Set current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.dataset.theme;
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.dataset.theme = newTheme;
      localStorage.setItem('theme', newTheme);
      
      gsap.from(themeToggle, {
        scale: 1.2,
        duration: 0.3,
        ease: "back.out"
      });
    });
  }

  // Set initial theme
  const preferredTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.body.dataset.theme = preferredTheme;

  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Hero section animations
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Text animations
    gsap.from(".greeting", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out"
    });
    
    gsap.from(".name", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.4,
      ease: "power3.out"
    });
    
    gsap.from(".title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.6,
      ease: "power3.out"
    });
    
    gsap.from(".description", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.8,
      ease: "power3.out"
    });
    
    gsap.from(".hero-btns", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 1,
      ease: "power3.out"
    });
    
    gsap.from(".img-container", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 0.8,
      ease: "back.out(1.4)"
    });

    // Skills Section Animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate skill cards
    gsap.from(".skill-category-card", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate skill items
    gsap.from(".skill-item", {
      x: -50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate skill level legend
    gsap.from(".skill-level-legend .legend-item", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".skill-level-legend",
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse"
      }
    });

    // Floating animation for section background elements
    gsap.to(".skills-section::before", {
      y: -20,
      rotation: 180,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  } else {
    // Fallback: ensure elements are visible if GSAP fails to load
    console.warn('GSAP not loaded, showing elements without animation');
    const heroSection = document.querySelector('.hero-section');
    const elements = document.querySelectorAll('.greeting, .name, .title, .description, .hero-btns, .img-container');
    
    if (heroSection) {
      heroSection.classList.add('hero-visible');
    }
    
    elements.forEach(el => {
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }

  // Safety timeout: ensure hero elements are visible after 3 seconds
  setTimeout(() => {
    const heroSection = document.querySelector('.hero-section');
    const hiddenElements = document.querySelectorAll('.greeting, .name, .title, .description, .hero-btns, .img-container');
    
    if (heroSection) {
      heroSection.classList.add('loaded');
    }
    
    hiddenElements.forEach(element => {
      if (element && window.getComputedStyle(element).opacity === '0') {
        console.warn('Element still hidden after 3s, forcing visibility:', element.className);
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }, 3000);

  // Typing animation
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const text = typingText.getAttribute('data-text');
    if (text) {
      let i = 0;
      
      function typeWriter() {
        if (i < text.length) {
          typingText.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      }
      
      setTimeout(typeWriter, 1800);
    }
  }

  // Ensure hero elements are visible (fallback)
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.hero-content .greeting, .hero-content .name, .hero-content .title, .hero-content .description, .hero-content .hero-btns, .hero-content .img-container');
    heroElements.forEach(el => {
      if (el && window.getComputedStyle(el).opacity === '0') {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }, 3000); // 3 seconds fallback

  // Skills section animations
  initSkillsAnimations();
});

// Skills Section Animations
function initSkillsAnimations() {
  // Intersection Observer for skills section
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillItems = entry.target.querySelectorAll('.skill-item');
        const categoryCards = entry.target.querySelectorAll('.skill-category-card');
        
        // Add loaded class for fallback CSS
        entry.target.classList.add('loaded');
        
        // Add staggered animations to skill items
        skillItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.animationPlayState = 'running';
            // Fallback: ensure visibility
            setTimeout(() => {
              if (window.getComputedStyle(item).opacity === '0') {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
              }
            }, 1000);
          }, index * 100);
        });

        // Add hover effects
        addSkillHoverEffects();
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
    
    // Safety timeout: ensure skills are visible after 5 seconds
    setTimeout(() => {
      skillsSection.classList.add('loaded');
      const hiddenSkills = skillsSection.querySelectorAll('.skill-item');
      hiddenSkills.forEach(item => {
        if (window.getComputedStyle(item).opacity === '0') {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
          console.warn('Skill item forced visible:', item);
        }
      });
    }, 5000);
  }

  // 3D tilt effect for skill cards
  addSkillCardTiltEffects();
}

// Add 3D tilt effects to skill cards
function addSkillCardTiltEffects() {
  const skillCards = document.querySelectorAll('.skill-category-card');
  
  skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
}

// Add enhanced hover effects
function addSkillHoverEffects() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    const skillIcon = item.querySelector('.skill-icon');
    const skillName = item.querySelector('.skill-name');
    
    item.addEventListener('mouseenter', () => {
      // Create particle effect
      createSkillParticles(skillIcon);
      
      // Add glow effect
      skillIcon.style.boxShadow = '0 0 20px rgba(67, 97, 238, 0.6)';
      
      // Animate skill name
      if (skillName) {
        skillName.style.transform = 'translateX(5px)';
      }
    });
    
    item.addEventListener('mouseleave', () => {
      skillIcon.style.boxShadow = '';
      if (skillName) {
        skillName.style.transform = 'translateX(0)';
      }
    });
  });
}

// Create particle effect for skills
function createSkillParticles(element) {
  try {
    const rect = element.getBoundingClientRect();
    const particles = 5;
    
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        opacity: 1;
        transition: all 0.6s ease-out;
      `;
      
      document.body.appendChild(particle);
      
      // Animate particle
      setTimeout(() => {
        const angle = (i / particles) * Math.PI * 2;
        const distance = 30 + Math.random() * 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = '0';
      }, 10);
      
      // Remove particle
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 600);
    }
  } catch (error) {
    console.warn('Particle effect failed:', error);
  }
}

// 3D Background Initialization
function initThreeJS() {
  const container = document.getElementById('threejs-container');
  if (!container) return;

  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create floating geometry
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
      color: 0x4361ee,
      emissive: 0x3a0ca3,
      specular: 0xffffff,
      shininess: 50,
      transparent: true,
      opacity: 0.6
    });

    const particles = [];
    for (let i = 0; i < 15; i++) {
      const particle = new THREE.Mesh(geometry, material.clone());
      particle.position.x = Math.random() * 20 - 10;
      particle.position.y = Math.random() * 20 - 10;
      particle.position.z = Math.random() * 20 - 10;
      particle.scale.setScalar(Math.random() * 0.5 + 0.5);
      scene.add(particle);
      particles.push(particle);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Animation
    function animate() {
      requestAnimationFrame(animate);
      
      particles.forEach(particle => {
        particle.rotation.x += 0.005;
        particle.rotation.y += 0.005;
      });
      
      renderer.render(scene, camera);
    }
    
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  } catch (error) {
    console.warn('3D background could not be initialized:', error);
  }
}

// Custom cursor initialization (optional)
function initCustomCursor() {
  try {
    if (window.innerWidth > 768) { // Only for desktop
      const cursorDot = document.createElement('div');
      const cursorOutline = document.createElement('div');
      cursorDot.classList.add('cursor-dot');
      cursorOutline.classList.add('cursor-outline');
      document.body.appendChild(cursorDot);
      document.body.appendChild(cursorOutline);
      
      document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        cursorOutline.style.left = `${e.clientX}px`;
        cursorOutline.style.top = `${e.clientY}px`;
      });
      
      // Cursor hover effects
      document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
          cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
          cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
      });
    }
  } catch (error) {
    console.warn('Custom cursor could not be initialized:', error);
  }
}