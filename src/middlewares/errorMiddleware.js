
export const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    
    // Vérifier si l'erreur a un code de statut défini (erreur personnalisée)
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Une erreur interne est survenue';
    
    return res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  };