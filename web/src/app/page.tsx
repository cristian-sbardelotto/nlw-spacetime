import Image from 'next/image';
import Link from 'next/link';

import { EmptyMemories } from '@/components/EmptyMemories';
import { api } from '@/lib/api';

import { cookies } from 'next/headers';

import { ArrowRight } from 'lucide-react';

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';

dayjs.locale(ptBr);

type MemoryProps = {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
};

export default async function Home() {
  const token = cookies().get('token')?.value;
  const isAuthenticated = cookies().has('token');

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memories: MemoryProps[] = response.data;

  if (memories.length === 0) {
    return <EmptyMemories />;
  }

  return (
    <div className='flex flex-col gap-10 p-8 overflow-y-scroll'>
      {memories.map(memory => (
        <div key={memory.id} className='space-y-4'>
          <time className='flex items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50'>
            {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </time>

          <Image
            src={memory.coverUrl}
            alt='Memory cover image'
            width={592}
            height={280}
            className='w-full aspect-video object-cover rounded-lg'
          />

          <p className='text-lg leading-relaxed text-gray-100'>
            {memory.excerpt}
          </p>

          <Link
            href={`/memories/${memory.id}`}
            className='flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100 transition-colors'
          >
            Ler mais
            <ArrowRight className='w-4 h-4' />
          </Link>
        </div>
      ))}
    </div>
  );
}
