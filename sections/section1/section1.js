(function() {
    const slides = document.querySelectorAll('.s1-slide');
    const dots = document.querySelectorAll('.dot');
    const textElement = document.getElementById('s1-typewriter');
    let currentIndex = 0;
    let charIndex = 0;
    let isTyping = false;

    function typeEffect() {
        const fullText = slides[currentIndex].getAttribute('data-quote');
        
        if (charIndex < fullText.length) {
            textElement.innerHTML += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 50); // Vitesse d'écriture
        }
    }

    function changeSlide() {
        // Désactiver l'actuel
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');

        // Passer au suivant
        currentIndex = (currentIndex + 1) % slides.length;

        // Activer le nouveau
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');

        // Réinitialiser et relancer l'écriture
        textElement.innerHTML = "";
        charIndex = 0;
        typeEffect();
    }

    // Lancer la première écriture
    typeEffect();

    // Changer de slide toutes les 6 secondes
    setInterval(changeSlide, 6000);
})();
