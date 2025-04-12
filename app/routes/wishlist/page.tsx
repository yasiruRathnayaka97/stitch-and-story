'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { XMarkIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function WishlistPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { wishlistItems, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();

  // Redirect to login if not authenticated
  if (!isLoading && !user) {
    router.push('/routes/auth');
    return null;
  }

  const handleRemoveFromWishlist = (itemId: string) => {
    removeItem(itemId);
  };

  const handleMoveToCart = (productId: string, itemId: string) => {
    addToCart(productId);
    removeItem(itemId);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map(({ item, product }) => (
            <div key={item.id} className="bg-soft-white rounded-lg shadow-sm overflow-hidden">
              <Link href={`/routes/products/${product.id}`}>
                <div 
                  className="h-64 bg-cover bg-center" 
                  style={{ backgroundImage: `url('${product.images[0]}')` }}
                ></div>
              </Link>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <Link 
                    href={`/routes/products/${product.id}`}
                    className="font-medium hover:text-blush-nude transition-colors"
                  >
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                  </Link>
                  <button 
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="text-dusty-gray hover:text-charcoal-black transition-colors"
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                
                <p className="text-dusty-gray text-sm mt-1 mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  
                  <button
                    onClick={() => handleMoveToCart(product.id, item.id)}
                    disabled={product.stock === 0}
                    className={`flex items-center gap-1 text-sm font-medium px-3 py-1 rounded ${
                      product.stock > 0
                        ? 'bg-charcoal-black text-soft-white hover:opacity-90 transition-opacity'
                        : 'bg-dusty-gray/30 text-dusty-gray cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBagIcon className="h-4 w-4" />
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-soft-white rounded-full mb-6">
            <HeartIcon className="h-12 w-12 text-dusty-gray" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-dusty-gray mb-8">You haven&lsquo;t saved any items to your wishlist yet.</p>
          <Link href="/routes/products" className="btn-primary inline-block px-8 py-3">
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
}
