import * as driverService from "../services/driverService.js";
import { handleRequest } from "../utils/utils.js";

export const getDriverById = handleRequest(async (req) => {
  const driverFound = await driverService.getDriverById(req.params);
  return { message: "Chauffeur trouvé grâce à l'ID:", chauffeur: driverFound };
});
export const createDriver = handleRequest(async (req) => {
  const driverCreated = await driverService.createDriver(req.body);
  return { message: "Chauffeur crée avec succès:", chauffeur: driverCreated };
});
export const deleteDriver = handleRequest(async (req) => {
  const driverDeleted = await driverService.deleteDriver(req.params);
  return { message: "Chauffeur supprimée avec succès:", chauffeur: driverDeleted };
})
export const updateDriver = handleRequest(async (req) => {
  const driverUpdated = await driverService.updateDriver(req.params.id, req.body);
  return { message: "Chauffeur mis à jour avec succès:", chauffeur: driverUpdated };
})
export const getDrivers = handleRequest(async (req) => {
  const driversFound = await driverService.getDrivers();
  return { message: "Chauffeurs rencontrés:", chauffeurs: driversFound };
})