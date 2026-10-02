const service = require('../services/products');
const { clearCache } = require('../middleware/cache');

async function getAll(req, res) {
    try {
        const products = await service.getAll();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

async function getById(req, res) {
    try {
        const product = await service.getById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

async function create(req, res) {
    try {
        const product = await service.create(req.body);
        clearCache();
        res.status(201).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        const product = await service.update(req.params.id, req.body);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        clearCache();
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

async function patch(req, res) {
    try {
        const product = await service.patch(req.params.id, req.body);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        clearCache();
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

async function remove(req, res) {
    try {
        const product = await service.delete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        clearCache();
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getAll, getById, create, update, patch, delete: remove };
