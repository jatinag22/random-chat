import Joi from 'joi';

const messages = {
  'string.empty': '{#key} is required',
  'string.min': '{#key} must have a minimum length of {#limit}',
  'string.max': '{#key} must have a maximum length of {#limit}',
  'any.required': '{#key} is required',
  'any.only': 'must be same as {#valids.0.key}',
};

export const signUpSchema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(/^\s*\S+\s*$/)
    .message('{#key} cannot contain spaces')
    .pattern(/^[a-zA-Z0-9._]*$/)
    .message('{#key} can contain only letters, numbers, . and _')
    .pattern(/^(?=.*[A-Z])|(?=.*[a-z]).$/)
    .message('{#key} must contain at least one letter')
    .min(4)
    .max(15)
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[^\dA-Za-z])(?=.*[0-9])(?=.*[a-z]).*$/)
    .message('{#key} must contain a mixture of uppercase and lowercase letters, numbers and special characters')
    .min(8)
    .max(30)
    .required(),
  confirmPassword: Joi.ref('password'),
}).with('password', 'confirmPassword')
  .unknown()
  .messages(messages);

export const loginSchema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(/^\s*\S+\s*$/)
    .message('invalid {#key}')
    .required(),
  password: Joi.string()
    .required(),
}).unknown()
  .messages(messages);

export const resetSchema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(/^\s*\S+\s*$/)
    .message('invalid {#key}')
    .required(),
}).unknown()
  .messages(messages);
