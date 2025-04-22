'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import ModalInput from './ModalInput';
import ModalSelectCategory from './ModalSelectCategory';
import ModalSelectColor from './ModalSelectColor';
import { Button } from './button';
interface ModalProps {
  children: ReactNode;
}
interface ModalContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormContextType {
  formData: {
    category: string;
    amount: string;
    theme: string;
  };
  updateFormData: (
    field: keyof FormContextType['formData'],
    value: string | number
  ) => void;
}
// Create a context
const ModalContext = createContext<ModalContextType | undefined>(undefined);
const FormContext = createContext<FormContextType | undefined>(undefined);

// Context Hook
function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a Modal provider');
  }
  return context;
}

function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Content component');
  }
  return context;
}

// Create parent component
function Modal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ setIsOpen, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

/* Create child components to help implementing the common tasks 
of this overall compound components */

function AddNewButton({ title }: { title: string }) {
  const { setIsOpen } = useModal();
  return (
    <Button
      className="text-preset-4-bold max-w-[9.68rem] cursor-pointer rounded-lg p-4 text-white"
      variant="primary"
      onClick={() => setIsOpen(true)}
    >
      {title}
    </Button>
  );
}
function Content({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useModal();
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    theme: '',
  });
  console.log(formData);
  const close = () => setIsOpen(false);

  const updateFormData = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  if (!isOpen) return null;

  function handleSubmitData(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log('Submit');
    //ajout de la fonction POST ICI
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={close}
      />

      <div
        className="relative z-10 w-full max-w-[35rem] rounded-2xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <FormContext.Provider value={{ formData, updateFormData }}>
          <form onSubmit={handleSubmitData}>{children}</form>
        </FormContext.Provider>
      </div>
    </div>
  );
}

function Header({ title }: { title: string }) {
  const { setIsOpen } = useModal();
  const close = () => setIsOpen(false);

  return (
    <header className="mb-5 flex items-center justify-between">
      <h2 className="text-preset-1 text-grey-900">{title}</h2>
      <button className="cursor-pointer" onClick={close}>
        <img src="/images/icons/icon-close-modal.svg" alt="icon close modal" />
      </button>
    </header>
  );
}
function Description({ description }: { description: string }) {
  return <p className="text-preset-4 text-grey-500 mb-5">{description}</p>;
}
function Name() {
  return <p>Name</p>;
}
function Category({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (value: string) => {
    updateFormData('category', value);
  };
  return (
    <ModalSelectCategory
      title={title}
      value={formData?.category}
      onChange={handleChange}
    />
  );
}
function Chart() {
  return <p>Chart</p>;
}
function Amount({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (value: number) => {
    updateFormData('amount', value);
  };
  return (
    <ModalInput
      title={title}
      value={Number(formData.amount)}
      onChange={handleChange}
    />
  );
}
function Theme({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();
  const handleChange = (value: string) => {
    updateFormData('theme', value);
  };
  return (
    <ModalSelectColor
      title={title}
      value={formData?.theme}
      onChange={handleChange}
    />
  );
}

function BtnModal({ title }: { title: string }) {
  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      className="w-full cursor-pointer py-6"
    >
      {title}
    </Button>
  );
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
Modal.BtnModal = BtnModal;

export default Modal;
