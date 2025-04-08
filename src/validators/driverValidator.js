import { validateName} from "./commonValidators.js";

export const validateDriver = (driver, partial = false) => {
  const errors = [];


  const allowedKeys = [
    "nom",
    "permis",
    "disponibilite"
  ];
  const requiredKeys = partial
    ? []
    : ["nom", "permis", "disponibilite"];

  Object.keys(driver).forEach((key) => {
    if (!allowedKeys.includes(key)) {
      errors.push(`Clé non autorisée: ${key}`);
    }
  });

  requiredKeys.forEach((key) => {
    if (driver[key] === undefined || driver[key] === null) {
      errors.push(`Clé manquante: ${key}`);
    }
  });

  if (driver.nom !== undefined) {
    const nameErrors = validateName(driver.nom);
    if (nameErrors.length > 0) {
      errors.push(`${nameErrors.join(", ")}`);
    }
  }
  return errors;
};
