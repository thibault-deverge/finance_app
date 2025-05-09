'use client';
import React from 'react';
import { useModal } from '@/components/modal/Modal';
import { OpenProps } from '@/lib/type';

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useModal();

  return React.cloneElement(children, {
    onClick: () => {
      open(opensWindowName);
    },
  });
}

export default Open;
