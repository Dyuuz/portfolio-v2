// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission with Axios
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Show loading state
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // In a real application, you would send this data to a server
        // For demo purposes, we'll simulate an API call
        await axios.post('https://jsonplaceholder.typicode.com/posts', {
            name,
            email,
            subject,
            message
        });
        
        // Show success modal
        successModal.style.display = 'flex';
        
        // Reset form
        contactForm.reset();
    } catch (error) {
        successModal.style.display = 'flex';
    } finally {
        // Reset button state
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
    }
});

// Close modal
closeModal.addEventListener('click', () => {
    successModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Mirror text effect
const mirrorTexts = document.querySelectorAll('.mirror-text');
mirrorTexts.forEach(text => {
    text.setAttribute('data-text', text.textContent);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});