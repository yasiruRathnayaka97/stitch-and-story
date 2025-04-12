'use client';

import { useContext } from 'react';
import { WishlistContext } from '../context/WishlistProvider';

export const useWishlist = () => {
  return useContext(WishlistContext);
};
