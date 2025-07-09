import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
// import { DatabaseConnector_TypeOrm } from './database.connector.typeorm';
import { FormSectionRepo } from './repositories/form.section/form.section.repo';
import { FormSubmissionRepo } from './repositories/form.submission/form.submission.repo';
import { FormTemplateRepo } from './repositories/form.template/form.template.repo';
import { QuestionRepo } from './repositories/question/question.repo';
import { ResponseRepo } from './repositories/question.response/question.response.repo';
import { UserRepo } from './repositories/user/user.repo';
import { FavoriteTemplateRepo } from './repositories/favorite.template/favorite.template.repo';
import { FormTemplateApprovalRepo } from './repositories/form.template.approval/form.template.approval.repo';
import { InputUnitListRepo } from './repositories/input.unit.list/input.unit.list.repo';
import { TemplateFolderRepo } from './repositories/template.folder/template.folder.repo';



////////////////////////////////////////////////////////////////////////////////

export class TypeOrmInjector {

    static registerInjections(container: DependencyContainer) {

        // container.register('IPrimaryDatabaseConnector', DatabaseConnector_TypeOrm);

        container.register('IFormSectionRepo', FormSectionRepo);
        container.register('IFormSubmissionRepo', FormSubmissionRepo);
        container.register('IFormTemplateRepo', FormTemplateRepo);
        container.register('IQuestionRepo', QuestionRepo);
        container.register('IResponseRepo', ResponseRepo);
        container.register('IUserRepo', UserRepo);
        container.register('IFavoriteTemplateRepo', FavoriteTemplateRepo);
        container.register('IFormTemplateApprovalRepo', FormTemplateApprovalRepo);
        container.register('IInputUnitListRepo', InputUnitListRepo);
        container.register('ITemplateFolderRepo', TemplateFolderRepo);


    }
}
