import { createContext, useContext, useState } from 'react';
import { ModalContextType, ModalProps } from '@/lib/type';
import Open from '@/components/ui/Modal/Open';
import Window from '@/components/ui/Modal/Window';
import Header from '@/components/ui/Modal/Header';
import Description from '@/components/ui/Modal/Description';
import Category from '@/components/ui/Modal/Category';
import Name from '@/components/ui/Modal/Name';
import Amount from '@/components/ui/Modal/Amount';
import Target from '@/components/ui/Modal/Target';
import Theme from '@/components/ui/Modal/Theme';

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

export default Modal;
