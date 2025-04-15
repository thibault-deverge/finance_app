'use client';
import { useState } from 'react';

import LoginForm from '@/components/auth/LoginForm';
import SwitchAuth from '@/components/auth/SwitchAuth';
import SignUpForm from './SignUpForm';

function AuthPanel() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const h1Text = isLogin ? 'Login' : 'Sign Up';

  const handleClick = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <section className="flex w-full items-center justify-center lg:w-2/3">
      <div className="flex w-full max-w-[343px] flex-col gap-8 rounded-xl bg-white px-5 py-8 sm:max-w-[560px]">
        <h1 className="text-preset-1">{h1Text}</h1>

        {isLogin ? <LoginForm /> : <SignUpForm onClick={handleClick} />}

        <SwitchAuth onClick={handleClick} isLogin={isLogin} />
      </div>
    </section>
  );
}

export default AuthPanel;
