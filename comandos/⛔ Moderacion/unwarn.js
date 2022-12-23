const { EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const warns = require("../../Schemas/WarnsSchema")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("unwarn")
  .setDescription("Remueve un warn a un usuario.")
  .addStringOption(option => option.setName('id').setDescription("La id del warn que deseas remover.").setRequired(true)),

  run: async(client, interaction) => {

    const perms = interaction.user.id === "835232480931348531" || interaction.user.id === "979884922468712550"
    
    if (perms) return interaction.reply({ content: "Tú no puedes interactuar conmigo.", ephemeral: true })
    
    const id = interaction.options.getString("id") 
    
    if(!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply({ content: "No puedes utilizar este comando nesesitas el permiso: `MODERAR MIEMBROS`.", ephemeral: true })

    if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply({ content: '¡No tengo permisos para esto!', ephemeral: true })

          const data = await warns.findOne({id: id,guildID: interaction.guild.id}) 

if(!data) return interaction.reply({content: "Esa id no existe.", ephemeral: true})

const member = await interaction.guild.members.fetch(data.userID)
          if(!member) return interaction.reply({content: "La persona no se encuentra en el servidor.", ephemeral: true}) 
    
          if(interaction.user === member.bot) return interaction.reply({content: "No puedes quitar warns a un bot.", ephemaral: true})
 
if(interaction.user === member.user) return interaction.reply({content: "No puedes quitar warns a ti mismo.", ephemaral: true})

          if(interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return interaction.reply({ content: "No puedes quitar warns a personas con más poder que ti.", ephemeral: true })

          const embed = new Discord.EmbedBuilder()
                  
          .setTitle("Infracción Borrada")
.setDescription(`Se borro el warn de ${member.toString()} con la id: **${id}**.`)
.setTimestamp()
.setColor("Random")
          .setThumbnail(member.displayAvatarURL()) 

data.delete()

          return interaction.reply({embeds: [embed] })



  }
}