const db = require('../database/products');

async function getAll() {
    return await db.getAll();
}

async function getById(id) {
    return await db.getById(id);
}

async function create(data) {
    return await db.create(data);
}

async function update(id, data) {
    return await db.update(id, data);
}

async function patch(id, data) {
    return await db.patch(id, data);
}

async function remove(id) {
    return await db.delete(id);
}

module.exports = { getAll, getById, create, update, patch, delete: remove };
