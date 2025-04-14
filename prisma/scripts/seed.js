/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/seed.js
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  try {
    const dataPath = path.join(process.cwd(), './data/data.json');
    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    console.log('Chargement des données:', jsonData);

    let defaultUser = null;

    if (!jsonData.users || jsonData.users.length === 0) {
      defaultUser = await prisma.user.create({
        data: {
          email: 'default@example.com',
          name: 'Utilisateur par défaut',
          password: 'password123',
        },
      });
      console.log('Utilisateur par défaut créé:', defaultUser.id);
    }

    if (jsonData.balance) {
      await prisma.balance.create({
        data: {
          current: parseFloat(jsonData.balance.current),
          income: parseFloat(jsonData.balance.income),
          expenses: parseFloat(jsonData.balance.expenses),
          userId: defaultUser?.id,
        },
      });
      console.log('Balance imported successfully');
    }

    if (jsonData.transactions) {
      for (const transaction of jsonData.transactions) {
        await prisma.transaction.create({
          data: {
            avatar: transaction.avatar,
            name: transaction.name,
            category: transaction.category,
            date: transaction.date,
            amount: parseFloat(transaction.amount),
            recurring: transaction.recurring || false,
            userId: defaultUser?.id,
          },
        });
      }
      console.log(`${jsonData.transactions.length} transaction(s) importée(s)`);
    }

    if (jsonData.budgets) {
      for (const budget of jsonData.budgets) {
        await prisma.budget.create({
          data: {
            category: budget.category,
            maximum: parseFloat(budget.maximum),
            theme: budget.theme,
            userId: defaultUser?.id,
          },
        });
      }
      console.log(`${jsonData.budgets.length} budget(s) importé(s)`);
    }

    if (jsonData.pots) {
      for (const pot of jsonData.pots) {
        await prisma.pot.create({
          data: {
            name: pot.name,
            target: parseFloat(pot.target),
            total: parseFloat(pot.total),
            theme: pot.theme,
            userId: defaultUser?.id,
          },
        });
      }
      console.log(`${jsonData.pots.length} pot(s) importé(s)`);
    }

    if (jsonData.users) {
      for (const user of jsonData.users) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            password: user.password,
          },
        });
      }
      console.log(`${jsonData.users.length} utilisateur(s) importé(s)`);
    }

    console.log('Toutes les données ont été importées avec succès !');
  } catch (error) {
    console.error("Erreur lors de l'importation des données :", error);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
