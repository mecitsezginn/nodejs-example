const amqp = require("amqplib")
const rabbitMqConnection = require("./rabbitmqConnection")
const queueName = "emailKuyrugu"

module.exports = async (email) =>{
    try{
        //rabbitMqConnection bağlantısı kur
        const connection = await rabbitMqConnection();

        // kanal oluştur
        const channel = await connection.createChannel()

        // kuyruk oluştur
        await channel.assertQueue(queueName)

        //bu kuyruğa email bilgisini buffer olarak gönder
        //email json olarak gönderiliyor
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify({email: email})))

        console.log("kuruğa alındı")
    }
    catch{
        console.log("hata", error)
    }
}