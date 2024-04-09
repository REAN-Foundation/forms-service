-- DropForeignKey
ALTER TABLE `form_submissions` DROP FOREIGN KEY `form_submissions_AnsweredByUserId_fkey`;

-- AlterTable
ALTER TABLE `form_submissions` MODIFY `FormUrl` VARCHAR(191) NULL,
    MODIFY `AnsweredByUserId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `form_submissions` ADD CONSTRAINT `form_submissions_AnsweredByUserId_fkey` FOREIGN KEY (`AnsweredByUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
