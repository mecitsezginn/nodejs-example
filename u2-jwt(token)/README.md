# jwt example

* jwt kütüphanesi ile token oluşturuluyor.

* postman ile "http://localhost:8080/user/generateToken" adresine kullanıcı bilgileri post lanıyor. Kullanıcı varsa token oluşturuluyor.

```
input =>

{
    "name": "Mecit",
    "password":"123"
}

output =>

{
    "user": "Mecit",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWVjaXQiLCJpZCI6MTAwLCJpYXQiOjE2NDc0OTQ0MDB9.gWnBh2dQ2HL9gamPG4ZEj5Zd63lXOVh8dbizg7-_sYI"
}
```