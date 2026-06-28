// On importe DataTypes pour définir le type de chaque champ
const { DataTypes } = require('sequelize');

// On importe notre connexion à la base de données
const sequelize = require('../config/database');

// On définit le modèle "Category"
const Category = sequelize.define('Category', {

  // Nom de la catégorie (ex: "T-shirts", "Sacs", "Chaussures")
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // pas deux catégories avec le même nom
  },

  // Description optionnelle de la catégorie
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

});

module.exports = Category;