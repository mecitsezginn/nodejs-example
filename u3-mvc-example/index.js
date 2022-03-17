const express = require('express');
const app = express();
const kisiController = require('./controller');

app.set('view engine', 'ejs');
app.set('views', './view');

app.use('/kisi', kisiController);

app.listen(1453, function () {
  console.log('Sunucu çalışıyor...');
});