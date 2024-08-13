-- AlterTable
ALTER TABLE `form_sections` MODIFY `SectionIdentifier` VARCHAR(191) NULL,
    MODIFY `Title` VARCHAR(191) NULL,
    MODIFY `Description` VARCHAR(191) NULL,
    MODIFY `Sequence` VARCHAR(191) NULL,
    MODIFY `ParentSectionId` VARCHAR(191) NULL;
