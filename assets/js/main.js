// Typewriter effect for rotating text on homepage
function initTypewriter() {
    const rotatingText = document.getElementById('rotating-text');
    if (!rotatingText) return;

    const phrases = [
        'Computer Science Co-op',
        'Web Development',
        'Mainframe Engineering',
        'Automation & Scripting',
        'Tech Innovator'
    ];

    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;

    function type() {
        const phrase = phrases[currentPhrase];
        rotatingText.textContent = phrase.substring(0, currentChar);

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && currentChar === phrase.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            speed = 500;
        }

        if (isDeleting) currentChar--;
        else currentChar++;

        setTimeout(type, speed);
    }

    type();
}

// Mark the current page's nav link as active based on filename
function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navmenu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    setActiveNav();
});
