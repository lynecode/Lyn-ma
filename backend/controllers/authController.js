// On importe notre modèle User
const User = require('../models/User');

// On importe jsonwebtoken pour créer des tokens d'authentification
const jwt = require('jsonwebtoken');

// ========================================
// INSCRIPTION (Register)
// ========================================
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // On vérifie si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // On crée l'utilisateur (le mot de passe sera automatiquement chiffré grâce au hook beforeCreate)
    const user = await User.create({ fullName, email, password, role });

    // On ne renvoie jamais le mot de passe, même chiffré, dans la réponse
    res.status(201).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ========================================
// CONNEXION (Login)
// ========================================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // On cherche l'utilisateur par email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // On compare le mot de passe saisi avec celui chiffré en base
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // On génère un token JWT, qui contient l'id et le rôle de l'utilisateur
    // Ce token sera utilisé ensuite pour prouver qu'on est bien connecté
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET, // clé secrète définie dans .env
      { expiresIn: '7d' } // le token expire après 7 jours
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};