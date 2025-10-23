// components/navbar.js
class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="sticky top-0 z-50">
        <div class="backdrop-blur supports-[backdrop-filter]:bg-ink-900/80 bg-ink-900/95 border-b border-white/10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="index.html" class="flex items-center gap-2 group">
              <span class="w-2.5 h-2.5 rounded-full bg-ember-500 group-hover:scale-110 transition"></span>
              <span class="text-bone-50 font-semibold">InkScribe</span>
            </a>

            <nav class="hidden md:flex items-center gap-6">
              ${[
                ["index.html","Home"],
                ["books.html","Books"],
                ["about.html","About"],
                ["blog.html","Blog"],
                ["contact.html","Contact"]
              ].map(([href,label]) => `
                <a href="${href}"
                   class="text-bone-50/70 hover:text-bone-50 transition relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-ember-500 hover:after:w-full after:transition-[width]">
                  ${label}
                </a>
              `).join("")}
              <a href="cart.html" class="ml-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ember-500/15 text-ember-400 hover:bg-ember-500/25">
                <i data-feather="shopping-cart" class="w-4 h-4"></i><span>0</span>
              </a>
            </nav>

            <button id="navToggle" class="md:hidden text-bone-50/80 hover:text-bone-50" aria-label="Toggle navigation">
              <i data-feather="menu" class="w-6 h-6"></i>
            </button>
          </div>
        </div>

        <div id="mobileMenu" class="md:hidden hidden bg-ink-900 border-b border-white/10">
          <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 grid gap-2">
            ${[
              ["index.html","Home"],
              ["books.html","Books"],
              ["about.html","About"],
              ["blog.html","Blog"],
              ["contact.html","Contact"]
            ].map(([href,label]) => `
              <a href="${href}" class="px-3 py-2 rounded-lg text-bone-50/80 hover:text-bone-50 hover:bg-white/5">${label}</a>
            `).join("")}
          </nav>
        </div>
      </header>
    `;

    const btn  = this.querySelector('#navToggle');
    const menu = this.querySelector('#mobileMenu');
    btn?.addEventListener('click', () => menu.classList.toggle('hidden'));

    if (window.feather) feather.replace();

    const here = location.pathname.split('/').pop() || 'index.html';
    this.querySelectorAll('a[href]').forEach(a => {
      if (a.getAttribute('href') === here) {
        a.classList.add('text-bone-50');
        a.insertAdjacentHTML('beforeend',
          `<span class="absolute left-0 -bottom-1 h-0.5 w-full bg-ember-500 md:block hidden"></span>`);
      }
    });
  }
}
customElements.define('custom-navbar', CustomNavbar);
