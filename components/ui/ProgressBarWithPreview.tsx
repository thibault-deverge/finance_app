import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

function ProgressBarWithPreview({
  currentTotal,
  target,
  name,
  inputAmount = 0,
  theme = '#f2cdac',
}: {
  currentTotal: number;
  target: number;
  inputAmount: number;
  theme: string;
  name: string;
}) {
  const [showPreview, setShowPreview] = useState(false);

  // Calculer les pourcentages actuels et prévus
  const currentPercentage = parseFloat(
    ((currentTotal / target) * 100).toFixed(2)
  );
  // Pour withdraw, nous soustrayons l'inputAmount du currentTotal
  const newTotal =
    name === 'withdraw-moneypot'
      ? currentTotal - inputAmount
      : currentTotal + inputAmount;

  const newPercentage = parseFloat(((newTotal / target) * 100).toFixed(2));

  // Limiter les pourcentages entre 0 et 100
  const safeCurrentPercentage = Math.min(Math.max(currentPercentage, 0), 100);
  const safeNewPercentage = Math.min(Math.max(newPercentage, 0), 100);

  // Déterminer la couleur d'aperçu en fonction de si c'est un ajout ou un retrait
  const previewColor =
    name === 'withdraw-moneypot' ? 'bg-red-500' : 'bg-green-500';

  useEffect(() => {
    // Afficher l'aperçu uniquement si le montant d'entrée est différent de zéro
    setShowPreview(inputAmount !== 0);
  }, [inputAmount]);

  if (name === 'add-moneypot') {
    return (
      <div className="w-full">
        <div className="relative">
          {/* Barre de progression actuelle (toujours visible) */}
          <Progress
            className="bg-beige-100 h-5 w-full"
            value={safeCurrentPercentage}
            indicatorColor={theme}
            classNamePrimitive="rounded-l-lg"
          />

          {/* Barre de progression avec prévisualisation (conditionnelle) */}
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
                className={`text-xs font-medium ${inputAmount >= 0 ? 'text-green-500' : 'text-red-500'}`}
              >
                {inputAmount >= 0 ? '→' : '→'} {newPercentage}%
              </span>
            )}
          </div>
          <div className="text-preset-5 text-grey-500 flex items-center gap-2">
            <p>
              {showPreview ? (
                <>
                  <span
                    className={`${inputAmount >= 0 ? 'text-green-500' : 'text-red-600'}`}
                  >
                    ${Number(newTotal).toFixed(2)}
                  </span>
                </>
              ) : (
                <>${Number(currentTotal).toFixed(2)}</>
              )}{' '}
              / ${target}
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (name === 'withdraw-moneypot') {
    return (
      <div className="w-full">
        <div className="relative">
          {/* Barre de progression principale qui montre le montant actuel */}
          <Progress
            className="bg-beige-100 h-5 w-full"
            value={showPreview ? safeNewPercentage : safeCurrentPercentage}
            indicatorColor={theme}
            classNamePrimitive="rounded-l-lg"
          />

          {/* Barre de prévisualisation qui montre le montant qui sera retiré */}
          {showPreview && (
            <div
              className={`absolute top-1/2 -translate-y-1/2 ${previewColor} ml-1 rounded-r-lg opacity-40 transition-all duration-300`}
              style={{
                height: '12px',
                left: `${safeNewPercentage}%`,
                width: `${Math.abs(safeCurrentPercentage - safeNewPercentage)}%`,
              }}
            />
          )}
        </div>

        <div className="mt-2 flex justify-between">
          <div className="flex items-center gap-2">
            <p className="text-preset-5-bold text-grey-500">
              {showPreview ? newPercentage : currentPercentage}%
            </p>
            {showPreview && (
              <span className="text-xs font-medium text-red-500">
                ← {currentPercentage}%
              </span>
            )}
          </div>
          <div className="text-preset-5 text-grey-500 flex items-center gap-2">
            <p>
              {showPreview ? (
                <>
                  <span className="text-red-500">
                    ${Number(newTotal).toFixed(2)}
                  </span>
                </>
              ) : (
                <>${Number(currentTotal).toFixed(2)}</>
              )}{' '}
              / ${target}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default ProgressBarWithPreview;
