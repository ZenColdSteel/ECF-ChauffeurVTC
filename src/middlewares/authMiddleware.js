import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/customErrors.js';

export const authMiddleware = (req, res, next) => {
  try {
    // Récupérer le token du header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentification requise');
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      // Vérifier et décoder le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Ajouter les informations de l'utilisateur à l'objet req
      req.user = {
        userId: decoded.userId,
        email: decoded.email
      };
      
      next();
    } catch (error) {
      throw new UnauthorizedError('Token invalide ou expiré');
    }
  } catch (error) {
    next(error);
  }
};