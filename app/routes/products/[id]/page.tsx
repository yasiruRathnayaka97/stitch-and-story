'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProductById, products } from '../../../data/products';
import { useAuth } from '../../../hooks/useAuth';
import { useCart } from '../../../hooks/useCart';
import { useWishlist } from '../../../hooks/useWishlist';
import { HeartIcon, ShoppingBagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = getProductById(productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { user } = useAuth();
  const { addItem: addToCart } = useCart();
  const { isItemInWishlist, addItem: addToWishlist } = useWishlist();
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => product && p.category === product.category && p.id !== productId)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you&lsquo;re looking for doesn&lsquo;t exist or has been removed.</p>
        <Link href="/routes/products" className="btn-primary inline-block px-6 py-2">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      router.push('/routes/auth');
      return;
    }
    
    addToCart(product.id, quantity);
    
    // Show a success message or open cart sidebar in a real implementation
    alert(`Added ${quantity} ${product.name} to your cart!`);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      router.push('/routes/auth');
      return;
    }
    
    addToWishlist(product.id);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-dusty-gray mb-8">
        <Link href="/" className="hover:text-blush-nude transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/routes/products" className="hover:text-blush-nude transition-colors">
          Products
        </Link>
        <span className="mx-2">/</span>
        <Link 
          href={`/routes/products?category=${product.category}`} 
          className="hover:text-blush-nude transition-colors"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal-black">{product.name}</span>
      </div>
      
      {/* Back button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center text-dusty-gray hover:text-charcoal-black transition-colors mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back
      </button>
      
      {/* Product Detail */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="bg-soft-white rounded-lg overflow-hidden mb-4">
            <div 
              className="h-96 bg-cover bg-center" 
              style={{ backgroundImage: `url('${product.images[selectedImage]}')` }}
            ></div>
          </div>
          
          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-20 bg-soft-white rounded-md overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-blush-nude' : ''
                  }`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url('${image}')` }}
                  ></div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <p className="text-lg mb-4">{product.description}</p>
            
            <div className="flex items-center mb-2">
              <span className="text-dusty-gray mr-2">Category:</span>
              <Link 
                href={`/routes/products?category=${product.category}`}
                className="hover:text-blush-nude transition-colors"
              >
                {product.category}
              </Link>
            </div>
            
            <div className="flex items-center">
              <span className="text-dusty-gray mr-2">Availability:</span>
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </div>
          </div>
          
          {/* Add to Cart Section */}
          {product.stock > 0 ? (
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <label htmlFor="quantity" className="text-dusty-gray">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="border border-dusty-gray/30 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blush-nude"
                >
                  {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex items-center justify-center gap-2 py-3 px-6 flex-grow"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  Add to Cart
                </button>
                
                <button
                  onClick={handleAddToWishlist}
                  className="border border-charcoal-black rounded hover:bg-charcoal-black/5 transition-colors p-3"
                  aria-label="Add to wishlist"
                >
                  {user && isItemInWishlist(product.id) ? (
                    <HeartIconSolid className="h-5 w-5 text-blush-nude" />
                  ) : (
                    <HeartIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <button
                disabled
                className="btn-primary opacity-50 cursor-not-allowed flex items-center justify-center gap-2 py-3 px-6 w-full"
              >
                Out of Stock
              </button>
            </div>
          )}
          
          {/* Product Details */}
          <div className="border-t border-dusty-gray/20 pt-6">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <ul className="space-y-2 text-dusty-gray">
              <li>Premium quality materials</li>
              <li>Ethically sourced and produced</li>
              <li>Machine washable (see care instructions)</li>
              <li>Designed in-house by our team</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link 
                key={relatedProduct.id} 
                href={`/routes/products/${relatedProduct.id}`}
                className="group"
              >
                <div className="bg-soft-white rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                  <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('${relatedProduct.images[0]}')` }}></div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blush-nude transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="font-bold">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
