import * as Joi from '@hapi/joi';

export const CreateOrUpdateGroupBodySchema = Joi.object({

/* `name` the name of the group
* `number_of_weeks` will just be an integer, representing the number of weeks for the analysis period
* `roll_states` will be one or more of the following values: `"unmark" | "present" | "absent" | "late"`
* `incidents` is an integer representing the number of times the student meets the criteria in the period
* `ltmt` stands for "Less Than or More Than". It will be either a `"<"` string or `">"`.
*/

name: Joi.string().trim().required(),
number_of_weeks: Joi.number().integer().greater(0).less(53).required(),
roll_states: Joi.array().items(Joi.string().trim().valid('unmark', 'present', 'absent', 'late')).required(),
incidents: Joi.number().integer().greater(0).required(),
ltmt: Joi.string().trim().valid('<', '>').required()
});
