
const express = require("express");
const app = express();
 
app.get("/users", (request, response) => {
    response.status(200).send(users);
})
.get("/users/:id", (request, response) => {
    response.status(200).send(userGet(request.url));
})
.post("/createuser", (request, response) => {
    response.status(200).send(`${request.url} : my POST`);
}).put("/updateuser", (request, response) => {
    response.status(200).send(`${request.url} : my PUT`);
}).delete("/removeuser", (request, response) => {
    response.status(200).send(`${request.url} : my DELETE`);
});

// app.get('*', (request, response) => {
//     request.status(404).send('404 SAYFA BULUNAMADI')
// })


app.listen(8080, () => {
    console.log("Yayın başladı...");
});

const users =[
    {id:1, name: "Mecit"},
    {id:2, name: "Sezgin"},
    {id:3, name: "Ahmet"},
]

const userGet = (userURL) =>{
    const id = userURL.replace("/users/","")
    return users.filter((item) =>{
        if(item.id === Number(id)){
            return item
        }
    })
}

