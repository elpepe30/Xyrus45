const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const warns = require("../../Schemas/WarnsSchema")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("remove-all-warns")
  .setDescription("Remueve todos los warns de un usuario.")
  .addUserOption(o => o.setName("usuario").setDescription("Elige al usuario al que le removeras todos los warns los warns.").setRequired(true)),

  run: async (client, interaction) => {


    const member = interaction.options.getMember("usuario")

    if(!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply({ content: "No puedes utilizar este comando nesesitas el permiso: `MODERAR MIEMBROS`.", ephemeral: true })

    if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply({ content: '¡No tengo permisos para esto!', ephemeral: true })

    if(member.user.bot) return interaction.reply({ content: "No puedes quitarle warns a un bot ya que no pueden ser warneados.", ephemeral: true })

    if(interaction.user === member.user) return interaction.reply({ content: "No puedes quitarte todos los warns a ti mismo.", ephemeral: true })

    if(interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return interaction.reply({ content: "No puedes quitar todos los warns de un usuario con más poder que ti.", ephemeral: true })

    const data = await warns.find({ guildID: interaction.guild.id, userID: member.user.id })

    if(data.length === 0) return interaction.reply({ content: "Esa persona no tiene ningún warn.", ephemeral: true })

    for(const warn of data){
      warn.delete()
    }

    const embed = new Discord.EmbedBuilder()
    .setTitle("Todas la infracciones borradas")
    .setDescription(`Se borraron todas las infracciones de ${member.toString()}. En total se ${data.length > 1? "borraron": "borró"} ${data.length} ${data.length > 1? "infracciones": "infracción"}.`)
    .setColor("Random")
    .setTimestamp()
    .setThumbnail(member.displayAvatarURL())

    return interaction.reply({ embeds: [embed] })
  }
}