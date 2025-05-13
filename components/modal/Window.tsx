'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Budget, Pot, Transaction } from '@prisma/client';
import { useModal } from '@/components/modal/Modal';
import { FormContextType, FormDataState } from '@/lib/type';

// Create a context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Context Hook
export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Content component');
  }
  return context;
}

function Window({
  children,
  name,
  initialData,
  formAction,
}: {
  children: ReactNode;
  name: string;
  initialData?: Budget | Pot | Transaction;
  formAction?: (formData: FormData) => Promise<void>;
}) {
  const { openName, close } = useModal();

  const [formData, setFormData] = useState<FormDataState>(() => {
    // Valeurs par défaut
    const defaults: FormDataState = {
      name: '',
      id: '',
      target: '',
      total: '',
      category: '',
      maximum: '',
      theme: '',
      amount: '',
      date: '',
      recurring: false,
    };

    // Si pas de données initiales, retourner les valeurs par défaut
    if (!initialData) return defaults;

    // Extraire les valeurs de initialData si elles existent
    return {
      ...defaults,
      ...Object.entries(initialData).reduce((acc, [key, value]) => {
        if (key in defaults) {
          // Traitement spécial pour la date
          if (key === 'date' && value) {
            return {
              ...acc,
              date: new Date(value as string | Date).toISOString().slice(0, 10),
            };
          }
          // Traitement spécial pour recurring (convertir en boolean)
          if (key === 'recurring') {
            return { ...acc, recurring: Boolean(value) };
          }
          // Pour les autres clés, utiliser la valeur telle quelle
          return { ...acc, [key]: value };
        }
        return acc;
      }, {}),
    };
  });

  const updateFormData = (
    field: keyof typeof formData,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && name === openName) {
        close();
      }
    };

    // Ajouter l'écouteur d'événement lorsque la modale est ouverte
    if (name === openName) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [close, name, openName]);

  // Function pour fermer le modal après l'action serveur
  const actionWithClose = formAction
    ? async (formData: FormData) => {
        // Ajouter l'ID si disponible (pour edit/delete)
        if (initialData?.id && !formData.has('id')) {
          formData.append('id', initialData.id);
        }

        await formAction(formData);
        close();
      }
    : undefined;

  if (name !== openName) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={close}
      />

      <div
        className="relative z-50 w-full max-w-[35rem] rounded-2xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <FormContext.Provider value={{ formData, updateFormData }}>
          <form action={actionWithClose}>
            {children}

            {/* Champs cachés pour transmettre les données d'état */}
            {/* Ces champs ne sont pas visibles mais seront soumis avec le formulaire */}
            <input type="hidden" name="category" value={formData.category} />
            <input type="hidden" name="name" value={formData.name} />
            <input type="hidden" name="target" value={formData.target} />
            <input type="hidden" name="id" value={formData.id} />
            <input
              type="hidden"
              name="maximum"
              value={formData.maximum.toString()}
            />
            <input type="hidden" name="theme" value={formData.theme} />
            <input type="hidden" name="total" value={formData.total} />
            <input
              type="hidden"
              name="amount"
              value={String(formData.amount)}
            />
            <input type="hidden" name="date" value={formData.date} />
            <input
              type="hidden"
              name="recurring"
              value={String(formData.recurring)}
            />
          </form>
        </FormContext.Provider>
      </div>
    </div>
  );
}

export default Window;
