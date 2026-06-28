// On importe DataTypes pour définir le type de chaque champ
const { DataTypes } = require('sequelize');

// On importe bcryptjs pour chiffrer les mots de passe
const bcrypt = require('bcryptjs');

// On importe notre connexion à la base de données
const sequelize = require('../config/database');

// On définit le modèle "User"
const User = sequelize.define('User', {

  // Nom complet de l'utilisateur
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Email (utilisé pour se connecter, doit être unique)
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Sequelize vérifie que c'est un email valide
    },
  },

  // Mot de passe (sera stocké chiffré, jamais en clair)
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Rôle de l'utilisateur : "client" par défaut, ou "admin"
  role: {
    type: DataTypes.ENUM('client', 'admin'), // ENUM = liste fermée de valeurs possibles
    defaultValue: 'client',
  },

}, {
  // Hooks Sequelize : du code qui s'exécute automatiquement à certains moments
  hooks: {
    // AVANT de créer un utilisateur, on chiffre son mot de passe
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
  },
});

// Méthode personnalisée : comparer un mot de passe saisi avec celui chiffré en base
User.prototype.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;