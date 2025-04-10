import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = async (userData) => {
  return await prisma.utilisateur.create({
    data: userData
  });
};

export const getUserByEmail = async (email) => {
  return await prisma.utilisateur.findUnique({
    where: { email }
  });
};

export const getUserById = async (id) => {
  return await prisma.utilisateur.findUnique({
    where: { id: parseInt(id) }
  });
};

export const updateUser = async (id, userData) => {
  return await prisma.utilisateur.update({
    where: { id: parseInt(id) },
    data: userData
  });
};

export const deleteUser = async (id) => {
  return await prisma.utilisateur.delete({
    where: { id: parseInt(id) }
  });
};

export const getUsers = async () => {
  return await prisma.utilisateur.findMany({
    select: {
      id: true,
      email: true,
      nom: true,
      createdAt: true,
      updatedAt: true
    }
  });
};