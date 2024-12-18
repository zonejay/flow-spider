/*
  Warnings:

  - You are about to alter the column `amount` on the `UserPurchase` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserPurchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "stripeId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_UserPurchase" ("amount", "currency", "date", "description", "id", "stripeId", "userId") SELECT "amount", "currency", "date", "description", "id", "stripeId", "userId" FROM "UserPurchase";
DROP TABLE "UserPurchase";
ALTER TABLE "new_UserPurchase" RENAME TO "UserPurchase";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
