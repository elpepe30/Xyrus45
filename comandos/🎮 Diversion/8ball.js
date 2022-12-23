const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("8ball")
  .setDescription("Jugar a la bola magica con el bot.")
  .addStringOption((option) => option.setName('pregunta').setDescription('Haz una pregunta.').setRequired(true)),

  run: async (client, interaction) => {


  var resp = ['Si','No','No imbecil','Tu sabras','Absolutamente no','Claro que si','No te lo contare 😈','Obvio UwU','Claro que no', 'Nunca', 'Jamas','En tus sueños']

    const pregunta = interaction.options.getString('pregunta')

    const respuesta = resp[( Math.floor(Math.random() * resp.length))]

  const embed = new Discord.EmbedBuilder()

  .setTitle('🎱 | 8Ball')  
  .addFields([
    { name: 'Pregunta:', value: pregunta },
    { name: 'Respuesta:', value: respuesta },
  ])  
  .setColor("White") 

    interaction.reply({ embeds: [embed] })
  }
}

