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

<script>
// Wire every form that has data-substack-form
(function () {
  function wireSubstackForms() {
    document.querySelectorAll('form[data-substack-form]').forEach(form => {
      if (form.__wired) return; // avoid double binding
      form.__wired = true;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const status = form.querySelector('[data-substack-status]');
        const email = (emailInput?.value || '').trim();

        // simple validation
        if (!email || !/.+@.+\..+/.test(email)) {
          if (status) {
            status.textContent = 'Please enter a valid email.';
            status.classList.remove('hidden');
          } else {
            alert('Please enter a valid email.');
          }
          return;
        }

        // Build Substack subscribe URL
        const url = new URL('https://brucecbee.substack.com/subscribe');
        url.searchParams.set('email', email);

        // Open Substack confirm page in a new tab
        const win = window.open(url.toString(), '_blank', 'noopener');

        // UI feedback
        if (status) {
          status.textContent = 'Almost done! Confirm your subscription in the new tab.';
          status.classList.remove('hidden');
        } else {
          alert('Almost done! Confirm your subscription in the new tab.');
        }

        // If popups are blocked, fall back to navigating current tab
        if (!win) {
          window.location.href = url.toString();
        }
      });
    });
  }

  // run now and on future DOM changes (in case components render later)
  wireSubstackForms();
  new MutationObserver(wireSubstackForms).observe(document.documentElement, { childList: true, subtree: true });
})();
</script>

// your existing script.js stuff
updateCartCount();

// === ADD THIS NEW BLOCK AT THE VERY END ===
(function () {
  const modal = document.getElementById('substack-modal');
  if (!modal) return;

  const backdrop = modal.querySelector('[data-backdrop]');
  const closeBtns = modal.querySelectorAll('[data-close]');
  const form = modal.querySelector('#substack-modal-form');
  const emailInput = modal.querySelector('#substack-modal-email');
  const status = modal.querySelector('#substack-modal-status');

  function openModal(prefill = '') {
    emailInput.value = prefill || '';
    status.classList.add('hidden');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => emailInput.focus(), 50);
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.documentElement.style.overflow = '';
  }

  // Close interactions
  closeBtns.forEach(b => b.addEventListener('click', closeModal));
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });

  // Open via any trigger element
  document.querySelectorAll('[data-open-substack-modal]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const src = document.querySelector('form[data-substack-form] input[type="email"]');
      openModal(src ? src.value.trim() : '');
    });
  });

  // Intercept page forms with data-substack-form to open the modal instead
  document.querySelectorAll('form[data-substack-form]').forEach(f => {
    if (f.__wired) return; f.__wired = true;
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = (f.querySelector('input[type="email"]')?.value || '').trim();
      openModal(val);
    });
  });

  // Modal submit → open Substack subscribe in new tab
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!/.+@.+\..+/.test(email)) {
      status.textContent = 'Please enter a valid email.';
      status.classList.remove('hidden');
      return;
    }
    const url = new URL('https://brucecbee.substack.com/subscribe');
    url.searchParams.set('email', email);

    status.textContent = 'Almost done! Confirm your subscription in the new tab.';
    status.classList.remove('hidden');

    const win = window.open(url.toString(), '_blank', 'noopener');
    if (!win) window.location.href = url.toString(); // popup blocked
  });
})();



