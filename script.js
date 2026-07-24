// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// Smooth Scroll & Active Link Handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinks.classList.remove('open');
        }
    });
});

// Scroll Reveal Animations (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => observer.observe(el));

// Toast Notifications
function showToast(msg, icon = 'fa-check-circle') {
    const t = document.createElement('div');
    t.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px);
        background: rgba(10,30,50,0.95); color: #fff; padding: 16px 32px;
        border-radius: 60px; font-weight: 500; z-index: 999;
        backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1);
        font-size: 0.95rem; box-shadow: 0 12px 36px rgba(0,0,0,0.3);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex; align-items: center; gap: 10px;
    `;
    t.innerHTML = `<i class="fas ${icon}" style="color:#4f8fc9;"></i> ${msg}`;
    document.body.appendChild(t);
    
    // Animate in
    setTimeout(() => { t.style.transform = 'translateX(-50%) translateY(0)'; }, 10);
    
    // Animate out
    setTimeout(() => {
        t.style.transform = 'translateX(-50%) translateY(100px)';
        t.style.opacity = '0';
        setTimeout(() => t.remove(), 400);
    }, 2500);
}

// Form/Button Interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#contact') {
            // Let it scroll normally, no toast needed for simple navigation
        } else if (this.getAttribute('href') === 'tel:+63270005899') {
            setTimeout(() => showToast('Connecting to landline...', 'fa-phone'), 100);
        } else if (this.getAttribute('href') === 'tel:+639171068639') {
            setTimeout(() => showToast('Connecting to mobile...', 'fa-mobile-alt'), 100);
        }
    });
});

// Dynamic Header Shadow on Scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.08)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = 'none';
        header.style.padding = '16px 0';
    }
});
