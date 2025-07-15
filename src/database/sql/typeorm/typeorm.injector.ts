import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
// import { DatabaseConnector_TypeOrm } from './database.connector.typeorm';
import { FormSectionRepo } from './repositories/form.section/form.section.repo';
import { FormSubmissionRepo } from './repositories/form.submission/form.submission.repo';
import { FormTemplateRepo } from './repositories/form.template/form.template.repo';
import { FormFieldRepo } from './repositories/form.field/form.field.repo';
import { ResponseRepo } from './repositories/question.response/question.response.repo';
import { UserRepo } from './repositories/user/user.repo';
import { FavoriteTemplateRepo } from './repositories/favorite.template/favorite.template.repo';
import { FormTemplateApprovalRepo } from './repositories/form.template.approval/form.template.approval.repo';
import { InputUnitListRepo } from './repositories/input.unit.list/input.unit.list.repo';
import { TemplateFolderRepo } from './repositories/template.folder/template.folder.repo';
import { SkipLogicRepo } from './repositories/field.logic/field.logic.skip.repo';
import { CalculationLogicRepo } from './repositories/field.logic/field.logic.calculation.repo';
import { ValidationLogicRepo } from './repositories/field.logic/field.logic.validation.repo';
import { MathematicalOperationRepo } from './repositories/field.operations/field.operations.mathematical.repo';
import { LogicalOperationRepo } from './repositories/field.operations/field.operations.logical.repo';
import { CompositionOperationRepo } from './repositories/field.operations/field.operations.composition.repo';
import { IterateOperationRepo } from './repositories/field.operations/field.operations.iterate.repo';
import { FunctionExpressionOperationRepo } from './repositories/field.operations/field.operations.function.expression.repo';
import { SkipRuleRepo } from './repositories/field.rules/field.rules.skip.repo';
import { CalculationRuleRepo } from './repositories/field.rules/field.rules.calculation.repo';
import { ValidationRuleRepo } from './repositories/field.rules/field.rules.validation.repo';



////////////////////////////////////////////////////////////////////////////////

export class TypeOrmInjector {

    static registerInjections(container: DependencyContainer) {

        // container.register('IPrimaryDatabaseConnector', DatabaseConnector_TypeOrm);

        container.register('IFormSectionRepo', FormSectionRepo);
        container.register('IFormSubmissionRepo', FormSubmissionRepo);
        container.register('IFormTemplateRepo', FormTemplateRepo);
        container.register('IFormFieldRepo', FormFieldRepo);
        container.register('IResponseRepo', ResponseRepo);
        container.register('IUserRepo', UserRepo);
        container.register('IFavoriteTemplateRepo', FavoriteTemplateRepo);
        container.register('IFormTemplateApprovalRepo', FormTemplateApprovalRepo);
        container.register('IInputUnitListRepo', InputUnitListRepo);
        container.register('ITemplateFolderRepo', TemplateFolderRepo);

        container.register('ISkipLogicRepo', SkipLogicRepo);
        container.register('ICalculationLogicRepo', CalculationLogicRepo);
        container.register('IValidationLogicRepo', ValidationLogicRepo);
        container.register('IMathematicalOperationRepo', MathematicalOperationRepo);
        container.register('ILogicalOperationRepo', LogicalOperationRepo);
        container.register('ICompositionOperationRepo', CompositionOperationRepo);
        container.register('IIterateOperationRepo', IterateOperationRepo);
        container.register('IFunctionExpressionOperationRepo', FunctionExpressionOperationRepo);
        container.register('ISkipRuleRepo', SkipRuleRepo);
        container.register('ICalculationRuleRepo', CalculationRuleRepo);
        container.register('IValidationRuleRepo', ValidationRuleRepo);


    }
}
