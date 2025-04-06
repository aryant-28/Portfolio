// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const backToTop = document.querySelector('.back-to-top');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Add scroll event listener
    window.addEventListener('scroll', function() {
        // Sticky navbar
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
            backToTop.classList.add('active');
        } else {
            navbar.classList.remove('sticky');
            backToTop.classList.remove('active');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.section-header, .hero-content, .about-content, .service-card, .project-card, .contact-content');

    const scrollReveal = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollReveal);
    scrollReveal(); // Initial check

    // Typing Animation for Hero Section
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.textContent = '';
        
        const typing = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        };
        
        typing();
    };

    const greeting = document.querySelector('.greeting');
    if (greeting) {
        typeWriter(greeting, "Hello, I'm");
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Skill bar animation
    const skillSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress-line span');

    function showProgress() {
        progressBars.forEach(progressBar => {
            const dataWidth = progressBar.getAttribute('data-width');
            progressBar.style.width = dataWidth;
        });
    }

    function hideProgress() {
        progressBars.forEach(progressBar => {
            progressBar.style.width = 0;
        });
    }

    // Initial check if skills section is in viewport
    let skillsObserved = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!skillsObserved) {
                    showProgress();
                    skillsObserved = true;
                }
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillSection);

    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

    formInputs.forEach(input => {
        // Add focus animations
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                // Add success animation
                contactForm.classList.add('success');
                // Here you would typically send the form data to a server
                setTimeout(() => {
                    contactForm.classList.remove('success');
                    contactForm.reset();
                }, 3000);
            }
        });
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    // Skill Bar Animation
    const skillBars = document.querySelectorAll('.progress-line span');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    };

    // Intersection Observer for skill bars
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }

    // Cursor Animation
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}); 