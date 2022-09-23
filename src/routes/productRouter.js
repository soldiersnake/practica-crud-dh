const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/list', productController.list);
router.get('/detail/:id', productController.detail);
router.get('/create', productController.create);
router.post('/create', productController.store);

module.exports = router