document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Toggle body scroll
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

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

  // Initialize animations
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero section animations
  gsap.from(".hero-text h4", { opacity: 0, y: 20, duration: 0.8, delay: 0.2 });
  gsap.from(".hero-text h1", { opacity: 0, y: 20, duration: 0.8, delay: 0.4 });
  gsap.from(".hero-text h3", { opacity: 0, y: 20, duration: 0.8, delay: 0.6 });
  gsap.from(".hero-text p", { opacity: 0, y: 20, duration: 0.8, delay: 0.8 });
  gsap.from(".hero-btns", { opacity: 0, y: 20, duration: 0.8, delay: 1 });
  gsap.from(".img-container", { 
    opacity: 0, 
    scale: 0.8, 
    duration: 1, 
    delay: 0.8, 
    ease: "back.out(1.4)" 
  });
});