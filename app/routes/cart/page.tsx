'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { XMarkIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import './cart.css';

export default function CartPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { cartItems, removeItem, updateQuantity, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Redirect to login if not authenticated
  if (!isLoading && !user) {
    router.push('/routes/auth');
    return null;
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // In a real application, this would redirect to a checkout page or process
    setTimeout(() => {
      alert('This is a mock checkout. In a real application, you would be redirected to a payment gateway.');
      setIsCheckingOut(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 cart-container">
      <h1 className="cart-heading">Your Shopping Cart</h1>
      
      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="cart-items-container">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 cart-header">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              {cartItems.map(({ item, product }) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 cart-item items-center">
                  {/* Product */}
                  <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                    <div 
                      className="product-image bg-cover bg-center" 
                      style={{ backgroundImage: `url('${product.images[0]}')` }}
                    ></div>
                    <div className="flex-grow">
                      <Link 
                        href={`/routes/products/${product.id}`}
                        className="product-title"
                      >
                        {product.name}
                      </Link>
                      <p className="product-category">{product.category}</p>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-1 md:col-span-2 text-left md:text-center">
                    <span className="md:hidden mobile-label">Price: </span>
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                    <div className="quantity-control">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="quantity-btn"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="quantity-btn"
                        disabled={item.quantity >= product.stock}
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                    <span className="md:hidden mobile-label">Total: </span>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">${(product.price * item.quantity).toFixed(2)}</span>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="remove-btn"
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Continue Shopping */}
            <div className="mt-6">
              <Link 
                href="/routes/products"
                className="text-charcoal-black hover:text-blush-nude transition-colors flex items-center gap-1"
              >
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="order-summary">
              <h2 className="summary-heading">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn-primary checkout-btn"
              >
                {isCheckingOut ? (
                  <>
                    <div className="loading-spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingBagIcon className="h-5 w-5" />
                    Proceed to Checkout
                  </>
                )}
              </button>
              
              <div className="secure-checkout-text">
                <p>Secure checkout powered by Stripe</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <ShoppingBagIcon className="h-12 w-12 text-dusty-gray" />
          </div>
          <h2 className="empty-cart-heading">Your cart is empty</h2>
          <p className="empty-cart-text">Looks like you haven&lsquo;t added any products to your cart yet.</p>
          <Link href="/routes/products" className="btn-primary shop-now-btn">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
