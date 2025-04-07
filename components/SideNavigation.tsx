'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BtnLogout } from './auth/BtnLogout';
import { FinanceContextType } from './context/FinanceProvider';

type NavLink = {
  name: string;
  href: string;
  icon: string;
};

const navLinks = [
  {
    name: 'Overview',
    href: '/',
    icon: '/images/icons/icon-nav-overview.svg',
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: '/images/icons/icon-nav-transactions.svg',
  },
  {
    name: 'Budgets',
    href: '/budgets',
    icon: '/images/icons/icon-nav-budgets.svg',
  },
  {
    name: 'Pots',
    href: '/pots',
    icon: '/images/icons/icon-nav-pots.svg',
  },
  {
    name: 'Recurring Bills',
    href: '/recurring-bills',
    icon: '/images/icons/icon-nav-recurring-bills.svg',
  },
];

function SideNavigation({ isVisible, setIsVisible }: FinanceContextType) {
  const pathname = usePathname();

  return (
    <aside className="relative hidden h-full rounded-r-2xl bg-gray-900 text-white xl:flex">
      <div className="fixed h-full">
        <div className="flex flex-col">
          <div
            className={`px-4 py-8 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={'/images/logo/logo-large.svg'}
              alt="Logo"
              width={122}
              height={22}
              quality={80}
              loading="lazy"
              className="mb-12"
            />
          </div>

          <nav>
            <ul className="list-none space-y-1 px-2">
              {navLinks.map((link) => (
                <NavigationLink
                  key={link.name}
                  pathname={pathname}
                  link={link}
                  isVisible={isVisible}
                />
              ))}
            </ul>
          </nav>
        </div>

        <ToggleVisibilityButton
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </div>
    </aside>
  );
}

function ToggleVisibilityButton({
  isVisible,
  setIsVisible,
}: FinanceContextType) {
  return (
    <div className="absolute bottom-8 left-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="hover:text-grey-300 flex h-10 cursor-pointer items-center gap-2 transition-colors duration-300"
        aria-label={isVisible ? 'Minimize menu' : 'Expand menu'}
      >
        <div className="flex h-6 w-6 items-center justify-center">
          <img
            src="/images/icons/icon-minimize-menu.svg"
            alt="toggle menu icon"
            className={`h-5 w-5 transform transition-transform duration-300 ${isVisible ? '' : 'rotate-180'}`}
          />
        </div>
        <span
          className={`transition-opacity duration-300 ${isVisible ? 'max-w-24 opacity-100' : 'max-w-0 overflow-hidden opacity-0'}`}
        >
          Minimize
        </span>
      </button>
      {/* <BtnLogout>Logout</BtnLogout> */}
    </div>
  );
}

function NavigationLink({
  link,
  pathname,
  isVisible,
}: {
  link: NavLink;
  pathname: string;
  isVisible: boolean;
}) {
  const isActive = pathname === link.href;

  return (
    <li className={`${pathname === link.name ? 'bg-beige-100' : ''}`}>
      <Link
        className={`${isActive ? 'bg-primary-900' : ''} text-primary-200 hover:bg-primary-900 hover:text-grey-300 flex h-12 items-center gap-3 rounded px-2 transition-colors duration-300`}
        href={link.href}
        title={link.name}
      >
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
          <img src={link.icon} alt={`${link.name} icon`} className="h-5 w-5" />
        </div>
        <span
          className={`whitespace-nowrap transition-all duration-300 ${
            isVisible
              ? 'max-w-32 opacity-100'
              : 'max-w-0 overflow-hidden opacity-0'
          }`}
        >
          {link.name}
        </span>
      </Link>
    </li>
  );
}

export default SideNavigation;
