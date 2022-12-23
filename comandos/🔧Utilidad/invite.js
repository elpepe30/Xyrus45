const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const Discord = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
  .setName("invite")
  .setDescription("Obten mi invitacion !."),

  async run(client, interaction){

    
  if(interaction.user.id === interaction.guild.ownerId){

    const embed = new Discord.EmbedBuilder()
    .setTitle(`Hola | ${interaction.user.username}`)
    .setDescription(`Esta es mi invite recuerda invitarme a todos tus servidores
    [**Xyrus Invite**](https://discord.com/oauth2/authorize?client_id=1042170678725582848&permissions=536870382718&scope=bot%20applications.commands)    
    `)
    .setColor("Green")
    .setTimestamp()

    interaction.reply({ embeds: [embed], content: `${interaction.user.username} De paso unete a mi servidor de soporte [**Servidor De Soporte**](https://discord.gg/gtd8ra2r2N)`, ephemeral: true  })
    
    }  
  }
}
