'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../styles/globals.css';

const Layout = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="min-h-screen flex flex-col">
          <header className="bg-cyan-500 text-white py-4 shadow-md">
            <h1 className="text-center text-3xl font-bold">Hotel Manage App</h1>
          </header>
          <main className="flex-grow container mx-auto p-6">
            {isHomePage && (
              <>
                <h1>Hello, Welcome</h1>
                <Link href="/hotels" className="text-blue-500 underline">
                  Click here to go to Hotels page
                </Link>
              </>
            )}
            {children}
          </main>
          <footer className="bg-green-600 text-white py-4 text-center">
            <p>&copy; {new Date().getFullYear()} Hotel App. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;