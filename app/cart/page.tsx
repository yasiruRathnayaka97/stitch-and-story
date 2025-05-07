'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../hooks/useCart';
import { ShoppingBagIcon, XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { cartItems, removeItem, updateQuantity, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBagIcon className="h-16 w-16 mx-auto text-dusty-gray mb-4" />
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link 
            href="/products" 
            className="inline-block bg-blush-nude text-charcoal-black px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
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
    // Simulate checkout process
    setTimeout(() => {
      alert('Checkout functionality would be implemented here in a real application.');
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-3xl font-semibold mb-8 text-charcoal-black">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cartItems.map(({ item, product }) => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="relative w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 96px"
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-charcoal-black">
                        {product.name}
                      </h3>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Remove item"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-2">
                      {product.category}
                    </p>
                    
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="px-2 py-1 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-medium text-charcoal-black">
                        ${(product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4 text-charcoal-black">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between font-semibold text-charcoal-black">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`w-full py-3 px-4 rounded-md font-medium text-white ${isCheckingOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-charcoal-black hover:bg-opacity-90'} transition-colors`}
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            
            <div className="mt-4">
              <Link 
                href="/products" 
                className="text-sm text-blush-nude hover:underline block text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
