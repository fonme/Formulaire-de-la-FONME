(function() {
    // 1. Sélection des éléments
    const slides = document.querySelectorAll('.s2-slide');
    const nextBtn = document.getElementById('s2-next');
    const prevBtn = document.getElementById('s2-prev');
    
    let currentIndex = 0;
    let autoPlayTimer;

    // 2. Fonction pour changer de slide
    function showSlide(index) {
        // On retire la classe active de tout le monde
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // On ajuste l'index (boucle infinie)
        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;

        // On active le nouveau slide
        slides[currentIndex].classList.add('active');
    }

    // 3. Fonctions de navigation
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // 4. GESTION DE L'AUTOMATISME
    function startAutoPlay() {
        // Change d'image toutes les 5000ms (5 secondes)
        autoPlayTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    // 5. Évènements (Boutons)
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay(); // On arrête le chrono
            nextSlide();    // On change
            startAutoPlay(); // On relance le chrono proprement
        });

        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    // 6. Arrêter le défilement si la souris est sur l'actualité (confort de lecture)
    const container = document.querySelector('.s2-news-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
    }

    // Lancement initial
    startAutoPlay();

})();
