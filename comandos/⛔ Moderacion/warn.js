const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const {Generator} = require("randomly-id-generator")
const warns = require("../../Schemas/WarnsSchema")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("warn")
  .setDescription("Warneas a un usario.")
  .addUserOption(option => option.setName('usuario').setDescription(" el usuario al que pondrás el warn.").setRequired(true))
  .addStringOption(option => option.setName('razón').setDescription(" la razon del warn.").setRequired(false)),

   run: async (client, interaction) => {


    const user = interaction.options.getUser("usuario")
    const member = interaction.options.getMember("usuario")
    const razon = interaction.options.getString("razón") || "No especificada."
    const id = new Generator({length: 10}).generate()

     if(!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply({ content: "No puedes utilizar este comando nesesitas el permiso: `MODERAR MIEMBROS`.", ephemeral: true })

    if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply({ content: '¡No tengo permisos para esto!', ephemeral: true })


    if(user === interaction.user) return interaction.reply({ content: "No te puedes poner un warn a ti mismo.", ephemeral: true})
          
    if(member.user.bot) return interaction.reply({ content: "No puedes poner un warn a un bot.", ephemeral: true })

          await new warns({
                  guildID: interaction.guild.id,
          moderatorID: interaction.user.id,
          userID: user.id,
          reason: razon,
          date: Date.now(),
          id: id,
          }).save()

          const embed = new Discord.EmbedBuilder()
          .setTitle("⚠️ Nueva Advertencia ⚠️")
          .setFields(
                  {
                  name: "<:user2:1041539808943681556> | `Miembro:`",
                  value: member.toString(),
                  Inline: true
                  },
                  {
                  name: "<:moderacion:1041539608304963585> | `Moderador:`",
                  value: interaction.user.toString(),
                  Inline: true
                  },
                  {
                  name: "<:wumpus:1041539760591749223> | `Razón:`",
                  value: razon,
                  Inline: true
                  },
                  {
                  name: "<:user:1041539707613478942> | `ID:`",
                  value: id,
                  Inline: true
                  }
                  )
          .setColor("Random")

          interaction.reply({ embeds: [embed] }) 
   
  }
}