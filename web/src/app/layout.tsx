import './globals.css';

import { MainSection } from '@/components/MainSection';

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
  return (
    <html lang='pt-BR'>
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} font-sans text-gray-100 bg-gray-900`}
      >
        <main className='grid grid-cols-2 min-h-screen'>
          <MainSection />

          <div className='flex flex-col max-h-screen overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover'>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
