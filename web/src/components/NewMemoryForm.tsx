'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { MediaPicker } from './MediaPicker';
import { Button } from './Button';

import { api } from '@/lib/api';
import Cookie from 'js-cookie';

import { Camera } from 'lucide-react';

function getTodayDate(): string {
  const date = new Date();

  const currentDay = date.getDate();

  const month = date.getMonth() + 1;
  const formattedMonth = month <= 9 ? `0${month}` : month;

  const currentYear = date.getFullYear();

  const todayDate = `${currentYear}-${formattedMonth}-${currentDay}`;

  return todayDate;
}

export function NewMemoryForm() {
  const router = useRouter();

  const token = Cookie.get('token');

  async function createMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get('coverUrl');

    let coverUrl = '';

    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set('file', fileToUpload);

      const uploadResponse = await api.post('/upload', uploadFormData);

      coverUrl = uploadResponse.data.fileUrl;
    }

    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
        createdAt: formData.get('createdAt'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.push('/');
  }

  return (
    <form onSubmit={createMemory} className='flex flex-1 flex-col gap-2'>
      <div className='flex items-center gap-4'>
        <label
          htmlFor='media'
          className='flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100 transition-colors cursor-pointer'
        >
          <Camera className='w-4 h-4' />
          Anexar foto ou vídeo
        </label>

        <input
          type='date'
          name='createdAt'
          className='bg-zinc-900 text-gray-200 rounded'
          defaultValue={getTodayDate()}
        />

        <label
          htmlFor='isPublic'
          className='flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100 transition-colors cursor-pointer'
        >
          <input
            type='checkbox'
            name='isPublic'
            id='isPublic'
            value='true'
            className='h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 outline-none'
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        name='content'
        spellCheck={false}
        placeholder='Fique livre para adicionar aqui o seu relato / comentário sobre essa experiência que você quer lembrar para sempre.'
        className='w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0'
      />

      <Button type='submit' classes='self-end'>
        Salvar
      </Button>
    </form>
  );
}
