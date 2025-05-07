import { getPots } from '@/actions/pots';
import Pots from '@/components/pots/Pots';

async function Page() {
  const pots = await getPots();

  return <Pots pots={pots} />;
}

export default Page;
