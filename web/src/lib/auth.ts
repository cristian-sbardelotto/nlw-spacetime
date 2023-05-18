import { cookies } from 'next/headers';
import decode from 'jwt-decode';

type UserProps = {
  sub: string;
  name: string;
  avatarUrl: string;
};

export function getUser(): UserProps {
  const token = cookies().get('token')?.value;

  if (token) {
    const user: UserProps = decode(token);

    return user;
  }

  throw new Error('Unauthenticated');
}
