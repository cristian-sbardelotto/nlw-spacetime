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
  return (
    <html lang='pt-BR'>
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} font-sans text-gray-100 bg-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
