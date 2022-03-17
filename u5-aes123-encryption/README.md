node js'de aes128 kullanılarak şifreleme

 * "npm install crypto" kuruldu

 * "localhost:5555/encryption" adresine post atılarak json verisi şifrelendi
  ```
   input =>
        {
            "rfids": [
                {"id":1, "name":"A", "rfid":4568923498734},
                {"id":2, "name":"B", "rfid":6048234963858},
                {"id":3, "name":"C", "rfid":4290582305593},
                {"id":4, "name":"D", "rfid":9748375837292}
            ]
        }

    output =>
    {
        "rfids": [
            {"name": "A","rfid": "EdOYdGRuF4Dm3diofp3eaQ==" },
            {"name": "B","rfid": "OeFEUMRjghOr+hRHTDSPoA==" },
            {"name": "C","rfid": "9xYRXcavIvJE3eXSgrx4HA==" },
            {"name": "D","rfid": "pCXb1KPQkZVrg6JEwmfCmg==" }
        ]
    }
 ```

 * "localhost:5555/decryption" adresine post atılarak şifrelenmiş veri deşifre idildi
  ```
    input =>
    {
        "rfids": [
            {"name": "A","rfid": "EdOYdGRuF4Dm3diofp3eaQ==" },
            {"name": "B","rfid": "OeFEUMRjghOr+hRHTDSPoA==" },
            {"name": "C","rfid": "9xYRXcavIvJE3eXSgrx4HA==" },
            {"name": "D","rfid": "pCXb1KPQkZVrg6JEwmfCmg==" }
        ]
    }

    output=>
    {
        "rfids": [
            {"name":"A", "rfid":4568923498734},
            {"name":"B", "rfid":6048234963858},
            {"name":"C", "rfid":4290582305593},
            {"name":"D", "rfid":9748375837292}
        ]
    }
 ```