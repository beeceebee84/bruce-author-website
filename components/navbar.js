class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
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

        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .nav-inner {
          height: 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #f8f9fa;
          font-weight: 600;
          font-size: 1.125rem;
          letter-spacing: -0.025em;
        }

        .brand-dot {
          width: 0.625rem;
          height: 0.625rem;
          border-radius: 9999px;
          background-color: #d9822b;
          transition: box-shadow 0.3s;
        }

        .brand-dot:hover {
          box-shadow: 0 0 8px rgba(217, 130, 43, 0.7);
        }

        .brand-imprint {
          font-size: 0.875rem;
          color: rgba(248, 249, 250, 0.6);
          font-style: italic;
          display: none;
        }

        .nav-links {
          display: none;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-link {
          color: rgba(248, 249, 250, 0.8);
          transition: color 0.2s;
          position: relative;
        }

        .nav-link:hover {
          color: #f59e0b;
        }

        /* underline hover animation for all links */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #f59e0b;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .dropdown {
          position: relative;
        }

        /* Base dropdown layout */
        .dropdown-btn {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: transparent;
          border: none;
          padding: 0;
          color: rgba(248, 249, 250, 0.8);
          font: inherit;
          cursor: pointer;
          -webkit-appearance: none;
          appearance: none;
          position: relative;
        }

        .dropdown-btn:hover {
          color: #f59e0b;
        }

        .dropdown-btn:focus {
          outline: none;
        }

        .dropdown-btn:focus-visible {
          outline: 2px solid rgba(245, 158, 11, 0.6);
          outline-offset: 2px;
        }

        /* ✅ Match underline hover effect for dropdown */
        .dropdown-btn::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #f59e0b;
          transition: width 0.3s ease;
        }

        .dropdown-btn:hover::after {
          width: 100%;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: #1a1a1a;
          border-radius: 0.375rem;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.5rem 0;
          min-width: 12rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-4px);
          transition: all 0.25s ease;
          z-index: 10;
        }

        .dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: block;
          padding: 0.5rem 1rem;
          color: rgba(248, 249, 250, 0.8);
          transition: all 0.2s;
        }

        .dropdown-item:hover {
          color: #f59e0b;
          background: rgba(255,255,255,0.05);
        }

        .cart-icon {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .menu-toggle {
          display: block;
          color: #f8f9fa;
        }

        .mobile-menu {
          background: #171717;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 0.75rem 1rem;
          display: none;
        }

        .mobile-link {
          display: block;
          padding: 0.5rem 0;
          color: rgba(248, 249, 250, 0.8);
        }

        .mobile-link:hover {
          color: #f59e0b;
        }

        @media (min-width: 768px) {
          .nav-links {
            display: flex;
          }
          .brand-imprint {
            display: inline;
          }
          .menu-toggle {
            display: none;
          }
        }
      </style>

      <nav>
        <div class="nav-container">
          <div class="nav-inner">
            <a href="index.html" class="brand">
              <span class="brand-dot"></span>
              <span>Bruce&nbsp;C.&nbsp;Bee</span>
              <span class="brand-imprint">The BKR Imprint</span>
            </a>

            <div class="nav-links">
              <a href="index.html" class="nav-link">Home</a>
              <a href="about.html" class="nav-link">About</a>
              <a href="books.html" class="nav-link">Books</a>
              <a href="blog.html" class="nav-link">Blog</a>

              <div class="dropdown">
                <button class="nav-link dropdown-btn">
                  Services
                  <i data-feather="chevron-down" class="w-4 h-4"></i>
                </button>
                <div class="dropdown-menu">
                  <a href="publishing.html" class="dropdown-item">Publishing</a>
                  <a href="imprint.html" class="dropdown-item">BKR Imprint</a>
                  <a href="resume-writing.html" class="dropdown-item">Résumé Writing</a>
                </div>
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
            <a href="imprint.html" class="mobile-link block pl-4">BKR Imprint</a>
            <a href="resume-writing.html" class="mobile-link block pl-4">Résumé Writing</a>
          </div>
          <a href="contact.html" class="mobile-link">Contact</a>
          <a href="#" class="mobile-link flex items-center">
            <i data-feather="shopping-cart" class="w-5 h-5 mr-1"></i>
            Cart (0)
          </a>
        </div>
      </nav>

      <script>
        feather.replace();
        this.shadowRoot.getElementById('menu-toggle').addEventListener('click', () => {
          const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
          mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        });
      </script>
    `;
  }
}

customElements.define('custom-navbar', CustomNavbar);
