document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
    
    // Hero section animations
    const heroFeatures = document.querySelectorAll('.hero-feature');
    
    // Animate hero features with a staggered delay
    heroFeatures.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
    
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                heroBackground.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }
        });
    }
    
    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Deactivate all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial and activate its dot
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current index
        currentIndex = index;
    }
    
    // Event listeners for dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Event listeners for prev/next buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = testimonialCards.length - 1;
            }
            showTestimonial(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonialCards.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        });
    }
    
    // Auto-rotate testimonials every 5 seconds
    let testimonialInterval = setInterval(function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonialCards.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }, 5000);
    
    // Pause auto-rotation when hovering over testimonials
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', function() {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', function() {
            testimonialInterval = setInterval(function() {
                let newIndex = currentIndex + 1;
                if (newIndex >= testimonialCards.length) {
                    newIndex = 0;
                }
                showTestimonial(newIndex);
            }, 5000);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to mobile menu button when clicked
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    
    // Video placeholders click handler (in a real site, this would open a video player)
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            // This is where you would typically implement video playback
            // For this demo, we'll just add a clicked class
            this.classList.toggle('clicked');
            
            // Example alert to show interaction
            alert('Video would play here in a real implementation.');
        });
    });
    
    // Scroll to top when logo is clicked
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add scroll event listener to change header style on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
