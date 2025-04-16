'use client';

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { WishlistItem, addToWishlist, removeFromWishlist, getWishlistItemsWithProducts, isInWishlist } from '../data/wishlist';
import { Product } from '../data/products';
import { AuthContext } from './AuthProvider';

interface WishlistContextType {
  wishlistItems: { item: WishlistItem; product: Product }[];
  addItem: (productId: string) => void;
  removeItem: (itemId: string) => void;
  isItemInWishlist: (productId: string) => boolean;
  itemCount: number;
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  addItem: () => {},
  removeItem: () => {},
  isItemInWishlist: () => false,
  itemCount: 0,
});

interface WishlistProviderProps {
  children: ReactNode;
}

const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlistItems, setWishlistItems] = useState<{ item: WishlistItem; product: Product }[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Only run on client-side to prevent hydration errors
    if (user) {
      // Load wishlist items for the authenticated user
      const items = getWishlistItemsWithProducts(user.id);
      setWishlistItems(items);
    } else {
      // Clear wishlist when user logs out
      setWishlistItems([]);
    }
  }, [user]);

  const addItem = (productId: string) => {
    if (!user) return;
    
    addToWishlist(user.id, productId);
    
    // Update local state
    const updatedItems = getWishlistItemsWithProducts(user.id);
    setWishlistItems(updatedItems);
  };

  const removeItem = (itemId: string) => {
    if (!user) return;
    
    removeFromWishlist(user.id, itemId);
    
    // Update local state
    const updatedItems = getWishlistItemsWithProducts(user.id);
    setWishlistItems(updatedItems);
  };

  const isItemInWishlist = (productId: string): boolean => {
    if (!user) return false;
    return isInWishlist(user.id, productId);
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlistItems, 
        addItem, 
        removeItem, 
        isItemInWishlist,
        itemCount: wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
