// FILE: js/responsive.js
        function initializeResponsive() {
            // Mobile menu toggle
            const navToggle = document.querySelector('.profile-menu');
            const navLinks = document.querySelector('.nav-links');
            
            if (window.innerWidth <= 768) {
                navToggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                });
            }
            
            // Responsive grid adjustments
            window.addEventListener('resize', () => {
                if (window.innerWidth <= 768) {
                    document.querySelector('.listings-grid').style.gridTemplateColumns = '1fr';
                } else if (window.innerWidth <= 1024) {
                    document.querySelector('.listings-grid').style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else {
                    document.querySelector('.listings-grid').style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
                }
            });
        }
        
        // Initialize responsive features
        window.addEventListener('load', initializeResponsive);