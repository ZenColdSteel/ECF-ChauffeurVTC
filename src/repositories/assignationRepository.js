import {PrismaClient} from "@prisma/client";
import prismaErrorHandler from "../utils/prismaErrorUtils.js";

const prisma = new PrismaClient();

export const getAssignationById = async (id) =>
    prismaErrorHandler(() =>
        prisma.assignation.findUniqueOrThrow({
            where: { assignation_id: Number(id) },
        }),
    );
export const getAssignationByCarId = async (id) =>
    prismaErrorHandler(() =>
        prisma.assignation.findMany({
            where: { vehicule_id: id },
        }),
    );
export const getAssignationByDriverId = async (id) =>
    prismaErrorHandler(() =>
        prisma.assignation.findMany({
            where: { chauffeur_id: id },
        }),
    );
export const createAssignation = async (data) =>
    prismaErrorHandler(() =>
        prisma.assignation.create({
            data: data,
        }),
    );
export const deleteAssignation = async (id) =>
    prismaErrorHandler(() =>
        prisma.assignation.delete({
            where: { assignation_id: Number(id) },
        }),
    );