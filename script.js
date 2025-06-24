document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    
    // Animate theme toggle
    gsap.from(themeToggle, {
      scale: 1.2,
      duration: 0.3,
      ease: "back.out"
    });
  });

  // Set initial theme from localStorage or prefer-color-scheme
  const preferredTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.body.dataset.theme = preferredTheme;

  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Disable scroll when mobile menu is open
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

  // Smooth scrolling for navigation links
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

  // Highlight active section in navigation
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links li a');
  
  function highlightNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', highlightNav);
  highlightNav(); // Run once on load

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('active', window.scrollY > 300);
  });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Add click animation
    gsap.from(backToTop, {
      scale: 0.8,
      duration: 0.3,
      ease: "back.out"
    });
  });

  // Project Filtering
  const filterItems = document.querySelectorAll('.filter-item');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all filter items
      filterItems.forEach(i => i.classList.remove('active'));
      // Add active class to clicked item
      item.classList.add('active');
      
      // Add click animation
      gsap.from(item, {
        scale: 0.9,
        duration: 0.3,
        ease: "back.out"
      });
      
      const filterValue = item.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
          card.style.display = 'block';
          gsap.from(card, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power2.out"
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width') || bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }

  // Initialize skill bars with data attributes
  document.querySelectorAll('.skill-item').forEach(item => {
    const progress = item.querySelector('.skill-progress');
    const percent = item.querySelector('.skill-info span:nth-child(2)').textContent;
    progress.setAttribute('data-width', percent);
    progress.style.width = '0';
  });

  // Circle progress animation
  const circles = document.querySelectorAll('.circle');
  circles.forEach(circle => {
    const percent = circle.getAttribute('data-percent');
    circle.style.setProperty('--percent', percent);
  });

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero text animation
  gsap.utils.toArray(".hero-text h4, .hero-text h1, .hero-text h3, .hero-text p, .hero-btns").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2 + i * 0.1,
      ease: "power3.out"
    });
  });

  // Hero image animation
  gsap.from(".img-container", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    delay: 0.8,
    ease: "back.out(1.4)"
  });

  // Section animations
  gsap.utils.toArray("section").forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out"
    });
  });

  // Project card animations
  gsap.utils.toArray(".project-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: i * 0.1,
      ease: "power2.out"
    });
  });

  // Animate skill bars when skills section is in view
  ScrollTrigger.create({
    trigger: "#skills",
    start: "top 80%",
    onEnter: animateSkillBars
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the form data to a server
      console.log('Form submitted:', data);
      
      // Show success message with animation
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        gsap.from(submitBtn, {
          scale: 1.2,
          duration: 0.3,
          ease: "back.out"
        });
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message';
          this.reset();
        }, 2000);
      }, 1500);
    });
  }

  // Add hover animations to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Add animation to social icons
  document.querySelectorAll('.social-icons a, .social-links a').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        rotate: 360,
        duration: 0.6,
        ease: "back.out"
      });
    });
  });
});