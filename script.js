// Language Switching
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    const enElements = document.querySelectorAll('.en, .highlight-text h5.en, .highlight-text p.en');
    const ptElements = document.querySelectorAll('.pt, .highlight-text h5.pt, .highlight-text p.pt');

    // Set initial language - default to English
    const setLanguage = (lang) => {
        // Update button states
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
        
        // Update content visibility
        if (lang === 'en') {
            enElements.forEach(el => el.classList.add('active'));
            ptElements.forEach(el => el.classList.remove('active'));
            document.documentElement.lang = 'en';
        } else {
            enElements.forEach(el => el.classList.remove('active'));
            ptElements.forEach(el => el.classList.add('active'));
            document.documentElement.lang = 'pt';
        }
    };

    // Initialize with English
    setLanguage('en');

    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            setLanguage(lang);
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
            url: 'images/gallery/acadia1.jpg',
            title: 'Acadia National Park',
            description: 'Beautiful coastal views and hiking trails'
        },
        {
            url: 'images/bar-harbor.jpg',
            title: 'Bar Harbor',
            description: 'Charming coastal town with delicious seafood'
        },
        {
            url: 'images/gallery/cadillac-mountain.jpg',
            title: 'Sunrise at Cadillac Mountain',
            description: 'First place to see sunrise in the United States'
        },
        {
            url: 'images/gallery/acadia4.jpg',
            title: 'Forest Trails',
            description: 'Peaceful walks through nature'
        },
        {
            url: 'images/gallery/acadia5.jpg',
            title: 'Coastal Views',
            description: 'Stunning ocean vistas'
        },
        {
            url: 'images/gallery/acadia3.jpg',
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
    
    // Initialize Google Map
    const initHoneymoonMap = () => {
        const mapContainer = document.getElementById('honeymoon-map');
        if (!mapContainer) return;
        
        // Load Google Maps API
        const loadGoogleMapsApi = () => {
            if (window.google && window.google.maps) {
                initMap();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDq-WSH9gcX98nxD-IYyOxbPfVRl29a8i8&callback=initMap';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            
            window.initMap = initMap;
        };
        
        // Initialize the map with markers
        const initMap = () => {
            const acadiaPosition = { lat: 44.3386, lng: -68.2733 };
            const map = new google.maps.Map(mapContainer, {
                center: acadiaPosition,
                zoom: 12,
                mapTypeId: 'terrain',
                styles: [
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{"color": "#DDDDDD"}, {"lightness": 40}]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [{"color": "#AAAAAA"}, {"lightness": 20}]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [{"color": "#777777"}, {"lightness": 60}]
                    }
                ]
            });
            
            // Define marker locations
            const locations = [
                {
                    position: { lat: 44.3879, lng: -68.2045 },
                    title: "Acadia Inn",
                    category: "accommodation",
                    content: "Our accommodation for the honeymoon. Modern rooms with a great location near Acadia National Park entrance."
                },
                {
                    position: { lat: 44.3568, lng: -68.2346 },
                    title: "Cadillac Mountain",
                    category: "scenic",
                    content: "The highest point on the U.S. Atlantic coast, offering breathtaking views of the surrounding islands and ocean."
                },
                {
                    position: { lat: 44.3211, lng: -68.1893 },
                    title: "Thunder Hole",
                    category: "attraction",
                    content: "A natural rock formation where waves crash into a narrow inlet, creating a thunderous sound."
                },
                {
                    position: { lat: 44.3398, lng: -68.2429 },
                    title: "Jordan Pond",
                    category: "scenic",
                    content: "Crystal clear pond with spectacular views of the 'Bubbles' mountains, perfect for a scenic walk."
                },
                {
                    position: { lat: 44.2529, lng: -68.3871 },
                    title: "Bass Harbor Head Lighthouse",
                    category: "attraction",
                    content: "Historic lighthouse built in 1858, one of the most photographed spots in Maine."
                },
                {
                    position: { lat: 44.3879, lng: -68.2045 },
                    title: "Side Street Café",
                    category: "food",
                    content: "Known for their award-winning lobster mac & cheese and extensive craft beer selection."
                },
                {
                    position: { lat: 44.3920, lng: -68.2100 },
                    title: "Bar Harbor Downtown",
                    category: "attraction",
                    content: "Charming downtown with boutique shops, restaurants, and waterfront views."
                },
                {
                    position: { lat: 44.3282, lng: -68.1834 },
                    title: "Sand Beach",
                    category: "attraction",
                    content: "A rare sandy beach in Acadia, perfect for relaxation and enjoying the Atlantic breeze."
                }
            ];
            
            // Create markers with custom icons
            const markerIcons = {
                accommodation: 'https://maps.google.com/mapfiles/ms/icons/gray-dot.png',
                attraction: 'https://maps.google.com/mapfiles/ms/icons/white-dot.png',
                food: 'https://maps.google.com/mapfiles/ms/icons/black-dot.png',
                scenic: 'https://maps.google.com/mapfiles/ms/icons/ltblue-dot.png'
            };
            
            const infoWindow = new google.maps.InfoWindow();
            
            locations.forEach(location => {
                const marker = new google.maps.Marker({
                    position: location.position,
                    map: map,
                    title: location.title,
                    icon: markerIcons[location.category],
                    animation: google.maps.Animation.DROP
                });
                
                marker.addListener('click', () => {
                    const content = `
                        <div class="custom-info-window">
                            <div class="info-window-title">${location.title}</div>
                            <div class="info-window-content">${location.content}</div>
                        </div>
                    `;
                    
                    infoWindow.setContent(content);
                    infoWindow.open(map, marker);
                });
            });
        };
        
        loadGoogleMapsApi();
    };
    
    initHoneymoonMap();
    
    // Initialize OpenWeatherMap widget
    const initWeatherWidget = () => {
        const weatherWidgetContainer = document.getElementById('openweathermap-widget');
        if (!weatherWidgetContainer) return;
        
        // Create a script element for the OpenWeatherMap widget
        const script = document.createElement('script');
        script.async = true;
        script.charset = "utf-8";
        script.src = "https://openweathermap.org/widgets/widget_embed.js";
        
        // Create widget container
        const widget = document.createElement('div');
        widget.id = "openweathermap-widget-15";
        widget.className = "openweathermap-widget";
        
        // Set attributes for Bar Harbor, ME
        widget.setAttribute("data-id", "44476");
        widget.setAttribute("data-appid", "9de243494c0b295cca9337e1e96b00e2");
        widget.setAttribute("data-units", "imperial");
        widget.setAttribute("data-days", "3");
        widget.setAttribute("data-title", "Bar Harbor, ME");
        
        // Add widget and script to container
        weatherWidgetContainer.appendChild(widget);
        document.body.appendChild(script);
    };
    
    initWeatherWidget();

    // Memory Journal
    const initMemoryJournal = () => {
        const form = document.getElementById('memory-form');
        if (!form) return;
        
        const photoInput = document.getElementById('memory-photo');
        const photoPreview = document.querySelector('.photo-preview');
        const uploadPlaceholder = document.querySelector('.upload-placeholder');
        const moodOptions = document.querySelectorAll('.mood-option');
        const moodInput = document.getElementById('memory-mood');
        const memoriesGrid = document.getElementById('saved-memories-grid');
        
        // Initialize saved memories array from localStorage
        let savedMemories = JSON.parse(localStorage.getItem('honeymoonMemories') || '[]');
        
        // Display saved memories
        const displaySavedMemories = () => {
            // Clear the current content
            const emptyMemories = memoriesGrid.querySelector('.empty-memories');
            
            if (savedMemories.length === 0) {
                if (!emptyMemories) {
                    memoriesGrid.innerHTML = `
                        <div class="empty-memories">
                            <i class="fas fa-book-open"></i>
                            <p class="en">Your saved memories will appear here</p>
                            <p class="pt">Suas memórias salvas aparecerão aqui</p>
                        </div>
                    `;
                }
                return;
            }
            
            // Remove empty state if we have memories
            if (emptyMemories) {
                memoriesGrid.removeChild(emptyMemories);
            }
            
            // Add each memory as a card
            savedMemories.forEach((memory, index) => {
                // Skip if the card already exists
                if (document.getElementById(`memory-${index}`)) return;
                
                const card = document.createElement('div');
                card.id = `memory-${index}`;
                card.className = 'memory-card';
                
                let moodIcon = '';
                switch (memory.mood) {
                    case 'amazing':
                        moodIcon = '<i class="fas fa-grin-stars"></i>';
                        break;
                    case 'happy':
                        moodIcon = '<i class="fas fa-smile"></i>';
                        break;
                    case 'peaceful':
                        moodIcon = '<i class="fas fa-heart"></i>';
                        break;
                    case 'tired':
                        moodIcon = '<i class="fas fa-tired"></i>';
                        break;
                    default:
                        moodIcon = '<i class="fas fa-smile"></i>';
                }
                
                // Create location name
                let locationName = '';
                switch (memory.location) {
                    case 'acadia-inn':
                        locationName = 'Acadia Inn';
                        break;
                    case 'cadillac-mountain':
                        locationName = 'Cadillac Mountain';
                        break;
                    case 'thunder-hole':
                        locationName = 'Thunder Hole';
                        break;
                    case 'jordan-pond':
                        locationName = 'Jordan Pond';
                        break;
                    case 'sand-beach':
                        locationName = 'Sand Beach';
                        break;
                    case 'bar-harbor-downtown':
                        locationName = 'Bar Harbor Downtown';
                        break;
                    case 'bass-harbor-lighthouse':
                        locationName = 'Bass Harbor Lighthouse';
                        break;
                    default:
                        locationName = 'Other Location';
                }
                
                card.innerHTML = `
                    <div class="memory-img">
                        <img src="${memory.photoUrl || 'images/gallery/acadia1.jpg'}" alt="${memory.title}">
                    </div>
                    <div class="memory-content">
                        <div class="memory-header">
                            <div class="memory-date">${memory.date}</div>
                            <div class="memory-mood">${moodIcon}</div>
                        </div>
                        <h3 class="memory-title">${memory.title}</h3>
                        <div class="memory-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${locationName}</span>
                        </div>
                        <p class="memory-description">${memory.description}</p>
                    </div>
                `;
                
                memoriesGrid.prepend(card);
            });
        };
        
        // Photo upload preview
        if (photoInput) {
            photoInput.addEventListener('change', () => {
                const file = photoInput.files[0];
                if (!file) return;
                
                const reader = new FileReader();
                reader.onload = (e) => {
                    photoPreview.innerHTML = `<img src="${e.target.result}" alt="Memory photo">`;
                    photoPreview.style.display = 'block';
                    uploadPlaceholder.style.display = 'none';
                };
                reader.readAsDataURL(file);
            });
            
            // Click on upload area to trigger file input
            uploadPlaceholder.addEventListener('click', () => {
                photoInput.click();
            });
        }
        
        // Mood selector
        moodOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all options
                moodOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                option.classList.add('selected');
                
                // Update hidden input value
                moodInput.value = option.dataset.mood;
            });
        });
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('memory-title').value;
            const description = document.getElementById('memory-description').value;
            const date = document.getElementById('memory-date').value;
            const location = document.getElementById('memory-location').value;
            const mood = moodInput.value;
            
            // Validate form
            if (!title || !description || !date || !location || !mood) {
                alert('Please fill out all fields');
                return;
            }
            
            // Format date
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Get photo URL if available
            let photoUrl = '';
            if (photoInput.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    photoUrl = e.target.result;
                    
                    // Create new memory object
                    const newMemory = {
                        title,
                        description,
                        date: formattedDate,
                        location,
                        mood,
                        photoUrl
                    };
                    
                    // Add to saved memories
                    savedMemories.unshift(newMemory);
                    
                    // Save to localStorage
                    localStorage.setItem('honeymoonMemories', JSON.stringify(savedMemories));
                    
                    // Reset form
                    form.reset();
                    moodOptions.forEach(opt => opt.classList.remove('selected'));
                    photoPreview.style.display = 'none';
                    uploadPlaceholder.style.display = 'flex';
                    
                    // Display updated memories
                    displaySavedMemories();
                };
                reader.readAsDataURL(photoInput.files[0]);
            } else {
                // Create new memory object without photo
                const newMemory = {
                    title,
                    description,
                    date: formattedDate,
                    location,
                    mood,
                    photoUrl
                };
                
                // Add to saved memories
                savedMemories.unshift(newMemory);
                
                // Save to localStorage
                localStorage.setItem('honeymoonMemories', JSON.stringify(savedMemories));
                
                // Reset form
                form.reset();
                moodOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Display updated memories
                displaySavedMemories();
            }
        });
        
        // Initialize memories display
        displaySavedMemories();
    };
    
    initMemoryJournal();
}); 