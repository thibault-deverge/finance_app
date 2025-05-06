import Pots from '@/components/pots/Pots';
import { getPots } from '@/actions/pots';
import { Spinner } from '@/components/ui/Spinner';
import { Suspense } from 'react';

async function Page() {
  const pots = await getPots();

  return (
    <Suspense fallback={<Spinner />}>
      <Pots pots={pots} />;
    </Suspense>
  );
}

export default Page;
