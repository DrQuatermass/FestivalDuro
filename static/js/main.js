// Festival Duro - JS minimale
(function () {
    'use strict';

    // Toggle menu mobile
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('primary-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            const open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
        });
    }

})();
