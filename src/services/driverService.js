// import { BadRequestError } from "../errors/customErrors.js";
import * as driverRepository from "../repositories/driverRepository.js";
// import { hashPassword } from "../utils/passwordUtils.js";
// import { validateAndThrow } from "../utils/validatorUtils.js";
// import { validateDriver } from "../validators/memberValidator.js";
import { validateDriver } from "../validators/driverValidator.js";  // Import de la fonction de validation
import { BadRequestError } from "../errors/customErrors.js";  // Erreur personnalisée

export const getDriverById = async (body) => {
  const { id } = body;
  return await driverRepository.getDriverById(parseInt(id));
};
export const getDrivers = async () => {
  return await driverRepository.getDrivers();
}
export const createDriver = async (body) => {
  // Validation des données du conducteur
  const validationErrors = validateDriver(body);
  if (validationErrors.length > 0) {
    throw new BadRequestError(`Erreur de validation: ${validationErrors.join(", ")}`);
  }

  const driverData = {
    ...body,
  };
  return await driverRepository.createDriver(driverData);
};

export const deleteDriver = async (body) => {
  const { id } = body;
  return await driverRepository.deleteDriver(parseInt(id));
};
export const updateDriver = async (id, body) => {
  const driverData = {
    ...body,
  };
  return await driverRepository.updateDriver(parseInt(id), driverData);
};