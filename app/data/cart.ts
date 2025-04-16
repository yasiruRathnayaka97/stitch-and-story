import { Product, getProductById } from './products';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

// Mock cart data
export const carts: Cart[] = [
  {
    id: "cart1",
    userId: "1",
    items: [
      {
        id: "cartItem1",
        productId: "1",
        quantity: 1
      },
      {
        id: "cartItem2",
        productId: "3",
        quantity: 2
      }
    ]
  },
  {
    id: "cart2",
    userId: "2",
    items: [
      {
        id: "cartItem3",
        productId: "2",
        quantity: 1
      }
    ]
  }
];

// Helper functions
export const getCartByUserId = (userId: string): Cart | undefined => {
  return carts.find(cart => cart.userId === userId);
};

export const getCartItemsWithProducts = (userId: string): { item: CartItem; product: Product }[] => {
  const cart = getCartByUserId(userId);
  if (!cart) return [];
  
  return cart.items
    .map(item => {
      const product = getProductById(item.productId);
      return product ? { item, product } : null;
    })
    .filter((item): item is { item: CartItem; product: Product } => item !== null);
};

export const getCartTotal = (userId: string): number => {
  const cartItems = getCartItemsWithProducts(userId);
  return cartItems.reduce((total, { item, product }) => {
    return total + (product.price * item.quantity);
  }, 0);
};

// Mock cart operations
export const addToCart = (userId: string, productId: string, quantity: number = 1): void => {
  let cart = getCartByUserId(userId);
  
  // Create a new cart if one doesn't exist
  if (!cart) {
    const newCart: Cart = {
      id: `cart-${typeof window !== 'undefined' ? Date.now() : Math.floor(Math.random()*1000000)}`,
      userId,
      items: []
    };
    carts.push(newCart);
    cart = newCart;
  }
  
  // Check if item already exists in cart
  const existingItem = cart.items.find(item => item.productId === productId);
  
  if (existingItem) {
    // Update quantity if item exists
    existingItem.quantity += quantity;
  } else {
    // Add new item if it doesn't exist
    cart.items.push({
      id: `cartItem-${typeof window !== 'undefined' ? Date.now() : Math.floor(Math.random()*1000000)}`,
      productId,
      quantity
    });
  }
};

export const updateCartItemQuantity = (userId: string, itemId: string, quantity: number): void => {
  const cart = getCartByUserId(userId);
  if (!cart) return;
  
  const item = cart.items.find(item => item.id === itemId);
  if (item) {
    item.quantity = quantity;
  }
};

export const removeCartItem = (userId: string, itemId: string): void => {
  const cart = getCartByUserId(userId);
  if (!cart) return;
  
  cart.items = cart.items.filter(item => item.id !== itemId);
};

export const clearCart = (userId: string): void => {
  const cart = getCartByUserId(userId);
  if (!cart) return;
  
  cart.items = [];
};
