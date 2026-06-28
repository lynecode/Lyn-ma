// On importe Router depuis Express, pour définir un groupe de routes
const express = require('express');
const router = express.Router();

// On importe les fonctions du contrôleur Product
const productController = require('../controllers/productController');

// On importe nos middlewares de sécurité
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// ===== ROUTES PUBLIQUES (accessibles à tous, même sans être connecté) =====

// Lister tous les produits
router.get('/', productController.getAllProducts);

// Voir un produit précis
router.get('/:id', productController.getProductById);

// ===== ROUTES PROTÉGÉES (réservées aux admins connectés) =====

// Créer un produit : il faut être connecté (verifyToken) ET être admin (isAdmin)
router.post('/', verifyToken, isAdmin, productController.createProduct);

// Modifier un produit
router.put('/:id', verifyToken, isAdmin, productController.updateProduct);

// Supprimer un produit
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

// On exporte ce routeur pour l'utiliser dans server.js
module.exports = router;