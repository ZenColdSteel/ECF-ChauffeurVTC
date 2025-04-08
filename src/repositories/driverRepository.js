import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../utils/prismaErrorUtils.js";

const prisma = new PrismaClient();

export const getDriverById = async (id) =>
  prismaErrorHandler(() =>
    prisma.chauffeur.findUniqueOrThrow({
      where: { chauffeur_id: id },
    }),
  );


export const getDriverByName = async (nom) =>
  prismaErrorHandler(() =>
    prisma.nom.findUniqueOrThrow({
      where: { nom: nom },
    }),
  );

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