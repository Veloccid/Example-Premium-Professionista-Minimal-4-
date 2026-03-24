document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ANIMAZIONE FADE-IN ALLO SCROLL (Come prima) ---
   // Configurazione per le animazioni allo scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // L'animazione parte quando il 20% dell'elemento è visibile
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Aggiunge la classe .visible che attiva il CSS
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Seleziona tutti gli elementi da animare
document.querySelectorAll('.fade-in, .timeline-item, .edu-card').forEach(el => {
    observer.observe(el);
});

    // --- 2. NUOVO EFFETTO VIDEO PARALLAX ---
    // Selezioniamo il video che sta in background
    const bgVideo = document.getElementById('bg-video');

    // Ascoltiamo l'evento "scroll" (quando l'utente usa la rotellina del mouse)
    window.addEventListener('scroll', () => {
        // Otteniamo di quanti pixel l'utente è sceso dall'alto della pagina
        let scrollPosition = window.scrollY;

        // Selezioniamo un moltiplicatore. 
        // 0.4 significa che il video si sposterà del 40% rispetto alla velocità di scroll.
        // Se fosse 1, scenderebbe insieme alla pagina. Se fosse 0, starebbe fermo.
        let parallaxSpeed = 0.4;

        // Applichiamo la trasformazione. Spostiamo il video in basso (Y) moltiplicando lo scroll per la velocità.
        // Richiede che nel CSS il video sia un po' più alto (120%) così non scopriamo i bordi neri.
        if (bgVideo) {
            bgVideo.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
        }
    });
});
// --- GESTIONE MENU A SCOMPARSA ---
const nav = document.getElementById('main-nav');
let lastScroll = 0; // Memorizza l'ultima posizione dello scroll

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // 1. Gestione trasparenza/colore (Se scrollo più di 50px, metti lo sfondo bianco)
    if (currentScroll > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }

    // 2. Gestione Scomparsa/Apparizione (Logica iPhone)
    if (currentScroll > lastScroll && currentScroll > 150) {
        // Sto scorrendo verso il BASSO e ho superato la hero: NASCONDI
        nav.classList.add('nav-hidden');
    } else {
        // Sto scorrendo verso l'ALTO: MOSTRA
        nav.classList.remove('nav-hidden');
    }

    lastScroll = currentScroll; // Aggiorna la posizione per il prossimo calcolo
});