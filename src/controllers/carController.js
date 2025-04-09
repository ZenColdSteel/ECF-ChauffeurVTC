import * as carService from "../services/carService.js";
import { handleRequest } from "../utils/utils.js";

export const getCarById = handleRequest(async (req) => {
    const carFound = await carService.getCarById(req.params);
    return { message: "Voiture rencontrée grace à l'ID:", voiture: carFound };
});
export const getCars = handleRequest(async (req) => {
    const carsFound = await carService.getCars();
    return { message: "Voitures rencontrées:", voitures: carsFound };
})
export const createCar = handleRequest(async (req) => {
    const carCreated = await carService.createCar(req.body);
    return { message: "Voiture crée avec succès:", voiture: carCreated };
});
export const deleteCar = handleRequest(async (req) => {
    const carDeleted = await carService.deleteCar(req.params);
    return { message: "Voiture supprimée avec succès:", voiture: carDeleted };
})
export const updateCar = handleRequest(async (req) => {
    const carUpdated = await carService.updateCar(req.params.id, req.body);
    return { message: "Voiture mise à jour avec succès:", voiture: carUpdated };
})