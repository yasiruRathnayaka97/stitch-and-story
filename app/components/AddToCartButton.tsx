'use client';

import { useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  text?: string;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'grey';
  disabled?: boolean;
}

const AddToCartButton = ({
  productId,
  quantity = 1,
  className = '',
  size = 'md',
  showText = true,
  text = 'Add to Cart',
  fullWidth = false,
  variant = 'primary',
  disabled = false
}: AddToCartButtonProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!user) {
      router.push('/auth');
      return;
    }

    setIsAdding(true);
    
    // Add to cart
    addItem(productId, quantity);
    
    // Reset button state after a short delay
    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  // Determine icon size based on the size prop
  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }[size];

  // Determine button padding and text size based on the size prop
  const buttonSizeClasses = {
    sm: 'py-1 px-2 text-xs',
    md: 'py-2 px-3 text-sm',
    lg: 'py-3 px-4 text-base',
  }[size];

  // Determine button styling based on the variant prop
  const variantClasses = {
    primary: 'bg-blush-nude text-charcoal-black hover:bg-opacity-90',
    secondary: 'bg-charcoal-black text-white hover:bg-opacity-90',
    outline: 'bg-transparent border border-charcoal-black text-charcoal-black hover:bg-charcoal-black hover:text-white',
    grey: 'bg-gray-400 text-white hover:bg-gray-500',
  }[variant];

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || disabled}
      className={`
        ${buttonSizeClasses}
        ${variantClasses}
        ${fullWidth ? 'w-full' : ''}
        flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors
        ${(isAdding || disabled) ? 'opacity-75 cursor-not-allowed' : ''}
        ${className}
      `}
      aria-label={text}
    >
      <ShoppingBagIcon className={iconSizeClasses} />
      {showText && (
        <span>{isAdding ? 'Adding...' : text}</span>
      )}
    </button>
  );
};

export default AddToCartButton;
