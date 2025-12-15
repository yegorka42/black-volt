// Add enhanced styles and particles effect
const enhancedStyles = `
    @keyframes pulse {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.7); }
        70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(255, 107, 53, 0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 107, 53, 0); }
    }
    
    @keyframes glow {
        0% { text-shadow: 0 0 5px rgba(255, 107, 53, 0.5); }
        50% { text-shadow: 0 0 20px rgba(255, 107, 53, 1); }
        100% { text-shadow: 0 0 5px rgba(255, 107, 53, 0.5); }
    }
    
    @keyframes particle-burst {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
    }
    
    .pulse-effect {
        animation: pulse 2s infinite;
    }
    
    .glow-effect {
        animation: glow 2s ease-in-out infinite alternate;
    }
    
    .particle {
        position: absolute;
        width: 6px;
        height: 6px;
        background: #ff6b35;
        border-radius: 50%;
        pointer-events: none;
        animation: particle-burst 0.6s ease-out forwards;
    }
    
    .service-card {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .service-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .advantage-item {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.6s ease;
    }
    
    .advantage-item.visible {
        opacity: 1;
        transform: translateX(0);
    }
    
    .contact-item {
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.4s ease;
    }
    
    .contact-item.visible {
        opacity: 1;
        transform: scale(1);
    }
`;

// Add enhanced styles to head
const style = document.createElement('style');
style.textContent = enhancedStyles;
document.head.appendChild(style);

// Function to create particle effects
function createParticles(element, count = 12) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const angle = (i / count) * Math.PI * 2;
        const distance = 30 + Math.random() * 40;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = `hsl(${Math.random() * 60 + 15}, 100%, 60%)`;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 600);
    }
}

// Add dynamic background effect
function initDynamicBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        const gradientX = mouseX * 100;
        const gradientY = mouseY * 100;
        
        hero.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255, 107, 53, 0.3) 0%, transparent 70%), var(--gradient-dark)`;
    });
}

// Enhanced Mobile Menu Toggle with visual effects
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Add visual effect
            if (nav.classList.contains('active')) {
                createParticles(this, 6);
            }
        });
    }
}

// Enhanced Smooth Scrolling with active link highlighting
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const nav = document.querySelector('.nav');
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Enhanced Header Scroll Effect with logo glow
function initHeaderScroll() {
    const header = document.querySelector('.header');
    const logo = document.querySelector('.logo h1');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 8px 30px rgba(255, 107, 53, 0.4)';
            logo.classList.add('glow-effect');
        } else {
            header.style.background = 'var(--gradient-dark)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 5px 20px rgba(255, 107, 53, 0.3)';
            logo.classList.remove('glow-effect');
        }
    });
}

// Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Simple validation
            if (!formData.name || !formData.phone || !formData.service) {
                alert('Пожалуйста, заполните все обязательные поля.');
                return;
            }
            
            // Phone validation (simple)
            const phoneRegex = /^[\+]?[7-8]?[\s\-\(]?[\d]{3}[\)\s\-]?[\d]{3}[\s\-]?[\d]{2}[\s\-]?[\d]{2}$/;
            if (!phoneRegex.test(formData.phone)) {
                alert('Пожалуйста, введите корректный номер телефона.');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('.submit-button');
            const originalButtonText = submitButton.textContent;
            
            submitButton.textContent = 'Отправка...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// CTA Button Click Handler with pulse effect
function initCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        // Add pulse effect on page load
        setTimeout(() => {
            ctaButton.classList.add('pulse-effect');
        }, 2000);
        
        // Remove pulse effect after first click
        ctaButton.addEventListener('click', function() {
            this.classList.remove('pulse-effect');
            
            const contactsSection = document.getElementById('contacts');
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactsSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }
}

// Enhanced Service Buttons with visual feedback
function initServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-button');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
            
            const serviceCard = this.closest('.service-card');
            const serviceTitle = serviceCard.querySelector('h3').textContent;
            
            // Scroll to contact form and select corresponding service
            const contactsSection = document.getElementById('contacts');
            const serviceSelect = document.getElementById('service');
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactsSection.offsetTop - headerHeight;
            
            // Map service titles to select values
            const serviceMap = {
                'Электромонтаж в квартирах': 'apartment',
                'Электромонтаж в офисах': 'office',
                'Промышленный электромонтаж': 'industrial',
                'Электроремонт': 'repair'
            };
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                if (serviceMap[serviceTitle]) {
                    serviceSelect.value = serviceMap[serviceTitle];
                    // Highlight the select field
                    serviceSelect.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.6)';
                    setTimeout(() => {
                        serviceSelect.style.boxShadow = '';
                    }, 2000);
                }
            }, 500);
        });
    });
}

// Enhanced Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, observerOptions);
    
    // Observe elements for enhanced animation
    const animatedElements = document.querySelectorAll('.service-card, .advantage-item, .contact-item');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Phone Number Click Handler
function initPhoneClicks() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track phone clicks (in real project this would be analytics)
            console.log('Phone number clicked:', this.href);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initContactForm();
    initCTAButton();
    initServiceButtons();
    initScrollAnimations();
    initPhoneClicks();
    
    // Add click effects to all buttons
    const allButtons = document.querySelectorAll('button, .cta-button, .service-button, .submit-button');
    allButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            createParticles(this, 8);
        });
    });
    
    // Initialize dynamic background
    initDynamicBackground();
    
    console.log('Black-Volt enhanced website initialized successfully!');
});
