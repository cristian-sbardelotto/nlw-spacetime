'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { api } from '@/lib/api';
import { Button } from '@/components/Button';
import { HomeLink } from '@/components/HomeLink';

import Cookie from 'js-cookie';

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
      <HomeLink />

      <div>
        <h2 className='text-4xl text-gray-50 relative inline-block mb-6 font-alt after:h-1 after:w-1/3 after:absolute after:top-[110%] after:left-0 after:bg-green-500'>
          Detalhes
        </h2>

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

        <div className='flex justify-between'>
          <p className='text-lg leading-relaxed text-gray-100'>
            Criado em{' '}
            <span className='text-purple-700'>
              {dayjs(memory.createdAt).format('D[ de ]MMMM[ de ]YYYY')}
            </span>
          </p>

          <Button backgroundColor='bg-red-400'>Excluir</Button>
        </div>
      </div>
    </div>
  );
}
