'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { getAllCategories } from '@/lib/utilsBudgets';
import { useEffect, useState } from 'react';

function ModalSelectCategory({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const categoryAll = getAllCategories();
  const [isOpen, setIsOpen] = useState(false);

  // Gestion plus précise de l'ouverture/fermeture du select
  const handleOpenChange = (open: boolean) => {
    if (open) {
      // Force la barre de défilement à rester visible même en mode modal
      document.documentElement.style.overflow = 'scroll';
      document.documentElement.classList.add('select-open');
    } else {
      // Restaure l'état précédent seulement si on n'est plus en select-open
      setTimeout(() => {
        document.documentElement.classList.remove('select-open');
        // Si toujours en modal-open, ne pas restaurer complètement
        if (document.documentElement.classList.contains('modal-open')) {
          // Ne rien faire, laisse la classe modal-open gérer
        } else {
          document.documentElement.style.overflow = '';
        }
      }, 10);
    }

    setIsOpen(open);
  };

  // Nettoyage à la suppression du composant
  useEffect(() => {
    return () => {
      if (document.documentElement.classList.contains('select-open')) {
        document.documentElement.classList.remove('select-open');
      }
    };
  }, []);

  return (
    <div className="mb-4">
      <Label className="text-preset-5-bold text-grey-500 mb-2">{title}</Label>
      <Select
        value={value}
        onValueChange={onChange}
        onOpenChange={handleOpenChange}
        open={isOpen}
      >
        <SelectTrigger className="w-full px-5 py-5 hover:cursor-pointer">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent
          className="max-h-72 overflow-auto bg-white"
          position="popper"
          sideOffset={5}
        >
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {categoryAll.length > 0 &&
              categoryAll.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ModalSelectCategory;
