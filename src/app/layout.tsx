import './globals.css';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'Firebase Auth Production',
  description: 'Next.js 13 + Firebase + Firestore',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
