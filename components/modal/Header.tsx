/* eslint-disable @next/next/no-img-element */
'use client';
import { useModal } from '@/components/modal/Modal';

function Header({ title }: { title: string }) {
  const { close } = useModal();

  return (
    <header className="mb-5 flex items-center justify-between">
      <h2 className="text-preset-1 text-grey-900 text-left">{title}</h2>
      <button type="button" className="cursor-pointer" onClick={close}>
        <img src="/images/icons/icon-close-modal.svg" alt="icon close modal" />
      </button>
    </header>
  );
}

export default Header;
