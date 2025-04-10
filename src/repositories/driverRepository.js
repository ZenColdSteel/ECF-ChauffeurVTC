import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../utils/prismaErrorUtils.js";

const prisma = new PrismaClient();

export const getDriverById = async (id) =>
  prismaErrorHandler(() =>
    prisma.chauffeur.findUniqueOrThrow({
      where: { chauffeur_id: id },
    }),
  );

export const getDrivers = async () =>
  prismaErrorHandler(() => prisma.chauffeur.findMany());

export const createDriver = async (data) =>
  prismaErrorHandler(() =>
    prisma.chauffeur.create({
      data: data,
    }),
  );
export const deleteDriver = async (id) =>
  prismaErrorHandler(() =>
    prisma.chauffeur.delete({
      where: { chauffeur_id: id },
    }),
  );
export const updateDriver = async (id, data) =>
  prismaErrorHandler(() =>
    prisma.chauffeur.update({
      where: { chauffeur_id: id },
      data: data,
    }),
  );