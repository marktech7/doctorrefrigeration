// Doctor Refrigeration Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Initialize testimonial slider
    if (testimonialSlides.length > 0) {
        showSlide(currentSlide);
        
        // Add click event to dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentSlide = i;
                showSlide(currentSlide);
            });
        });
        
        // Auto slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Video Modal
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoPlay = document.querySelector('.video-play');
    const closeModal = document.querySelector('.close-modal');
    
    if (videoPlay && videoModal && videoPlayer) {
        videoPlay.addEventListener('click', function(e) {
            e.preventDefault();
            const videoSrc = this.getAttribute('data-video');
            videoPlayer.querySelector('source').src = videoSrc;
            videoPlayer.load();
            videoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Auto play video when modal opens
            setTimeout(() => {
                videoPlayer.play();
            }, 500);
        });
        
        closeModal.addEventListener('click', function() {
            videoModal.style.display = 'none';
            videoPlayer.pause();
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside the content
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.style.display = 'none';
                videoPlayer.pause();
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close modal with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.style.display === 'flex') {
                videoModal.style.display = 'none';
                videoPlayer.pause();
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Form submission is now handled by FormSubmit service
    // No JavaScript needed for basic form functionality
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Refresh AOS on window resize
    window.addEventListener('resize', function() {
        AOS.refresh();
    });
});