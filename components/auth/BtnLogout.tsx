'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

function BtnLogout({ children }: { children: React.ReactNode }) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth' });
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="secondary"
      size="lg"
      className="cursor-pointer"
    >
      {children}
    </Button>
  );
}

export default BtnLogout;
