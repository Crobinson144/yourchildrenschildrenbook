// ==================================================
// YOUR CHILDREN'S CHILDREN — SITE SCRIPT
// Smooth Scroll
// (Email signup is handled entirely by the Kit embed in index.html.)
// ==================================================

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {

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
    // 2. LOADING COMPLETE
    // ==============================================
    document.body.classList.add('loaded');
});
