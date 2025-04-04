import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';

type BtnOauthProps = {
  children: React.ReactNode;
  provider: 'github';
};

export function BtnOauth({ children, provider }: BtnOauthProps) {
  const handleClick = () => {
    signIn(provider, {
      redirectTo: '/',
    });
  };

  return (
    <Button
      type="submit"
      variant="primary"
      className="bg-beige-100 text-preset-4-bold text-grey-900 hover:bg-grey-300 w-full cursor-pointer rounded-lg py-6"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
