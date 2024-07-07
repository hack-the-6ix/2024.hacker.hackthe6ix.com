import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import cn from 'classnames';
import '@/styles/index.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hacker Dashboard | Hack the 6ix',
  description:
    'Hack the 6ix is the largest summer student-run, not-for-profit hackathon now in its ninth iteration, based in Toronto. Join hundreds of students from diverse backgrounds, disciplines, and skill levels to work together on projects that have real-world impact.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className={inter.className} lang="en">
      <body>
        {children}
        <Toaster
          toastOptions={{
            className: cn('toaster', 'font--wgt--medium', inter.className),
            position: 'bottom-right',
          }}
        />
      </body>
      <Script strategy="lazyOnload" id="animate">
        {`
          window.setTimeout(() => {
            window.requestAnimationFrame(() => {
              document.documentElement.classList.add("animate");
            });
          }, 50);
        `}
      </Script>
    </html>
  );
}
