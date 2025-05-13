import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';

function LogoutButton({ isVisible }: { isVisible?: boolean }) {
  const href = 'http://localhost:3000/api/auth/signout';
  function handleLogout() {
    console.log('logout');
  }
  return (
    <Button
      onClick={handleLogout}
      className={`text-grey-300 z-10 pl-[6px] whitespace-nowrap transition-all duration-300 ease-in-out ${isVisible ? 'max-w-32 opacity-100' : 'max-w-0 overflow-hidden opacity-0'}`}
    >
      <Link
        href={href}
        className="text-grey-300 hover:text-grey-100 flex items-center gap-3 transition-all duration-300"
      >
        <LogOut
          size={20}
          style={{
            transform: 'rotate(180deg)',
            width: '20px',
            height: '20px',
          }}
        />
        <p className="z-10 max-w-32 text-base whitespace-nowrap opacity-100 transition-all duration-300 ease-in-out">
          Logout
        </p>
      </Link>
    </Button>
  );
}

export default LogoutButton;
