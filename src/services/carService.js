import * as carRepository from "../repositories/carRepository.js";
import { BadRequestError } from "../errors/customErrors.js";

export const createCar = async (data) => {
    const car = await carRepository.createCar(data);
    return car;
};
export const getCarById = async (body) => {
    const { id } = body;
    const carFound = await carRepository.getCarById(parseInt(id));
    return carFound;
};
export const updateCar = async (id, data) => {
    const carUpdated = await carRepository.updateCar(parseInt(id), data);
    return carUpdated;
};
export const deleteCar = async (body) => {
    const { id } = body;
    const carDeleted = await carRepository.deleteCar(parseInt(id));
    return carDeleted;
}
export const getCars = async () => {
    const cars = await carRepository.getCars();
    return cars;
}
