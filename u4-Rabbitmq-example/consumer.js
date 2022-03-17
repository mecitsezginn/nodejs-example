const amqp = require("amqplib");
const rabbitMqConnection = require("./rabbitmqConnection")
const queueName = "emailKuyrugu"


async function onConsumeEmail(){
    //rabbitMqConnection bağlantısını al
    const connection = await rabbitMqConnection();

    //kanal oluşturuyor 
    const channel = await connection.createChannel();
    
    // kuyruk oluştur
    await channel.assertQueue(queueName)

    // kuyruktan verileri al
    channel.consume(queueName,(email) =>{
        // buffer string e çevrildi
        console.log(email.content.toString())

        setTimeout(()=>{
            const mail = JSON.parse(email.content.toString())
            console.log(`Email başarılı bir şekilde ${mail.email} adresine gönderildi`)

            //kuyruktaki bilgiyi siliyor
            channel.ack(email)
        },5000)
    })
}

onConsumeEmail();