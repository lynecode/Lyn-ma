// On importe Sequelize, l'ORM qui nous permet de communiquer avec la base de données
const { Sequelize } = require('sequelize');

// On crée une instance de connexion à la base de données
// Ici, on utilise SQLite : la base sera stockée dans un simple fichier "database.sqlite"
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

// On exporte cette connexion pour pouvoir l'utiliser ailleurs dans le projet
module.exports = sequelize;