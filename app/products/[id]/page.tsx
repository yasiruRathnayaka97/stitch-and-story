'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products} from '../../data/products';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import '../products.css';
import './product-detail.css';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { user } = useAuth();
  const { addItem: addToCart } = useCart();
  const { isItemInWishlist, addItem: addToWishlist } = useWishlist();

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== productId)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Product not found</p>
        <Link href="/products" className="text-blush-nude hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      router.push('/auth');
      return;
    }

    addToCart(product.id, quantity);

    // Show a success message or open cart sidebar in a real implementation
    alert(`Added ${quantity} ${product.name} to your cart!`);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      router.push('/auth');
      return;
    }

    addToWishlist(product.id);
  };

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    }
  };

  return (
    <div className="product-detail-container">
      <div className="breadcrumb-navigation">
        <Link href="/" className="breadcrumb-link">
          Home
        </Link>
        <span className="breadcrumb-separator">/</span>
        <Link href="/products" className="breadcrumb-link">
          Products
        </Link>
        <span className="breadcrumb-separator">/</span>
        <Link
          href={`/products?category=${product.category}`}
          className="breadcrumb-link"
        >
          {product.category}
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      <button
        onClick={() => router.back()}
        className="back-button"
      >
        ← Back
      </button>

      {/* Product Detail */}
      <div className="product-detail-grid">
        {/* Product Gallery */}
        <div className="product-gallery">
          <div className="product-main-image">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              width={600}
              height={800}
              priority
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="product-thumbnails">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`product-thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setSelectedImage(index);
                }}
                role="button"
                tabIndex={0}
                aria-label={`View product image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info-container">
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>

          <div className="product-detail-description">
            <p>{product.description}</p>
          </div>

          <div className="product-options">
            <label className="option-label">Quantity</label>
            <div className="quantity-selector">
              <button
                onClick={() => handleQuantityChange('decrease')}
                className="quantity-btn"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="quantity-input"
                aria-label="Product quantity"
              />
              <button
                onClick={() => handleQuantityChange('increase')}
                className="quantity-btn"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="add-to-cart-btn"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <button
              onClick={() => handleAddToWishlist()}
              className="wishlist-btn"
              aria-label={`Add ${product.name} to wishlist`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {user && isItemInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">Category:</span>
              <span className="meta-value">{product.category}</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">SKU:</span>
              <span className="meta-value">SS-{product.id}</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">Availability:</span>
              <span className="meta-value">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="product-details-section">
        <h2 className="product-details-title">Product Details</h2>
        <ul className="product-details-list">
          <li>Premium quality materials</li>
          <li>Ethically sourced and produced</li>
          <li>Machine washable (see care instructions)</li>
          <li>Designed in-house by our team</li>
        </ul>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2 className="related-title">You May Also Like</h2>

          <div className="products-grid-modern">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="product-card-modern">
                <div className="product-image-wrapper">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <Image
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      width={300}
                      height={400}
                      className="product-image-modern"
                    />
                    {relatedProduct.images.length > 1 && (
                      <Image
                        src={relatedProduct.images[1]}
                        alt={`${relatedProduct.name} alternate view`}
                        width={300}
                        height={400}
                        className="product-image-hover"
                      />
                    )}
                  </Link>

                  <div className="product-actions">
                    <button
                      onClick={() => handleAddToWishlist()}
                      className="product-wishlist" 
                      aria-label="Add to wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                    <Link
                      href={`/products/${relatedProduct.id}`}
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
                  <Link href={`/products/${relatedProduct.id}`} className="product-name-modern">
                    {relatedProduct.name}
                  </Link>
                  <div className="product-price-modern">${relatedProduct.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
