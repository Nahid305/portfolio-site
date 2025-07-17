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
});

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