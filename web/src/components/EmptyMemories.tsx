import Link from 'next/link';

export function EmptyMemories() {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <p className='text-center leading-relaxed w-[360px]'>
        Você ainda não registrou nenhuma lembrança, comece a{' '}
        <Link
          className='underline hover:text-gray-50 transition-colors'
          href='/memories/new'
        >
          {' '}
          criar agora
        </Link>
        !
      </p>
    </div>
  );
}
