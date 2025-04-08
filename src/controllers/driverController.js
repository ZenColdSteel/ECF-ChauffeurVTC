import * as driverService from "../services/driverService.js";
import { handleRequest } from "../utils/utils.js";

export const getDriverById = handleRequest(async (req) => {
  const driverFound = await driverService.getDriverById(req.params);
  return { message: "Chauffeur trouvé grâce à l'ID:", chauffeur: driverFound };
});

export const getDriverByName = handleRequest(async (req) => {
  const driverFound = await driverService.getDriverByName(req.body);
  return { message: "chauffeur trouvé au nom:", chauffeur: driverFound };
});

export const createDriver = handleRequest(async (req) => {
  const driverCreated = await driverService.createDriver(req.body);
  return { message: "Chauffeur crée avec succès:", chauffeur: driverCreated };
});
export const deleteDriver = handleRequest(async (req) => {
  const driverDeleted = await driverService.deleteDriver(req.params);
  return { message: "Chauffeur supprimée avec succès:", chauffeur: driverDeleted };
})