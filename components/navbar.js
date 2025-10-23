class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="fixed top-0 left-0 w-full z-50 bg-ink-950/95 backdrop-blur-sm border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">

            <!-- LEFT: Brand -->
            <a href="index.html" class="flex items-center space-x-2">
              <!-- ember dot -->
              <span class="w-2.5 h-2.5 rounded-full bg-ember-500"></span>
              <!-- author name -->
              <span class="font-semibold text-bone-50 text-lg tracking-tight">Bruce&nbsp;C.&nbsp;Bee</span>
              <!-- subtle imprint -->
              <span class="text-sm text-bone-50/60 italic ml-1 hidden sm:inline">InkScribe</span>
            </a>

            <!-- RIGHT: Nav Links -->
            <div class="hidden md:flex items-center space-x-6">
              <a href="index.html" class="text-bone-50/80 hover:text-ember-400 transition">Home</a>
              <a href="books.html" class="text-bone-50/80 hover:text-ember-400 transition">Books</a>
              <a href="about.html" class="text-bone-50/80 hover:text-ember-400 transition">About</a>
              <a href="blog.html" class="text-bone-50/80 hover:text-ember-400 transition">Blog</a>
              <a href="contact.html" class="text-bone-50/80 hover:text-ember-400 transition">Contact</a>

              <!-- cart icon -->
              <a href="#" class="relative text-bone-50/80 hover:text-ember-400 transition flex items-center">
                <i data-feather="shopping-cart" class="w-5 h-5"></i>
                <span class="ml-1 text-sm">(0)</span>
              </a>
            </div>

            <!-- MOBILE: Hamburger -->
            <button id="menu-toggle" class="md:hidden text-bone-50 focus:outline-none">
              <i data-feather="menu" class="w-6 h-6"></i>
            </button>
          </div>
        </div>

        <!-- MOBILE MENU -->
        <div id="mobile-menu" class="hidden md:hidden bg-ink-900 border-t border-white/10">
          <div class="px-4 py-3 space-y-2">
            <a href="index.html" class="block text-bone-50/80 hover:text-ember-400 transition">Home</a>
            <a href="books.html" class="block text-bone-50/80 hover:text-ember-400 transition">Books</a>
            <a href="about.html" class="block text-bone-50/80 hover:text-ember-400 transition">About</a>
            <a href="blog.html" class="block text-bone-50/80 hover:text-ember-400 transition">Blog</a>
            <a href="contact.html" class="block text-bone-50/80 hover:text-ember-400 transition">Contact</a>
            <a href="#" class="block text-bone-50/80 hover:text-ember-400 transition flex items-center">
              <i data-feather="shopping-cart" class="w-5 h-5 mr-1"></i>Cart (0)
            </a>
          </div>
        </div>
      </nav>

      <script>
        feather.replace();
        document.getElementById('menu-toggle').addEventListener('click', () => {
          document.getElementById('mobile-menu').classList.toggle('hidden');
        });
      </script>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);
