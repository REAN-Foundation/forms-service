-- AlterTable
ALTER TABLE `questions` MODIFY `CorrectAnswer` VARCHAR(191) NULL,
    MODIFY `Hint` VARCHAR(191) NULL,
    MODIFY `Options` VARCHAR(191) NULL,
    MODIFY `QuestionImageUrl` VARCHAR(191) NULL,
    MODIFY `RangeMin` INTEGER NULL,
    MODIFY `RangeMax` INTEGER NULL;
