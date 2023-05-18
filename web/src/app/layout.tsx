import { Blur } from '@/components/Blur';
import { Hero } from '@/components/Hero';
import { Profile } from '@/components/Profile';
import { SignIn } from '@/components/SignIn';
import { Stripes } from '@/components/Stripes';
import { Copyright } from '@/components/Copyright';

import { cookies } from 'next/headers';

import './globals.css';

import { Roboto_Flex, Bai_Jamjuree } from 'next/font/google';

const roboto = Roboto_Flex({ subsets: ['latin'], variable: '--font-roboto' });
const baiJamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
});

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo cosntruída com NextJS, TailwindCSS e TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = cookies().has('token');

  return (
    <html lang='pt-BR'>
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} font-sans text-gray-100 bg-gray-900`}
      >
        <main className='grid grid-cols-2 min-h-screen'>
          {/* Left Column */}
          <div className='relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover'>
            <Blur />
            <Stripes />

            {isAuthenticated ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>

          {/* Right Column */}
          <div className='flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover'>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
