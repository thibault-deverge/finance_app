import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

type BtnOauthProps = {
  children: React.ReactNode;
  provider: 'github';
};

function BtnOauth({ children, provider }: BtnOauthProps) {
  const handleClick = () => {
    signIn(provider, {
      redirectTo: '/',
    });
  };

  return (
    <Button
      type="submit"
      variant="primary"
      className="[&>*]:hover-bg-grey-500 flex cursor-pointer items-center gap-3 py-6"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

export default BtnOauth;
