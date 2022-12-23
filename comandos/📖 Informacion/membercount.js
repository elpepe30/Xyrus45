const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("membercount")
  .setDescription("Muestra el numero de miembros y bots que hay en el servidor."),

  async run(client, interaction){

    const embed = new Discord.EmbedBuilder()
    .setTitle(`Usuarios en ${interaction.guild.name}`)
    .addFields({ name: "👤 | Usuarios:", value: `\`${interaction.guild.memberCount}\``, inline: false })
.addFields({ name:  "🤖| Bots", value: `\`${interaction.guild.members.cache.filter(m => m.user.bot).size}\``, inline: false })
.setColor("#FFFFFF")

    interaction.reply({ embeds: [embed] })
    
  }
}