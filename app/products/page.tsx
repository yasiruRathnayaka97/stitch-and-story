'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products, Product, getProductCategories } from '../data/products';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import './products.css';

// Component that uses searchParams - will be wrapped in Suspense
function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [sortOption, setSortOption] = useState<string>('featured');
  const categories = getProductCategories();
  
  const { user } = useAuth();
  const { isItemInWishlist, addItem: addToWishlist } = useWishlist();
  
  // Filter and sort products when dependencies change
  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter if selected
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => {
          // In a real app, you would compare dates
          // This is just a placeholder implementation
          return b.id.localeCompare(a.id);
        });
        break;
      case 'featured':
      default:
        // Featured sorting logic would go here
        // For now, we'll keep the default order
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, sortOption]);
  
  // Handle category change
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  // Handle add to wishlist
  const handleAddToWishlist = (productId: string) => {
    if (!user) {
      // In a real app, you might redirect to login or show a modal
      alert('Please log in to add items to your wishlist');
      return;
    }
    
    addToWishlist(productId);
  };
  
  return (
    <div className="container mx-auto px-4 products-container-modern">
      <div className="products-header-modern">
        <h1 className="products-title">
          {selectedCategory ? `${selectedCategory}` : 'All Products'}
        </h1>
        <p className="products-subtitle">Quality textiles for modern living</p>
      </div>
      
      <div className="products-layout-modern">
        {/* Sidebar - Categories */}
        <div className="sidebar-modern">
          <div className="sidebar-container-modern">
            <h2 className="sidebar-title-modern">Categories</h2>
            <ul className="categories-list-modern">
              <li>
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`category-button-modern ${
                    selectedCategory === null ? 'category-active' : ''
                  }`}
                >
                  All Products
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className={`category-button-modern ${
                      selectedCategory === category ? 'category-active' : ''
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Main Content - Product Grid */}
        <div className="main-content-modern">
          {/* Sort and Filter Bar */}
          <div className="filter-bar-modern">
            <p className="products-count-modern">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            <div className="sort-container-modern">
              <label htmlFor="sort" className="sort-label-modern">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="sort-select-modern"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          
          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid-modern">
              {filteredProducts.map((product) => (
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
                    
                    <div className="product-badges">
                      {product.stock < 5 && product.stock > 0 && (
                        <span className="product-badge badge-low-stock">
                          Low Stock
                        </span>
                      )}
                      {product.stock === 0 && (
                        <span className="product-badge badge-out-of-stock">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    
                    <div className="product-actions">
                      <button 
                        onClick={() => handleAddToWishlist(product.id)}
                        className="product-wishlist" 
                        aria-label="Add to wishlist"
                      >
                        {user && isItemInWishlist(product.id) ? (
                          <HeartIconSolid className="w-5 h-5 text-blush-nude" />
                        ) : (
                          <HeartIcon className="w-5 h-5" />
                        )}
                      </button>
                      <Link 
                        href={`/products/${product.id}`}
                        className="product-quickview" 
                        aria-label="Quick view"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="product-info-modern">
                    <Link href={`/products/${product.id}`} className="product-name-modern">{product.name}</Link>
                    <p className="product-description-modern">{product.description}</p>
                    <div className="product-price-modern">${product.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state-modern">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="empty-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="empty-message-modern">No products found. Try adjusting your filters.</p>
              <button onClick={() => handleCategoryChange(null)} className="empty-button">
                View All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 products-container-modern">
        <div className="products-header-modern">
          <h1 className="products-title">Products</h1>
          <p className="products-subtitle">Quality textiles for modern living</p>
        </div>
        <div className="loading-container-modern">
          <div className="loading-spinner-modern"></div>
          <p className="loading-text">Loading products...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
