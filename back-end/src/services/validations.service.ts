import { Response } from "express";
import * as Joi from '@hapi/joi';

export class ValidationService {
    public static onRequestValidationError(error: Joi.ValidationError, response: Response) {
        const context: {[x:string]: {message: string}} = {};
        if (error.details) {     
          error.details.forEach(validationError => {
            context[validationError.context?.label ?? 'error'] = { message: validationError.message };
          });
        } else {
           context['error'] = { message: error.message };
        }
        response.status(400).send(context);
      }
}