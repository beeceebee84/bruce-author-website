// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved user preference or use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('color-theme');
    
    if (savedMode === 'dark' || (!savedMode && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
    
    // Initialize all tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        new Tooltip(tooltip, {
            placement: 'top',
            title: tooltip.getAttribute('data-tooltip')
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                // Here you would typically send the data to your server
                alert('Thank you for subscribing!');
                emailInput.value = '';
            }
        });
    }
});

// Simple book preview modal
function showBookPreview(bookId) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button onclick="this.parentElement.parentElement.remove()" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <i data-feather="x"></i>
            </button>
            <h3 class="text-2xl font-bold mb-4">Book Preview</h3>
            <div class="prose dark:prose-invert">
                <p>This would be your book preview content for book ID: ${bookId}</p>
                <!-- Sample chapter content would go here -->
            </div>
            <div class="mt-6">
                <a href="book-${bookId}.html" class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium">
                    View Full Details
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    feather.replace();
}

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(bookId, title, price) {
    const existingItem = cart.find(item => item.id === bookId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: bookId,
            title: title,
            price: price,
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${title} added to cart`);
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.textContent = count;
        cartBadge.classList.toggle('hidden', count === 0);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.replace('animate-fade-in', 'animate-fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize cart count on page load
updateCartCount();