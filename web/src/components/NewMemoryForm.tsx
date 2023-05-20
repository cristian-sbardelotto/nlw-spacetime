'use client';

import { FormEvent } from 'react';

import { MediaPicker } from './MediaPicker';

import { api } from '@/lib/api';

import Cookie from 'js-cookie';

import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

    await api.post('/memories', {
      coverUrl,
      content: formData.get('content'),
      isPublic: formData.get('isPublic'),
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

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
        placeholder='Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre.'
        className='w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0'
      />

      <button
        type='submit'
        className='inline-block self-end uppercase rounded-full bg-green-500 px-5 py-3 font-alt text-sm leading-none text-black hover:bg-green-700 transition-colors'
      >
        Salvar
      </button>
    </form>
  );
}
