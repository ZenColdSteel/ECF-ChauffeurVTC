import { Prisma } from "@prisma/client";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

/**
 * Middleware pour gérer les erreurs Prisma
 * @param {Function} fn - Callback
 * @returns {Promise<*>} Le résultat de la fonction ou une erreur traduite
 */
const prismaErrorHandler = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const errorMeta = error.meta;
      switch (error.code) {
        case "P2025":
          throw new NotFoundError(
            `Problème rencontré dans la table ${errorMeta.modelName}: élément introuvable.`,
          );
        case "P2002":
          throw new BadRequestError(
            `Problème de contrainte unique: ${errorMeta.target} existe déjà`,
          );
      }
    }
    throw error;
  }
};

export default prismaErrorHandler;
