import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

// Codes de succès par défaut pour chaque méthode HTTP
const defaultSuccessCodes = {
  GET: 200,
  POST: 201,
  PUT: 200,
  DELETE: 200,
};

/**
 *
 * @param {*} callback - Fonction du controller
 * @returns - Réponse d'erreur ou de succès avec le code approprié
 * @description - Gère les requêtes et les erreurs
 */
export const handleRequest = (callback) => async (req, res) => {
  try {
    // appendLog(`Requête ${req.method} sur ${req.url}`);

    // Appelle la fonction de callback avec les paramètres req et res
    const data = await callback(req, res);

    // Définit le code de succès par défaut en fonction de la méthode HTTP
    const code = data?.statusCode || defaultSuccessCodes[req.method] || 200;

    // Retourn la réponse avec le code de succès et les données
    return res.status(code).json(data);
  } catch (error) {
    // appendLog(`Erreur rencontrée: ${error}`);

    // Si l'erreur est une instance de BadRequestError ou NotFoundError,
    // définit le code approprié
    let statusCode;
    if (error instanceof NotFoundError) {
      statusCode = 404;
    } else if (error instanceof BadRequestError) {
      statusCode = 400;
    } else {
      statusCode = 500;
    }

    // retourne la réponse avec le code d'erreur et le message d'erreur
    return res.status(statusCode).json({ error: error.message });
  }
};
