
const express = require('express');
const kisiRouter = express.Router();
const veri = require('../model');

kisiRouter.get('/', function (req, res) {

  res.render('index', {
    liste: veri.kisiler
  });

})

kisiRouter.get('/:id(\\d+)', function (req, res) {

  let id = req.params.id;

  let mevcutKisi = veri.kisiler.find(kisi => kisi.id == id);

  if (!mevcutKisi) return res.send('Böyle bir kullanıcı yok');

  res.render('kisi', {
    adi: mevcutKisi.kisiAdi(),
    soyadi: mevcutKisi.kisiSoyadi()
  });

});

kisiRouter.get('/ekle', function (req, res) {

    if (req.query.adi && req.query.soyadi) {
  
      veri.kisiEkle(req.query.adi, req.query.soyadi);
  
      return res.redirect('/kisi');
  
    }
  
    res.render("ekle");
  
  });

module.exports = kisiRouter;