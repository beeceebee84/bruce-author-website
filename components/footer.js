class CustomFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer class="relative mt-20 bg-ink-900 text-bone-50 border-t border-white/10">
        <!-- Fire→Smoke top gradient bar -->
        <div class="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-r from-ember-600 via-ember-500 to-ink-800"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-10">

            <!-- Brand / About -->
            <div>
              <div class="flex items-center space-x-2">
                <span class="w-2.5 h-2.5 rounded-full bg-ember-500"></span>
               <h3
  class="text-2xl font-semibold tracking-tight
         bg-gradient-to-r from-ember-400 via-ember-500 to-amber-600
         bg-clip-text text-transparent
         filter drop-shadow-[0_0_6px_rgba(217,130,43,0.35)]
         hover:drop-shadow-[0_0_12px_rgba(217,130,43,0.65)]
         transition">
  The BKR Imprint
</h3>

              </div>

              <p class="mt-4 text-bone-50/75">
                Crafting stories that resonate with readers around the world.
              </p>

              <div class="mt-5 flex items-center gap-3">
                <a href="#" class="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                                   text-bone-50/70 hover:text-ember-400 hover:border-ember-500 transition"
                   aria-label="Instagram">
                  <i data-feather="instagram" class="w-4 h-4"></i>
                </a>
                <a href="#" class="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                                   text-bone-50/70 hover:text-ember-400 hover:border-ember-500 transition"
                   aria-label="Twitter">
                  <i data-feather="twitter" class="w-4 h-4"></i>
                </a>
                <a href="#" class="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                                   text-bone-50/70 hover:text-ember-400 hover:border-ember-500 transition"
                   aria-label="Facebook">
                  <i data-feather="facebook" class="w-4 h-4"></i>
                </a>
                <a href="#" class="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                                   text-bone-50/70 hover:text-ember-400 hover:border-ember-500 transition"
                   aria-label="Email">
                  <i data-feather="mail" class="w-4 h-4"></i>
                </a>
              </div>
            </div>

            <!-- Explore -->
            <div>
              <h4 class="text-lg font-semibold mb-4">Explore</h4>
              <ul class="space-y-3">
                <li><a href="index.html" class="text-bone-50/80 hover:text-ember-400 transition">Home</a></li>
                <li><a href="books.html" class="text-bone-50/80 hover:text-ember-400 transition">Books</a></li>
                <li><a href="about.html" class="text-bone-50/80 hover:text-ember-400 transition">About</a></li>
                <li><a href="blog.html" class="text-bone-50/80 hover:text-ember-400 transition">Blog</a></li>
                <li><a href="publishing.html" class="text-bone-50/80 hover:text-ember-400 transition">Publishing</a></li>
                <li><a href="contact.html" class="text-bone-50/80 hover:text-ember-400 transition">Contact</a></li>
              </ul>
            </div>

            <!-- Books -->
            <div>
              <h4 class="text-lg font-semibold mb-4">Books</h4>
              <ul class="space-y-3">
                <li><a href="book.html" class="text-bone-50/80 hover:text-ember-400 transition">Burn Me Whole</a></li>
                <li><a href="books.html" class="text-bone-50/80 hover:text-ember-400 transition">All Books</a></li>
                <li><a href="#" style="visibility: hidden" class="text-bone-50/80 hover:text-ember-400 transition">Echoes in the Mist</a></li>
                <li><a href="#" style="visibility: hidden" class="text-bone-50/80 hover:text-ember-400 transition">The Silent Witness</a></li>
                <li><a href="books.html" style="visibility: hidden" class="text-bone-50/80 hover:text-ember-400 transition">All Books</a></li>
              </ul>
            </div>

            <!-- Legal -->
            <div>
              <h4 class="text-lg font-semibold mb-4">Legal</h4>
              <ul class="space-y-3">
                <li><a href="#" class="text-bone-50/80 hover:text-ember-400 transition">Privacy Policy</a></li>
                <li><a href="#" class="text-bone-50/80 hover:text-ember-400 transition">Terms of Service</a></li>
                <li><a href="#" class="text-bone-50/80 hover:text-ember-400 transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <hr class="mt-10 border-white/10">

          <div class="mt-6 text-center text-bone-50/60 text-sm">
            © ${year} The BKR Imprint. All rights reserved.
          </div>
        </div>
      </footer>

      <script>feather.replace();</script>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);





