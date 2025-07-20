        // FILE: js/categories.js
        function initializeCategories() {
            const categoryItems = document.querySelectorAll('.category-item');
            
            categoryItems.forEach(item => {
                item.addEventListener('click', () => {
                    // Remove active class from all items
                    categoryItems.forEach(i => i.classList.remove('active'));
                    // Add active class to clicked item
                    item.classList.add('active');
                    
                    const category = item.dataset.category;
                    filterListings(category);
                });
            });
        }

        function filterListings(category) {
            if (category === 'all') {
                renderListings(listings);
            } else {
                const filteredListings = listings.filter(listing => 
                    listing.category === category
                );
                renderListings(filteredListings);
            }
        }
