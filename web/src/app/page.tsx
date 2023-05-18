import { cookies } from 'next/headers';

import { Stripes } from '@/components/Stripes';
import { Copyright } from '@/components/Copyright';
import { Hero } from '@/components/Hero';
import { SignIn } from '@/components/SignIn';
import { Profile } from '@/components/Profile';
import { EmptyMemories } from '@/components/EmptyMemories';
import { Blur } from '@/components/Blur';

export default function Home() {
  const isAuthenticated = cookies().has('token');

  return (
    <main className='grid grid-cols-2 min-h-screen'>
      {/* Left Column */}
      <div className='relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover'>
        <Blur />
        <Stripes />

        {isAuthenticated ? <Profile /> : <SignIn />}
        <Hero />
        <Copyright />
      </div>

      {/* Right Column */}
      <div className='flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover'>
        <EmptyMemories />
      </div>
    </main>
  );
}
