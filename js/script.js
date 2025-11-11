// ==============================
// Global UI / Theme / Utilities
// ==============================
document.addEventListener('DOMContentLoaded', function() {
  // Dark mode preference
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const savedMode = localStorage.getItem('color-theme');
  if (savedMode === 'dark' || (!savedMode && prefersDark)) {
    document.documentElement.classList.add('dark');
  }

  // Tooltips (guard if Tooltip lib not present)
  const tooltips = document.querySelectorAll('[data-tooltip]');
  if (typeof Tooltip !== 'undefined') {
    tooltips.forEach(tooltip => {
      new Tooltip(tooltip, {
        placement: 'top',
        title: tooltip.getAttribute('data-tooltip')
      });
    });
  }

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // ignore just "#" or empty
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Initialize cart count on page load
  updateCartCount();

  // Initialize Substack modal controller
  initSubstackModal();
});

// ==============================
// Substack Modal Controller
// ==============================
function initSubstackModal() {
  const modal = document.getElementById('substack-modal');
  const openers = document.querySelectorAll('[data-substack-form]');
  const closeBtn = modal?.querySelector('[data-substack-close]');

  // If no opener forms on this page, no need to wire anything
  if (!openers.length) return;

  function openModal() {
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex'); // center via flex
      document.documentElement.style.overflow = 'hidden'; // lock scroll
    } else {
      // Fallback: open Substack subscribe page if modal not included
      window.open('https://brucecbee.substack.com/', '_blank', 'noopener,noreferrer');
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.documentElement.style.overflow = ''; // restore scroll
  }

  // Attach to every custom-styled subscribe form
  openers.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value?.trim();

      // Quick client-side check (UX nicety only; Substack handles the real thing)
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      openModal();
    });
  });

  // Close controls
  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(); // click backdrop
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ==============================
// Simple book preview modal
// ==============================
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
  if (window.feather?.replace) feather.replace();
}

// ==============================
// Shopping cart functionality
// ==============================
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function addToCart(bookId, title, price) {
  const existingItem = cart.find(item => item.id === bookId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: bookId, title, price, quantity: 1 });
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
