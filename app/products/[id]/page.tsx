'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products} from '../../data/products';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import AddToCartButton from '../../components/AddToCartButton';
import '../products.css';
import './product-detail.css';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);


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
          
          <div className="product-meta">
            <h3 className="text-lg font-semibold text-black">Product Information</h3>
            <div className="product-specs">
              <div className="spec-item">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 spec-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <div className="spec-content">
                  <span className="spec-label">Category</span>
                  <span className="spec-value">{product.category}</span>
                </div>
              </div>

              <div className="spec-item">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 spec-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <div className="spec-content">
                  <span className="spec-label">SKU</span>
                  <span className="spec-value">SS-{product.id}</span>
                </div>
              </div>

              <div className="spec-item">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 spec-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <div className="spec-content">
                  <span className="spec-label">Availability</span>
                  <span className={`spec-value ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>

              <div className="spec-item">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 spec-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                <div className="spec-content">
                  <span className="spec-label">Material</span>
                  <span className="spec-value">{product.material || 'Cotton Blend'}</span>
                </div>
              </div>
            </div>
          </div>

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

            <AddToCartButton
              productId={product.id}
              quantity={quantity}
              className="add-to-cart-btn"
              size="lg"
              fullWidth={true}
              variant="grey"
              text={product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              disabled={product.stock === 0}
            />


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
                  </div>
                </div>

                <div className="product-info-modern">
                  <Link href={`/products/${relatedProduct.id}`} className="product-name-modern">
                    {relatedProduct.name}
                  </Link>
                  <div className="flex justify-between items-center mt-3">
                    <div className="product-price-modern">${relatedProduct.price.toFixed(2)}</div>
                  </div>
                  <div className="mt-3">
                    <AddToCartButton
                      productId={relatedProduct.id}
                      size="md"
                      fullWidth={true}
                      variant="grey"
                      className="add-to-cart-btn-product"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
