const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, PermissionFlagsBits, ButtonStyle } = require("discord.js")
const Discord = require("discord.js")
const verificacion = require("../../Schemas/VerificacionSchema")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("setup-verificacion")
  .setDescription("Ejecuta el sistema de verificacion.")
  .addStringOption(options => options.setName(`titulo`).setDescription(`El titulo del sistema de verificacion.`).setRequired(true))
  .addStringOption(options => options.setName(`descripcion`).setDescription(`La descripcion del sistema de verificacion.`).setRequired(true))
  .addRoleOption(options => options.setName(`rol`).setDescription(`El rol del sistema de verificacion.`).setRequired(true)),
  
  run: async (client, interaction) => {

    const rol = interaction.options.getRole("rol")
    const titulo = interaction.options.getString("titulo")
    const descripcion = interaction.options.getString("descripcion")

     if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: "No puedes utilizar este comando .", ephemeral: true })

    if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: '¡No tengo permisos para esto!', ephemeral: true })

          const embed = new Discord.EmbedBuilder()
        .setTitle(`${titulo}`)
        .setDescription(`${descripcion}`)

        await verificacion.findOneAndUpdate({
          guildId: interaction.guild.id,
          roleID: rol.id,
        })
      
        
        let boton = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("verificarse")
            .setEmoji(`✅`)
            .setLabel(`Verificate`)
            .setStyle(3),
        );


          interaction.reply({ embeds: [embed], components: [boton] }) 
   
  }
}