// 'use client';
// import { FormDataState } from '@/lib/type';
// import { Budget, Pot } from '@prisma/client';
// import React, {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';
// import ModalInput from './Modal/ModalInput';
// import ModalNameInput from './Modal/ModalNameInput';
// import ModalSelectCategory from './Modal/ModalSelectCategory';
// import ModalSelectColor from './Modal/ModalSelectColor';
// interface ModalProps {
//   children: ReactNode;
// }
// interface ModalContextType {
//   open: React.Dispatch<React.SetStateAction<string>>;
//   close: () => void;
//   openName: string;
// }
// interface FormContextType {
//   formData: {
//     category: string;
//     maximum: string | number;
//     name: string;
//     target: string | number;
//     theme: string;
//   };
//   updateFormData: (
//     field: keyof FormContextType['formData'],
//     value: string | number
//   ) => void;
// }

// type OpenProps = {
//   children: React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
//   opens: string;
// };

// // Create a context
// const ModalContext = createContext<ModalContextType | undefined>(undefined);
// const FormContext = createContext<FormContextType | undefined>(undefined);

// // Context Hook
// function useModal() {
//   const context = useContext(ModalContext);
//   if (!context) {
//     throw new Error('useModal must be used within a Modal provider');
//   }
//   return context;
// }

// function useFormContext() {
//   const context = useContext(FormContext);
//   if (!context) {
//     throw new Error('useFormContext must be used within a Content component');
//   }
//   return context;
// }

// // Create parent component
// function Modal({ children }: ModalProps) {
//   const [openName, setOpenName] = useState('');

//   const close = () => setOpenName('');
//   const open = setOpenName;

//   return (
//     <ModalContext.Provider value={{ open, close, openName }}>
//       {children}
//     </ModalContext.Provider>
//   );
// }

// /* Create child components to help implementing the common tasks 
// of this overall compound components */

// function Open({ children, opens: opensWindowName }: OpenProps) {
//   const { open } = useModal();

//   return React.cloneElement(children, {
//     onClick: () => {
//       open(opensWindowName);
//     },
//   });
// }

// function Window({
//   children,
//   name,
//   initialData,
//   formAction,
// }: {
//   children: ReactNode;
//   name: string;
//   initialData?: Budget | Pot;
//   formAction?: (formData: FormData) => Promise<void>;
// }) {
//   const { openName, close } = useModal();

//   const [formData, setFormData] = useState<FormDataState>({
//     name: initialData && 'name' in initialData ? initialData.name : '',
//     target: initialData && 'target' in initialData ? initialData.target : '',
//     total: initialData && 'total' in initialData ? initialData.total : '',
//     category:
//       initialData && 'category' in initialData ? initialData.category : '',
//     maximum: initialData && 'maximum' in initialData ? initialData.maximum : '',
//     theme: initialData?.theme || '',
//   });

//   const updateFormData = (
//     field: keyof typeof formData,
//     value: string | number
//   ) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   useEffect(() => {
//     const handleEscapeKey = (event: KeyboardEvent) => {
//       if (event.key === 'Escape' && name === openName) {
//         close();
//       }
//     };

//     // Ajouter l'écouteur d'événement lorsque la modale est ouverte
//     if (name === openName) {
//       document.addEventListener('keydown', handleEscapeKey);

//       // Au lieu de modifier le body, on ajoute une classe à un niveau plus haut
//       document.documentElement.classList.add('modal-open');
//     }

//     // Nettoyer l'écouteur d'événement lors du démontage du composant
//     return () => {
//       document.removeEventListener('keydown', handleEscapeKey);
//       document.documentElement.classList.remove('modal-open');
//     };
//   }, [close, name, openName]);

//   // Function pour fermer le modal après l'action serveur
//   const actionWithClose = formAction
//     ? async (formData: FormData) => {
//         // Ajouter l'ID si disponible (pour edit/delete)
//         if (initialData?.id && !formData.has('id')) {
//           formData.append('id', initialData.id);
//         }

//         await formAction(formData);
//         close();
//       }
//     : undefined;

//   if (name !== openName) return null;

//   return (
//     <div className="fixed inset-0 z-20 flex items-center justify-center">
//       <div
//         className="absolute inset-0 bg-black/30 backdrop-blur-sm"
//         onClick={close}
//       />

//       <div
//         className="relative z-10 w-full max-w-[35rem] rounded-2xl bg-white p-8 shadow-xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <FormContext.Provider value={{ formData, updateFormData }}>
//           <form action={actionWithClose}>
//             {children}

//             {/* Champs cachés pour transmettre les données d'état */}
//             {/* Ces champs ne sont pas visibles mais seront soumis avec le formulaire */}
//             <input type="hidden" name="category" value={formData.category} />
//             <input type="hidden" name="name" value={formData.name} />
//             <input type="hidden" name="target" value={formData.target} />
//             <input
//               type="hidden"
//               name="maximum"
//               value={formData.maximum.toString()}
//             />
//             {formData.theme && (
//               <input type="hidden" name="theme" value={formData.theme} />
//             )}
//           </form>
//         </FormContext.Provider>
//       </div>
//     </div>
//   );
// }

// function Header({ title }: { title: string }) {
//   const { close } = useModal();

//   return (
//     <header className="mb-5 flex items-center justify-between">
//       <h2 className="text-preset-1 text-grey-900">{title}</h2>
//       <button className="cursor-pointer" onClick={close}>
//         <img src="/images/icons/icon-close-modal.svg" alt="icon close modal" />
//       </button>
//     </header>
//   );
// }
// function Description({ description }: { description: string }) {
//   return <p className="text-preset-4 text-grey-500 mb-5">{description}</p>;
// }

// function Category({ title }: { title: string }) {
//   const { formData, updateFormData } = useFormContext();

//   const handleChange = (value: string) => {
//     updateFormData('category', value);
//   };
//   return (
//     <ModalSelectCategory
//       title={title}
//       value={formData.category}
//       onChange={handleChange}
//     />
//   );
// }
// function Name({ title }: { title: string }) {
//   const { formData, updateFormData } = useFormContext();

//   const handleChange = (value: string) => {
//     updateFormData('name', value);
//   };
//   return (
//     <ModalNameInput
//       title={title}
//       value={formData.name}
//       onChange={handleChange}
//       maxLength={30}
//     />
//   );
// }

// function Amount({ title }: { title: string }) {
//   const { formData, updateFormData } = useFormContext();

//   const handleChange = (value: number) => {
//     updateFormData('maximum', value);
//   };
//   return (
//     <ModalInput
//       title={title}
//       value={Number(formData.maximum)}
//       onChange={handleChange}
//     />
//   );
// }
// function Target({ title }: { title: string }) {
//   const { formData, updateFormData } = useFormContext();

//   const handleChange = (value: number) => {
//     updateFormData('target', value);
//   };
//   return (
//     <ModalInput
//       title={title}
//       value={Number(formData.target)}
//       onChange={handleChange}
//     />
//   );
// }

// function Theme({ title }: { title: string }) {
//   const { formData, updateFormData } = useFormContext();
//   const handleChange = (value: string) => {
//     updateFormData('theme', value);
//   };
//   return (
//     <ModalSelectColor
//       title={title}
//       value={formData.theme}
//       onChange={handleChange}
//     />
//   );
// }

// // 4. Add child components as properties to parent component
// Modal.Open = Open;
// Modal.Window = Window;
// Modal.Header = Header;
// Modal.Description = Description;
// Modal.Category = Category;
// Modal.Name = Name;
// Modal.Amount = Amount;
// Modal.Target = Target;
// Modal.Theme = Theme;

// export default Modal;
