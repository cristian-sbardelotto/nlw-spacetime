import Image from 'next/image';

import { getUser } from '@/lib/auth';

export function Profile() {
  const { name, avatarUrl } = getUser();

  return (
    <div className='flex items-center gap-3 text-left'>
      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-400'>
        <Image
          src={avatarUrl}
          alt={`${name} profile image`}
          width={40}
          height={40}
          className='h-10 w-10 rounded-full'
        />
      </div>

      <p className='leading-snug'>
        {name}

        <a 
          href=""
          className='block text-red-400 hover:text-red-300 transition-colors'
        >Sair</a>
      </p>
    </div>
  );
}
