document.addEventListener('DOMContentLoaded', () => {
    // Current Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
            icon.textContent = navLinks.classList.contains('active') ? 'close' : 'menu';
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
                }
                const headerOffset = 72;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // ========== LIGHTBOX ==========
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    const allGalleryImages = Array.from(document.querySelectorAll('.gallery-img-wrapper img'));
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = allGalleryImages[currentIndex].src;
        lightboxImg.alt = allGalleryImages[currentIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigate(direction) {
        currentIndex = (currentIndex + direction + allGalleryImages.length) % allGalleryImages.length;
        lightboxImg.src = allGalleryImages[currentIndex].src;
        lightboxImg.alt = allGalleryImages[currentIndex].alt;
    }

    // Click on gallery images
    allGalleryImages.forEach((img, index) => {
        img.closest('.gallery-card').addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigate(-1));
    lightboxNext.addEventListener('click', () => navigate(1));

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    // ========== SCROLL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.gallery-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
        observer.observe(card);
    });
});
