import * as assignationService from "../services/assignationService.js";
import { handleRequest } from "../utils/utils.js";

export const getAssignationById = handleRequest(async (req) => {
    const assignationFound = await assignationService.getAssignationById(req.params);
    return { message: "Assignation rencontrée grace à l'ID:", assignation: assignationFound };
});
export const getAssignationByCarId = handleRequest(async (req) => {
    const assignationFound = await assignationService.getAssignationByCarId(req.params);
    return { message: "Assignation rencontrée grace à l'ID car :", assignation: assignationFound };
})
export const getAssignationByDriverId = handleRequest(async (req) => {
    const assignationFound = await assignationService.getAssignationByDriverId(req.params);
    return { message: "Assignation rencontrée grace à l'ID driver:", assignation: assignationFound };
})

export const createAssignation = handleRequest(async (req) => {
    const assignationCreated = await assignationService.createAssignation(req.body);
    return { message: "Assignation crée avec succès:", assignation: assignationCreated };
});

export const deleteAssignation = handleRequest(async (req) => {
    const assignationDeleted = await assignationService.deleteAssignation(req.params);
    return { message: "Assignation supprimée avec succès:", assignation: assignationDeleted };
})  
export const getAssignations = handleRequest(async (req) => {
    const assignationsFound = await assignationService.getAssignations();
    return { message: "Assignations rencontrées:", assignations: assignationsFound };
})