import {
    FormSubmissionCreateModel,
    FormSubmissionDto,
    FormSubmissionSearchFilters,
    FormSubmissionUpdateModel,
} from '../../../domain.types/forms/form.submission.domain.types';
import { uuid } from '../../../domain.types/miscellaneous/system.types';

export interface IFormSubmissionRepo {
    create(model: FormSubmissionCreateModel): Promise<FormSubmissionDto>;

    update(
        id: string,
        model: FormSubmissionUpdateModel
    ): Promise<FormSubmissionDto>;

    getById(id: string): Promise<FormSubmissionDto>;

    delete(id: string): Promise<boolean>;

    submit(id: uuid): Promise<FormSubmissionDto>;

    search(filters: FormSubmissionSearchFilters): Promise<any>;
}
