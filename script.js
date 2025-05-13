// Language Switching
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    const enElements = document.querySelectorAll('.en');
    const ptElements = document.querySelectorAll('.pt');

    // Set initial language
    document.querySelector('[data-lang="en"]').classList.add('active');
    enElements.forEach(el => el.classList.add('active'));

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            
            // Update button states
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update content visibility
            if (lang === 'en') {
                enElements.forEach(el => el.classList.add('active'));
                ptElements.forEach(el => el.classList.remove('active'));
            } else {
                enElements.forEach(el => el.classList.remove('active'));
                ptElements.forEach(el => el.classList.add('active'));
            }
        });
    });

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .timeline-content');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.borderColor = 'transparent';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = 'var(--secondary-color)';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll reveal animation
    const animSections = document.querySelectorAll('.section');
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15
    });

    animSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // Gallery images
    const galleryImages = [
        {
            url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            title: 'Acadia National Park',
            description: 'Beautiful coastal views and hiking trails'
        },
        {
            url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            title: 'Bar Harbor',
            description: 'Charming coastal town with delicious seafood'
        },
        {
            url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            title: 'Sunrise at Cadillac Mountain',
            description: 'First place to see sunrise in the United States'
        },
        {
            url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            title: 'Forest Trails',
            description: 'Peaceful walks through nature'
        },
        {
            url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            title: 'Coastal Views',
            description: 'Stunning ocean vistas'
        },
        {
            url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            title: 'Sunset at Bass Harbor',
            description: 'Magical evening moments'
        }
    ];

    const populateGallery = () => {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;
        
        galleryImages.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-src', image.url);
            galleryItem.innerHTML = `
                <img src="${image.url}" alt="${image.title}">
                <div class="gallery-item-info">
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                </div>
            `;
            galleryGrid.appendChild(galleryItem);
        });
    };

    populateGallery();

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const animateTimeline = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const timelineObserver = new IntersectionObserver(animateTimeline, {
        root: null,
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.8s ease-out';
        timelineObserver.observe(item);
    });

    // Memory placeholders animation
    const memoryPlaceholders = document.querySelectorAll('.memory-placeholder');
    memoryPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            // Here you would typically open a file input or modal for photo upload
            console.log('Photo upload functionality to be implemented');
        });
    });

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hide');
            // Trigger AOS refresh
            AOS.refresh();
        }, 1000);
    });

    // Countdown Timer
    const countdownTarget = new Date('May 16, 2024 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownTarget - now;
        
        if (distance < 0) {
            document.getElementById('days').innerHTML = '00';
            document.getElementById('hours').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '00';
            document.getElementById('seconds').innerHTML = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerHTML = days < 10 ? `0${days}` : days;
        document.getElementById('hours').innerHTML = hours < 10 ? `0${hours}` : hours;
        document.getElementById('minutes').innerHTML = minutes < 10 ? `0${minutes}` : minutes;
        document.getElementById('seconds').innerHTML = seconds < 10 ? `0${seconds}` : seconds;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Music Control
    const musicBtn = document.querySelector('.music-btn');
    const backgroundMusic = document.getElementById('background-music');
    
    musicBtn.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicBtn.classList.add('playing');
        } else {
            backgroundMusic.pause();
            musicBtn.classList.remove('playing');
        }
    });

    // Highlight active section in floating nav
    const siteNavSections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.floating-nav a');
    
    function highlightNavItem() {
        const scrollPosition = window.scrollY + 100;
        
        siteNavSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavItem);

    // Gallery Lightbox
    if (document.querySelector('.gallery-grid')) {
        lightGallery(document.querySelector('.gallery-grid'), {
            selector: '.gallery-item',
            counter: false,
            download: false,
            backdropDuration: 400,
            speed: 500
        });
    }

    // Parallax effect for sections with parallax-section class
    const parallaxSections = document.querySelectorAll('.parallax-section');
    window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
            const scrolled = window.pageYOffset;
            const sectionOffset = section.offsetTop;
            const distance = scrolled - sectionOffset;
            
            if (distance < 0) return;
            
            section.style.backgroundPositionY = distance * 0.4 + 'px';
        });
    });
}); 