import { describe, expect, vi } from "vitest";
import * as driverController from "../src/controllers/driverController.js";
import * as driverService from "../src/services/driverService.js";
import { fakeResponse } from "../src/utils/testUtils.js";
import { BadRequestError, NotFoundError } from "../src/errors/customErrors.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("createDriver Controller", () => {
  it("devrait renvoyer le chauffeur créé", async () => {
    const req = {
      body: {
        nom: "Yesssiiin",
        permis: "B14564465",
        disponibilite: true,
      },
      method: "POST",
    };
    const res = fakeResponse();
    
    const driverData = { id: 1, ...req.body };
    vi.spyOn(driverService, "createDriver").mockResolvedValue(driverData);
    
    await driverController.createDriver(req, res);
    
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Chauffeur crée avec succès:",
      chauffeur: driverData,
    });
    expect(driverService.createDriver).toHaveBeenCalledWith(req.body);
  });
  
  it("devrait renvoyer une erreur de validation", async () => {
    const req = { body: {} };
    const res = fakeResponse();
    const error = new BadRequestError("Erreur de validation: Données invalides");
    
    vi.spyOn(driverService, "createDriver").mockRejectedValue(error);
    
    await driverController.createDriver(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});

describe("deleteDriver Controller", () => {
  it("devrait supprimer un chauffeur", async () => {
    const req = { params: { id: "1" } };
    const res = fakeResponse();
    
    vi.spyOn(driverService, "deleteDriver").mockResolvedValue({ id: 1 });
    
    await driverController.deleteDriver(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Chauffeur supprimée avec succès:",
      chauffeur: { id: 1 },
    });
  });
  
  it("devrait gérer l'erreur si le chauffeur n'existe pas", async () => {
    const req = { params: { id: "999" } };
    const res = fakeResponse();
    const error = new NotFoundError("Chauffeur non trouvé");
    
    vi.spyOn(driverService, "deleteDriver").mockRejectedValue(error);
    
    await driverController.deleteDriver(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});

describe("getDrivers Controller", () => {
  it("devrait renvoyer tous les chauffeurs", async () => {
    const req = {};
    const res = fakeResponse();
    const drivers = [
      { id: 1, nom: "Dupont", permis: "B12345", disponibilite: true },
      { id: 2, nom: "Martin", permis: "B67890", disponibilite: false }
    ];
    
    vi.spyOn(driverService, "getDrivers").mockResolvedValue(drivers);
    
    await driverController.getDrivers(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Chauffeurs rencontrés:",
      chauffeurs: drivers
    });
  });
  
  it("devrait gérer les erreurs lors de la récupération des chauffeurs", async () => {
    const req = {};
    const res = fakeResponse();
    const error = new Error("Erreur serveur");
    
    vi.spyOn(driverService, "getDrivers").mockRejectedValue(error);
    
    await driverController.getDrivers(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur serveur" });
  });
});

describe("getDriverById Controller", () => {
  it("devrait renvoyer un chauffeur spécifique", async () => {
    const req = { params: { id: "1" } };
    const res = fakeResponse();
    const driver = { id: 1, nom: "Dupont", permis: "B12345", disponibilite: true };
    
    vi.spyOn(driverService, "getDriverById").mockResolvedValue(driver);
    
    await driverController.getDriverById(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Chauffeur trouvé grâce à l'ID:",
      chauffeur: driver
    });
  });
  
  it("devrait gérer le cas où le chauffeur n'existe pas", async () => {
    const req = { params: { id: "999" } };
    const res = fakeResponse();
    const error = new NotFoundError("Chauffeur non trouvé");
    
    vi.spyOn(driverService, "getDriverById").mockRejectedValue(error);
    
    await driverController.getDriverById(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});

describe("updateDriver Controller", () => {
  it("devrait mettre à jour un chauffeur", async () => {
    const req = {
      params: { id: "1" },
      body: {
        nom: "Dupont Modifié",
        disponibilite: false
      }
    };
    const res = fakeResponse();
    const updatedDriver = { id: 1, ...req.body, permis: "B12345" };
    
    vi.spyOn(driverService, "updateDriver").mockResolvedValue(updatedDriver);
    
    await driverController.updateDriver(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Chauffeur mis à jour avec succès:",
      chauffeur: updatedDriver
    });
    expect(driverService.updateDriver).toHaveBeenCalledWith("1", req.body);
  });
  
  it("devrait gérer l'erreur si le chauffeur à mettre à jour n'existe pas", async () => {
    const req = {
      params: { id: "999" },
      body: { nom: "Test" }
    };
    const res = fakeResponse();
    const error = new NotFoundError("Chauffeur non trouvé");
    
    vi.spyOn(driverService, "updateDriver").mockRejectedValue(error);
    
    await driverController.updateDriver(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
  
  it("devrait gérer les erreurs de validation lors de la mise à jour", async () => {
    const req = {
      params: { id: "1" },
      body: { permis: "" } // permis invalide
    };
    const res = fakeResponse();
    const error = new BadRequestError("Numéro de permis invalide");
    
    vi.spyOn(driverService, "updateDriver").mockRejectedValue(error);
    
    await driverController.updateDriver(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});