async function injectFooter() {
    try {
        const response = await fetch('footer.html');
        if (response.ok) {
            const footerHtml = await response.text();
            // On l'insère après le main-container
            document.body.insertAdjacentHTML('beforeend', footerHtml);
            
            // On charge aussi son CSS s'il n'est pas déjà dans style.css
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'style.css'; // Ou footer.css si tu sépares
            document.head.appendChild(link);
        }
    } catch (error) {
        console.error("Erreur lors de l'injection du footer:", error);
    }
}

// Appeler la fonction après le chargement des sections
injectFooter();
