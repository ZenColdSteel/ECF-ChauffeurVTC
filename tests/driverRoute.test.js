import { describe, expect, vi } from "vitest";
import * as driverController from "../src/controllers/driverController.js";
import * as driverService from "../src/services/driverService.js";
import { fakeResponse } from "../src/utils/testUtils.js";
import { BadRequestError } from "../src/errors/customErrors.js";

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
});
