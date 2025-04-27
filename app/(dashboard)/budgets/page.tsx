import Budgets from '@/components/budgets/Budgets';
import { getBudgets } from '@/actions/budgets';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/Spinner';

async function Page() {
  const budgets = await getBudgets();
  
  return (
    <Suspense fallback={<Spinner />}>
      <Budgets budgets={budgets} />;
    </Suspense>
  );
}

export default Page;
