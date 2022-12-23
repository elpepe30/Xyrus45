const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    
    .setName('banner')
    .setDescription('Ver el banner de un usuario.')
    .addUserOption((option) => option.setName('usuario').setDescription('Usuario opcional.').setRequired(false)),

   run: async (client, interaction) => {

     const perms = interaction.user.id === "835232480931348531" || interaction.user.id === "979884922468712550"
    
    if (perms) return interaction.reply({ content: "Tú no puedes interactuar conmigo.", ephemeral: true })

const user = interaction.options.getUser('usuario') || interaction.user
    const fetchuser = await client.users.fetch(user.id, { force: true }) 
    const hex = fetchuser.hexAccentColor 
    const banner = fetchuser.bannerURL({ dynamic: true, size: 2048 }) || null
    return interaction.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor("Random") 
          .setImage(banner)
          .setDescription(banner ? `🖼️ | Este es el banner de ${user}.` : `:x: | ${user} No tiene banner.`)
      ]
    })
  }
}