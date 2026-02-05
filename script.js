// Liste des sections à charger
const sections = ['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8'];

// 1. GESTION DE L'ÉCRAN D'INTRO
window.addEventListener('load', () => {
    const intro = document.getElementById('intro-screen');
    setTimeout(() => {
        intro.style.transition = 'opacity 0.8s ease';
        intro.style.opacity = '0';
        setTimeout(() => intro.style.display = 'none', 800);
    }, 3500); // 3.5 secondes d'animation captivante
});

// 2. GESTION DU MENU BURGER MOBILE
const burgerBtn = document.getElementById('burger-btn');
const navList = document.getElementById('nav-list');

burgerBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navList.classList.remove('active'));
});

// 3. MOTEUR D'INJECTION DES SECTIONS
async function injectAll() {
    const container = document.getElementById('main-container');

    for (const name of sections) {
        // Créer l'enveloppe de section
        const sectionEl = document.createElement('section');
        sectionEl.id = name;

        try {
            // Ajouter la barre tricolore avant la section
            const bar = document.createElement('div');
            bar.className = 'tricolor-bar';
            bar.innerHTML = '<div class="c1"></div><div class="c2"></div><div class="c3"></div>';
            container.appendChild(bar);

            // Charger le HTML
            const res = await fetch(`sections/${name}/${name}.html`);
            const html = await res.text();
            sectionEl.innerHTML = html;
            container.appendChild(sectionEl);

            // Charger le CSS dédié
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `sections/${name}/${name}.css`;
            document.head.appendChild(link);

            // Charger le Script dédié
            const script = document.createElement('script');
            script.src = `sections/${name}/${name}.js`;
            document.body.appendChild(script);

        } catch (e) {
            console.warn(`Note: Fichiers pour ${name} non trouvés ou en attente.`);
        }
    }
}

injectAll();
