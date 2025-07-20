// FILE: js/main.js

// Sample data for listings
const listings = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
        title: 'Luxury Beachfront Villa',
        location: 'Malibu, California',
        price: 459,
        rating: 4.9,
        category: 'luxury',
        badge: 'Superhost'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
        title: 'Cozy Mountain Cabin',
        location: 'Aspen, Colorado',
        price: 289,
        rating: 4.8,
        category: 'cabins',
        badge: 'Guest favourite'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
        title: 'Modern Downtown Loft',
        location: 'New York, NY',
        price: 199,
        rating: 4.7,
        category: 'trending',
        badge: 'New'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop',
        title: 'Oceanfront Paradise',
        location: 'Miami Beach, Florida',
        price: 329,
        rating: 4.9,
        category: 'beachfront',
        badge: 'Superhost'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
        title: 'Luxury City Apartment',
        location: 'San Francisco, CA',
        price: 399,
        rating: 4.8,
        category: 'luxury',
        badge: 'Guest favourite'
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
        title: 'Countryside Retreat',
        location: 'Napa Valley, CA',
        price: 249,
        rating: 4.6,
        category: 'unique',
        badge: 'Rare find'
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop',
        title: 'Pet-Friendly Beach House',
        location: 'San Diego, CA',
        price: 189,
        rating: 4.7,
        category: 'pets',
        badge: 'Pet-friendly'
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop',
        title: 'Trendy Urban Studio',
        location: 'Austin, Texas',
        price: 129,
        rating: 4.5,
        category: 'trending',
        badge: 'New'
    }
];

// Property details data for each listing
const propertyDetails = {
    1: {
        title: 'Luxury Beachfront Villa',
        location: 'Malibu, California, United States',
        rating: 4.9,
        reviews: 127,
        price: 459,
        host: 'Jennifer Smith',
        hostInitials: 'JS',
        specs: '8 guests • 4 bedrooms • 6 beds • 3 baths',
        amenities: [
            { icon: '🏖️', name: 'Beachfront' },
            { icon: '🏊', name: 'Pool' },
            { icon: '🚗', name: 'Free parking' },
            { icon: '📶', name: 'WiFi' },
            { icon: '🔥', name: 'Fireplace' },
            { icon: '🍳', name: 'Kitchen' }
        ],
        description: 'Experience the ultimate luxury getaway at this stunning beachfront villa in Malibu. With panoramic ocean views, direct beach access, and world-class amenities, this property offers an unforgettable retreat.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop'
    },
    2: {
        title: 'Cozy Mountain Cabin',
        location: 'Aspen, Colorado, United States',
        rating: 4.8,
        reviews: 94,
        price: 289,
        host: 'Michael Thompson',
        hostInitials: 'MT',
        specs: '6 guests • 3 bedrooms • 4 beds • 2 baths',
        amenities: [
            { icon: '🏔️', name: 'Mountain view' },
            { icon: '🔥', name: 'Fireplace' },
            { icon: '🚗', name: 'Free parking' },
            { icon: '📶', name: 'WiFi' },
            { icon: '🍳', name: 'Kitchen' },
            { icon: '🧺', name: 'Washer' }
        ],
        description: 'Escape to this cozy mountain cabin nestled in the beautiful Colorado Rockies. Perfect for skiing in winter and hiking in summer, with stunning mountain views and rustic charm.',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop'
    },
    3: {
        title: 'Modern Downtown Loft',
        location: 'New York, NY, United States',
        rating: 4.7,
        reviews: 156,
        price: 199,
        host: 'Sarah Johnson',
        hostInitials: 'SJ',
        specs: '4 guests • 2 bedrooms • 2 beds • 1 bath',
        amenities: [
            { icon: '🏙️', name: 'City view' },
            { icon: '🚇', name: 'Metro access' },
            { icon: '📶', name: 'WiFi' },
            { icon: '🍳', name: 'Kitchen' },
            { icon: '❄️', name: 'Air conditioning' },
            { icon: '🧺', name: 'Washer' }
        ],
        description: 'Stay in the heart of Manhattan in this sleek, modern loft. Walking distance to major attractions, restaurants, and subway stations. Perfect for business travelers and tourists alike.',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop'
    },
    4: {
        title: 'Oceanfront Paradise',
        location: 'Miami Beach, Florida, United States',
        rating: 4.9,
        reviews: 203,
        price: 329,
        host: 'Carlos Rodriguez',
        hostInitials: 'CR',
        specs: '6 guests • 3 bedrooms • 4 beds • 2 baths',
        amenities: [
            { icon: '🏖️', name: 'Beachfront' },
            { icon: '🏊', name: 'Pool' },
            { icon: '🌊', name: 'Ocean view' },
            { icon: '📶', name: 'WiFi' },
            { icon: '🍳', name: 'Kitchen' },
            { icon: '☀️', name: 'Balcony' }
        ],
        description: 'Wake up to stunning ocean views in this luxurious beachfront condo. Direct beach access, rooftop pool, and walking distance to South Beach nightlife and dining.',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop'
    },
    5: {
        title: 'Luxury City Apartment',
        location: 'San Francisco, CA, United States',
        rating: 4.8,
        reviews: 89,
        price: 399,
        host: 'Lisa Chen',
        hostInitials: 'LC',
        specs: '4 guests • 2 bedrooms • 2 beds • 2 baths',
        amenities: [
            { icon: '🏙️', name: 'City view' },
            { icon: '🚗', name: 'Parking' },
            { icon: '📶', name: 'WiFi' },
            { icon: '🍳', name: 'Kitchen' },
            { icon: '🧺', name: 'Washer' },
            { icon: '🏋️', name: 'Gym access' }
        ],
        description: 'Elegant apartment in the heart of San Francisco with panoramic city views. Close to tech companies, restaurants, and cultural attractions. Premium amenities and modern design.',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=400&fit=crop'
    },
    6: {
        title: 'Countryside Retreat',
        location: 'Napa Valley, CA, United States',
        rating: 4.6,
        reviews: 72,
        price: 249,
        host: 'Robert Wilson',
        hostInitials: 'RW',
        specs: '8 guests • 4 bedrooms • 5 beds • 3 baths',
        amenities: [
            { icon: '🍇', name: 'Vineyard view' },
            { icon: '🔥', name: 'Fireplace' },
            { icon: '🚗', name: 'Free parking' },
            { icon: '📶', name: 'WiFi' },
            { icon: '🍳', name: 'Kitchen' },
            { icon: '🌳', name: 'Garden' }
        ],
        description: 'Peaceful retreat surrounded by vineyards and rolling hills. Perfect for wine lovers and those seeking tranquility. Spacious home with rustic charm and modern amenities.',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=400&fit=crop'
    },
    7: {
        title: 'Pet-Friendly Beach House',
        location: 'San Diego, CA, United States',
        rating: 4.7,
        reviews: 118,
        price: 189,
        host: 'Amanda Davis',
        hostInitials: 'AD',
        specs: '6 guests • 3 bedrooms • 3 beds • 2 baths',
        amenities: [
            { icon: '🏖️', name: 'Beach access' },
            { icon: '🐕', name: 'Pet-friendly' },
            { icon: '🚗', name: 'Free parking' },
            { icon: '📶', name: 'WiFi' },
            { icon: '🍳', name: 'Kitchen' },
            { icon: '🌊', name: 'Ocean view' }
        ],
        description: 'Bring your furry friends to this welcoming beach house! Fenced yard, dog bed provided, and steps from a dog-friendly beach. Perfect for families with pets.',
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=400&fit=crop'
    },
    8: {
        title: 'Trendy Urban Studio',
        location: 'Austin, Texas, United States',
        rating: 4.5,
        reviews: 67,
        price: 129,
        host: 'Jake Martinez',
        hostInitials: 'JM',
        specs: '2 guests • 1 bedroom • 1 bed • 1 bath',
        amenities: [
            { icon: '🎵', name: 'Music district' },
            { icon: '🍺', name: 'Nearby bars' },
            { icon: '📶', name: 'WiFi' },
            { icon: '🍳', name: 'Kitchenette' },
            { icon: '❄️', name: 'Air conditioning' },
            { icon: '🚗', name: 'Street parking' }
        ],
        description: 'Hip studio apartment in the heart of Austin\'s music scene. Walking distance to live music venues, food trucks, and the vibrant nightlife that makes Austin special.',
        image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=400&fit=crop'
    }
};

// Render Listings
function renderListings(listingsToRender = listings) {
    const grid = document.getElementById('listings-grid');
    if (!grid) {
        console.error('listings-grid element not found');
        return;
    }
    
    grid.innerHTML = ''; // Clear old listings

    listingsToRender.forEach(listing => {
        const card = document.createElement('div');
        card.className = 'listing-card fade-in-up';
        card.innerHTML = `
    <div class="listing-image-wrapper">
        <img src="${listing.image}" alt="${listing.title}" class="listing-image">
        <div class="badge ${listing.badge === 'Superhost' ? 'superhost' : ''}">${listing.badge}</div>
        <button onclick="event.stopPropagation(); toggleWishlist(${listing.id})" style="
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255,255,255,0.9);
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            <i class="far fa-heart" style="color: #666;"></i>
        </button>
        
    </div>
    <div class="listing-content">
        <h3>${listing.title}</h3>
        <p>${listing.location}</p>
        <div class="listing-rating">
            <span>⭐ ${listing.rating}</span>
        </div>
        <p class="listing-price">₹${listing.price} <span>/ night</span></p>
    </div>
`;

       
        card.addEventListener('click', () => showListingDetails(listing));

        grid.appendChild(card);
    });
}

// Filter Buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;
        if (filter === 'all') {
            renderListings(listings);
        } else {
            const filtered = listings.filter(l => l.category === filter);
            renderListings(filtered);
        }
    });
});



// Load More (Dummy)
document.querySelector('.load-more-btn')?.addEventListener('click', () => {
    alert('Load more functionality would fetch additional listings.');
});

// On Page Load
document.addEventListener('DOMContentLoaded', () => {
    renderListings();
    
    // Initialize animations if the function exists
    if (typeof initializeAnimations === 'function') {
        // Delay to ensure cards are rendered first
        setTimeout(initializeAnimations, 100);
    }
});

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
    
    // Add CSS animations for notifications
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}