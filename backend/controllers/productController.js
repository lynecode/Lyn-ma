// On importe notre modèle Product pour pouvoir interagir avec la table "Products"
const Product = require('../models/Product');

// ========================================
// CRÉER un produit
// ========================================
exports.createProduct = async (req, res) => {
  try {
    // req.body contient les données envoyées par le client (ex: depuis un formulaire admin)
    const product = await Product.create(req.body);
    res.status(201).json(product); // 201 = "créé avec succès"
  } catch (error) {
    res.status(400).json({ error: error.message }); // 400 = erreur dans la requête du client
  }
};

// ========================================
// LIRE tous les produits
// ========================================
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products); // 200 = succès
  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 = erreur serveur
  }
};

// ========================================
// LIRE un produit précis (par son id)
// ========================================
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id); // req.params.id = l'id dans l'URL
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' }); // 404 = pas trouvé
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================================
// MODIFIER un produit
// ========================================
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    await product.update(req.body); // on met à jour avec les nouvelles données envoyées
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ========================================
// SUPPRIMER un produit
// ========================================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};