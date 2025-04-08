export const validateName = (nom) => {
  const errors = [];
  
  // Vérification du type de 'nom' (doit être une chaîne)
  if (typeof nom !== "string") {
    errors.push("Le nom doit être une chaîne de caractères");
    return errors;
  }

  // Vérification si le nom est vide après avoir enlevé les espaces blancs
  if (nom.trim().length < 3) {
    errors.push("Le nom doit contenir au moin 3 caractères");
  }

  return errors;
};

/**
 * Valide une chaîne de date au format YYYY-MM-DD
 * @param {string} date La date à valider au format YYYY-MM-DD
 * @returns {string[]} Un tableau contenant les messages d'erreur (vide si valide)
 */
export const validateDate = (date) => {
  const errors = [];

  // Vérifie que la date est une chaîne de caractères
  if (typeof date !== "string") {
    errors.push("La date doit être une chaîne de caractères");
    return errors;
  }

  // Vérifie le format YYYY-MM-DD avec regex
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    errors.push("Le format de date doit être YYYY-MM-DD");
    return errors;
  }

  // Découpe la date en année, mois et jour
  const [year, month, day] = date.split("-").map(Number);

  if (year < 1900) {
    errors.push("L'année doit être supérieure à 1900");
    return errors;
  }

  // Le Mois doit être entre 1 et 12
  if (month < 1 || month > 12) {
    errors.push("Le mois doit être compris entre 1 et 12");
  }

  // Vérifie si la date existe réellement
  // Récupère le nombre de jours dans le mois
  const maxDays = new Date(year, month, 0).getDate(); // Le paramètre 0 renvoie le dernier jour du mois précédent
  if (day < 1 || day > maxDays) {
    errors.push(`Cette date n'existe pas`);
  }

  return errors;
};
