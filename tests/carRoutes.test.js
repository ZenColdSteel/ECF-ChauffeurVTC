import { describe, expect, vi } from "vitest";
import * as carController from "../src/controllers/carController.js";
import * as carService from "../src/services/carService.js";
import { fakeResponse } from "../src/utils/testUtils.js";
import { BadRequestError, NotFoundError } from "../src/errors/customErrors.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("createCar Controller", () => {
  it("devrait créer une nouvelle voiture", async () => {
    const req = {
      body: {
        marque: "Audi",
        modele: "A5",
        annee: 2022,
        immatriculation: "AA-123-BB",
        disponible: true
      },
      method: "POST",
    };
    const res = fakeResponse();
    
    const carData = { id: 1, ...req.body };
    vi.spyOn(carService, "createCar").mockResolvedValue(carData);
    
    await carController.createCar(req, res);
    
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Voiture crée avec succès:",
      voiture: carData,
    });
    expect(carService.createCar).toHaveBeenCalledWith(req.body);
  });
  
  it("devrait gérer les erreurs de validation", async () => {
    const req = { body: {} };
    const res = fakeResponse();
    const error = new BadRequestError("Erreur de validation: Données invalides");
    
    vi.spyOn(carService, "createCar").mockRejectedValue(error);
    
    await carController.createCar(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});


describe("getCarById Controller", () => {
  it("devrait renvoyer une voiture spécifique", async () => {
    const req = { params: { id: "1" } };
    const res = fakeResponse();
    const car = { id: 1, marque: "Audi", modele: "A5", annee: 2022, immatriculation: "AA-123-BB", disponible: true };
    
    vi.spyOn(carService, "getCarById").mockResolvedValue(car);
    
    await carController.getCarById(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Voiture rencontrée grace à l'ID:",
      voiture: car
    });
  });
  
  it("devrait gérer le cas où la voiture n'existe pas", async () => {
    const req = { params: { id: "999" } };
    const res = fakeResponse();
    const error = new NotFoundError("Voiture non trouvée");
    
    vi.spyOn(carService, "getCarById").mockRejectedValue(error);
    
    await carController.getCarById(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});

describe("updateCar Controller", () => {
  it("devrait mettre à jour une voiture", async () => {
    const req = {
      params: { id: "1" },
      body: {
        marque: "Audi",
        modele: "A6",
        disponible: false
      }
    };
    const res = fakeResponse();
    const updatedCar = { 
      id: 1, 
      ...req.body, 
      annee: 2022, 
      immatriculation: "AA-123-BB"
    };
    
    vi.spyOn(carService, "updateCar").mockResolvedValue(updatedCar);
    
    await carController.updateCar(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Voiture mise à jour avec succès:",
      voiture: updatedCar
    });
    expect(carService.updateCar).toHaveBeenCalledWith("1", req.body);
  });
  
  it("devrait gérer l'erreur si la voiture n'existe pas", async () => {
    const req = {
      params: { id: "999" },
      body: { marque: "BMW" }
    };
    const res = fakeResponse();
    const error = new NotFoundError("Voiture non trouvée");
    
    vi.spyOn(carService, "updateCar").mockRejectedValue(error);
    
    await carController.updateCar(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});
