(function () {
    var navToggle = document.querySelector('.nav-toggle');
    var navMenu = document.getElementById('nav-menu');
  
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function () {
        var open = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(open));
      });
    }

    var siteHeader = document.querySelector('.site-header');
    var primaryNav = document.querySelector('.primary-nav');
    
    function handleNavbarResize() {
      var scrollY = window.scrollY;
      var threshold = 50;
      
      if (scrollY > threshold) {
        siteHeader.classList.add('scrolled');
        primaryNav.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
        primaryNav.classList.remove('scrolled');
      }
    }
    
    var ticking = false;
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(handleNavbarResize);
        ticking = true;
        setTimeout(function() { ticking = false; }, 16); 
      }
    }
    
    window.addEventListener('scroll', requestTick);

    handleNavbarResize();

    var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    var sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavItem() {
      var scrollY = window.scrollY;
      var navHeight = document.querySelector('.site-header').offsetHeight;
      
      var currentSection = '';
      
      sections.forEach(function(section) {
        var sectionTop = section.offsetTop - navHeight - 50;
        var sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      
      //highlight last section
      if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
        currentSection = sections[sections.length - 1].getAttribute('id');
      }
      
      navLinks.forEach(function(link) {
        link.classList.remove('is-active');
        if (link.getAttribute('href') === '#' + currentSection) {
          link.classList.add('is-active');
        }
      });
    }
    
    var positionTicking = false;
    function requestPositionTick() {
      if (!positionTicking) {
        requestAnimationFrame(updateActiveNavItem);
        positionTicking = true;
        setTimeout(function() { positionTicking = false; }, 16);
      }
    }
    
    window.addEventListener('scroll', requestPositionTick);
    
    updateActiveNavItem();

    //carousel
    var carouselSlides = document.querySelectorAll('.carousel-slide');
    var carouselIndicators = document.querySelectorAll('.carousel-indicator');
    var prevBtn = document.querySelector('.carousel-btn--prev');
    var nextBtn = document.querySelector('.carousel-btn--next');
    var currentSlide = 0;
    var totalSlides = carouselSlides.length;
    
    function showSlide(slideIndex) {
      carouselSlides.forEach(function(slide) {
        slide.classList.remove('active');
      });
      carouselIndicators.forEach(function(indicator) {
        indicator.classList.remove('active');
      });
      
      carouselSlides[slideIndex].classList.add('active');
      carouselIndicators[slideIndex].classList.add('active');
      
      currentSlide = slideIndex;
    }
    
    function nextSlide() {
      var nextIndex = (currentSlide + 1) % totalSlides;
      showSlide(nextIndex);
    }
    
    function prevSlide() {
      var prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(prevIndex);
    }
  
    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }
    
    carouselIndicators.forEach(function(indicator, index) {
      indicator.addEventListener('click', function() {
        showSlide(index);
      });
    });
    
    var autoPlayInterval;
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    startAutoPlay();
    
    var carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoPlay);
      carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    //modals
    var clickableTestimonials = document.querySelectorAll('.testimonial--clickable');
    var modals = document.querySelectorAll('.modal');
    var modalCloseButtons = document.querySelectorAll('.modal-close');
    
    clickableTestimonials.forEach(function(testimonial) {
      testimonial.addEventListener('click', function() {
        var modalId = this.getAttribute('data-modal');
        var modal = document.getElementById(modalId);
        
        if (modal) {
          modal.classList.add('is-open');
          modal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      });
    });
    
    function closeModal(modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    
    modalCloseButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        var modal = this.closest('.modal');
        closeModal(modal);
      });
    });
    
    modals.forEach(function(modal) {
      var modalBackdrop = modal.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.addEventListener('click', function() {
          closeModal(modal);
        });
      }
    });
  })();
  