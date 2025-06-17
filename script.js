document.addEventListener('DOMContentLoaded', function() {
    // Initialize Stripe
    const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Replace with your publishable key
    const elements = stripe.elements();
    
    // Create and mount the Stripe card Element
    const cardElement = elements.create('card', {
        style: {
            base: {
                color: '#ffffff',
                fontFamily: '"Roboto", sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        }
    });
    
    // Mount the card Element
    const cardMount = document.getElementById('card-element');
    if (cardMount) {
        cardElement.mount('#card-element');
    }
    
    // Handle real-time validation errors from the card Element
    cardElement.on('change', function(event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });
    
    // Payment Method Selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForms = document.querySelectorAll('.payment-method-form');
    let currentPaymentMethod = 'card'; // Default payment method
    
    // Add click event listeners to payment method options
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Get the payment method from data attribute
            const paymentMethod = this.getAttribute('data-method');
            
            // Update active class on payment methods
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all payment forms
            paymentForms.forEach(form => form.classList.add('hidden'));
            
            // Show the selected payment form
            const selectedForm = document.getElementById(`${paymentMethod}-payment-form`);
            if (selectedForm) {
                selectedForm.classList.remove('hidden');
            }
            
            // Update current payment method
            currentPaymentMethod = paymentMethod;
        });
    });
    // Reveal animations for sections
    const revealElements = document.querySelectorAll('.service-card, .training-card, .pricing-card, .contact-form, .contact-info');
    
    // Intersection Observer for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
            
    // Booking Modal Functionality
    const modal = document.getElementById('bookingModal');
    const bookButtons = document.querySelectorAll('.book-btn');
    const closeModal = document.querySelector('.close-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const programInput = document.getElementById('program');
    const packageSelect = document.getElementById('package');
    
    // Program packages and pricing
    const programPackages = {
        'Free Consultation': [
            { name: 'Initial Consultation (60 min)', price: 0 }
        ],
        'Mobility Programs': [
            { name: 'Shoulder Mobility - 4 weeks', price: 500 },
            { name: 'Hip & Lower Body - 4 weeks', price: 500 },
            { name: 'Full Body Program - 8 weeks', price: 920 }
        ],
        'Recovery Flows': [
            { name: 'Post-Game Recovery - 4 weeks', price: 500 },
            { name: 'In-Season Maintenance - 8 weeks', price: 920 },
            { name: 'Injury Prevention - 12 weeks', price: 1260 }
        ],
        'Custom Coaching': [
            { name: 'Initial Assessment + 4 Sessions', price: 396 },
            { name: 'Initial Assessment + 8 Sessions', price: 752 },
            { name: 'Initial Assessment + 12 Sessions', price: 1068 }
        ],
        'In-Person Performance Training': [
            { name: '10 sessions (90min)', price: 990 },
            { name: '10 sessions (90min) - Discounted', price: 890 },
            { name: '20 sessions (60min)', price: 1680 },
            { name: '20 sessions (60min) - Discounted', price: 1480 }
        ],
        'Online Training Program': [
            { name: '4 weeks', price: 500 },
            { name: '8 weeks', price: 920 },
            { name: '12 weeks', price: 1260 }
        ],
        'Hybrid Training Program': [
            { name: '4 weeks + 4 in-person sessions', price: 856 },
            { name: '8 weeks + 8 in-person sessions', price: 1512 },
            { name: '12 weeks + 12 in-person sessions', price: 2028 }
        ]
    };
    
    // Open modal when a book button is clicked
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the program name from the data attribute
            const program = this.getAttribute('data-program');
            programInput.value = program;
            
            // Clear and populate package options
            packageSelect.innerHTML = '<option value="">-- Select a package --</option>';
            
            if (programPackages[program]) {
                programPackages[program].forEach((pkg, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = `${pkg.name} - $${pkg.price}`;
                    packageSelect.appendChild(option);
                });
                
                // If there's only one package (like for Free Consultation), select it automatically
                if (programPackages[program].length === 1) {
                    packageSelect.value = "0";
                }
            }
            
            // Reset form and show first step
            resetBookingForm();
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close modal when X is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }
    
    // Close modal when confirmation close button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
    
    // Multi-step form navigation
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.booking-step');
            const nextStepId = this.getAttribute('data-next');
            const nextStep = document.getElementById(nextStepId);
            
    // Validate current step before proceeding
    const isValid = validateStep(currentStep.id);
    
    // Only proceed if validation passes
    if (isValid) {
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
        
        // If moving to step 3 (payment), update summary
        if (nextStepId === 'step3') {
            updateOrderSummary();
        }
    }
    // If validation fails, stay on current step (validation errors are displayed in the validateStep function)
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.booking-step');
            const prevStepId = this.getAttribute('data-prev');
            const prevStep = document.getElementById(prevStepId);
            
            currentStep.classList.remove('active');
            prevStep.classList.add('active');
        });
    });
    
    // Complete booking button
    const completeBookingBtn = document.getElementById('completeBooking');
    
    if (completeBookingBtn) {
        completeBookingBtn.addEventListener('click', function() {
            // Validate payment information
            const isValid = validateStep('step3');
            
            // Only proceed if validation passes
            if (isValid) {
                // Process payment
                if (programInput.value === 'Free Consultation') {
                    // For free consultations, skip payment processing
                    console.log('Free consultation booked - no payment required');
                    proceedToConfirmation();
                } else {
                    // Process payment based on selected payment method
                    console.log(`Processing payment with ${currentPaymentMethod}...`);
                    
                    switch(currentPaymentMethod) {
                        case 'card':
                            // Process with Stripe
                            processStripePayment();
                            break;
                        case 'paypal':
                            // Process with PayPal
                            processPayPalPayment();
                            break;
                        case 'venmo':
                            // Process with Venmo
                            processVenmoPayment();
                            break;
                        case 'googlepay':
                            // Process with Google Pay
                            processGooglePayPayment();
                            break;
                        default:
                            // Default to Stripe
                            processStripePayment();
                    }
                }
                
                // Function to process Stripe payment
                function processStripePayment() {
                    // In a production environment, this would make an AJAX call to your server
                    // to create a PaymentIntent and get the client secret
                    console.log('Processing payment with Stripe...');
                    
                    // Simulate a server request to create a PaymentIntent
                    simulatePaymentIntent(programInput.value, packageSelect.value)
                        .then(clientSecret => {
                            // Use the client secret to confirm the payment
                            return stripe.confirmCardPayment(clientSecret, {
                                payment_method: {
                                    card: cardElement,
                                    billing_details: {
                                        name: document.getElementById('cardName').value
                                    }
                                }
                            });
                        })
                        .then(result => {
                            if (result.error) {
                                // Show error to customer
                                const errorElement = document.getElementById('card-errors');
                                errorElement.textContent = result.error.message;
                            } else {
                                // Payment succeeded
                                if (result.paymentIntent.status === 'succeeded') {
                                    proceedToConfirmation();
                                }
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            // For demo purposes, proceed to confirmation anyway
                            proceedToConfirmation();
                        });
                }
                
                // Function to process PayPal payment
                function processPayPalPayment() {
                    // In a real implementation, this would redirect to PayPal or use PayPal SDK
                    console.log('Processing payment with PayPal...');
                    
                    // Simulate PayPal payment process
                    setTimeout(() => {
                        console.log('PayPal payment successful');
                        proceedToConfirmation();
                    }, 1500);
                }
                
                // Function to process Venmo payment
                function processVenmoPayment() {
                    // In a real implementation, this would redirect to Venmo or use Venmo SDK
                    console.log('Processing payment with Venmo...');
                    
                    // Simulate Venmo payment process
                    setTimeout(() => {
                        console.log('Venmo payment successful');
                        proceedToConfirmation();
                    }, 1500);
                }
                
                // Function to process Google Pay payment
                function processGooglePayPayment() {
                    // In a real implementation, this would use Google Pay API
                    console.log('Processing payment with Google Pay...');
                    
                    // Simulate Google Pay payment process
                    setTimeout(() => {
                        console.log('Google Pay payment successful');
                        proceedToConfirmation();
                    }, 1500);
                }
                
                // Function to proceed to confirmation step
                function proceedToConfirmation() {
                    const step3 = document.getElementById('step3');
                    const step4 = document.getElementById('step4');
                    const confirmationEmail = document.getElementById('confirmationEmail');
                    const bookingEmail = document.getElementById('bookingEmail');
                    
                    confirmationEmail.textContent = bookingEmail.value;
                    
                    step3.classList.remove('active');
                    step4.classList.add('active');
                }
            }
        });
    }
    
    // Helper functions for Stripe integration
    
    // This function simulates creating a PaymentIntent on your server
    // In a real implementation, this would be an AJAX call to your server
    function simulatePaymentIntent(program, packageIndex) {
        return new Promise((resolve) => {
            // Simulate server latency
            setTimeout(() => {
                // In a real implementation, your server would create a PaymentIntent
                // and return the client secret
                const clientSecret = 'pi_' + Math.random().toString(36).substr(2, 9) + '_secret_' + Math.random().toString(36).substr(2, 9);
                resolve(clientSecret);
            }, 1000);
        });
    }
    
    // Other helper functions
    function validateStep(stepId) {
        let isValid = true;
        
        // Clear any previous error messages
        clearValidationErrors();
        
        switch(stepId) {
            case 'step1':
                // Validate program selection
                if (!programInput.value) {
                    displayValidationError(programInput, 'Please select a program');
                    isValid = false;
                }
                
                // Validate package selection
                if (!packageSelect.value) {
                    displayValidationError(packageSelect, 'Please select a package');
                    isValid = false;
                }
                break;
                
            case 'step2':
                // Validate personal information
                const name = document.getElementById('bookingName');
                const email = document.getElementById('bookingEmail');
                const phone = document.getElementById('bookingPhone');
                const date = document.getElementById('bookingDate');
                
                // Required field validation
                if (!name.value.trim()) {
                    displayValidationError(name, 'Please enter your name');
                    isValid = false;
                }
                
                // Email validation with regex pattern
                if (!email.value.trim()) {
                    displayValidationError(email, 'Please enter your email');
                    isValid = false;
                } else if (!validateEmail(email.value.trim())) {
                    displayValidationError(email, 'Please enter a valid email address');
                    isValid = false;
                }
                
                // Phone is required but we're not doing specific format validation
                if (!phone.value.trim()) {
                    displayValidationError(phone, 'Please enter your phone number');
                    isValid = false;
                }
                
                // Date is required
                if (!date.value) {
                    displayValidationError(date, 'Please select a preferred start date');
                    isValid = false;
                }
                break;
                
            case 'step3':
                // Validate payment information based on selected payment method
                if (programInput.value === 'Free Consultation') {
                    // Skip payment validation for free consultations
                    isValid = true;
                } else {
                    // Validate based on the selected payment method
                    switch(currentPaymentMethod) {
                        case 'card':
                            // Validate card payment
                            const cardName = document.getElementById('cardName');
                            if (!cardName.value.trim()) {
                                displayValidationError(cardName, 'Please enter the name on your card');
                                isValid = false;
                            }
                            // For Stripe Elements, we rely on Stripe's built-in validation
                            // The card errors will be displayed in the card-errors element
                            break;
                            
                        case 'paypal':
                        case 'venmo':
                        case 'googlepay':
                            // These payment methods will redirect to their respective platforms
                            // No additional validation needed here
                            isValid = true;
                            break;
                            
                        default:
                            // Default validation
                            isValid = true;
                    }
                }
                break;
        }
        
        return isValid;
    }
    
    // Helper function to validate email format
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to display validation errors
    function displayValidationError(inputElement, errorMessage) {
        // Add error class to the input
        inputElement.classList.add('validation-error');
        
        // Create error message element if it doesn't exist
        let errorElement = inputElement.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            inputElement.parentElement.appendChild(errorElement);
        }
        
        // Set error message
        errorElement.textContent = errorMessage;
        
        // Add event listener to clear error on input
        inputElement.addEventListener('input', function() {
            clearValidationError(inputElement);
        }, { once: true });
    }
    
    // Helper function to clear a specific validation error
    function clearValidationError(inputElement) {
        inputElement.classList.remove('validation-error');
        const errorElement = inputElement.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Helper function to clear all validation errors
    function clearValidationErrors() {
        const errorInputs = document.querySelectorAll('.validation-error');
        errorInputs.forEach(input => {
            input.classList.remove('validation-error');
        });
        
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => {
            message.remove();
        });
    }
    
    function updateOrderSummary() {
        const program = programInput.value;
        const packageIndex = packageSelect.value;
        
        if (program && packageIndex !== '') {
            const selectedPackage = programPackages[program][packageIndex];
            
            document.getElementById('summaryProgram').textContent = program;
            document.getElementById('summaryPackage').textContent = selectedPackage.name;
            document.getElementById('summaryTotal').textContent = `$${selectedPackage.price}`;
        }
    }
    
    function resetBookingForm() {
        // Reset all form fields
        const formInputs = document.querySelectorAll('#bookingSteps input, #bookingSteps textarea, #bookingSteps select');
        formInputs.forEach(input => {
            if (input.id !== 'program') { // Keep the program value
                input.value = '';
            }
        });
        
        // Hide all steps and show the first one
        const steps = document.querySelectorAll('.booking-step');
        steps.forEach(step => {
            step.classList.remove('active');
        });
        
        document.getElementById('step1').classList.add('active');
    }
});
    }, {
        threshold: 0.2
    });
    
    // Observe all reveal elements
    revealElements.forEach(el => {
        el.classList.add('reveal-element');
        revealObserver.observe(el);
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
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
        
        // Add keyboard support
        dot.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
            }
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
        
        // Add keyboard support for previous button
        prevBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                let newIndex = currentIndex - 1;
                if (newIndex < 0) {
                    newIndex = testimonialCards.length - 1;
                }
                showTestimonial(newIndex);
            }
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
        
        // Add keyboard support for next button
        nextBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                let newIndex = currentIndex + 1;
                if (newIndex >= testimonialCards.length) {
                    newIndex = 0;
                }
                showTestimonial(newIndex);
            }
        });
    }
    
    // Add keyboard navigation for testimonial slider
    if (testimonialCards.length > 0) {
        document.addEventListener('keydown', function(e) {
            if (document.activeElement.closest('.testimonial-slider')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    let newIndex = currentIndex - 1;
                    if (newIndex < 0) {
                        newIndex = testimonialCards.length - 1;
                    }
                    showTestimonial(newIndex);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    let newIndex = currentIndex + 1;
                    if (newIndex >= testimonialCards.length) {
                        newIndex = 0;
                    }
                    showTestimonial(newIndex);
                }
            }
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
    
    // Improve accessibility for mobile menu
    if (mobileMenuBtn) {
        // Update the existing click handler to include accessibility attributes
        mobileMenuBtn.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            nav.classList.toggle('active');
        });
    }
    
    // Contact Form Handling with Formspree
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Display form submission status
        const displayFormStatus = (success, name) => {
            // Create success message element
            const statusMessage = document.createElement('div');
            statusMessage.className = success ? 'success-message' : 'error-message';
            
            if (success) {
                statusMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out, ${name}. I'll get back to you soon.</p>
                `;
            } else {
                statusMessage.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Message Failed to Send</h3>
                    <p>There was a problem sending your message. Please try again or contact us directly at info@allwaysathlete.com.</p>
                    <button class="cta-button" id="tryAgainBtn">Try Again</button>
                `;
            }
            
            // Replace form with status message
            contactForm.style.opacity = '0';
            
            setTimeout(() => {
                contactForm.parentNode.replaceChild(statusMessage, contactForm);
                statusMessage.style.opacity = '0';
                
                setTimeout(() => {
                    statusMessage.style.opacity = '1';
                    
                    // Add event listener to "Try Again" button if it exists
                    const tryAgainBtn = document.getElementById('tryAgainBtn');
                    if (tryAgainBtn) {
                        tryAgainBtn.addEventListener('click', function() {
                            // Replace status message with the form again
                            statusMessage.parentNode.replaceChild(contactForm, statusMessage);
                            contactForm.style.opacity = '0';
                            
                            setTimeout(() => {
                                contactForm.style.opacity = '1';
                            }, 50);
                        });
                    }
                }, 50);
            }, 300);
        };
        
        contactForm.addEventListener('submit', function(e) {
            // Formspree will handle the form submission, so we don't need to prevent default
            // However, we'll add some client-side validation and feedback
            
            // Get form values for validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                e.preventDefault();
                alert('Please fill in all fields');
                return;
            }
            
            // Add form submission event listener for success/error handling
            const form = e.target;
            
            // Store the original action to restore it later if needed
            const originalAction = form.action;
            
            // Check if we're in a test environment
            if (originalAction.includes('test-form-id')) {
                // This is just for development/testing - prevent actual submission
                e.preventDefault();
                console.log('Test mode - this would submit to Formspree in production');
                displayFormStatus(true, name);
                return;
            }
            
            // For actual Formspree submission
            form.addEventListener('submit', function(e) {
                // This is handled by Formspree, so we don't prevent default
                
                // Add a loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // We'll use the Formspree AJAX API
                fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    // Success - show success message
                    displayFormStatus(true, name);
                })
                .catch(error => {
                    // Error - show error message
                    console.error('Error:', error);
                    displayFormStatus(false, name);
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
                
                // Prevent the default form submission since we're handling it with fetch
                e.preventDefault();
            });
        });
    }
});
