class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background: #1a202c;
                    color: white;
                    padding: 4rem 2rem;
                }
                
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                }
                
                .footer-logo {
                    font-size: 1.5rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    margin-bottom: 1rem;
                    display: inline-flex;
                    align-items: center;
                }
                
                .footer-about p {
                    color: #a0aec0;
                    margin-bottom: 1.5rem;
                }
                
                .footer-links h3 {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    color: white;
                }
                
                .footer-links ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .footer-links li {
                    margin-bottom: 0.75rem;
                }
                
                .footer-links a {
                    color: #a0aec0;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .footer-links a:hover {
                    color: #818cf8;
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }
                
                .social-links a {
                    color: #a0aec0;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 1px solid #2d3748;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                
                .social-links a:hover {
                    color: white;
                    background: #4f46e5;
                    border-color: #4f46e5;
                }
                
                .footer-bottom {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding-top: 2rem;
                    margin-top: 2rem;
                    border-top: 1px solid #2d3748;
                    text-align: center;
                    color: #a0aec0;
                    font-size: 0.875rem;
                }
                
                @media (max-width: 768px) {
                    .footer-content {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
            
            <footer>
                <div class="footer-content">
                    <div class="footer-about">
                        <div class="footer-logo">
                            <i data-feather="pen-tool" class="mr-2"></i>
                            InkScribe
                        </div>
                        <p>Crafting stories that resonate with readers around the world.</p>
                        <div class="social-links">
                            <a href="#" aria-label="Twitter"><i data-feather="twitter"></i></a>
                            <a href="#" aria-label="Facebook"><i data-feather="facebook"></i></a>
                            <a href="#" aria-label="Instagram"><i data-feather="instagram"></i></a>
                            <a href="#" aria-label="Goodreads"><i data-feather="book"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-links">
                        <h3>Explore</h3>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="books.html">Books</a></li>
                            <li><a href="about.html">About</a></li>
                            <li><a href="blog.html">Blog</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links">
                        <h3>Books</h3>
                        <ul>
                            <li><a href="book-whispers.html">Whispers of the Forgotten</a></li>
                            <li><a href="book-echoes.html">Echoes in the Mist</a></li>
                            <li><a href="book-silent.html">The Silent Witness</a></li>
                            <li><a href="books.html">All Books</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links">
                        <h3>Legal</h3>
                        <ul>
                            <li><a href="privacy.html">Privacy Policy</a></li>
                            <li><a href="terms.html">Terms of Service</a></li>
                            <li><a href="cookies.html">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} InkScribe Chronicles. All rights reserved.</p>
                </div>
            </footer>
        `;
        
        // Replace feather icons
        feather.replace();
    }
}

customElements.define('custom-footer', CustomFooter);