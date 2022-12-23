const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const snipe = require("../../Schemas/SnipeSchema")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("snipe")
  .setDescription("Muestra el último mensaje borrado en el canal."),

  async run(client, interaction){

    
    let data = await snipe.findOne({ channelId: interaction.channel.id })

    if(!data){
      return interaction.reply({ content: "No se borro ningun mensaje.", ephemeral: true })
    }

    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: `Mensaje de ${data.author}`, iconURL: data.avatar })
    .addFields([
      { name: "💬 | Mensaje Borrado:", value: `${data.message}` },
      { name: "📋 | Canal:", value: `<#${data.channelId}>` },
      { name: "⏰ | Tiempo:", value: `<t:${data.time}:R>` },
    ])
    .setColor("Random")
    .setTimestamp()

    interaction.reply({ embeds: [embed] })
    
  }
}