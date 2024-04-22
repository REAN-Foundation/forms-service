/*
  Warnings:

  - You are about to alter the column `BooleanValue` on the `question_responses` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `question_responses` MODIFY `BooleanValue` VARCHAR(191) NULL;
