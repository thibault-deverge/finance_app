'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function BtnLogout({ children }: { children: React.ReactNode }) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="primary"
      size="lg"
      className="cursor-pointer"
    >
      {children}
    </Button>
  );
}
