import * as assignationRepository from "../repositories/assignationRepository.js";
import { BadRequestError } from "../errors/customErrors.js";

export const getAssignationById = async (body) => {
    const { id } = body;
    const assignation = await assignationRepository.getAssignationById(parseInt(id));
    if (!assignation) throw new BadRequestError("Assignation not found.");
    return assignation;
};
export const getAssignationByCarId = async (body) => {
    const { id } = body;
    const assignation = await assignationRepository.getAssignationByCarId(parseInt(id));
    if (!assignation) throw new BadRequestError("Assignation not found.");
    return assignation;
};

export const getAssignationByDriverId = async (body) => {
    const { id } = body;
    const assignation = await assignationRepository.getAssignationByDriverId(parseInt(id));
    if (!assignation) throw new BadRequestError("Assignation not found.");
    return assignation;
};
export const createAssignation = async (body) => {
    const assignation = await assignationRepository.createAssignation(body);
    return assignation;
}

export const deleteAssignation = async (body) => {
    const { id } = body;
    const assignation = await assignationRepository.deleteAssignation(id);
    return assignation;
}
export const getAssignations = async () => {
    const assignations = await assignationRepository.getAssignations();
    return assignations;
}