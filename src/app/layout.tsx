// app/layout.tsx
'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '../lib/authContext';
import Navbar from './components/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
