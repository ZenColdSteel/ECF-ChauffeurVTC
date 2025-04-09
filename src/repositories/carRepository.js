import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../utils/prismaErrorUtils.js";

const prisma = new PrismaClient();
export const createCar= async (data) =>
    prismaErrorHandler(() =>
      prisma.vehicule.create({
        data: data,
      }),
    );
export const updateCar = async (id, data) =>
    prismaErrorHandler(() =>
      prisma.vehicule.update({
        where: { vehicule_id: id },
        data: data,
      }),
    );
export const deleteCar = async (id) =>
    prismaErrorHandler(() =>
      prisma.vehicule.delete({
        where: { vehicule_id: id },
      }),
    );
export const getCarById = async (id) =>
    prismaErrorHandler(() =>
      prisma.vehicule.findUniqueOrThrow({
        where: { vehicule_id: id },
      }),
    );
export const getCars = async () =>
    prismaErrorHandler(() =>
      prisma.vehicule.findMany(),
    );