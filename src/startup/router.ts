import express from 'express';
import { register as form } from '../api/form.submission/form.router';
import { register as formTemplate } from '../api/form.template/form.template.router';
import { register as user } from '../api/user/user.router';
import { register as formSection } from '../api/form.section/form.section.router';
import { register as formField } from '../api/form.field/form.field.router';
import { register as Response } from '../api/question.response/question.response.router';
import { register as favoriteTemplate } from '../api/favorite.template/favorite.template.router';
import { register as formTemplateApproval } from '../api/form.template.approval/form.template.approval.router';
import { register as templateFolder } from '../api/template.folder/template.folder.router';

import { register as skipLogic } from '../api/field.logic/skip.logic/skip.logic.router';
import { register as calculationLogic } from '../api/field.logic/calculation.logic/calculation.logic.router';
import { register as validationLogic } from '../api/field.logic/validation.logic/validation.logic.router';
import { register as mathematicalOperation } from '../api/field.operations/mathematical.operation/mathematical.operation.router';
import { register as logicalOperation } from '../api/field.operations/logical.operation/logical.operation.router';
import { register as compositionOperation } from '../api/field.operations/composition.operation/composition.operation.router';
import { register as iterateOperation } from '../api/field.operations/iterate.operation/iterate.operation.router';
import { register as functionExpressionOperation } from '../api/field.operations/function.expression.operation/function.expression.operation.router';
import { register as skipRule } from '../api/field.rules/skip.rule/skip.rule.router';
import { register as calculationRule } from '../api/field.rules/calculation.rule/calculation.rule.router';
import { register as validationRule } from '../api/field.rules/validation.rule/validation.rule.router';
import { register as inputUnitList } from '../api/input.unit.list/input.unit.list.router';

///////////////////////////////////////////////////////////////////////////////////////

export class Router {
    private _app: express.Application;

    constructor(app: express.Application) {
        this._app = app;
    }
    public init = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {
                this._app.get('/api/v1', (req, res) => {
                    res.send({
                        message: `Form service is running successfully on port ${process.env.PORT}`,
                    });
                });
                form(this._app);
                formTemplate(this._app);
                user(this._app);
                formSection(this._app);
                formField(this._app);
                Response(this._app);
                favoriteTemplate(this._app);
                formTemplateApproval(this._app);
                templateFolder(this._app);
                inputUnitList(this._app);

                skipLogic(this._app);
                calculationLogic(this._app);
                validationLogic(this._app);
                mathematicalOperation(this._app);
                logicalOperation(this._app);
                compositionOperation(this._app);
                iterateOperation(this._app);
                functionExpressionOperation(this._app);
                skipRule(this._app);
                calculationRule(this._app);
                validationRule(this._app);

                resolve(true);
            } catch (error) {
                console.log('Error initilizing the routes');
                reject(false);
            }
        });
    };
}
