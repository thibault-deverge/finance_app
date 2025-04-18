'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './ui/button';
import ModalSelect from './ModalSelect';

interface ModalProps {
  children: ReactNode;
}
interface ModalContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// 1. Create a context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// 2. Create parent component
function Modal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ModalContext.Provider value={{ setIsOpen, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a Modal provider');
  }
  return context;
}

/* 3. Create child components to help implementing the common tasks 
of this overall compound components */

function AddNewButton({ children }: { children: ReactNode }) {
  const { setIsOpen } = useModal();
  return (
    <Button
      className="text-preset-4-bold max-w-[9.68rem] cursor-pointer rounded-lg p-4 text-white"
      variant="primary"
      onClick={() => setIsOpen(true)}
    >
      {children}
    </Button>
  );
}
function Content({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useModal();
  const close = () => setIsOpen(false);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      {/* BACKDROP avec gestionnaire de clic */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={close}
      />

      {/* MODAL CONTENT */}
      <div
        className="relative z-10 w-full max-w-[35rem] rounded-2xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Empêche la propagation du clic
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
function Header({ children }: { children: ReactNode }) {
  const { setIsOpen } = useModal();
  const close = () => setIsOpen(false);

  return (
    <header className="mb-5 flex items-center justify-between">
      <h2 className="text-preset-1 text-grey-900">{children}</h2>
      <button className="cursor-pointer" onClick={close}>
        <img src="/images/icons/icon-close-modal.svg" alt="icon close modal" />
      </button>
    </header>
  );
}
function Description({ children }: { children: ReactNode }) {
  return <p className="text-preset-4 text-grey-500 mb-5">{children}</p>;
}
function Name() {
  return <p>Name</p>;
}
function Category() {
  return (
    <div>
      <ModalSelect />
    </div>
  );
}
function Chart() {
  return <p>Chart</p>;
}
function Amount() {
  return <p>Amount</p>;
}
function Theme() {
  return <p>Theme</p>;
}

// 4. Add child components as properties to parent component
Modal.Content = Content;
Modal.Header = Header;
Modal.Description = Description;
Modal.Name = Name;
Modal.Category = Category;
Modal.Chart = Chart;
Modal.Amount = Amount;
Modal.Theme = Theme;
Modal.AddNewButton = AddNewButton;

export default Modal;
