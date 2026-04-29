// ==================================================
// YOUR CHILDREN'S CHILDREN — COMPLETE SCRIPT
// Smooth Scroll | Email Form | Mobile Menu | Debug
// ==================================================

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Book site loaded successfully');

    // ==============================================
    // 1. SMOOTH SCROLL FOR ANCHOR LINKS
    // ==============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==============================================
    // 2. EMAIL FORM HANDLING (Kit Fallback)
    // ==============================================
    // Note: Kit's embed script handles the main form.
    // This is a backup in case Kit fails.
    
    const emailForm = document.getElementById('email-form');
    const messageDiv = document.getElementById('form-message');
    
    if (emailForm && messageDiv) {
        emailForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const email = emailInput ? emailInput.value : '';
            
            if (!email || !email.includes('@')) {
                showMessage(messageDiv, 'Please enter a valid email address.', 'error');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Join';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Joining...';
            }
            
            try {
                // Simulate API call (Kit's embed handles actual submission)
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Store in localStorage as backup
                let subscribers = JSON.parse(localStorage.getItem('briefing_subscribers') || '[]');
                if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    localStorage.setItem('briefing_subscribers', JSON.stringify(subscribers));
                }
                
                showMessage(messageDiv, 'You\'re in. Check your inbox.', 'success');
                if (emailInput) emailInput.value = '';
                
            } catch (error) {
                showMessage(messageDiv, 'Something went wrong. Please try again.', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        });
    }

    // ==============================================
    // 3. HELPER FUNCTION FOR MESSAGES
    // ==============================================
    function showMessage(container, text, type) {
        if (!container) return;
        container.className = `form-message ${type}`;
        container.textContent = text;
        container.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            container.style.display = 'none';
        }, 5000);
    }

    // ==============================================
    // 4. MOBILE MENU TOGGLE (if applicable)
    // ==============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = '#0B1A2F';
                navLinks.style.padding = '2rem';
                navLinks.style.zIndex = '1000';
            }
        });
    }

    // ==============================================
    // 5. ADD SCROLL CLASS TO NAVIGATION (Optional)
    // ==============================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                hero.classList.add('scrolled');
            } else {
                hero.classList.remove('scrolled');
            }
        });
    }

    // ==============================================
    // 6. LOADING COMPLETE
    // ==============================================
    document.body.classList.add('loaded');
});
