'use client';

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { CartItem, addToCart, removeCartItem, updateCartItemQuantity, getCartItemsWithProducts, getCartTotal } from '../data/cart';
import { Product } from '../data/products';
import { AuthContext } from './AuthProvider';

interface CartContextType {
  cartItems: { item: CartItem; product: Product }[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  cartTotal: number;
  itemCount: number;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  cartTotal: 0,
  itemCount: 0,
});

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<{ item: CartItem; product: Product }[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Only run on client-side to prevent hydration errors
    if (user) {
      // Load cart items for the authenticated user
      const items = getCartItemsWithProducts(user.id);
      setCartItems(items);
      
      // Calculate cart total
      const total = getCartTotal(user.id);
      setCartTotal(total);
    } else {
      // Clear cart when user logs out
      setCartItems([]);
      setCartTotal(0);
    }
  }, [user]);

  const addItem = (productId: string, quantity = 1) => {
    if (!user) return;
    
    addToCart(user.id, productId, quantity);
    
    // Update local state
    const updatedItems = getCartItemsWithProducts(user.id);
    setCartItems(updatedItems);
    
    const updatedTotal = getCartTotal(user.id);
    setCartTotal(updatedTotal);
  };

  const removeItem = (itemId: string) => {
    if (!user) return;
    
    removeCartItem(user.id, itemId);
    
    // Update local state
    const updatedItems = getCartItemsWithProducts(user.id);
    setCartItems(updatedItems);
    
    const updatedTotal = getCartTotal(user.id);
    setCartTotal(updatedTotal);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (!user) return;
    
    updateCartItemQuantity(user.id, itemId, quantity);
    
    // Update local state
    const updatedItems = getCartItemsWithProducts(user.id);
    setCartItems(updatedItems);
    
    const updatedTotal = getCartTotal(user.id);
    setCartTotal(updatedTotal);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addItem, 
        removeItem, 
        updateQuantity, 
        cartTotal,
        itemCount: cartItems.reduce((count, { item }) => count + item.quantity, 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
