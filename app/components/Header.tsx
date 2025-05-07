'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { UserIcon, Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-soft-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-charcoal-black">
            Stitch & Story
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-dusty-gray ${
                  pathname === link.href ? 'text-blush-nude' : 'text-charcoal-black'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="p-1 relative">
              <ShoppingBagIcon className="h-6 w-6 text-charcoal-black" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            <Link href={user ? "/profile" : "/auth"} className="p-1">
              <UserIcon className="h-6 w-6 text-charcoal-black" />
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-1"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-charcoal-black" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-charcoal-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-soft-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block text-base font-medium transition-colors hover:text-dusty-gray ${
                  pathname === link.href ? 'text-blush-nude' : 'text-charcoal-black'
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
