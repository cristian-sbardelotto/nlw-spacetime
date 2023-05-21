'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { api } from '@/lib/api';

import Cookie from 'js-cookie';

import { ChevronLeft } from 'lucide-react';

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';

dayjs.locale(ptBr);

type MemoryProps = {
  id: string;
  coverUrl: string;
  content: string;
  createdAt: string;
};

export default async function MemoryDetails() {
  const { id } = useParams();
  const token = Cookie.get('token');

  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memory: MemoryProps = response.data;

  if (!memory) return; // adicionar return para home

  return (
    <div className='px-8 h-screen flex flex-col gap-[10vh] overflow-y-hidden'>
      <Link
        href='/'
        className='flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100 transition-colors'
      >
        <ChevronLeft className='h-4 w-4' />
        voltar à timeline
      </Link>

      <div>
        <h2 className='text-4xl text-gray-50 relative inline-block after:h-1 after:w-1/3 after:absolute after:top-[110%] after:left-0 after:bg-green-500 after:mb-3 font-alt'>Detalhes</h2>
        <Image
          src={memory.coverUrl}
          alt='Memory cover image'
          width={592}
          height={280}
          className='w-full aspect-video object-cover rounded-lg'
        />
      </div>

      <div className='flex flex-col gap-4'>
        <p className='text-lg leading-relaxed text-gray-100 mb-'>
          {memory.content}
        </p>

        <hr />

        <p className='text-lg leading-relaxed text-gray-100'>
          Criado em{' '}
          <span className='text-purple-700'>
            {dayjs(memory.createdAt).format('D[ de ]MMMM[ de ]YYYY')}
          </span>
        </p>
      </div>
    </div>
  );
}
