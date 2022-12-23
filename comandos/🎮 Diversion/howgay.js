const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("howgay")
  .setDescription("Mide el porcentaje de lo gay que eres.")
  .addUserOption((option) => option.setName('usuario').setDescription('Selecciona a un usuario.').setRequired(false)),

  async run(client, interaction){


  var queso = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30",]
    
  var porcentaje = queso[Math.floor(Math.random()*queso.length)]//usamos math.floor para que el resultado sea aleatorio 
    
const miembro = interaction.options.getUser('usuario') || interaction.user;

 const embed = new Discord.EmbedBuilder()
    .setTitle(`🏳️‍🌈 Que tan gay es ${miembro.tag} ? 🏳️‍🌈`)
    .setColor("Random")
    .setDescription(` ${miembro} es  ${porcentaje}% gay. `) 
   .setImage("https://cdn.discordapp.com/attachments/1008023259859660900/1030296593334808647/descarga_5.png")
    .setFooter({ text: `Pedido por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
    .setTimestamp()

interaction.reply({ embeds: [embed] })//envia el embed 

    }
}//fin