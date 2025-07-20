// FILE: js/modal.js
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let currentBooking = null;

function showListingDetails(listing) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 16px;
        max-width: 700px;
        width: 95%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        animation: slideIn 0.3s ease;
        box-shadow: 0 25px 50px rgba(0,0,0,0.3);
    `;
        
    loadWishlistFromStorage(); // Load fresh data
        const isWishlisted = wishlist.some(item => item.id === listing.id);
    
    modalContent.innerHTML = `
        <button onclick="closeModal()" style="
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255,255,255,0.9);
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 10;
        " onmouseover="this.style.background='rgba(0,0,0,0.1)'"
           onmouseout="this.style.background='rgba(255,255,255,0.9)'">&times;</button>
        
        <div style="margin-bottom: 1.5rem;">
            <img src="${listing.image}" alt="${listing.title}" style="
                width: 100%;
                height: 300px;
                object-fit: cover;
                border-radius: 12px;
            ">
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
            <div>
                <h2 style="margin-bottom: 0.5rem; color: #333;">${listing.title}</h2>
                <p style="color: #666; margin-bottom: 0.5rem; display: flex; align-items: center;">
                    <i class="fas fa-map-marker-alt" style="margin-right: 8px; color: #ff385c;"></i>
                    ${listing.location}
                </p>
                <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 1rem;">
                    <i class="fas fa-star" style="color: #ffd700;"></i>
                    <span style="font-weight: 600;">${listing.rating}</span>
                    <span style="color: #666;">(${Math.floor(Math.random() * 100) + 50} reviews)</span>
                </div>
            </div>
            <div style="text-align: right;">
                <div style="background: #f0f0f0; padding: 6px 12px; border-radius: 16px; font-size: 0.85rem; margin-bottom: 0.5rem;">
                    ${listing.badge}
                </div>
                <div style="font-size: 1.3rem; font-weight: bold; color: #333;">₹${listing.price}</div>
                <div style="font-size: 0.9rem; color: #666;">per night</div>
            </div>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 1.5rem; margin-bottom: 1.5rem;">
            <h3 style="margin-bottom: 1rem; color: #333;">About this place</h3>
            <p style="color: #666; line-height: 1.6; margin-bottom: 1rem;">
                Experience the perfect getaway in this beautiful ${listing.title.toLowerCase()}. 
                This stunning property offers modern amenities, breathtaking views, and exceptional hospitality in ${listing.location}.
            </p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-wifi" style="color: #666;"></i>
                    <span style="color: #666;">Free WiFi</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-car" style="color: #666;"></i>
                    <span style="color: #666;">Free Parking</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-swimming-pool" style="color: #666;"></i>
                    <span style="color: #666;">Swimming Pool</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-utensils" style="color: #666;"></i>
                    <span style="color: #666;">Kitchen</span>
                </div>
            </div>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 1.5rem;">
            <div style="display: flex; gap: 1rem; align-items: center;">
                <button class="btn btn-primary" style="flex: 1; padding: 16px;" onclick="openBookingModal(${listing.id})">
                    <i class="fas fa-calendar-check" style="margin-right: 8px;"></i>
                    Reserve Now
                </button>
                <button class="btn ${isWishlisted ? 'btn-primary' : 'btn-secondary'}" 
                        onclick="toggleWishlist(${listing.id})" 
                        id="wishlist-btn-${listing.id}"
                        style="padding: 16px 20px;">
                    <i class="fas fa-heart" style="color: ${isWishlisted ? 'white' : '#666'};"></i>
                </button>
                <button class="btn btn-secondary" onclick="shareProperty(${listing.id})" style="padding: 16px 20px;">
                    <i class="fas fa-share"></i>
                </button>
            </div>
        </div>
    `;
    
    modal.className = 'modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with ESC key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    }
}

function openBookingModal(listingId) {
    const listing = listings.find(l => l.id === listingId);
    currentBooking = listing;
    
    const bookingModal = document.createElement('div');
    bookingModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
        animation: fadeIn 0.3s ease;
    `;
    
    // Default values
    let guests = parseInt(document.getElementById('guests')?.value) || 2;
    let nights = 1; // Default to 1 night
    
    // Calculate pricing
    const basePrice = listing.price;
    const extraGuestCharge = guests > 2 ? (guests - 2) * Math.floor(basePrice * 0.1) : 0;
    const pricePerNight = basePrice + extraGuestCharge;
    const subtotal = nights * pricePerNight;
    const serviceFee = Math.floor(subtotal * 0.14);
    const total = subtotal + serviceFee;
    
    const bookingContent = document.createElement('div');
    bookingContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 16px;
        max-width: 500px;
        width: 90%;
        position: relative;
        animation: slideIn 0.3s ease;
    `;
    
    bookingContent.innerHTML = `
        <button onclick="closeBookingModal()" style="
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        ">&times;</button>
        
        <h2 style="margin-bottom: 1.5rem; color: #333;">Confirm and Pay</h2>
        
        <div style="border: 1px solid #ddd; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                <img src="${listing.image}" alt="${listing.title}" style="
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: 8px;
                ">
                <div>
                    <h3 style="margin-bottom: 0.5rem;">${listing.title}</h3>
                    <p style="color: #666; margin-bottom: 0.5rem;">${listing.location}</p>
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <i class="fas fa-star" style="color: #ffd700;"></i>
                        <span>${listing.rating}</span>
                    </div>
                </div>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Check-in:</span>
                    <span style="color: #666;">Please select dates</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Check-out:</span>
                    <span style="color: #666;">Please select dates</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>Guests:</span>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button onclick="changeGuests(-1)" style="
                            border: 1px solid #ddd;
                            background: white;
                            width: 32px;
                            height: 32px;
                            border-radius: 50%;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        ">-</button>
                        <span id="guest-count" style="min-width: 20px; text-align: center;">${guests}</span>
                        <button onclick="changeGuests(1)" style="
                            border: 1px solid #ddd;
                            background: white;
                            width: 32px;
                            height: 32px;
                            border-radius: 50%;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        ">+</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="border: 1px solid #ddd; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;" id="price-details">
            <h3 style="margin-bottom: 1rem;">Price Details</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>₹${basePrice.toLocaleString()} x ${nights} night</span>
                <span>₹${(nights * basePrice).toLocaleString()}</span>
            </div>
            ${extraGuestCharge > 0 ? `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Extra guests (${guests - 2} × ₹${Math.floor(basePrice * 0.1)})</span>
                <span>₹${extraGuestCharge.toLocaleString()}</span>
            </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Service fee</span>
                <span>₹${serviceFee.toLocaleString()}</span>
            </div>
            <div style="border-top: 1px solid #eee; padding-top: 0.5rem; margin-top: 1rem;">
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem;">
                    <span>Total</span>
                    <span id="total-price">₹${total.toLocaleString()}</span>
                </div>
            </div>
        </div>
        
        <button class="btn btn-primary" style="width: 100%; padding: 16px;" onclick="confirmBooking(${total})" id="confirm-btn">
            <i class="fas fa-credit-card" style="margin-right: 8px;"></i>
            Confirm and Pay ₹${total.toLocaleString()}
        </button>
    `;
    
    
    bookingModal.className = 'booking-modal';
    bookingModal.appendChild(bookingContent);
    document.body.appendChild(bookingModal);
    
    // Close modal when clicking outside
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });
    
    // Store current guest count
    bookingModal.currentGuests = parseInt(guests);
}

function closeBookingModal() {
    const bookingModal = document.querySelector('.booking-modal');
    if (bookingModal) {
        bookingModal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (bookingModal.parentNode) {
                bookingModal.remove();
            }
        }, 300);
    }
}

function changeGuests(change) {
    const bookingModal = document.querySelector('.booking-modal');
    if (!bookingModal) return;
    
    const guestCount = document.getElementById('guest-count');
    const currentGuests = parseInt(guestCount.textContent);
    const newGuests = Math.max(1, currentGuests + change); // Minimum 1 guest
    const maxGuests = 12; // Set maximum guests
    
    if (newGuests <= maxGuests) {
        guestCount.textContent = newGuests;
        bookingModal.currentGuests = newGuests;
        
        // Update pricing
        updatePricing();
    }
}

function updatePricing() {
    const bookingModal = document.querySelector('.booking-modal');
    if (!bookingModal || !currentBooking) return;
    
    const guests = bookingModal.currentGuests || 2;
    let nights = 1; // Default to 1 night for now
    
    // Base price per night
    const basePrice = currentBooking.price;
    // Additional charge per extra guest (after first 2 guests)
    const extraGuestCharge = guests > 2 ? (guests - 2) * Math.floor(basePrice * 0.1) : 0;
    const pricePerNight = basePrice + extraGuestCharge;
    const subtotal = nights * pricePerNight;
    const serviceFee = Math.floor(subtotal * 0.14);
    const total = subtotal + serviceFee;
    
    // Update the price details section
    const priceDetailsEl = document.getElementById('price-details');
    if (priceDetailsEl) {
        priceDetailsEl.innerHTML = `
            <h3 style="margin-bottom: 1rem;">Price Details</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>₹${basePrice.toLocaleString()} x ${nights} night</span>
                <span>₹${(nights * basePrice).toLocaleString()}</span>
            </div>
            ${extraGuestCharge > 0 ? `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Extra guests (${guests - 2} × ₹${Math.floor(basePrice * 0.1)})</span>
                <span>₹${extraGuestCharge.toLocaleString()}</span>
            </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Service fee</span>
                <span>₹${serviceFee.toLocaleString()}</span>
            </div>
            <div style="border-top: 1px solid #eee; padding-top: 0.5rem; margin-top: 1rem;">
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem;">
                    <span>Total</span>
                    <span id="total-price">₹${total.toLocaleString()}</span>
                </div>
            </div>
        `;
    }
    
    const confirmBtn = document.getElementById('confirm-btn');
    if (confirmBtn) {
        confirmBtn.innerHTML = `
            <i class="fas fa-credit-card" style="margin-right: 8px;"></i>
            Confirm and Pay ₹${total.toLocaleString()}
        `;
        confirmBtn.onclick = () => confirmBooking(total);
    }
}

function confirmBooking(total) {
    // Get existing bookings or initialize empty array
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    
    // Create booking object
    const bookingId = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const guests = document.querySelector('.booking-modal') ? document.querySelector('.booking-modal').currentGuests : 2;
    
    const booking = {
        id: bookingId,
        propertyId: currentBooking.id,
        title: currentBooking.title,
        location: currentBooking.location,
        image: currentBooking.image,
        rating: currentBooking.rating,
        price: currentBooking.price,
        guests: guests,
        total: total,
        status: 'Confirmed',
        bookingDate: new Date().toISOString(),
        checkIn: 'Please select dates', // You can make this dynamic later
        checkOut: 'Please select dates'
    };
    
    // Add to bookings array
    bookings.push(booking);
    
    // Save to localStorage
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Close modals
    closeBookingModal();
    setTimeout(() => {
        closeModal();
    }, 100);
    
    // Show success message
    showNotification(`Booking confirmed! Your booking ID is ${bookingId}. Total paid: ₹${total.toLocaleString()}`, 'success');
    
    console.log('Booking saved:', booking);
}

function toggleWishlist(listingId) {

    console.log('Toggling wishlist for listing ID:', listingId); 

    // Load fresh wishlist data
    loadWishlistFromStorage();
    
    const listing = listings.find(l => l.id === listingId);
    const existingIndex = wishlist.findIndex(item => item.id === listingId);
    
    if (existingIndex > -1) {
        // Remove from wishlist
        wishlist.splice(existingIndex, 1);
        showNotification(`Removed "${listing.title}" from wishlist`, 'info');
    } else {
        // Add to wishlist
        wishlist.push(listing);
        showNotification(`Added "${listing.title}" to wishlist`, 'success');
    }
    
    // Save to localStorage
    saveWishlistToStorage();
    
    // Update ALL wishlist buttons for this listing
    updateWishlistButtons(listingId);
}

// Save wishlist to localStorage
function saveWishlistToStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    console.log('Wishlist saved:', wishlist); // Debug log
}

// Load wishlist from localStorage
function loadWishlistFromStorage() {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
        try {
            wishlist = JSON.parse(stored);
            console.log('Wishlist loaded:', wishlist); // Debug log
        } catch (e) {
            console.error('Error loading wishlist:', e);
            wishlist = [];
        }
    }
}

function updateWishlistButtons(listingId) {
    const isWishlisted = wishlist.some(item => item.id === listingId);
    
    // Update modal button if it exists
    const modalBtn = document.getElementById(`wishlist-btn-${listingId}`);
    if (modalBtn) {
        modalBtn.className = `btn ${isWishlisted ? 'btn-primary' : 'btn-secondary'}`;
        modalBtn.style.backgroundColor = isWishlisted ? '#ff385c' : '#f7f7f7';
        modalBtn.style.color = isWishlisted ? 'white' : '#333';
        const icon = modalBtn.querySelector('i');
        if (icon) {
            icon.style.color = isWishlisted ? 'white' : '#666';
        }
    }
    
    // Update heart buttons in listing cards
const heartButtons = document.querySelectorAll(`[onclick*="toggleWishlist(${listingId})"]`);
heartButtons.forEach(btn => {
    const icon = btn.querySelector('i');
    if (icon) {
        if (isWishlisted) {
            icon.className = 'fas fa-heart';
            icon.style.color = '#ff385c';
        } else {
            icon.className = 'far fa-heart';
            icon.style.color = '#666';
        }
    }
});
}

function shareProperty(listingId) {
    const listing = listings.find(l => l.id === listingId);
    
    if (navigator.share) {
        navigator.share({
            title: listing.title,
            text: `Check out this amazing property: ${listing.title} in ${listing.location}`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers without native sharing
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Property link copied to clipboard!', 'success');
        });
    };
}



const heartButtonStyles = document.createElement('style');
heartButtonStyles.textContent = `
    .listing-card .fa-heart {
        transition: color 0.3s ease;
    }

    /* Red heart when wishlisted */
    .listing-card .fas.fa-heart {
        color: #ff385c !important;
        icon.style.color = '#ff385c !important';
    }

    /* Gray heart when not wishlisted */
    .listing-card .far.fa-heart {
        color: #666 !important;
    }
`;
document.head.appendChild(heartButtonStyles);

// Initialize wishlist when page loads
// Update all heart buttons on page load
document.addEventListener('DOMContentLoaded', function() {
    loadWishlistFromStorage();
    // Update all existing heart buttons
    listings.forEach(listing => {
        updateWishlistButtons(listing.id);
    });
});

