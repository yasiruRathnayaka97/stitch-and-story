import Link from 'next/link';
import Image from 'next/image';
import { products, getProductCategories } from './data/products';
import './home.css';

export default function Home() {
  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);
  
  // Get product categories
  const categories = getProductCategories();

  return (
    <div className="flex flex-col">
      {/* Hero Section - ASOS-inspired with split design */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-content">
              <h1 className="hero-title">
                <span className="hero-title-accent">Spring</span> Collection
                <span className="hero-title-year">2025</span>
              </h1>
              <p className="hero-description">
                Discover our thoughtfully crafted pieces designed for modern living
              </p>
              <div className="hero-buttons">
                <Link 
                  href="/products?category=Shirts" 
                  className="btn-primary hero-button"
                >
                  Shop Women
                </Link>
                <Link 
                  href="/products?category=Sweaters" 
                  className="btn-primary hero-button"
                >
                  Shop Men
                </Link>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-image-container">
              <Image 
                src="/images/hero-bg.jpg" 
                alt="Spring Collection 2025" 
                fill
                priority
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Categories - ASOS-inspired with clean cards */}
      <section className="trending-section">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <h2 className="section-title-modern gray-section-title">Trending Categories</h2>
            <Link href="/products" className="section-view-all gray-instagram-link">View All</Link>
          </div>
          
          <div className="categories-grid">
            {categories.slice(0, 6).map((category) => (
              <Link 
                key={category} 
                href={`/products?category=${category}`}
                className="category-card-modern"
              >
                <div className="category-image-container">
                  <Image 
                    src={`/images/categories/${category.toLowerCase()}.jpg`}
                    alt={category}
                    width={400}
                    height={500}
                    className="category-image"
                  />
                </div>
                <div className="category-info">
                  <h3 className="category-name">{category}</h3>
                  <span className="category-shop-now">Shop Now</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - ASOS-inspired modern cards */}
      <section className="featured-products-section">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <h2 className="section-title-modern gray-section-title">New Arrivals</h2>
            <Link href="/products" className="section-view-all gray-instagram-link">View All</Link>
          </div>
          
          <div className="products-slider">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card-modern">
                <div className="product-image-wrapper">
                  <Link href={`/products/${product.id}`}>
                    <Image 
                      src={product.images[0]} 
                      alt={product.name}
                      width={300}
                      height={400}
                      className="product-image-modern"
                    />
                    {product.images.length > 1 && (
                      <Image 
                        src={product.images[1]} 
                        alt={`${product.name} alternate view`}
                        width={300}
                        height={400}
                        className="product-image-hover"
                      />
                    )}
                  </Link>
                  <div className="product-actions">
                    <Link href={`/products/${product.id}`} className="view-product-btn">
                      View Product
                    </Link>
                  </div>
                </div>
                <div className="product-info-modern">
                  <Link href={`/products/${product.id}`} className="product-name-modern">{product.name}</Link>
                  <div className="product-price-modern">${product.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - ASOS-inspired modern split layout */}
      <section className="about-section-modern">
        <div className="about-container">
          <div className="about-image-modern">
            <Image 
              src="/images/about-image.jpg" 
              alt="Our Story" 
              fill
              className="about-img"
            />
          </div>
          <div className="about-content-modern">
            <div className="about-content-inner">
              <span className="about-eyebrow">Our Brand</span>
              <h2 className="about-title-modern">Craftsmanship & Sustainability</h2>
              <div className="about-divider"></div>
              <p className="about-text-modern">
                Stitch & Story began with a passion for quality textiles and sustainable practices. 
                We believe in creating products that are not only beautiful but also ethically made and built to last.
              </p>
              <p className="about-text-modern">
                Each piece in our collection is thoughtfully designed and crafted using premium materials 
                sourced from responsible suppliers around the world.
              </p>
              <Link 
                href="/about" 
                className="btn-underline"
              >
                Discover Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Gallery Section - ASOS-inspired social proof */}
      <section className="instagram-section">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <h2 className="section-title-modern gray-section-title">Style Inspiration</h2>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-link gray-instagram-link">
              @stitchandstory
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="instagram-icon">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
          
          <div className="instagram-grid">
            {/* Using product images as instagram posts for now */}
            {products.slice(0, 6).map((product, index) => (
              <div key={`insta-${index}`} className="instagram-item">
                <Image 
                  src={product.images[0]} 
                  alt="Instagram post" 
                  width={300} 
                  height={300}
                  className="instagram-image"
                />
                <div className="instagram-overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - ASOS-inspired modern design */}
      <section className="newsletter-section-modern">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2 className="newsletter-title-modern">Get 10% Off Your First Order</h2>
            <p className="newsletter-description-modern">
              Sign up to receive updates on new arrivals, special offers, and styling tips.
            </p>
            <form className="newsletter-form-modern">
              <div className="newsletter-input-group">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="newsletter-input-modern"
                  required
                />
                <button 
                  type="submit" 
                  className="newsletter-button-modern"
                >
                  Subscribe
                </button>
              </div>
              <div className="newsletter-privacy">
                <input type="checkbox" id="privacy" required />
                <label htmlFor="privacy">I agree to the <a href="/privacy-policy" className="privacy-link">Privacy Policy</a></label>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
