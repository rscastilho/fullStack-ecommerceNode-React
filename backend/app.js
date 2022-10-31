require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use('/imagens', express.static(path.join(__dirname, './src/estoque.application/public')));
app.use('/imagensprodutos', express.static(path.join(__dirname, './src/estoque.application/public/products')));

const router = require('./src/estoque.application/routes/Router');

app.use(router);

app.listen(PORT, () => {
  console.log(`app running at http://localhost:${PORT}`);
});
