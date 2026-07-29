/**
 * Footer.js — Site footer with brand, navigation links, and copyright.
 */
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="BcryptGenerator Home">
            <div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700
                         flex items-center justify-center text-white font-black text-sm
                         group-hover:scale-110 transition-transform duration-200"
              aria-hidden="true"
            >
              B
            </div>
            <span className="font-bold text-gray-700 text-sm">BcryptGenerator</span>
          </Link>

          {/* Footer nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-5 list-none m-0 p-0 text-sm">
              
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors font-medium"
                  aria-label="GitHub (opens in new tab)"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-gray-400 text-center">
            © {year} BcryptGenerator. All rights reserved.
            <span className="block mt-0.5">Made with ❤️ for developers.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
