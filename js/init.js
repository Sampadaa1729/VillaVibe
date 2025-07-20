// FILE: js/init.js
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all components
            renderListings();
            initializeCategories();
            initializeSearch();
            
            // Set default dates
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            document.getElementById('checkin').value = today.toISOString().split('T')[0];
            document.getElementById('checkout').value = tomorrow.toISOString().split('T')[0];
            
            // Add smooth scrolling for navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Initialize animations after a short delay
            setTimeout(() => {
                initializeAnimations();
            }, 100);
        });