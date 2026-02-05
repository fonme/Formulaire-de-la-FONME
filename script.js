/**
 * CONFIGURATION : Liste des dossiers de vos sections
 * Assurez-vous d'avoir : sections/section1/section1.html, etc.
 */
const sectionsList = ['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8'];

// --- 1. GESTION DE L'ÉCRAN D'INTRO ---
window.addEventListener('load', () => {
    const intro = document.getElementById('intro-screen');
    
    // On laisse l'animation tourner 3.5 secondes pour l'effet captivant
    setTimeout(() => {
        intro.style.transition = 'opacity 1s ease';
        intro.style.opacity = '0';
        setTimeout(() => {
            intro.style.display = 'none';
        }, 1000);
    }, 3500);
});

// --- 2. GESTION DU MENU BURGER ---
const burgerBtn = document.getElementById('burger-btn');
const navList = document.getElementById('nav-list');

if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// --- 3. MOTEUR D'INJECTION AUTOMATIQUE ---
async function loadAllSections() {
    const mainContainer = document.getElementById('main-container');
    if (!mainContainer) return;

    for (const name of sectionsList) {
        // Création du conteneur de section
        const sectionWrapper = document.createElement('div');
        sectionWrapper.className = 'injected-section';
        sectionWrapper.id = name;

        try {
            // A. Ajout de la barre tricolore de séparation
            const bar = document.createElement('div');
            bar.className = 'tricolor-bar';
            bar.innerHTML = '<div class="c1"></div><div class="c2"></div><div class="c3"></div>';
            mainContainer.appendChild(bar);

            // B. Chargement du HTML
            const response = await fetch(`sections/${name}/${name}.html`);
            if (response.ok) {
                const htmlContent = await response.text();
                sectionWrapper.innerHTML = htmlContent;
                mainContainer.appendChild(sectionWrapper);

                // C. Chargement dynamique du CSS spécifique à la section
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `sections/${name}/${name}.css`;
                document.head.appendChild(link);

                // D. Chargement dynamique du JS spécifique à la section
                const script = document.createElement('script');
                script.src = `sections/${name}/${name}.js`;
                document.body.appendChild(script);
            } else {
                console.warn(`La section ${name} n'a pas pu être chargée (Fichier HTML manquant).`);
            }

        } catch (error) {
            console.error(`Erreur d'injection pour ${name} :`, error);
        }
    }
}

// Lancement de l'injection
loadAllSections();
