document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rsvp-form');
    const successMsg = document.getElementById('success-message');
    const navbar = document.querySelector('.navbar');

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 12, 16, 0.95)';
            navbar.style.padding = '1rem 5%';
        } else {
            navbar.style.background = 'rgba(11, 12, 16, 0.8)';
            navbar.style.padding = '1.5rem 5%';
        }
    });

    // Mock Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Mocking form submission (would be replaced with actual backend call)
        form.style.display = 'none';
        document.querySelector('.login-notice').style.display = 'none';
        successMsg.classList.remove('hidden');
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
});
