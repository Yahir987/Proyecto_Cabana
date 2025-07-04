// Aquí podés agregar funciones interactivas más adelante
console.log("¡Sitio cargado correctamente!");

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        // Toggle aria-expanded for accessibility
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if navMenu is active and close it
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close mobile menu if window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Smooth scrolling for anchor links (if you add them later, e.g., <a href="#section-id">)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Avoid scrolling to top if href is just '#'
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Adjust offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling (basic alert, replace with actual backend logic)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show a success message
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            form.reset();
        });
    });
    
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            document.body.appendChild(lightbox);
            
            // Close lightbox
            lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
                lightbox.remove();
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.remove();
                }
            });

            // Optional: Close with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && document.querySelector('.lightbox')) {
                    document.querySelector('.lightbox').remove();
                }
            }, { once: true }); // Run once and remove listener
        });
    });

    // Intersection Observer for scroll-fade-in effect
    const fadeInElements = document.querySelectorAll('.section, .footer-content, .hero-content'); // Apply to main sections and hero content
    
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        el.classList.add('fade-in'); // Add initial class
        observer.observe(el);
    });
});

// Add lightbox styles dynamically (moved from CSS for simplicity, can be in CSS too)
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        animation: fadeIn 0.3s forwards;
    }
    
    @keyframes fadeIn {
        to { opacity: 1; }
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px; /* Consistent border-radius */
        overflow: hidden; /* Ensure image corners are rounded */
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 85vh; /* Allow more height */
        display: block;
        border-radius: 8px;
        object-fit: contain; /* Ensure image fits well */
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px; /* Adjust position */
        right: 0px; /* Adjust position */
        background: none;
        border: none;
        color: white;
        font-size: 2.5rem; /* Más grande */
        cursor: pointer;
        padding: 5px;
        line-height: 1; /* Para evitar espacio extra */
        transition: transform 0.2s ease;
    }
    .lightbox-close:hover {
        transform: rotate(90deg); /* Animación al cerrar */
    }

    /* Styles for scroll-fade-in effect */
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(lightboxStyles);

