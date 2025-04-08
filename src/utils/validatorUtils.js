import { BadRequestError } from "../errors/customErrors.js";

/**
 * Exécute un validateur et lance une exception s'il y a des erreurs
 * @param {Function} validator - Fonction de validation qui retourne un tableau d'erreurs
 * @param {any} value - Valeur à valider
 * @param {string} fieldName - Nom du champ pour le message d'erreur
 * @throws {BadRequestError} - Si la validation échoue
 */
export const validateAndThrow = (errors) => {
  if (errors.length > 0) {
    throw new BadRequestError(errors.join(", "));
  }
};
