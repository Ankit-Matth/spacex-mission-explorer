import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/components/ReduxProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SpaceX Mission Explorer | Atmosly',
  description: 'Explore SpaceX launches, missions, and rockets. Search, filter, and favorite your way through space exploration history.',
  keywords: ['SpaceX', 'missions', 'rockets', 'launches', 'space exploration', 'Falcon', 'Dragon'],
  authors: [{ name: 'Atmosly' }],
  openGraph: {
    title: 'SpaceX Mission Explorer',
    description: 'Explore SpaceX launches, missions, and rockets',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}