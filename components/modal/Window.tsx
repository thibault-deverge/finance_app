'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { Budget, Pot, Transaction } from '@prisma/client';
import { useModal } from '@/components/modal/Modal';
import { FormContextType, FormDataState } from '@/lib/type';
import { z, ZodObject, ZodError } from 'zod';

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

type WindowProps = {
  children: ReactNode;
  name: string;
  initialData?: Budget | Pot | Transaction;
  formAction?: (formData: FormData) => Promise<void>;
  validationSchema?: z.ZodSchema<unknown>;
};

function Window({
  children,
  name,
  initialData,
  formAction,
  validationSchema,
}: WindowProps) {
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

    // Log pour débogage
    // console.log('initialData:', initialData);

    // Extraire les valeurs de initialData si elles existent
    // Approche simplifiée pour éviter les problèmes de fusion d'objets
    const result = { ...defaults };

    // Parcourir les clés de defaults pour chercher les valeurs correspondantes dans initialData
    Object.keys(defaults).forEach((key) => {
      if (key in initialData) {
        const value = initialData[key as keyof typeof initialData];

        // Traitement spécial pour la date
        if (key === 'date' && value) {
          result.date = new Date(value as string | Date)
            .toISOString()
            .slice(0, 10);
        }
        // Traitement spécial pour recurring (convertir en boolean)
        else if (key === 'recurring') {
          result.recurring = Boolean(value);
        }
        // Pour les autres clés, utiliser la valeur telle quelle
        else {
          (result as Record<string, unknown>)[key] = value;
        }
      }
    });

    // console.log('Formulaire initialisé avec:', result);
    return result;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Ajout d'un état pour suivre si le formulaire a été soumis
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (
    field: keyof typeof formData,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Effacer l'erreur pour ce champ lorsqu'il change, mais seulement si le formulaire a déjà été soumis
    if (isSubmitted && errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
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

  // Réinitialiser isSubmitted quand la modal change ou se ferme
  useEffect(() => {
    if (name !== openName) {
      setIsSubmitted(false);
      setErrors({});
    }
  }, [name, openName]);

  // Déterminer le message de succès en fonction du nom du modal
  const getSuccessMessage = (modalName: string) => {
    if (modalName === 'add-budget') return 'Budget successfully added';
    if (modalName === 'add-pot') return 'Pot successfully added';
    if (modalName === 'add-transaction')
      return 'Transaction successfully added';
    return 'Operation successful';
  };

  // Function pour valider et soumettre le formulaire
  const handleSubmit = async (formData: FormData) => {
    // Marquer le formulaire comme soumis
    setIsSubmitted(true);

    // Ajouter l'ID si disponible (pour edit/delete)
    if (initialData?.id && !formData.has('id')) {
      formData.append('id', initialData.id);
    }

    // Si un schéma de validation est fourni, l'utiliser
    if (validationSchema instanceof ZodObject) {
      try {
        // Extraire les données pertinentes du formData pour la validation
        const dataToValidate = Object.fromEntries(
          Object.keys(validationSchema.shape || {}).map((key) => [
            key,
            formData.get(key)?.toString() || '',
          ])
        );

        // Valider les données
        validationSchema.parse(dataToValidate);

        // Si la validation réussit, soumettre le formulaire
        if (formAction) {
          try {
            await formAction(formData);
            toast.success(getSuccessMessage(name));
            close();
          } catch (error) {
            // Vérifier si c'est une erreur de redirection Next.js
            if (
              error instanceof Error &&
              error.message.includes('NEXT_REDIRECT')
            ) {
              // Ce n'est pas une vraie erreur, c'est juste Next.js qui redirige
              toast.success(getSuccessMessage(name));
              // Fermer la modal avant que la redirection ne se produise
              close();
              // La redirection sera gérée automatiquement par Next.js
            } else {
              // C'est une vraie erreur
              toast.error('An error has occurred');
              console.error(error);
            }
          }
        }
      } catch (error) {
        if (error instanceof ZodError) {
          // Transformer les erreurs Zod en format utilisable
          const formattedErrors: Record<string, string> = {};
          error.errors.forEach((err) => {
            const field = err.path[0]?.toString();
            if (field) {
              formattedErrors[field] = err.message;
            }
          });
          setErrors(formattedErrors);

          // Afficher un toast d'erreur
          toast.error('Please correct any errors in the form');
        } else {
          // Erreur inattendue
          toast.error('An error has occurred');
          console.error(error);
        }
      }
    } else {
      // Si pas de validation, soumettre directement
      if (formAction) {
        try {
          await formAction(formData);
          toast.success(getSuccessMessage(name));
          close();
        } catch (error) {
          // Vérifier si c'est une erreur de redirection Next.js
          if (
            error instanceof Error &&
            error.message.includes('NEXT_REDIRECT')
          ) {
            // Ce n'est pas une vraie erreur, c'est juste Next.js qui redirige
            toast.success(getSuccessMessage(name));
            // Fermer la modal avant que la redirection ne se produise
            close();
            // La redirection sera gérée automatiquement par Next.js
          } else {
            // C'est une vraie erreur
            toast.error('An error has occurred');
            console.error(error);
          }
        }
      }
    }
  };

  if (name !== openName) return null;

  // Créer un contexte étendu avec les erreurs et l'état de soumission
  const contextValue = {
    formData,
    updateFormData,
    errors: isSubmitted ? errors : {}, // Ne fournir les erreurs que si le formulaire a été soumis
    isSubmitted,
  };

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
        <FormContext.Provider value={contextValue as FormContextType}>
          <form action={handleSubmit}>
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
