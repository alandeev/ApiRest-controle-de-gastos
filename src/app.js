const express = require('express');
const bodyparser = require('body-parser');
const consign = require('consign');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

consign().include('./routers').into(app);

app.get('*', (req, res) => {
    res.render('erros/pageNotFound');
});

app.listen(3000, () => {
    console.log("SERVER ON!")
});