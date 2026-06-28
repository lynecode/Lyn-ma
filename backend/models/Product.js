// On importe DataTypes, qui nous permet de définir le type de chaque champ (texte, nombre, etc.)
const { DataTypes } = require('sequelize');

// On importe notre connexion à la base de données, créée dans config/database.js
const sequelize = require('../config/database');

// On définit le modèle "Product", c'est-à-dire la structure de notre table "produits"
const Product = sequelize.define('Product', {

  // Nom du produit (ex: "T-shirt col rond")
  name: {
    type: DataTypes.STRING,
    allowNull: false, // ce champ est obligatoire
  },

  // Description détaillée du produit
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // optionnel
  },

  // Prix du produit
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  // Quantité disponible en stock
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // si on ne précise rien, le stock démarre à 0
  },

  // Taille (ex: "S", "M", "L") - propre aux vêtements
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // Couleur du produit
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // URL ou chemin vers l'image du produit
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },

});

// ===== RELATIONS =====

// On importe Category pour pouvoir créer une relation
const Category = require('./Category');

// Relation : un produit appartient à une catégorie
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Relation inverse : une catégorie peut avoir plusieurs produits
Category.hasMany(Product, { foreignKey: 'categoryId' });

// On exporte ce modèle pour pouvoir l'utiliser dans nos routes/contrôleurs
module.exports = Product;