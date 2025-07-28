// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.custom-navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, rgba(131, 153, 150, 0.95), rgba(107, 128, 132, 0.95))';
            navbar.style.boxShadow = '0 2px 20px rgba(131, 153, 150, 0.3)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))';
            navbar.style.boxShadow = '0 2px 20px rgba(131, 153, 150, 0.1)';
        }
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 40);
        });
        
        statsAnimated = true;
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger stats animation when stats section is visible
                if (entry.target.classList.contains('stats-section')) {
                    setTimeout(animateStats, 500);
                }
            }
        });
    }, observerOptions);

    // Add scroll animation class to elements
    const animatedElements = document.querySelectorAll('.process-card, .workshop-image, .innovation-item, .stats-section');
    animatedElements.forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Show success message
            showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }, 2000);
    });

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 350px;
        `;
        
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            margin-left: auto;
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button functionality
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Image hover effects
    const workshopImages = document.querySelectorAll('.workshop-image');
    
    workshopImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Process cards animation delay
    const processCards = document.querySelectorAll('.process-card');
    processCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Innovation items stagger effect
    const innovationItems = document.querySelectorAll('.innovation-item');
    innovationItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Mobile menu enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect with delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-section h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 1000);

    // Lazy loading for image placeholders
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    });

    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    imagePlaceholders.forEach(placeholder => {
        imageObserver.observe(placeholder);
    });

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(() => {
        updateActiveNav();
        // Add any other scroll-based functions here
    }, 100);

    window.addEventListener('scroll', throttledScrollHandler);

    // Initialize AOS-like animations
    function initScrollAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const animationType = element.getAttribute('data-aos');
            const delay = element.getAttribute('data-aos-delay') || 0;
            
            element.style.transitionDelay = `${delay}ms`;
            
            observer.observe(element);
        });
    }

    // Add data-aos attributes to elements
    document.querySelectorAll('.process-card').forEach((card, index) => {
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', index * 200);
    });

    document.querySelectorAll('.innovation-item').forEach((item, index) => {
        item.setAttribute('data-aos', 'slide-right');
        item.setAttribute('data-aos-delay', index * 150);
    });

    // Initialize all scroll animations
    initScrollAnimations();

    console.log('Óptica Solmar website loaded successfully!');
});