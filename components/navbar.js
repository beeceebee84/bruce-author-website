class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
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

        /* === BRAND === */
        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }

        .brand-dot {
          width: 0.625rem;
          height: 0.625rem;
          border-radius: 9999px;
          background-color: #D9822B;
          box-shadow: 0 0 6px rgba(217,130,43,0.35);
          transition: box-shadow 0.3s;
        }

        .brand-dot:hover {
          box-shadow: 0 0 12px rgba(217,130,43,0.65);
        }

        /* Gradient/glow for both names (matches footer) */
        .brand-text {
          background-image: linear-gradient(to right, #D9822B, #E89E4D, #ffb347);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 6px rgba(217,130,43,0.35));
          transition: filter 0.3s ease;
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-thickness: 1px;
          text-decoration-color: #D9822B;
        }

        .brand-text:hover {
          filter: drop-shadow(0 0 12px rgba(217,130,43,0.65));
          text-decoration-color: #E89E4D;
        }

        .brand-name {
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.015em;
        }

        .brand-imprint {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 0.95rem;
          opacity: 0.95;
        }

        /* === NAV LINKS === */
        .nav-links {
          display: none;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-link {
          color: rgba(248, 249, 250, 0.8);
          transition: color 0.2s;
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-thickness: 1px;
          text-decoration-color: rgba(248, 249, 250, 0.8);
        }

        .nav-link:hover {
          color: #f59e0b;
          text-decoration-color: #f59e0b;
        }

        /* === DROPDOWN === */
        .dropdown {
          position: relative;
        }

        .dropdown-btn {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: transparent;
          border: none;
          padding: 0;
          color: rgba(248, 249, 250, 0.8);
