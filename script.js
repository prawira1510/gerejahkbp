// script.js - Full Code Premium untuk website HKBP
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== SLIDESHOW UNTUK GALERI ====================
    function initSlideshows() {
        const slideshows = document.querySelectorAll('.slideshow-card');
        
        slideshows.forEach((slideshow) => {
            const slides = slideshow.querySelectorAll('.slideshow-img');
            const intervalTime = parseInt(slideshow.getAttribute('data-interval')) || 3000;
            let currentIndex = 0;
            let interval;
            
            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.classList.remove('active');
                    if (i === index) {
                        slide.classList.add('active');
                    }
                });
            }
            
            function nextSlide() {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            }
            
            function startSlideshow() {
                if (interval) clearInterval(interval);
                interval = setInterval(nextSlide, intervalTime);
            }
            
            function stopSlideshow() {
                if (interval) {
                    clearInterval(interval);
                    interval = null;
                }
            }
            
            slideshow.addEventListener('mouseenter', stopSlideshow);
            slideshow.addEventListener('mouseleave', startSlideshow);
            startSlideshow();
        });
    }
    
    initSlideshows();
    
    // ==================== SMOOTH SCROLL ====================
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        new bootstrap.Collapse(navbarCollapse).toggle();
                    }
                }
            }
        });
    });
    
    // ==================== ACTIVE LINK HIGHLIGHT ====================
    const sections = document.querySelectorAll('section[id]');
    function setActiveLink() {
        let scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
    
    // ==================== SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll('#tentang, #jadwal, #pelayanan, #galeri, #ibadah-online, #kontak');
    revealElements.forEach(el => el.classList.add('scroll-reveal'));
    
    function checkReveal() {
        const reveals = document.querySelectorAll('.scroll-reveal');
        const windowHeight = window.innerHeight;
        reveals.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    window.addEventListener('scroll', checkReveal);
    checkReveal();
    
    // ==================== BACK TO TOP BUTTON ====================
    const backBtn = document.createElement('button');
    backBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backBtn.id = 'backToTop';
    document.body.appendChild(backBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 600) {
            backBtn.style.display = 'block';
        } else {
            backBtn.style.display = 'none';
        }
    });
    
    backBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // ==================== STAT COUNTER ANIMATION ====================
    const statNumbers = document.querySelectorAll('.stat-number');
    const hasStatNumbers = statNumbers.length > 0;
    
    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.innerText);
            if (isNaN(target)) return;
            let current = 0;
            const increment = target / 50;
            const updateNumber = () => {
                if (current < target) {
                    current += increment;
                    stat.innerText = Math.floor(current) + '+';
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.innerText = target + '+';
                }
            };
            updateNumber();
        });
    }
    
    if (hasStatNumbers) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const statSection = document.querySelector('#tentang .row.g-4.mt-5');
        if (statSection) observer.observe(statSection);
    }
    
    // ==================== IBADAH ONLINE TOAST ====================
    const btnIbadahOnline = document.querySelectorAll('a[href="#ibadah-online"]');
    btnIbadahOnline.forEach(btn => {
        btn.addEventListener('click', function(e) {
            console.log('Menuju ke section Ibadah Online');
        });
    });
    
    // ==================== PRELOADER HIDE ====================
    window.addEventListener('load', function() {
        document.body.style.visibility = 'visible';
    });
    
    // ==================== NAVBAR SCROLL EFFECT ====================
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});