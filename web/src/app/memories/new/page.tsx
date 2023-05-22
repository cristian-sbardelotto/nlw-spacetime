import { NewMemoryForm } from '@/components/NewMemoryForm';
import { HomeLink } from '@/components/HomeLink';

export default function NewMemory() {
  return (
    <div className='flex flex-1 flex-col gap-4 p-16'>
      <HomeLink />

      <NewMemoryForm />
    </div>
  );
}
