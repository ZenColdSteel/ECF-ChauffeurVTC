// import bcrypt from "bcrypt";

// const saltRounds = 10;

// /**
//  * Hash un mot de passe en clair.
//  * @param {string} plainPassword - Le mot de passe en clair.
//  * @returns {Promise<string>} - Le mot de passe haché.
//  */
// export const hashPassword = async (plainPassword) => {
//   try {
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashedPassword = await bcrypt.hash(plainPassword, salt);
//     return hashedPassword;
//   } catch (error) {
//     throw new Error("Erreur lors du hachage du mot de passe: " + error.message);
//   }
// };

// /**
//  * Vérifie qu’un mot de passe en clair correspond à un mot de passe haché.
//  * @param {string} plainPassword - Le mot de passe en clair.
//  * @param {string} hashedPassword - Le mot de passe haché stocké.
//  * @returns {Promise<boolean>} - Résultat de la comparaison.
//  */
// export const comparePassword = async (plainPassword, hashedPassword) => {
//   try {
//     return await bcrypt.compare(plainPassword, hashedPassword);
//   } catch (error) {
//     throw new Error("Erreur lors de la vérification du mot de passe: " + error.message);
//   }
// };
