const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const Discord = require('discord.js')
const afk = require('../../Schemas/AfkSchema')

module.exports = {
  data: new SlashCommandBuilder()
  .setName("afk")
  .setDescription("Establece tu estado afk.")
  .addStringOption((option) => option.setName('razón').setDescription('Pon la razón.').setRequired(false)), 

  async run(client, interaction){


    const razon = interaction.options.getString('razón') || "No proporcionada.";
    
    let data = await afk.findOne({ guildId: interaction.guild.id, userId: interaction.user.id })

    if(data) return interaction.reply({ content: "❌ | ¡Ya estas afk! Si quieres quitartelo, envia un mensaje en este canal.", ephemeral: true })
    
    if(!data){
      let n = new afk({
        guildId: interaction.guild.id,
        userId: interaction.user.id,
        TimeAgo: Date.now(),
        Reason: razon
      })

      await n.save()
    }

  if(interaction.user.id === interaction.guild.ownerId){

    const embed = new Discord.EmbedBuilder()
    .setTitle("✅ | AFK Establecido")
    .setDescription(`😴 | ${interaction.user.username} ahora estas afk.\n\n📋 | Motivo: ${razon}`)
    .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
    .setColor("Green")
    .setFooter({ text: "✅ | Avisare a quienes te mencionen."})
    .setTimestamp()

    interaction.reply({ embeds: [embed] })
    
    } else {
    
    const embed1 = new Discord.EmbedBuilder()
    .setTitle("✅ | AFK Establecido")
    .setDescription(`😴 | ${interaction.user.username} ahora estas afk.\n\n📋 | Motivo: ${razon}`)
    .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
    .setColor("Green")
    .setFooter({ text: "✅ | Avisare a quienes te mencionen."})
    .setTimestamp()

    if(interaction.member.nickname === null){
      interaction.member.setNickname(`${interaction.user.username} (AFK)`)
    } else {
      interaction.member.setNickname(`${interaction.member.nickname} (AFK)`)
    }

    interaction.reply({ embeds: [embed1] })
    
    }  
  }
}