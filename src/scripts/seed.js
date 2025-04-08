import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedPrisma = async () => {
  console.log("Insertion des données dans PostgreSQL...");

  // Création des chauffeurs
  const [john, sophie, mohamed] = await Promise.all([
    prisma.chauffeur.create({
      data: {
        nom: "John Doe",
        permis: "B123456",
        disponibilite: true,
      },
    }),
    prisma.chauffeur.create({
      data: {
        nom: "Sophie Dupont",
        permis: "C789012",
        disponibilite: false,
      },
    }),
    prisma.chauffeur.create({
      data: {
        nom: "Mohamed Ali",
        permis: "D345678",
        disponibilite: true,
      },
    }),
  ]);

  // Création des véhicules
  const [tesla, peugeot, mercedes] = await Promise.all([
    prisma.vehicule.create({
      data: {
        modele: "Tesla Model 3",
        immatriculation: "AB-123-CD",
        statut: "Disponible",
      },
    }),
    prisma.vehicule.create({
      data: {
        modele: "Peugeot 208",
        immatriculation: "XY-456-ZT",
        statut: "En réparation",
      },
    }),
    prisma.vehicule.create({
      data: {
        modele: "Mercedes Sprinter",
        immatriculation: "GH-789-IJ",
        statut: "En service",
      },
    }),
  ]);

  // Création des assignations
  await prisma.assignation.createMany({
    data: [
      { chauffeur_id: john.chauffeur_id, vehicule_id: tesla.vehicule_id, date: new Date() },
      { chauffeur_id: sophie.chauffeur_id, vehicule_id: peugeot.vehicule_id, date: new Date() },
      { chauffeur_id: mohamed.chauffeur_id, vehicule_id: mercedes.vehicule_id, date: new Date() },
    ],
  });

  console.log("Données insérées avec succès !");
};

const main = async () => {
  try {
    await seedPrisma();
    console.log("Seed terminé avec succès !");
  } catch (err) {
    console.error("Erreur lors du seed :", err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
};

main();
