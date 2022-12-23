const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const niveles = require("../../Schemas/ConfiguracionSchema")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("desactivar-niveles")
  .setDescription("Desactiva el sistema de niveles en el servidor."),

  async run(client, interaction){

   
    if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: "¡No tienes permisos para esto!", ephemeral: true })

    if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.Administrato)) return interaction.reply({ content: '¡No tengo permisos para esto!', ephemeral: true })

    try {
      
      let data = await niveles.findOne({ guildId: interaction.guild.id })

      if(!data){
        let n = new niveles({ 
          guildId: interaction.guild.id,
          activado: false
        })
        await n.save()
      }

      if(data.activado === false) return interaction.reply({ content: "El sistema de niveles ya está desactivado en el servidor.", ephemeral: true }) 

       await niveles.findOneAndUpdate({
          guildId: interaction.guild.id,
          activado: false
        })
      
      await interaction.reply({ embeds: [new Discord.EmbedBuilder()
      .setDescription(`El sistema de niveles ha sido desactivado con exito.`)
      .setColor("Random")] })
    } catch (e){
      interaction.reply({ embeds: [new Discord.EmbedBuilder()
      .setDescription(`El sistema de niveles ha sido desactivado con exito.`)
      .setColor("Random")] })
    }

  }
}