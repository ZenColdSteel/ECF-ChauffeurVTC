import * as userRepository from "../repositories/userRepository.js";
import { BadRequestError, UnauthorizedError } from "../errors/customErrors.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Fonction pour hacher le mot de passe
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const register = async (userData) => {
  // Vérifier si l'utilisateur existe déjà
  const existingUser = await userRepository.getUserByEmail(userData.email);
  if (existingUser) {
    throw new BadRequestError("Un utilisateur avec cet email existe déjà");
  }
  
  // Hacher le mot de passe avant de l'enregistrer
  const hashedPassword = await hashPassword(userData.motDePasse);
  
  // Créer l'utilisateur avec le mot de passe haché
  const newUser = await userRepository.createUser({
    ...userData,
    motDePasse: hashedPassword
  });
  
  // Ne pas renvoyer le mot de passe dans la réponse
  const { motDePasse, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const login = async (email, motDePasse) => {
  // Vérifier si l'utilisateur existe
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new UnauthorizedError("Email ou mot de passe incorrect");
  }
  
  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Email ou mot de passe incorrect");
  }
  
  // Générer un token JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  return { 
    token,
    user: {
      id: user.id,
      email: user.email,
      nom: user.nom
    }
  };
};

export const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new BadRequestError("Utilisateur non trouvé");
  }
  
  const { motDePasse, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const updateUser = async (id, userData) => {
  // Si le mot de passe est fourni, le hacher
  if (userData.motDePasse) {
    userData.motDePasse = await hashPassword(userData.motDePasse);
  }
  
  const updatedUser = await userRepository.updateUser(id, userData);
  const { motDePasse, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export const deleteUser = async (id) => {
  return await userRepository.deleteUser(id);
};

export const getUsers = async () => {
  return await userRepository.getUsers();
};