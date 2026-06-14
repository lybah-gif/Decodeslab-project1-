// ========== MOBILE MENU TOGGLE ==========
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true' ? false : true;
    menuBtn.setAttribute('aria-expanded', expanded);
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

// ========== STAT COUNTERS WITH OBSERVER ==========
const counters = [
    { id: 'projectsCount', target: 20, current: 0, animated: false },
    { id: 'clientsCount', target: 32, current: 0, animated: false },
    { id: 'expCount', target: 4, current: 0, animated: false }
];

function updateCounterDisplay(counter) {
    const element = document.getElementById(counter.id);
    if (element) {
        element.textContent = Math.floor(counter.current);
    }
}

function animateCounter(counter, duration = 2000) {
    const start = counter.current;
    const end = counter.target;
    const increment = (end - start) / (duration / 16);
    let currentVal = start;
    
    return new Promise((resolve) => {
        const timer = setInterval(() => {
            currentVal += increment;
            if (currentVal >= end) {
                currentVal = end;
                counter.current = end;
                updateCounterDisplay(counter);
                clearInterval(timer);
                resolve();
            } else {
                counter.current = currentVal;
                updateCounterDisplay(counter);
            }
        }, 16);
    });
}

function resetAllCounters() {
    counters.forEach(counter => {
        counter.current = 0;
        counter.animated = false;
        updateCounterDisplay(counter);
    });
    showNotification('✨ Stats reset! Scroll down to see them animate again.', '#A87C6B');
}

function showNotification(message, bgColor) {
    const notification = document.createElement('div');
    notification.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: ${bgColor};
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-family: 'Inter', sans-serif;
        z-index: 1100;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2500);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Intersection Observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counter => {
                if (!counter.animated && counter.current < counter.target) {
                    counter.animated = true;
                    animateCounter(counter, 2000);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

// Reset button
const resetBtn = document.getElementById('resetStats');
if (resetBtn) {
    resetBtn.addEventListener('click', resetAllCounters);
}

// ========== HIRE ME BUTTON ==========
const hireBtn = document.getElementById('hireBtn');
if (hireBtn) {
    hireBtn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        showNotification('📬 Scroll down to contact form!', '#6B9BBF');
    });
}

// ========== CONTACT FORM HANDLER ==========
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const message = document.getElementById('formMsg').value.trim();
        
        if (!name || !email || !message) {
            formFeedback.textContent = '❌ Please fill all fields';
            formFeedback.className = 'form-message error';
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            formFeedback.textContent = '❌ Please enter a valid email';
            formFeedback.className = 'form-message error';
            return;
        }
        
        // Simulate form submission
        formFeedback.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
        formFeedback.className = 'form-message success';
        contactForm.reset();
        
        setTimeout(() => {
            formFeedback.textContent = '';
        }, 5000);
    });
}

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 120) {
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

// Console welcome message
console.log('%c🚀 Alex Rivera Portfolio | Freelance Full-Stack Developer', 'color: #A87C6B; font-size: 16px; font-weight: bold;');
console.log('%c✅ Mobile-First | Semantic HTML | CSS Grid + Flexbox | WCAG Compliant', 'color: #6B9BBF; font-size: 12px;');

// ========== INITIALIZE COUNTER DISPLAYS ==========
counters.forEach(counter => updateCounterDisplay(counter));