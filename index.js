const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const professoresRoutes = require('./routes/professores');

app.use('/professores', professoresRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});