'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/portfolio' },
  { name: 'Company', href: '/about' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-black border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 group">
              <div className="relative w-20 h-20 transition-transform group-hover:scale-110">
                <Image
                  src="/images/ChatGPT Image Jan 9, 2026, 02_15_59 PM.png"
                  alt="SEO Sites Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
                Seosites
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-amber-400'
                      : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-6 py-2.5 text-sm font-semibold hover:from-amber-600 hover:to-yellow-700 transition-all hover:shadow-lg hover:shadow-amber-500/50"
              >
                Book a Call
                <FiArrowRight />
              </Link>

              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden rounded-lg p-2 text-gray-200 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-black/95 backdrop-blur-xl shadow-xl border-l border-white/10">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
              <span className="text-xl font-bold text-white">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-2 text-gray-200 hover:text-white"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-1 px-6 py-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-base font-medium rounded-lg ${
                    pathname === item.href
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block mt-6 w-full text-center bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-6 py-3 rounded-md text-base font-semibold hover:from-amber-600 hover:to-yellow-700 transition-all"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

