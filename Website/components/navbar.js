class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(10px);
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                
                .dark nav {
                    background: rgba(26, 32, 44, 0.9);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                }
                
                .logo {
                    font-size: 1.5rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    display: flex;
                    align-items: center;
                }
                
                .nav-links {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                }
                
                .nav-links a {
                    color: #4a5568;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                    position: relative;
                }
                
                .dark .nav-links a {
                    color: #cbd5e0;
                }
                
                .nav-links a:hover {
                    color: #6366f1;
                }
                
                .dark .nav-links a:hover {
                    color: #818cf8;
                }
                
                .nav-links a.active {
                    color: #6366f1;
                    font-weight: 600;
                }
                
                .dark .nav-links a.active {
                    color: #818cf8;
                }
                
                .nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #6366f1;
                    transition: width 0.3s;
                }
                
                .dark .nav-links a::after {
                    background: #818cf8;
                }
                
                .nav-links a:hover::after,
                .nav-links a.active::after {
                    width: 100%;
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: #4a5568;
                    cursor: pointer;
                }
                
                .dark .mobile-menu-btn {
                    color: #cbd5e0;
                }
                
                .cart-icon {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                
                .cart-badge {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #ec4899;
                    color: white;
                    border-radius: 9999px;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                
                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: block;
                    }
                    
                    .nav-links {
                        position: fixed;
                        top: 72px;
                        left: 0;
                        right: 0;
                        background: white;
                        flex-direction: column;
                        padding: 1rem 0;
                        gap: 1rem;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        transform: translateY(-100%);
                        opacity: 0;
                        pointer-events: none;
                        transition: all 0.3s ease;
                    }
                    
                    .dark .nav-links {
                        background: #1a202c;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                    }
                    
                    .nav-links.open {
                        transform: translateY(0);
                        opacity: 1;
                        pointer-events: all;
                    }
                    
                    .nav-links a {
                        padding: 0.5rem 1rem;
                        width: 100%;
                        text-align: center;
                    }
                    
                    .nav-links a::after {
                        display: none;
                    }
                }
                
                .theme-toggle {
                    background: none;
                    border: none;
                    color: #4a5568;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.25rem;
                    border-radius: 9999px;
                    transition: all 0.2s;
                }
                
                .dark .theme-toggle {
                    color: #cbd5e0;
                }
                
                .theme-toggle:hover {
                    background: rgba(0, 0, 0, 0.05);
                }
                
                .dark .theme-toggle:hover {
                    background: rgba(255, 255, 255, 0.05);
                }
            </style>
            
            <nav>
                <a href="/" class="logo">
                    <i data-feather="pen-tool" class="mr-2"></i>
                    InkScribe
                </a>
                
                <button class="mobile-menu-btn" id="mobile-menu-btn">
                    <i data-feather="menu"></i>
                </button>
                
                <div class="nav-links" id="nav-links">
                    <a href="/" class="active">Home</a>
                    <a href="books.html">Books</a>
                    <a href="about.html">About</a>
                    <a href="blog.html">Blog</a>
                    <a href="contact.html">Contact</a>
                    <a href="cart.html" class="cart-icon">
                        <i data-feather="shopping-cart"></i>
                        <span class="cart-badge hidden" id="cart-count"></span>
                    </a>
                    <button class="theme-toggle" id="theme-toggle">
                        <i data-feather="sun" class="hidden dark:block"></i>
                        <i data-feather="moon" class="dark:hidden"></i>
                    </button>
                </div>
            </nav>
        `;
        
        // Initialize mobile menu toggle
        const mobileMenuBtn = this.shadowRoot.getElementById('mobile-menu-btn');
        const navLinks = this.shadowRoot.getElementById('nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('open') 
                ? '<i data-feather="x"></i>' 
                : '<i data-feather="menu"></i>';
            feather.replace();
        });
        
        // Initialize theme toggle
        const themeToggle = this.shadowRoot.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            const html = document.documentElement;
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                html.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
            feather.replace();
        });
        
        // Update cart count
        this.updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            const cartBadge = this.shadowRoot.getElementById('cart-count');
            if (cartBadge) {
                cartBadge.textContent = count;
                cartBadge.classList.toggle('hidden', count === 0);
            }
        };
        
        // Initial cart count update
        this.updateCartCount();
        
        // Replace feather icons
        feather.replace();
    }
}

customElements.define('custom-navbar', CustomNavbar);