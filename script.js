document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.getElementById('email-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    const messageDiv = document.getElementById('form-message');
    
    if (!email || !email.includes('@')) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = 'Please enter a valid email address.';
        return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        let subscribers = JSON.parse(localStorage.getItem('briefing_subscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('briefing_subscribers', JSON.stringify(subscribers));
        }
        
        messageDiv.className = 'form-message success';
        messageDiv.textContent = 'You\'re in. Check your inbox.';
        emailInput.value = '';
        
    } catch (error) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = 'Something went wrong. Please try again.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});