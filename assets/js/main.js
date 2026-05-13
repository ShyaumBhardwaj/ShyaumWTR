// Initialize animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    // Fade in animations
    document.querySelectorAll('.section, .card, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // Initialize typewriter text
    initTypewriter();
    
    // Smooth scroll navigation
    setupNavigation();
});

// Typewriter effect for rotating text
function initTypewriter() {
    const rotatingText = document.getElementById('rotating-text');
    if (!rotatingText) return;

    const phrases = [
        'Computer Science Co-op',
        'Web Development',
        'Full-Stack Engineering',
        'Cloud Solutions',
        'Automation Expert',
        'Tech Innovator'
    ];

    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;

    function type() {
        const phrase = phrases[currentPhrase];
        
        if (isDeleting) {
            currentChar--;
        } else {
            currentChar++;
        }

        rotatingText.textContent = phrase.substring(0, currentChar);

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && currentChar === phrase.length) {
            speed = 2000; // Pause before deleting
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            speed = 500; // Pause before typing next phrase
        }

        setTimeout(type, speed);
    }

    type();
}

// Setup smooth scroll navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.navmenu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add scroll reveal animation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .section, .card, .timeline-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .section.fade-in, .card.fade-in, .timeline-item.fade-in {
            opacity: 1;
            transform: translateY(0);
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .hero h1 {
            animation: float 3s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
});

// Add parallax effect to hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});
