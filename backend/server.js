// On importe Express, le framework qui va nous permettre de créer notre serveur/API facilement
const express = require('express');

// On importe cors, pour autoriser notre futur frontend (React/React Native) à communiquer avec cette API
const cors = require('cors');

// On active dotenv, pour pouvoir lire les variables définies dans le fichier .env (ex: PORT)
require('dotenv').config({ quiet: true });

// On importe notre connexion à la base de données
const sequelize = require('./config/database');

// On importe nos modèles
const Product = require('./models/Product');
const Category = require('./models/Category');
const User = require('./models/User');

// On importe nos fichiers de routes
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');

// On crée notre application Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API Lynéma 👗' });
});

// On "branche" nos routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// On synchronise la base de données, puis on démarre le serveur
sequelize.sync()
  .then(() => {
    console.log('✅ Base de données synchronisée');
    app.listen(PORT, () => {
      console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Erreur de connexion à la base de données :', error);
  });