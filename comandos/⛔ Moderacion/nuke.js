const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("nuke")
  .setDescription("Nukea un canal."),

  async run(client, interaction) {

    
    if(!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: "❌ | ¡No tienes permisos para esto!", ephemeral: true })

    if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: '❌ | ¡No tengo permisos para esto!', ephemeral: true })

    const botones = new Discord.ActionRowBuilder()
    .addComponents([
      new Discord.ButtonBuilder({
        customId: "si",                  
        style: ButtonStyle.Success,
        label: "Aceptar",
        emoji: "✅",
      }),
      new Discord.ButtonBuilder({
        customId: "no",                  
        style: ButtonStyle.Danger,
        label: "Cancelar",
        emoji: "⛔",
      }),
    ])

    const embed = new EmbedBuilder()
    .setDescription("🤔 | ¿Estás seguro que quieres nukear este canal?\n\n🧨 | Eliminara todos los mensajes.")
    .setColor("Random")

    const m = await interaction.reply({embeds: [embed], components: [botones]})

    const ifilter = i => i.user.id = interaction.user.id;
  
    const collector = interaction.channel.createMessageComponentCollector({ filter: ifilter })

    collector.on("collect", async i => {
      if(i.customId === "si") {
      var posicion = interaction.channel.posicion

      interaction.channel.clone().then(canal => {
      interaction.channel.delete()

      canal.setPosition(posicion)

      canal.send({ content: "¡Canal nukeado exitosamente!" }).then(msg => {
    setTimeout(() => msg.delete(), 10000)
         })
       })
      }
      if(i.customId === "no") {
        await i.deferUpdate()
        const embed1 = new EmbedBuilder()
        .setDescription(" 💬| Gracias por no nukear este canal.\n\n😮‍💨 | Nos salvamos del nukeo uff.")
        .setColor("Random")
        i.editReply({ embeds: [embed1], components: [] }).then(m => setTimeout(() => m.delete(), 12000))
      }  
    })
  }
}