import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import SearchBar from './SearchBar';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setSearchQuery } = useBlog();

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#' },
    { name: 'Reservations', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setSearchQuery('')}>
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">Palate</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block w-64">
              <SearchBar />
            </div>
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-amber-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <SearchBar />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
