'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products, Product, getProductCategories } from '../../data/products';
import { useAuth } from '../../hooks/useAuth';
import { useWishlist } from '../../hooks/useWishlist';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import './products.css';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [sortOption, setSortOption] = useState<string>('featured');
  const categories = getProductCategories();
  const { user } = useAuth();
  const { isItemInWishlist, addItem } = useWishlist();

  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
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
        // In a real app, this would sort by date added
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        // 'featured' - no specific sorting, use default order
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, sortOption]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleAddToWishlist = (productId: string) => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/routes/auth';
      return;
    }
    
    addItem(productId);
  };

  return (
    <div className="container mx-auto px-4 products-container">
      <h1 className="products-header">
        {selectedCategory ? `${selectedCategory}` : 'All Products'}
      </h1>
      
      <div className="products-layout">
        {/* Sidebar - Categories */}
        <div className="sidebar">
          <div className="sidebar-container">
            <h2 className="sidebar-title">Categories</h2>
            <ul className="categories-list">
              <li>
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`category-button ${
                    selectedCategory === null ? 'category-button-active' : ''
                  }`}
                >
                  All Products
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className={`category-button ${
                      selectedCategory === category ? 'category-button-active' : ''
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
        <div className="main-content">
          {/* Sort and Filter Bar */}
          <div className="filter-bar">
            <p className="products-count">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            <div className="sort-container">
              <label htmlFor="sort" className="sort-label">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="sort-select"
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
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <Link href={`/routes/products/${product.id}`} className="product-image-container">
                    <div 
                      className="product-image" 
                      style={{ backgroundImage: `url('${product.images[0]}')` }}
                    ></div>
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
                  </Link>
                  
                  <div className="product-info">
                    <div className="product-header">
                      <Link href={`/routes/products/${product.id}`}>
                        <h3 className="product-title">
                          {product.name}
                        </h3>
                      </Link>
                      <button 
                        onClick={() => handleAddToWishlist(product.id)}
                        className="wishlist-button"
                        aria-label={`Add ${product.name} to wishlist`}
                      >
                        {user && isItemInWishlist(product.id) ? (
                          <HeartIconSolid className="wishlist-icon wishlist-active" />
                        ) : (
                          <HeartIcon className="wishlist-icon" />
                        )}
                      </button>
                    </div>
                    
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-footer">
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <Link 
                        href={`/routes/products/${product.id}`}
                        className="view-details-link"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-message">No products found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
