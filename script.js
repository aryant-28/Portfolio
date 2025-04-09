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

    // Data extraction functions for CV generation
    const extractPersonalInfo = () => {
        const name = document.querySelector('.hero-name')?.textContent || 'Aryan Anil Tuntune';
        const title = document.querySelector('.hero-title')?.textContent || 'Frontend Developer & UI/UX Designer';
        const about = document.querySelector('.about-content p')?.textContent || '';
        
        return {
            name,
            title,
            about,
            contact: {
                email: document.querySelector('.contact-email')?.textContent || 'contact@aryan.com',
                phone: document.querySelector('.contact-phone')?.textContent || '+91 123 456 7890',
                location: document.querySelector('.contact-location')?.textContent || 'Mumbai, India',
                website: document.querySelector('.contact-website')?.textContent || 'www.aryan-portfolio.com',
                linkedin: document.querySelector('.contact-linkedin')?.textContent || 'linkedin.com/in/aryan',
                github: document.querySelector('.contact-github')?.textContent || 'github.com/aryant-28'
            }
        };
    };

    const extractSkills = () => {
        const skillElements = document.querySelectorAll('.skill-item');
        const skills = {
            'Frontend Development': [],
            'Design & Tools': []
        };

        skillElements.forEach(skill => {
            const name = skill.querySelector('.skill-name')?.textContent || '';
            const level = parseInt(skill.querySelector('.progress-line span')?.getAttribute('data-width') || '0');
            const category = skill.closest('.skill-category')?.getAttribute('data-category') || 'Frontend Development';
            
            if (skills[category]) {
                skills[category].push({ name, level });
            }
        });

        return skills;
    };

    const extractProjects = () => {
        const projectElements = document.querySelectorAll('.project-card');
        return Array.from(projectElements).map(project => ({
            title: project.querySelector('.project-title')?.textContent || '',
            role: project.querySelector('.project-role')?.textContent || 'Frontend Developer',
            duration: project.querySelector('.project-duration')?.textContent || '2023',
            points: Array.from(project.querySelectorAll('.project-details li')).map(li => li.textContent || '')
        })).slice(0, 3); // Limit to 3 projects for CV
    };

    const extractEducation = () => {
        const educationSection = document.querySelector('.education-section');
        return {
            degree: educationSection?.querySelector('.education-degree')?.textContent || 'Bachelor of Technology in Computer Science',
            institution: educationSection?.querySelector('.education-institution')?.textContent || 'Mumbai University',
            duration: educationSection?.querySelector('.education-duration')?.textContent || '2020 - 2024',
            achievements: educationSection?.querySelector('.education-achievements')?.textContent || 'First Class with Distinction | Web Development Club Lead'
        };
    };

    // CV Generation and Download Functionality
    const generateCV = async () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true,
            putOnlyUsedFonts: true
        });

        // Extract data from website
        const personalInfo = extractPersonalInfo();
        const skills = extractSkills();
        const projects = extractProjects();
        const education = extractEducation();

        // Define colors and styles
        const colors = {
            primary: [234, 170, 0],      // Gold
            secondary: [30, 41, 59],      // Dark Blue
            text: [30, 41, 59],          // Dark text
            subtext: [71, 85, 105],      // Gray text
            accent: [255, 255, 255],     // White
            divider: [226, 232, 240],    // Light Gray
            background: [249, 250, 251]   // Off-white background
        };

        // Helper function for section headers
        const addSectionHeader = (text, y) => {
            doc.setFillColor(...colors.primary);
            doc.rect(15, y - 5, 3, 10, 'F');
            
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(...colors.secondary);
            doc.text(text.toUpperCase(), 25, y);
            
            return y + 15;
        };

        // Document setup
        doc.setProperties({
            title: `${personalInfo.name} - Professional CV`,
            author: personalInfo.name,
            subject: 'Professional CV/Resume',
            keywords: personalInfo.title,
            creator: 'Portfolio Website'
        });

        // Header background
        doc.setFillColor(...colors.secondary);
        doc.rect(0, 0, 210, 60, 'F');

        // Load and add profile picture
        try {
            const img = new Image();
            img.src = 'assets/images/aryan1.JPEG';
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            const targetDiameter = 25;
            const x = 160;
            const y = 18;

            doc.setFillColor(...colors.secondary);
            doc.circle(x + targetDiameter/2, y + targetDiameter/2, targetDiameter/2, 'F');
            
            doc.addImage(img, 'JPEG', x, y, targetDiameter, targetDiameter, undefined, 'MEDIUM');

            doc.setDrawColor(...colors.primary);
            doc.setLineWidth(0.5);
            doc.circle(x + targetDiameter/2, y + targetDiameter/2, targetDiameter/2, 'S');
        } catch (error) {
            console.error('Error loading profile image:', error);
        }

        // Name and Title
        const nameParts = personalInfo.name.split(' ');
        doc.setTextColor(...colors.accent);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text(nameParts[0], 20, 25);
        doc.text(nameParts.slice(1).join(' '), 20, 35);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(personalInfo.title, 20, 45);

        // Contact Information
        const contactInfo = [
            { icon: '📧', text: personalInfo.contact.email },
            { icon: '📱', text: personalInfo.contact.phone },
            { icon: '📍', text: personalInfo.contact.location },
            { icon: '🌐', text: personalInfo.contact.website },
            { icon: '💼', text: personalInfo.contact.linkedin },
            { icon: '⚡', text: personalInfo.contact.github }
        ];

        doc.setFontSize(8);
        contactInfo.forEach((item, index) => {
            const x = index < 3 ? 20 : 100;
            const y = 60 + ((index % 3) * 5);
            doc.setTextColor(...colors.accent);
            doc.setFont('helvetica', 'bold');
            doc.text(item.icon, x, y);
            doc.setFont('helvetica', 'normal');
            doc.text(item.text, x + 7, y);
        });

        // Professional Summary
        let yPos = addSectionHeader('Professional Summary', 80);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...colors.text);
        const summaryLines = doc.splitTextToSize(personalInfo.about || 'Frontend Developer and UI/UX Designer with expertise in creating responsive web applications...', 175);
        doc.text(summaryLines, 20, yPos);

        const summaryHeight = (summaryLines.length * 9) * 0.3527777778;

        // Technical Skills
        yPos = addSectionHeader('Technical Expertise', yPos + summaryHeight + 5);
        
        Object.entries(skills).forEach(([category, skillSet], categoryIndex) => {
            const startX = 20 + (categoryIndex * 90);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text(category, startX, yPos + 5);
            
            skillSet.forEach((skill, index) => {
                const y = yPos + 12 + (index * 7);
                
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                doc.text(skill.name, startX, y);
                
                doc.setFillColor(...colors.divider);
                doc.roundedRect(startX, y + 2, 75, 2, 1, 1, 'F');
                
                doc.setFillColor(...colors.primary);
                const barWidth = (skill.level / 100) * 75;
                doc.roundedRect(startX, y + 2, barWidth, 2, 1, 1, 'F');
                
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(7);
                doc.text(`${skill.level}%`, startX + barWidth + 3, y + 2);
            });
        });

        const skillsHeight = Math.max(...Object.values(skills).map(s => s.length)) * 7 + 15;

        // Featured Projects
        yPos = addSectionHeader('Featured Projects', yPos + skillsHeight + 5);
        
        projects.forEach((project, index) => {
            const projectY = yPos + 8 + (index * 18);
            
            doc.setFillColor(...colors.primary);
            doc.circle(17, projectY - 1, 0.8, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(...colors.secondary);
            doc.text(project.title, 22, projectY);
            
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(8);
            doc.setTextColor(...colors.subtext);
            doc.text(`${project.role} | ${project.duration}`, 22, projectY + 4);
            
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...colors.text);
            project.points.forEach((point, i) => {
                const bulletY = projectY + 9 + (i * 5);
                doc.setFillColor(...colors.primary);
                doc.circle(24, bulletY - 1, 0.4, 'F');
                doc.text(point, 27, bulletY);
            });
        });

        // Education section
        yPos = addSectionHeader('Education', yPos + 45);
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text(education.degree, 20, yPos + 5);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text(`${education.institution} | ${education.duration}`, 20, yPos + 11);
        doc.setFontSize(8);
        doc.text(education.achievements, 20, yPos + 16);

        // Footer
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(...colors.subtext);
        doc.text(
            `${personalInfo.name} | Professional CV`,
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height - 10,
            { align: 'center' }
        );

        return doc;
    };

    // Update the download button functionality
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            
            // Add downloading animation
            this.classList.add('downloading');
            this.textContent = 'Generating CV...';
            
            try {
                // Generate CV
                const doc = await generateCV();
                
                // Save the PDF
                const fileName = 'Aryan_Tuntune_CV.pdf';
                doc.save(fileName);
                
                // Success feedback
                this.textContent = 'CV Downloaded!';
                setTimeout(() => {
                    this.textContent = 'Download CV';
                    this.classList.remove('downloading');
                }, 2000);
            } catch (error) {
                console.error('CV generation failed:', error);
                // Error feedback
                this.textContent = 'Generation Failed';
                setTimeout(() => {
                    this.textContent = 'Download CV';
                    this.classList.remove('downloading');
                }, 2000);
            }
        });
    }
});