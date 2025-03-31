// Attendre le chargement complet du document
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de AOS (Animation On Scroll)
    AOS.init({
        duration: 800,
        once: false,
        offset: 200,
        easing: 'ease-out-cubic'
    });

    // Variables globales
    const header = document.querySelector('header');
    const menuButton = document.querySelector('.header-menu-mobile');
    const menu = document.querySelector('.header-menu');
    const menuLinks = document.querySelectorAll('.header-menu a');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    const skillBars = document.querySelectorAll('.skill-bar');
    const scrollTopButton = document.querySelector('.scroll-top');
    const cursor = document.querySelector('.cursor');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.realisation');
   
    // Animation d'écriture pour le texte de présentation
    const typingEffect = document.querySelector('.typing-effect');
    if (typingEffect) {
        typingEffect.style.width = '0';
        setTimeout(() => {
            typingEffect.style.width = '100%';
        }, 600);
    }
   
    // Effet de défilement sur le header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            if (scrollTopButton) scrollTopButton.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            if (scrollTopButton) scrollTopButton.classList.remove('active');
        }
       
        // Animation des barres de compétences au défilement
        animateSkillBars();
       
        // Mise en évidence du lien actif dans le menu
        highlightActiveMenuLink();
    });
   
    // Menu mobile toggle
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            menuButton.classList.toggle('active');
            menu.classList.toggle('active');
            // Si le menu est ouvert, on change l'icône
            const menuIcon = menuButton.querySelector('.material-icons');
            if (menuIcon) {
                menuIcon.textContent = menu.classList.contains('active') ? 'close' : 'menu';
            }
        });
    }
   
    // Fermer le menu au clic sur un lien
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            if (menuButton) {
                const menuIcon = menuButton.querySelector('.material-icons');
                if (menuIcon) menuIcon.textContent = 'menu';
            }
        });
    });
   
    // Mode sombre
    if (darkModeToggle) {
        // Vérifier la préférence enregistrée
        const prefersDarkMode = localStorage.getItem('darkMode') === 'true';
        if (prefersDarkMode) {
            body.classList.add('dark-mode');
            darkModeToggle.querySelector('.material-icons').textContent = 'light_mode';
        }
       
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
           
            // Changer l'icône
            darkModeToggle.querySelector('.material-icons').textContent =
                isDarkMode ? 'light_mode' : 'dark_mode';
        });
    }
   
    // Animation des barres de compétences
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const percentage = bar.getAttribute('data-percentage');
                if (percentage && !bar.style.width) {
                    bar.style.width = percentage;
                }
            }
        });
    }
   
    // Mettre en évidence le lien actif dans le menu
    function highlightActiveMenuLink() {
        // Obtenir la position de défilement actuelle
        const scrollPosition = window.scrollY + 200; // Offset pour déclencher plus tôt
       
        // Parcourir toutes les sections
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
           
            if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Supprimer la classe active de tous les liens
                menuLinks.forEach(link => link.classList.remove('active'));
               
                // Ajouter la classe active au lien correspondant à la section actuelle
                document.querySelector(`.header-menu a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    }
   
    // Curseur personnalisé
    if (cursor) {
        // Vérifier si l'appareil n'est pas tactile
        if (!('ontouchstart' in window)) {
            cursor.style.display = 'block';
           
            window.addEventListener('mousemove', e => {
                cursor.style.top = `${e.clientY}px`;
                cursor.style.left = `${e.clientX}px`;
            });
           
            // Effet au survol des liens et boutons
            const interactiveElements = document.querySelectorAll('a, button, .btn, .realisation');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('active'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
            });
        }
    }
   
    // Filtrage des projets
    if (filterButtons.length > 0 && projects.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Supprimer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
               
                const filter = this.getAttribute('data-filter');
               
                projects.forEach(project => {
                    const category = project.getAttribute('data-category');
                   
                    if (filter === 'all' || filter === category) {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        project.style.opacity = '0';
                        project.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
   
    // Bouton de défilement vers le haut
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
   
    // Animation des éléments au chargement
    const fadeElements = document.querySelectorAll('.fade-in');
    setTimeout(() => {
        fadeElements.forEach(el => el.classList.add('visible'));
    }, 300);
   
    // Indicateur de défilement dans le slider
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
   
    // Formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
           
            // Simuler l'envoi du formulaire
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
           
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
           
            // Simuler un temps de chargement
            setTimeout(() => {
                submitButton.textContent = 'Message envoyé !';
                submitButton.style.backgroundColor = '#27ae60';
               
                // Réinitialiser le formulaire
                contactForm.reset();
               
                // Rétablir le bouton après un délai
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    submitButton.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }
   
    // Mettre à jour l'année actuelle dans le footer
    const currentYearElement = document.querySelector('.current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
   
    // Effet parallax pour l'arrière-plan du slider
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
           
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                element.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
    }
   
    // Animation initiale des barres de compétences
    setTimeout(animateSkillBars, 1000);
   
    // Initialiser le highlightActiveMenuLink au chargement
    highlightActiveMenuLink();
});

// Fonction pour filtrer les projets (appelée depuis HTML)
function filterProjects(filter) {
    const projects = document.querySelectorAll('.realisation');
    const buttons = document.querySelectorAll('.filter-btn');
   
    // Mettre à jour la classe active des boutons
    buttons.forEach(button => {
        if (button.dataset.filter === filter) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
   
    // Filtrer les projets
    projects.forEach(project => {
        if (filter === 'all' || project.dataset.category === filter) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 50);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Fonction pour ouvrir/fermer le menu mobile
function openMenu() {
    const menu = document.querySelector('.header-menu');
    const menuButton = document.querySelector('.header-menu-mobile');
   
    menu.classList.toggle('active');
   
    // Changer l'icône du bouton
    const menuIcon = menuButton.querySelector('.material-icons');
    if (menuIcon) {
        menuIcon.textContent = menu.classList.contains('active') ? 'close' : 'menu';
    }
}// Attendre le chargement complet du document
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de AOS (Animation On Scroll)
    AOS.init({
        duration: 800,
        once: false,
        offset: 200,
        easing: 'ease-out-cubic'
    });

    // Variables globales
    const header = document.querySelector('header');
    const menuButton = document.querySelector('.header-menu-mobile');
    const menu = document.querySelector('.header-menu');
    const menuLinks = document.querySelectorAll('.header-menu a');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    const skillBars = document.querySelectorAll('.skill-bar');
    const scrollTopButton = document.querySelector('.scroll-top');
    const cursor = document.querySelector('.cursor');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.realisation');
   
    // Animation d'écriture pour le texte de présentation
    const typingEffect = document.querySelector('.typing-effect');
    if (typingEffect) {
        typingEffect.style.width = '0';
        setTimeout(() => {
            typingEffect.style.width = '100%';
        }, 600);
    }
   
    // Effet de défilement sur le header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            if (scrollTopButton) scrollTopButton.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            if (scrollTopButton) scrollTopButton.classList.remove('active');
        }
       
        // Animation des barres de compétences au défilement
        animateSkillBars();
       
        // Mise en évidence du lien actif dans le menu
        highlightActiveMenuLink();
    });
   
    // Menu mobile toggle
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            menuButton.classList.toggle('active');
            menu.classList.toggle('active');
            // Si le menu est ouvert, on change l'icône
            const menuIcon = menuButton.querySelector('.material-icons');
            if (menuIcon) {
                menuIcon.textContent = menu.classList.contains('active') ? 'close' : 'menu';
            }
        });
    }
   
    // Fermer le menu au clic sur un lien
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            if (menuButton) {
                const menuIcon = menuButton.querySelector('.material-icons');
                if (menuIcon) menuIcon.textContent = 'menu';
            }
        });
    });
   
    // Mode sombre
    if (darkModeToggle) {
        // Vérifier la préférence enregistrée
        const prefersDarkMode = localStorage.getItem('darkMode') === 'true';
        if (prefersDarkMode) {
            body.classList.add('dark-mode');
            darkModeToggle.querySelector('.material-icons').textContent = 'light_mode';
        }
       
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
           
            // Changer l'icône
            darkModeToggle.querySelector('.material-icons').textContent =
                isDarkMode ? 'light_mode' : 'dark_mode';
        });
    }
   
    // Animation des barres de compétences
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const percentage = bar.getAttribute('data-percentage');
                if (percentage && !bar.style.width) {
                    bar.style.width = percentage;
                }
            }
        });
    }
   
    // Mettre en évidence le lien actif dans le menu
    function highlightActiveMenuLink() {
        // Obtenir la position de défilement actuelle
        const scrollPosition = window.scrollY + 200; // Offset pour déclencher plus tôt
       
        // Parcourir toutes les sections
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
           
            if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Supprimer la classe active de tous les liens
                menuLinks.forEach(link => link.classList.remove('active'));
               
                // Ajouter la classe active au lien correspondant à la section actuelle
                document.querySelector(`.header-menu a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    }
   
    // Curseur personnalisé
    if (cursor) {
        // Vérifier si l'appareil n'est pas tactile
        if (!('ontouchstart' in window)) {
            cursor.style.display = 'block';
           
            window.addEventListener('mousemove', e => {
                cursor.style.top = `${e.clientY}px`;
                cursor.style.left = `${e.clientX}px`;
            });
           
            // Effet au survol des liens et boutons
            const interactiveElements = document.querySelectorAll('a, button, .btn, .realisation');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('active'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
            });
        }
    }
   
    // Filtrage des projets
    if (filterButtons.length > 0 && projects.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Supprimer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
               
                const filter = this.getAttribute('data-filter');
               
                projects.forEach(project => {
                    const category = project.getAttribute('data-category');
                   
                    if (filter === 'all' || filter === category) {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        project.style.opacity = '0';
                        project.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
   
    // Bouton de défilement vers le haut
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
   
    // Animation des éléments au chargement
    const fadeElements = document.querySelectorAll('.fade-in');
    setTimeout(() => {
        fadeElements.forEach(el => el.classList.add('visible'));
    }, 300);
   
    // Indicateur de défilement dans le slider
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
   
    // Formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
           
            // Simuler l'envoi du formulaire
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
           
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
           
            // Simuler un temps de chargement
            setTimeout(() => {
                submitButton.textContent = 'Message envoyé !';
                submitButton.style.backgroundColor = '#27ae60';
               
                // Réinitialiser le formulaire
                contactForm.reset();
               
                // Rétablir le bouton après un délai
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    submitButton.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }
   
    // Mettre à jour l'année actuelle dans le footer
    const currentYearElement = document.querySelector('.current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
   
    // Effet parallax pour l'arrière-plan du slider
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
           
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                element.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
    }
   
    // Animation initiale des barres de compétences
    setTimeout(animateSkillBars, 1000);
   
    // Initialiser le highlightActiveMenuLink au chargement
    highlightActiveMenuLink();
});

// Fonction pour filtrer les projets (appelée depuis HTML)
function filterProjects(filter) {
    const projects = document.querySelectorAll('.realisation');
    const buttons = document.querySelectorAll('.filter-btn');
   
    // Mettre à jour la classe active des boutons
    buttons.forEach(button => {
        if (button.dataset.filter === filter) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
   
    // Filtrer les projets
    projects.forEach(project => {
        if (filter === 'all' || project.dataset.category === filter) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 50);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Fonction pour ouvrir/fermer le menu mobile
function openMenu() {
    const menu = document.querySelector('.header-menu');
    const menuButton = document.querySelector('.header-menu-mobile');
   
    menu.classList.toggle('active');
   
    // Changer l'icône du bouton
    const menuIcon = menuButton.querySelector('.material-icons');
    if (menuIcon) {
        menuIcon.textContent = menu.classList.contains('active') ? 'close' : 'menu';
    }
}
