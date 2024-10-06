require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productRouter = require('./routes/product');
const {log} = require('./utils/logger');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/product', productRouter);

const server = app.listen(PORT, () => {
    log('Listening on port ' + PORT);
});
module.exports = {app, server};
