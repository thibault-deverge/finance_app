import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

function ProgressBarWithPreview({
  currentTotal,
  target,
  inputAmount = 0,
  theme = '#f2cdac',
}: {
  currentTotal: number;
  target: number;
  inputAmount: number;
  theme: string;
}) {
  const [previewAmount, setPreviewAmount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  // Calculer les pourcentages actuels et prévus
  const currentPercentage = parseFloat(
    ((currentTotal / target) * 100).toFixed(2)
  );
  const newTotal = currentTotal + inputAmount;
  const newPercentage = parseFloat(((newTotal / target) * 100).toFixed(2));

  // Limiter les pourcentages entre 0 et 100
  const safeCurrentPercentage = Math.min(Math.max(currentPercentage, 0), 100);
  const safeNewPercentage = Math.min(Math.max(newPercentage, 0), 100);

  // Déterminer la couleur d'aperçu en fonction de si c'est un ajout ou un retrait
  const previewColor = inputAmount >= 0 ? 'bg-green-500' : 'bg-red-500';

  useEffect(() => {
    // Afficher l'aperçu uniquement si le montant d'entrée est différent de zéro
    setShowPreview(inputAmount !== 0);
    setPreviewAmount(inputAmount);
  }, [inputAmount]);

  return (
    <div className="w-full">
      <div className="relative">
        {/* Barre de progression principale */}
        <Progress
          className="bg-beige-100 h-5 w-full"
          value={safeCurrentPercentage}
          indicatorColor={theme}
          innerPadding={4}
          classNamePrimitive="rounded-l-lg"
        />

        {/* Aperçu de la modification (visible uniquement lorsqu'un montant est saisi) */}
        {showPreview && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${previewColor} ml-1 rounded-r-lg opacity-40 transition-all duration-300`}
            style={{
              height: '12px',
              left: `${safeCurrentPercentage}%`,
              width: `${Math.abs(safeNewPercentage - safeCurrentPercentage)}%`,
              right:
                inputAmount < 0 ? `${100 - safeCurrentPercentage}%` : 'auto',
            }}
          />
        )}
      </div>

      <div className="mt-2 flex justify-between">
        <div className="flex items-center gap-2">
          <p className="text-preset-5-bold text-grey-500">
            {currentPercentage}%
          </p>
          {showPreview && (
            <span
              className={`text-xs font-medium ${inputAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {inputAmount >= 0 ? '→' : '←'} {newPercentage}%
            </span>
          )}
        </div>
        <div className="text-preset-5 text-grey-500 flex items-center gap-2">
          <p>
            <span
              className={` ${inputAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              ${Number(currentTotal + inputAmount).toFixed(2)}{' '}
            </span>{' '}
            / ${target}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProgressBarWithPreview;
