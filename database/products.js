const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, '../db.json');

async function readFile() {
    try {
        const data = await fs.promises.readFile(pathToFile, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function readFileWithDelay() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return await readFile();
}

async function writeFile(data) {
    await fs.promises.writeFile(pathToFile, JSON.stringify(data, null, 2), 'utf-8');
}

async function getAll() {
    return await readFileWithDelay();
}

async function getById(id) {
    const products = await readFileWithDelay();
    return products.find((item) => item.id === Number(id));
}

async function create(productData) {
    const products = await readFile();
    const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct = { ...productData, id: productData.id !== undefined ? Number(productData.id) : newId };
    products.push(newProduct);
    await writeFile(products);
    return newProduct;
}

async function update(id, productData) {
    const products = await readFile();
    const index = products.findIndex((item) => item.id === Number(id));
    if (index === -1) return null;
    products[index] = { ...productData, id: Number(id) };
    await writeFile(products);
    return products[index];
}

async function patch(id, productData) {
    const products = await readFile();
    const index = products.findIndex((item) => item.id === Number(id));
    if (index === -1) return null;
    products[index] = { ...products[index], ...productData, id: Number(id) };
    await writeFile(products);
    return products[index];
}

async function remove(id) {
    const products = await readFile();
    const index = products.findIndex((item) => item.id === Number(id));
    if (index === -1) return null;
    const deleted = products.splice(index, 1)[0];
    await writeFile(products);
    return deleted;
}

module.exports = { getAll, getById, create, update, patch, delete: remove };
