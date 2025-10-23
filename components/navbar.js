// components/navbar.js  (NO <script> tags in this file)

// <custom-navbar></custom-navbar>
class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="sticky top-0 z-50">
        <div class="backdrop-blur supports-[backdrop-filter]:bg-gray-900/70 bg-gray-900/95 border-b border-white/10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <!-- Brand -->
            <a href="index.html" class="flex items-center gap-2 group">
              <span class="w-2.5 h-2.5 rounded-full bg-primary-500 group-hover:scale-110 transition"></span>
              <span class="text-white font-semibold">InkScribe</span>
            </a>

            <!-- Desktop nav -->
            <nav class="hidden md:flex items-center gap-6">
              ${[
                ["index.html","Home"],
                ["books.html","Books"],
                ["about.html","About"],
                ["blog.html","Blog"],
                ["contact.html","Contact"]
              ].map(([href,label]) => `
                <a href="${href}"
                   class="text-gray-300 hover:text-white transition relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary-500 hover:after:w-full after:transition-[width]">
                  ${label}
                </a>
              `).join("")}
              <a href="cart.html" class="ml-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-500/15 text-primary-400 hover:bg-primary-500/25">
                <i data-feather="shopping-cart" class="w-4 h-4"></i><span>0</span>
              </a>
            </nav>

            <!-- Mobile menu button -->
            <button id="navToggle" class="md:hidden text-gray-300 hover:text-white" aria-label="Toggle navigation">
              <i data-feather="menu" class="w-6 h-6"></i>
            </button>
          </div>
        </div>

        <!-- Mobile drawer -->
        <div id="mobileMenu" class="md:hidden hidden bg-gray-900 border-b border-white/10">
          <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 grid gap-2">
            ${[
              ["index.html","Home"],
              ["books.html","Books"],
              ["about.html","About"],
              ["blog.html","Blog"],
              ["contact.html","Contact"]
            ].map(([href,label]) => `
              <a href="${href}" class="px-3 py-2 rounded-lg text-gray-200 hover:bg-white/5">${label}</a>
            `).join("")}
          </nav>
        </div>
      </header>
    `;

    // Toggle mobile menu
    const btn = this.querySelector('#navToggle');
    const menu = this.querySelector('#mobileMenu');
    btn?.addEventListener('click', () => menu.classList.toggle('hidden'));

    // Replace icons (safe if feather already loaded)
    if (window.feather) feather.replace();

    // Mark current page active
    const links = this.querySelectorAll('a[href]');
    const here = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      if (a.getAttribute('href') === here) {
        a.classList.add('text-white');
        a.insertAdjacentHTML('beforeend',
          `<span class="absolute left-0 -bottom-1 h-0.5 w-full bg-primary-500 md:block hidden"></span>`);
      }
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);
