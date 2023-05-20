import Image from 'next/image';
import Link from 'next/link';

import { Button } from './Button';

import nlwLogo from '../assets/nlw-spacetime-logo.svg';

export function Hero() {
  return (
    <div className='space-y-5'>
      <Image src={nlwLogo} alt='NLW logo' />

      <div className='max-w-[420px] space-y-1'>
        <h1 className='text-5xl font-bold leading-tight text-gray-50'>
          Sua cápsula do tempo
        </h1>
        <p className='text-lg leading-relaxed'>
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <Button>
        <Link href='/memories/new'>cadastrar lembrança</Link>
      </Button>
    </div>
  );
}
