const Discord = require("discord.js")

module.exports = {
    name: "ready",
    run(client){
        console.log(`${client.user.username} desplegado con exito!`)
        
    }
}