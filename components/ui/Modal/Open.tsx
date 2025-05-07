import React from 'react';
import { useModal } from '@/components/ui/Modal/Modal';
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
