'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

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

type ResponseDataProps = {
  id: string | undefined ;
  token: string | undefined;
};

async function getData({ id, token }: ResponseDataProps) {
  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export default async function MemoryDetails() {
  const { id } = useParams();
  const router = useRouter();
  const token = Cookie.get('token');

  const memory: MemoryProps = await getData({ id, token });

  async function updateMemory() {
    await api.put(
      `/memories/${id}`,
      {
        content: 'This is the new content. Update',
        coverUrl: 'https://github.com/cristian-sbardelotto.png',
        isPublic: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async function deleteMemory() {
    await api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    router.push('/');
  }

  return (
    <div className='px-8 py-12 h-screen flex flex-col gap-[7vh] overflow-y-auto'>
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

        {/* {
          isEditing ? 'Estça editando' : 'nao ta editando'
        } */}

        <div className='flex justify-between'>
          <p className='text-lg leading-relaxed text-gray-100'>
            Criado em{' '}
            <span className='text-purple-700'>
              {dayjs(memory.createdAt).format('D[ de ]MMMM[ de ]YYYY')}
            </span>
            .
          </p>

          <div className='flex gap-4'>
            <Button onClick={updateMemory} backgroundColor='bg-yellow-500'>
              Editar
            </Button>

            <Button onClick={deleteMemory} backgroundColor='bg-red-400'>
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
