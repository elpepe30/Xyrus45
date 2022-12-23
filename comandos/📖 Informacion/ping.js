const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")
const { connection } = require("mongoose")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Mira mi ping"),

  async run (client, interaction) {

    
    let values = {
        "high": 200,
        "medium": 100,
        "low": 50
    }

    let ping = Date.now() - interaction.createdTimestamp

    let color;
      if (ping > values.high) {
        color = '🔴'
    } else if (ping > values.medium) {
        color = '🟡'
    } else {
        color = '🟢'
    }

    let colores;
      if (ping > values.high) {
        colores = 'df0101'
    } else if (ping > values.medium) {
        colores = 'df7401'
    } else {
        colores = '01df01'
    }
 
    const date = Date.now();

    const mongoDbping = await new Promise((rs, rj) => {
      connection.db
      .admin()
      .ping()
      .then(() => rs(Date.now() - date))
      .catch(err => rj(err));
    });
    
    let embed = new Discord.EmbedBuilder()
    .setColor(colores)
    .setAuthor({ name: `Ping de ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .addFields([
       { name: '**Ping:**', value: `${color} | Mi ping es de ${ping}ms.\n` },
       { name: '**Discord API:**', value: `<:Discord:1030239379882516550> | Ping DiscordAPI: ${client.ws.ping} ms.` },
       { name: '**Mongo DB:**', value: `<:Mongo_Db:1030234827305271357> | Mongo DB: ${mongoDbping}` },
      ])
      .setFooter({ text: `Pedido por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
      .setTimestamp()
      
      
    
    interaction.reply({ embeds: [embed] })
  }
}