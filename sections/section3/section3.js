(function() {
    const clickZone = document.getElementById('s3-click-zone');
    const mainWrapper = document.getElementById('s3-main-bg');

    if (clickZone && mainWrapper) {
        // Détection du Double-clic
        clickZone.addEventListener('dblclick', () => {
            mainWrapper.classList.toggle('alt-theme');
            
            // Petit feedback console pour vérification
            console.log("Ambiance de l'histoire changée !");
        });
    }
})();
