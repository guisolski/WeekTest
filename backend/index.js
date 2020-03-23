const express = require('express');

const app = express();

app.get('/',(req, resp) => {
    return resp.json({'Nome' : 'Ola'});
});

app.listen(3333);

