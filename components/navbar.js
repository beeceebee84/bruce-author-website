class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&display=swap');

        nav {
          background: rgba(23, 23, 23, 0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
        }

        .nav-container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
        .nav-inner { height: 4rem; display: flex; justify-content: space-between; align-items: center; }

        /* BRAND */
        .brand { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }

        .brand-dot {
          width: 0.625rem; height: 0.625rem; border-radius: 9999px;
          background-color: #D9822B;
          box-shadow: 0 0 6px rgba(217,130,43,0.35);
          transition: box-shadow .3s;
        }
        .brand:hover .brand-dot { box-shadow: 0 0 12px rgba(217,130,43,0.65); }

        /* Base (safe) text style for brand */
        .brand-name,
        .brand-imprint {
          color: #f8f9fa; /* fallback so text is always visible */
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-thickness: 1px;
          text-decoration-color: #D9822B;
          filter: drop-shadow(0 0 6px rgba(217,130,43,0.35));
          transition: filter .3s ease, text-decoration-color .3s ease;
        }
        .brand:hover .brand-name,
        .brand:hover .brand-imprint {
          text-decoration-color: #E89E4D;
          filter: drop-shadow(0 0 12px rgba(217,130,43,0.65));
        }

        .brand-name {
          font-weight: 700;
          font-size: 1.2rem;
          letter-spacing: -0.015em;
        }
        .brand-imprint {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 0.95rem;
          opacity: 0.95;
          display: none; /* shows on md+ below */
        }

        /* Only apply gradient-clip text if supported (prevents “invisible” text) */
        @supports (-webkit-background-clip: text) or (background-clip: text) {
          .brand-gradient {
            background-image: linear-gradient(to right, #D9822B, #E89E4D, #ffb347);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;                /* now safe because of the @supports */
            -webkit-text-fill-color: transparent;
            transition: background-position .4s ease;
          }
          .brand:hover .brand-gradient { background-position: 100% 0; }
        }

        /* NAV LINKS */
        .nav-links { display: none; align-items: center; gap: 1.5rem; }

        .nav-link {
          color: rgba(248, 249, 250, 0.8);
          transition: color 0.2s;
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-thickness: 1px;
          text-decoration-color: rgba(248, 249, 250, 0.8);
        }
        .nav-link:hover { color: #f59e0b; text-decoration-color: #f59e0b; }

        /* DROPDOWN */
        .dropdown { position: relative; }

        .dropdown-btn {
          display: flex; align-items: center; gap: 0.25rem;
          background: transparent; border: none; padding: 0;
          color: rgba(248, 249, 250, 0.8);
          font: inherit; cursor: pointer; -webkit-appearance: none; appearance: none;
          text-decoration: underline; text-underline-offset: 2px; text-decoration-thickness: 1px;
          text-decoration-color: rgba(248, 249, 250, 0.8);
        }
        .dropdown-btn:hover { color: #f59e0b; text-decoration-color: #f59e0b; }
        .dropdown-btn:focus { outline: none; }
        .dropdown-btn:focus-visible { outline: 2px solid rgba(245,158,11,0.6); outline-offset: 2px; }

        .dropdown-menu {
          position: absolute; top: 100%; right: 0;
          background: #1a1a1a; border-radius: 0.375rem; border: 1px solid rgba(255,255,255,0.1);
          padding: 0.5rem 0; min-width: 12rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          opacity: 0; visibility: hidden; transform: translateY(-4px);
          transition: all 0.25s ease; z-index: 10;
        }
        .dropdown:hover .dropdown-menu { opacity: 1; visibility: visible; transform: translateY(0); }

        .dropdown-item { display: block; padding: 0.5rem 1rem; color: rgba(248, 249, 250, 0.8); transition: all 0.2s; }
        .dropdown-item:hover { color: #f59e0b; background: rgba(255,255,255,0.05); }

        .cart-icon { display: flex; align-items: center; gap: 0.25rem; }
        .menu-toggle { display: block; color: #f8f9fa; }

        .mobile-menu { background: #171717; border-top: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1rem; display: none; }
        .mobile-link { display: block; padding: 0.5rem 0; color: rgba(248, 249, 250, 0.8); }
        .mobile-link:hover { color: #f59e0b; }

        @media (min-width: 768px) {
          .nav-links { display: flex; }
          .brand-imprint { display: inline; }
          .menu-toggle { display: none; }
        }
      </style>

      <nav>
        <div class="nav-container">
          <div class="nav-inner">
            <a href="index.html" class="brand">
              <span class="brand-dot"></span>
              <span class="brand-name brand-gradient">Bruce C. Bee</span>
              <span class="brand-imprint brand-gradient">The BKR Imprint</span>
            </a>

            <div class="nav-links">
              <a href="index.html" class="nav-link">Home</a>
              <a href="about.html" class="nav-link">About</a>
              <a href="books.html" class="nav-link">Books</a>
              <a href="blog.html" class="nav-link">Blog</a>

              <<div class="pl-2 py-1">
  <div class="text-bone-50/60 mb-1">Services</div>
  <a href="/bruce-author-website/publishing.html" class="mobile-link block pl-4" target="_self">Publishing</a>
  <a href="/bruce-author-website/resumewriting.html" class="mobile-link block pl-4" target="_self">Résumé Writing</a>
</div>


              <a href="contact.html" class="nav-link">Contact</a>
              <a href="#" class="nav-link cart-icon">
                <i data-feather="shopping-cart" class="w-5 h-5"></i>
                <span>(0)</span>
              </a>
            </div>

            <button class="menu-toggle" id="menu-toggle">
              <i data-feather="menu" class="w-6 h-6"></i>
            </button>
          </div>
        </div>

        <div class="mobile-menu" id="mobile-menu">
          <a href="index.html" class="mobile-link">Home</a>
          <a href="about.html" class="mobile-link">About</a>
          <a href="books.html" class="mobile-link">Books</a>
          <a href="blog.html" class="mobile-link">Blog</a>
          <div class="pl-2 py-1">
            <div class="text-bone-50/60 mb-1">Services</div>
            <a href="publishing.html" class="mobile-link block pl-4">Publishing</a>
           <a href="resumewriting.html" class="mobile-link block pl-4">Résumé Writing</a>
          </div>
          <a href="contact.html" class="mobile-link">Contact</a>
          <a href="#" class="mobile-link flex items-center">
            <i data-feather="shopping-cart" class="w-5 h-5 mr-1"></i>
            Cart (0)
          </a>
        </div>
      </nav>

      <script>
        // Feather is optional; if not present, don't error out.
        try { if (window.feather) feather.replace(); } catch (e) {}

        // Mobile toggle
        const btn = this.shadowRoot.getElementById('menu-toggle');
        const menu = this.shadowRoot.getElementById('mobile-menu');
        btn.addEventListener('click', () => {
          menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
        });
      </script>
    `;
  }
}

customElements.define('custom-navbar', CustomNavbar);




