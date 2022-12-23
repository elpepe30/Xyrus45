const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("cruz-o-cara")
  .setDescription("Tira una moneda al cielo."),

  async run(client, interaction){

    const perms = interaction.user.id === "835232480931348531" || interaction.user.id === "979884922468712550"
    
    if (perms) return interaction.reply({ content: "Tú no puedes interactuar conmigo.", ephemeral: true })

    const user = interaction.user;

    var imagenes = ["1", "2"]

    const dado = imagenes[(Math.floor(Math.random() * imagenes.length))]

    if(dado === "1"){
      const embed = new Discord.EmbedBuilder()
      .setTitle(`${user.username} Has tirado una moneda al cielo.`)
      .setDescription("Salio: **Cara**") 
      .setImage("https://cdn.discordapp.com/attachments/1008023259859660900/1041445083163136030/US_One_Cent_Obv.png")
      .setColor("Random")
      return interaction.reply({ embeds: [embed] })
    }

    if(dado === "2"){
      const embed1 = new Discord.EmbedBuilder()
      .setTitle(`${user.username} Has tirado una moneda al cielo.`)
      .setDescription("Salio: **Cruz**") 
      .setImage("https://cdn.discordapp.com/attachments/1008023259859660900/1041445043950587904/usa-1-cent-1998-removebg-preview.png")
      .setColor("Random")
      return interaction.reply({ embeds: [embed1] })
    }

  }
}