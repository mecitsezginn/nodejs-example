let sira = 0;
let kisiler = exports.kisiler = [];

function Kisi(adi, soyadi) {
  this.id = sira++;
  this._adi = adi;
  this._soyadi = soyadi;
}

Kisi.prototype.kisiAdi = function () {
  return this._adi;
}

Kisi.prototype.kisiSoyadi = function () {
  return this._soyadi;
}

function kisiEkle(gelenAdi, gelenSoyadi) {
  kisiler.push(new Kisi(gelenAdi, gelenSoyadi));
}


kisiEkle('Yusuf', 'SEZER');
kisiEkle('Ramazan', 'SEZER');
kisiEkle('Sinan', 'SEZER');
kisiEkle('Mehmet', 'SEZER');

exports.kisiEkle = kisiEkle;