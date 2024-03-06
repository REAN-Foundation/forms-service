/*
  Warnings:

  - You are about to alter the column `Type` on the `formtemplate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `formtemplate` MODIFY `Type` ENUM('Survey', 'Questionnaire', 'TestPaper', 'DataCollection') NOT NULL;
