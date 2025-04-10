/*
  Warnings:

  - You are about to alter the column `Sequence` on the `questions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `questions` MODIFY `Sequence` INTEGER NULL;
