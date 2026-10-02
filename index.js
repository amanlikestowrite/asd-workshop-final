const express = require('express');
const productRoutes = require('./routes/products');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;