document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Animation Sequence ---
    const heroTexts = document.querySelectorAll('.reveal-text');

    // Staggered reveal for hero text
    // We add a small initial delay to ensure the font is fully ready
    setTimeout(() => {
        heroTexts.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 150); // 150ms delay between each line
        });
    }, 200);


    // --- Hero Scroll Parallax & Effects ---
    const heroRowLeft = document.querySelector('.hero-row-left');
    const heroRowRight = document.querySelector('.hero-row-right');
    const heroTextsInRows = document.querySelectorAll('.hero-text');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Speeds and factors
        const speed = 0.8;
        const blurFactor = 0.01; // 500px -> 5px blur
        const scaleFactor = 0.0003; // 500px -> +0.15 scale

        // Calculate effects
        const blurValue = Math.min(scrollY * blurFactor, 10); // Cap at 10px
        const scaleValue = 1 + (scrollY * scaleFactor);

        // Apply slide to rows
        if (heroRowLeft) {
            heroRowLeft.style.transform = `translateX(${-scrollY * speed}px)`;
        }
        if (heroRowRight) {
            heroRowRight.style.transform = `translateX(${scrollY * speed}px)`;
        }

        // Apply blur and scale to text
        heroTextsInRows.forEach(text => {
            text.style.filter = `blur(${blurValue}px)`;
            text.style.transform = `scale(${scaleValue})`;
        });

        // --- Generic Scroll FX (Viewport Center Analysis) ---
        const scrollFxElements = document.querySelectorAll('.scroll-fx');
        const viewportCenter = window.innerHeight / 2;

        scrollFxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + (rect.height / 2);

            // Calculate distance from center (absolute value)
            const distanceFromCenter = Math.abs(viewportCenter - elementCenter);

            // Normalize distance (0 at center, 1 at edges of 'zone')
            // Zone = 50% of viewport height
            const maxDistance = window.innerHeight / 1.5;
            let progress = distanceFromCenter / maxDistance;

            // Clamp progress between 0 and 1
            progress = Math.min(Math.max(progress, 0), 1);

            // Effect Intensity
            const blurIntensity = progress * 4; // Max 4px blur at edges
            const scaleIntensity = 1 + (progress * 0.1); // Max 1.1x scale at edges
            const opacityIntensity = 1 - (progress * 0.3); // Optional: fade out slightly at edges

            // Apply Styles
            // We use requestAnimationFrame-friendly direct style updates
            el.style.filter = `blur(${blurIntensity}px)`;
            el.style.transform = `scale(${scaleIntensity})`;
            el.style.opacity = opacityIntensity;
        });
    });

    // --- Custom Cursor Logic ---
    const cursor = document.querySelector('.cursor');
    const interactiveElements = document.querySelectorAll('a, button, .project-item, .nav-link, .skill-tag');

    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    const scrollElements = document.querySelectorAll('.fade-in-up, .scale-up');

    const observerOptions = {
        threshold: 0.1,      // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // Offset slightly so it triggers before bottom
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    scrollElements.forEach(el => {
        scrollObserver.observe(el);
    });


    // --- Internationalization (i18n) ---
    const translations = {
        'en': {
            'hero_data': 'data',
            'hero_ai': 'ai / ml',
            'hero_business': 'business',
            'hero_insights': 'insights',
            'about_greeting': "Hello, I'm a student in Data Science.",
            'about_passion_1': "My passion lies in transforming data into strategic",
            'about_passion_2': "insights for business decisions.",
            'about_specialization': "Specialized in Business Intelligence & Analytics",

            // Skills
            'cat_prog': 'Programming',
            'skill_prog': 'Python, R, SQL, Java, C++',
            'cat_ds': 'Data Science & AI',
            'skill_ds': 'Machine Learning, Deep Learning, NLP, Computer Vision, Statistics',
            'cat_de': 'Data Engineering',
            'skill_de': 'Spark, Hadoop, Airflow, Docker, AWS, Git',
            'cat_bi': 'Business Intelligence',
            'skill_bi': 'PowerBI, Tableau, Looker, Excel, SAP',
            'cat_soft': 'Soft Skills',
            'skill_soft': 'Strategy, Storytelling, Problem Solving, Project Management',
            'cat_languages': 'Languages',
            'skill_languages': 'العربية, Español, Français, English',

            // Projects
            'col_role': 'role',
            'col_project': 'project',
            'col_year': 'year',
            // Footer
            'footer_title': 'get in<br>touch',
            'footer_email_label': 'email',
            'footer_github_label': 'github',
            'footer_linkedin_label': 'linkedin'
        },
        'fr': {
            'hero_data': 'données',
            'hero_ai': 'ia / ml',
            'hero_business': 'business',
            'hero_insights': 'analyses',
            'about_greeting': "Bonjour, je suis étudiant en Data Science.",
            'about_passion_1': "Ma passion est de transformer les données en",
            'about_passion_2': "insights stratégiques pour les décisions.",
            'about_specialization': "Spécialisé en Business Intelligence & Analytics",

            // Compétences
            'cat_prog': 'Programmation',
            'skill_prog': 'Python, R, SQL, Java, C++',
            'cat_ds': 'Data Science & IA',
            'skill_ds': 'Machine Learning, Deep Learning, NLP, Computer Vision, Statistiques',
            'cat_de': 'Data Engineering',
            'skill_de': 'Spark, Hadoop, Airflow, Docker, AWS, Git',
            'cat_bi': 'Business Intelligence',
            'skill_bi': 'PowerBI, Tableau, Looker, Excel, SAP',
            'cat_soft': 'Soft Skills',
            'skill_soft': 'Stratégie, Storytelling, Résolution de Problèmes, Gestion de Projet',
            'cat_languages': 'Langues',
            'skill_languages': 'العربية, Español, Français, English',

            // Projets
            'col_role': 'rôle',
            'col_project': 'projet',
            'col_year': 'année',

            // Footer
            'footer_title': 'me<br>contacter',
            'footer_email_label': 'email',
            'footer_github_label': 'github',
            'footer_linkedin_label': 'linkedin'
        }
    };

    function initLanguage() {
        const userLang = navigator.language || navigator.userLanguage;
        // Default to English, switch to French if detected
        const currentLang = userLang.startsWith('fr') ? 'fr' : 'en';
        console.log('Detected Language:', currentLang);

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang] && translations[currentLang][key]) {
                el.innerText = translations[currentLang][key];
            }
        });
    }

    initLanguage();

    console.log('Portfolio animations initialized.');
});
