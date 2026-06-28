// On importe jsonwebtoken pour vérifier les tokens
const jwt = require('jsonwebtoken');

// Middleware : vérifie que l'utilisateur est connecté (token valide)
exports.verifyToken = (req, res, next) => {
  // Le token est envoyé dans l'en-tête "Authorization", au format "Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Accès refusé, token manquant' });
  }

  const token = authHeader.split(' ')[1]; // on récupère uniquement le token, sans "Bearer "

  try {
    // On vérifie et décode le token avec notre clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // on stocke les infos de l'utilisateur (id, role) dans req.user
    next(); // on laisse passer la requête vers la suite (le contrôleur)
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};

// Middleware : vérifie que l'utilisateur est admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
  }
  next();
};