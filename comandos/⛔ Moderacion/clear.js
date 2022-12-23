const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName('clear')
  .setDescription('Eliminar una cantidad de mensajes.')
  .addIntegerOption((option) => {
    return option
    .setName('cantidad')
    .setDescription('Selecciona una cantidad del 1 al 100.')
    .setRequired(true)
  }),

   run: async (client, interaction) => {
     
    if(!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) return interaction.reply({ content: "¡No tienes permisos para eliminar mensajes!", ephemeral: true })

    if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) return interaction.reply({ content: '¡No tengo permisos para eliminar mensajes!', ephemeral: true })

    let amount = interaction.options.getInteger('cantidad')

    if(isNaN(amount) || amount < 1) {
      return interaction.reply({ content: 'Estableca una cantidad de mensajes para eliminar.', ephemeral: true })
    }

    if(parseInt(amount) > 100) {
      return interaction.reply({ content: '¡No puedo eliminar más de 100 mensajes a la vez!', ephemeral: true })
    } else {
       try{
       let { size } = await interaction.channel.bulkDelete(amount)

     const embed = new Discord.EmbedBuilder()
     .setTitle("🗑 | Mensajes borrados correctamente.")
     .setDescription(`✅ | Se eliminaron ${size} mensajes.`)
     .setColor("Random")
     
       await interaction.deferReply()
interaction.editReply({ embeds: [embed] })
setTimeout(() => {
  interaction.deleteReply()
}, 8000)
         
       } catch(e) {
         console.log(e)
         interaction.reply({ content: 'No puedo eliminar mensajes tan viejos.', ephemeral: true })
       }
         
    }
    
  }

}    