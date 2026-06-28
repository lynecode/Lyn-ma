const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

// On importe nos middlewares de sécurité
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// ===== ROUTE PUBLIQUE =====

// Lister toutes les catégories (visible par tous)
router.get('/', categoryController.getAllCategories);

// ===== ROUTES PROTÉGÉES (réservées aux admins) =====

router.post('/', verifyToken, isAdmin, categoryController.createCategory);
router.put('/:id', verifyToken, isAdmin, categoryController.updateCategory);
router.delete('/:id', verifyToken, isAdmin, categoryController.deleteCategory);

module.exports = router;