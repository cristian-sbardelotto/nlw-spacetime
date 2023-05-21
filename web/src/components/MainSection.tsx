import { Blur } from './Blur';
import { Stripes } from './Stripes';
import { Hero } from './Hero';
import { Copyright } from './Copyright';
import { SignIn } from './SignIn';
import { Profile } from './Profile';

import { cookies } from 'next/headers';

export function MainSection() {
  const isAuthenticated = cookies().has('token');

  return (
    <div className='relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover'>
      <Blur />
      <Stripes />

      {isAuthenticated ? <Profile /> : <SignIn />}
      
      <Hero />
      <Copyright />
    </div>
  );
}
