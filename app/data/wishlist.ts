import { Product, getProductById } from './products';

export interface WishlistItem {
  id: string;
  productId: string;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
}

// Mock wishlist data
export const wishlists: Wishlist[] = [
  {
    id: "wishlist1",
    userId: "1",
    items: [
      {
        id: "wishlistItem1",
        productId: "5"
      },
      {
        id: "wishlistItem2",
        productId: "8"
      }
    ]
  },
  {
    id: "wishlist2",
    userId: "2",
    items: [
      {
        id: "wishlistItem3",
        productId: "10"
      }
    ]
  }
];

// Helper functions
export const getWishlistByUserId = (userId: string): Wishlist | undefined => {
  return wishlists.find(wishlist => wishlist.userId === userId);
};

export const getWishlistItemsWithProducts = (userId: string): { item: WishlistItem; product: Product }[] => {
  const wishlist = getWishlistByUserId(userId);
  if (!wishlist) return [];
  
  return wishlist.items
    .map(item => {
      const product = getProductById(item.productId);
      return product ? { item, product } : null;
    })
    .filter((item): item is { item: WishlistItem; product: Product } => item !== null);
};

export const isInWishlist = (userId: string, productId: string): boolean => {
  const wishlist = getWishlistByUserId(userId);
  if (!wishlist) return false;
  
  return wishlist.items.some(item => item.productId === productId);
};

// Mock wishlist operations
export const addToWishlist = (userId: string, productId: string): void => {
  let wishlist = getWishlistByUserId(userId);
  
  // Create a new wishlist if one doesn't exist
  if (!wishlist) {
    const newWishlist: Wishlist = {
      id: `wishlist-${typeof window !== 'undefined' ? Date.now() : Math.floor(Math.random()*1000000)}`,
      userId,
      items: []
    };
    wishlists.push(newWishlist);
    wishlist = newWishlist;
  }
  
  // Check if item already exists in wishlist
  const existingItem = wishlist.items.find(item => item.productId === productId);
  
  if (!existingItem) {
    // Add new item if it doesn't exist
    wishlist.items.push({
      id: `wishlistItem-${typeof window !== 'undefined' ? Date.now() : Math.floor(Math.random()*1000000)}`,
      productId
    });
  }
};

export const removeFromWishlist = (userId: string, itemId: string): void => {
  const wishlist = getWishlistByUserId(userId);
  if (!wishlist) return;
  
  wishlist.items = wishlist.items.filter(item => item.id !== itemId);
};

export const clearWishlist = (userId: string): void => {
  const wishlist = getWishlistByUserId(userId);
  if (!wishlist) return;
  
  wishlist.items = [];
};
