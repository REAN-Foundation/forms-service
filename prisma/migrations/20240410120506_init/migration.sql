-- AlterTable
ALTER TABLE `question_responses` MODIFY `IntegerValue` INTEGER NULL,
    MODIFY `FloatValue` DOUBLE NULL,
    MODIFY `BooleanValue` BOOLEAN NULL,
    MODIFY `DateTimeValue` DATETIME(3) NULL,
    MODIFY `Url` VARCHAR(191) NULL,
    MODIFY `FileResourceId` VARCHAR(191) NULL,
    MODIFY `TextValue` VARCHAR(191) NULL;
