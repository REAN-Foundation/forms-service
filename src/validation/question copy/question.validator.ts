import Joi from "joi";
import { ErrorHandler } from "../../common/error.handler";
// import validator from 'validator';

export class Studentvalidator{
    static async validateCreateRequest(requestBody:any){
        try{
            const schema = Joi.object({
                name:Joi.string().min(3).max(30).required(),
                age:Joi.number().integer().min(20).required(),
            });

            return await schema.validateAsync(requestBody);
        }catch(error){
            ErrorHandler.handleValidationError(error);
        }
    }

    // static async validateCreateRequest(requestBody:any){
    //     try{
    //         // const schema = validator.({
    //             validateFirstName : check('fn')
    //             // To delete leading and trailing space
    //             .trim()
                 
    //             // Validate the minimum length of the password
    //             // Optional for this context
    //             .isLength({min:3})
    //             // Custom message
    //             .withMessage('First Name must be 3 characters long')
             
    //             // Name must contains only alphabets
    //             .isAlpha()
    //             // Custom message
    //             .withMessage('First Name must be alphabetic'),
    //             // age:Joi.number().integer().min(20).required(),
    //         });

    //         return await schema.validateAsync(requestBody);
    //     }catch(error){
    //         ErrorHandler.handleValidationError(error);
    //     }
    // }

    static async validateUpdateRequest(requestBody:any){
        try{
            const schema = Joi.object({
                name:Joi.string().min(3).max(30),
                age:Joi.number().integer().min(20),
            });

            return await schema.validateAsync(requestBody);
        }catch(error){
            ErrorHandler.handleValidationError(error);
        }
    }
}