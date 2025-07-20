
        // FILE: js/search.js
        function searchProperties() {
            const location = document.getElementById('location').value;
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;
            
            // Simple search simulation
            if (location) {
                const searchResults = listings.filter(listing => 
                    listing.location.toLowerCase().includes(location.toLowerCase())
                );
                renderListings(searchResults);
                
                // Smooth scroll to listings
                document.querySelector('.listings').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            } else {
                alert('Please enter a location to search');
            }
        }