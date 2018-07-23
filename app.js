const express = require('express');
const app = express();

const apiRouterV1 = require('./routes/api/v1');
app.use('/api/v1', apiRouterV1);

app.listen(3000, () => console.log('Example app listening on port 3000!'))