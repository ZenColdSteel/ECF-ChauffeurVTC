import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    throw new BadRequestError(errorMessages.join(', '));
  }
  next();
};

export const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Veuillez fournir un email valide')
    .normalizeEmail(),
  body('motDePasse')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('nom')
    .notEmpty()
    .withMessage('Le nom est requis'),
  validateRequest
];

export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Veuillez fournir un email valide')
    .normalizeEmail(),
  body('motDePasse')
    .notEmpty()
    .withMessage('Le mot de passe est requis'),
  validateRequest
];