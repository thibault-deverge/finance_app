'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLink = {
  name: string;
  href: string;
  icon: string;
  activeIcon: string;
};

type IsNavVisible = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const navLinks = [
  {
    name: 'Overview',
    href: '/overview',
    icon: '/images/icons/icon-nav-overview.svg',
    activeIcon: '/images/icons/icon-nav-overview-green.svg',
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: '/images/icons/icon-nav-transactions.svg',
    activeIcon: '/images/icons/icon-nav-transactions-green.svg',
  },
  {
    name: 'Budgets',
    href: '/budgets',
    icon: '/images/icons/icon-nav-budgets.svg',
    activeIcon: '/images/icons/icon-nav-budgets-green.svg',
  },
  {
    name: 'Pots',
    href: '/pots',
    icon: '/images/icons/icon-nav-pots.svg',
    activeIcon: '/images/icons/icon-nav-pots-green.svg',
  },
  {
    name: 'Recurring Bills',
    href: '/recurring-bills',
    icon: '/images/icons/icon-nav-recurring-bills.svg',
    activeIcon: '/images/icons/icon-nav-recurring-bills-green.svg',
  },
];

function SideNavigation({ isVisible, setIsVisible }: IsNavVisible) {
  const pathname = usePathname();

  return (
    <aside className="relative hidden h-full rounded-r-2xl bg-gray-900 py-8 text-white xl:flex">
      <div className="fixed h-full">
        <div className="flex flex-col">
          <div
            className={`px-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
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
            <ul className="list-none space-y-1">
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

function ToggleVisibilityButton({ isVisible, setIsVisible }: IsNavVisible) {
  return (
    <div className="absolute bottom-16 px-4">
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
    <li
      className={`text-preset-3 mb-0 px-4 whitespace-nowrap transition-all duration-300 ease-in-out ${
        isVisible ? 'w-[276px]' : 'w-16'
      }`}
    >
      <div
        className={`absolute left-0 h-12 rounded-r-xl transition-all duration-300 ease-in-out ${
          isActive && isVisible
            ? 'bg-beige-100 w-[276px] opacity-100'
            : 'w-0 opacity-0'
        }`}
      />
      <Link
        className={`relative flex h-12 items-center gap-3 rounded transition-colors duration-300 ${
          isActive && isVisible ? 'text-grey-900' : 'text-primary-200'
        }`}
        href={link.href}
        title={link.name}
      >
        <div className="z-10 flex w-6 items-center justify-center">
          <img
            src={isActive && isVisible ? link.activeIcon : link.icon}
            alt={`${link.name} icon`}
            className="transition-all duration-300"
          />
        </div>
        <span
          className={`z-10 whitespace-nowrap transition-all duration-300 ease-in-out ${
            isVisible ? 'w-auto opacity-100' : 'w-0 overflow-hidden opacity-0'
          }`}
        >
          {link.name}
        </span>
      </Link>
    </li>
  );
}
export default SideNavigation;
