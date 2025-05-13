/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import { Transaction } from '@prisma/client';

import SpendingCard from '@/components/budgets/SpendingCard';

function LatestSpending({
  allTransactions,
}: {
  allTransactions: Transaction[];
}) {
  const [showAll, setShowAll] = useState(false);
  if (!allTransactions || allTransactions.length === 0) {
    return (
      <div className="bg-beige-100 rounded-xl p-4">
        No transactions available
      </div>
    );
  }

  // Filtrer uniquement les transactions avec des montants négatifs (dépenses)
  const expenseTransactions = allTransactions.filter(
    (transaction) => transaction.amount < 0
  );

  // Trier les transactions par date décroissante
  const sortedTransactions = [...expenseTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Limiter à 3 transactions ou afficher toutes selon l'état
  const displayedTransactions = showAll
    ? sortedTransactions
    : sortedTransactions.slice(0, 3);

  return (
    <div className="bg-beige-100 rounded-xl p-4">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-preset-3 text-grey-900">Latest Spending</h3>
        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => setShowAll(!showAll)}
        >
          <p className="text-preset-4 text-grey-500">
            {showAll ? 'Show Less' : 'See All'}
          </p>
          <div
            className={`transform transition-transform duration-300 ${showAll ? 'rotate-90' : ''}`}
          >
            <img
              src="images/icons/icon-caret-right.svg"
              alt="icon carret right"
            />
          </div>
        </div>
      </div>
      <ul>
        {displayedTransactions.map((transaction, index) => (
          <React.Fragment key={transaction.name + index}>
            <SpendingCard {...transaction} />
            {index < displayedTransactions.length - 1 && (
              <div className="border-grey-500 my-4 h-px border-b"></div>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default LatestSpending;
