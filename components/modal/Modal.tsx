'use client';
import { createContext, useContext, useState } from 'react';
import { ModalContextType, ModalProps } from '@/lib/type';

import Theme from '@/components/modal/GenericSelectTheme';
import Category from '@/components/modal/Category';
import Amount from '@/components/modal/Amount';
import Description from '@/components/modal/Description';
import Header from '@/components/modal/Header';
import Name from '@/components/modal/Name';
import DateField from '@/components/modal/Date';
import Open from '@/components/modal/Open';
import Target from '@/components/modal/Target';
import Window from '@/components/modal/Window';
import Avatar from '@/components/modal/Avatar';
import Recurring from '@/components/modal/Recurring';

// Create a context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Context Hook
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a Modal provider');
  }
  return context;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.Open = Open;
Modal.Window = Window;
Modal.Header = Header;
Modal.Description = Description;
Modal.Category = Category;
Modal.Name = Name;
Modal.Amount = Amount;
Modal.Target = Target;
Modal.Theme = Theme;
Modal.Date = DateField;
Modal.Avatar = Avatar;
Modal.Recurring = Recurring;

export default Modal;
