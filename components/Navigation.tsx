'use client';

import { useFinance } from './context/FinanceProvider';
import SideNavigation from './SideNavigation';

function Navigation() {
  const { isVisible, setIsVisible } = useFinance();

  return <SideNavigation isVisible={isVisible} setIsVisible={setIsVisible} />;
}

export default Navigation;
