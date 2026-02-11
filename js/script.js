// ============================================
// SMOOTH SCROLLING NAVIGATION
// ============================================

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

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за всеми секциями
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.7)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cПавел Кумашков - Private Body Architecture', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cСоздано с любовью к деталям 💪', 'font-size: 14px; color: #fff;');
