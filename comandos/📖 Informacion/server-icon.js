const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("server-icon")
  .setDescription("Muestra el icono del servidor."),

  run: async (client, interaction) => {


    let icono = interaction.guild.iconURL({ size: 2048, dynamic: true })

    let logopng = interaction.guild.iconURL({ size: 2048, extension: 'png', dynamic: true })

    let logojpg = interaction.guild.iconURL({ size: 2048, extension: 'jpg', dynamic: true })

    let logowebp = interaction.guild.iconURL({ size: 2048, extension: 'webp', dynamic: true })

    let logogif = interaction.guild.iconURL({ size: 2048, extension: 'gif', dynamic: true })
    
    
  const embed = new Discord.EmbedBuilder()
    
.setTitle(`🖼 | Logo de ${interaction.guild.name}`)
.setDescription(`**Descargar Logo:\n\n📝 | [PNG](${logopng}) | [JPG](${logojpg}) | [WEBP](${logowebp}) | [GIF](${logogif})**`) 
 .setColor("Random")
 .setImage(`${icono}`)
 .setFooter({ text: `Pedido por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
   .setTimestamp() 
    
  interaction.reply({ embeds: [embed] })
    
  }
}