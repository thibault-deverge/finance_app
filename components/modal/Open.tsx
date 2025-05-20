'use client';
import React from 'react';
import { useModal } from '@/components/modal/Modal';

export type OpenProps = {
  children: React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
  opens: string;
};

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useModal();

  return React.cloneElement(children, {
    onClick: () => {
      open(opensWindowName);
    },
  });
}

export default Open;
