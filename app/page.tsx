import Link from 'next/link';
import { products, getProductCategories } from './data/products';
import './home.css';

export default function Home() {
  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);
  
  // Get product categories
  const categories = getProductCategories();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div 
          className="hero-background" 
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        ></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="hero-content">
            <h1 className="hero-title">
              Quality Textiles for Modern Living
            </h1>
            <p className="hero-description">
              Discover our collection of thoughtfully crafted clothing and home textiles
            </p>
            <Link 
              href="/routes/products" 
              className="btn-primary hero-button"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, 6).map((category) => (
              <Link 
                key={category} 
                href={`/routes/products?category=${category}`}
                className="category-card"
              >
                <div className="category-overlay"></div>
                <div 
                  className="category-background" 
                  style={{ backgroundImage: `url('/images/categories/${category.toLowerCase()}.jpg')` }}
                ></div>
                <div className="category-content">
                  <h3 className="category-title">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Featured Products</h2>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <Link 
                key={product.id} 
                href={`/routes/products/${product.id}`}
                className="product-card"
              >
                <div className="product-image-container">
                  <div 
                    className="product-image" 
                    style={{ backgroundImage: `url('${product.images[0]}')` }}
                  ></div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link 
              href="/routes/products" 
              className="btn-secondary view-all-button"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="about-image-container">
                <div 
                  className="about-image" 
                  style={{ backgroundImage: "url('/images/about-image.jpg')" }}
                ></div>
              </div>
            </div>
            <div className="md:w-1/2 about-content">
              <h2 className="about-title">Our Story</h2>
              <p className="about-text">
                Stitch & Story began with a passion for quality textiles and sustainable practices. 
                We believe in creating products that are not only beautiful but also ethically made and built to last.
              </p>
              <p className="about-text">
                Each piece in our collection is thoughtfully designed and crafted using premium materials 
                sourced from responsible suppliers around the world.
              </p>
              <Link 
                href="/routes/about" 
                className="about-link"
              >
                Learn more about us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="newsletter-title">Join Our Newsletter</h2>
          <p className="newsletter-description">
            Subscribe to receive updates on new collections, special offers, and styling tips.
          </p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="newsletter-input"
              required
            />
            <button 
              type="submit" 
              className="newsletter-button"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
