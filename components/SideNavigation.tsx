'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BtnLogout } from './auth/BtnLogout';
import { Button } from './ui/button';
import { FinanceContextType } from './context/FinanceProvider';

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
    <aside
      className={`${isVisible ? 'flex' : 'hidden'} hidden h-full min-w-[18.75rem] flex-col justify-between bg-gray-900 px-8 py-10 text-white xl:flex`}
    >
      {isVisible && (
        <>
          <div className="flex flex-col">
            <Image
              src={'/images/logo/logo-large.svg'}
              alt="Logo"
              width={122}
              height={22}
              quality={80}
              loading="lazy"
              className="mb-16"
            />
            <ul className="list-none">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    className={`${pathname === link.href ? 'bg-primary-900' : ''} text-primary-200 hover:bg-primary-900 hover:text-primary-100 flex items-center gap-4 py-3 font-semibold transition-colors`}
                    href={link.href}
                  >
                    <img src={link.icon} alt={`${link.name} icon`} />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-18 flex flex-col gap-4">
            <button
              onClick={(visible) => setIsVisible(!visible)}
              className="hover:text-grey-300 flex cursor-pointer items-center gap-4"
            >
              <img
                src="/images/icons/icon-minimize-menu.svg"
                alt="minimize icon"
              />
              <p>Minimize</p>
            </button>
            <BtnLogout>Logout</BtnLogout>
          </div>
        </>
      )}
    </aside>
  );
}

export default SideNavigation;
