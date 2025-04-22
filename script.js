document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    // Gestion du clic sur le hamburger
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fermer le menu lors du clic sur un lien (mobile)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Changement de style au scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});


// COUVERTURE ACCUEIL

// Carrousel automatique
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentSlide = 0;
    let autoPlayInterval;

    // Création des indicateurs
    slides.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.carousel-indicators span');

    // Navigation
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        resetAutoPlay();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Événements
    document.querySelector('.carousel-prev').addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    document.querySelector('.carousel-next').addEventListener('click', nextSlide);

    // Initialisation
    slides[0].classList.add('active');
    indicators[0].classList.add('active');
    startAutoPlay();

    // Pause au survol
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', startAutoPlay);
});

// PROJETS

// Animation au défilement pour les projets
document.addEventListener('DOMContentLoaded', function() {
    const projetCards = document.querySelectorAll('.projet-card');
    
    function checkScroll() {
        projetCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if(cardTop < windowHeight * 0.8) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }

    // Initial hide
    projetCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Vérifie au chargement
});


// COMPETENCES

// Animation des barres de compétences
document.addEventListener('DOMContentLoaded', function() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkills() {
        skillLevels.forEach(level => {
            const width = level.textContent;
            level.style.width = width;
            level.setAttribute('data-level', width);
        });
    }

    // Détection du scroll
    function checkScroll() {
        const section = document.querySelector('.competences-section');
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if(sectionTop < windowHeight * 0.8) {
            animateSkills();
            window.removeEventListener('scroll', checkScroll);
        }
    }

    // Initialiser les barres à 0
    skillLevels.forEach(level => {
        level.style.width = '0';
    });

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Vérifie au chargement
});


// CONTACT


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Afficher un loader
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = 'Envoi en cours...';
    submitBtn.disabled = true;

    fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            this.reset();
            alert('Message envoyé avec succès !');
        } else {
            alert("Une erreur s'est produite");
        }
    })
    .catch(error => {
        alert("Erreur de connexion");
    })
    .finally(() => {
        submitBtn.innerHTML = 'Envoyer le message';
        submitBtn.disabled = false;
    });
});


// FOOTER