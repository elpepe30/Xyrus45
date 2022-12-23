const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const fetch = require('axios')

module.exports = {
  data: new SlashCommandBuilder()
  .setName("avatar")
  .setDescription("Muestra tu avatar o el de otra persona.")
  .addUserOption((option) => option.setName('usuario').setDescription('Seleccionar a un usuario.').setRequired(false)),

  async run(client, interaction){

    const perms = interaction.user.id === "835232480931348531" || interaction.user.id === "979884922468712550"
    
    if (perms) return interaction.reply({ content: "Tú no puedes interactuar conmigo.", ephemeral: true })

    const row = new ActionRowBuilder() 
    .addComponents(
      new ButtonBuilder()
      .setCustomId("b1")
      .setLabel("Ver avatar global")
      .setStyle("Primary")
      .setEmoji("🖼")
    )    
    const row2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId("b2")
      .setLabel("Ver avatar del servidor")
      .setStyle("Primary")
      .setEmoji("🖼")
    )

    let usuario = interaction.options.getMember("usuario") || interaction.member;
    let user = interaction.options.getUser("usuario") || interaction.user;

    let url = await fetch.get(`https://discord.com/api/guilds/${interaction.guild.id}/members/${usuario.user.id}`, {
      headers: {
        'authorization': `Bot ${client.token}`
      }
    }) 
    let AvGuildPng = `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${usuario.user.id}/avatars/${url.data.avatar}.png?size=2048`
//A
    let AvGuildJpg = `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${usuario.user.id}/avatars/${url.data.avatar}.jpg?size=2048`

    let AvGuildWebp = `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${usuario.user.id}/avatars/${url.data.avatar}.webp?size=2048`

    let AvGuildGif = `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${usuario.user.id}/avatars/${url.data.avatar}.gif?size=2048`

    if(!url.data.avatar) {
      const AvatarUsuario = new EmbedBuilder()
      .setTitle(`🖼 | Avatar de ${user.username}`)
.setDescription(`
**<:donwload:1016164397414097049> | Descargar Avatar:\n\n📝 | [PNG](${user.displayAvatarURL({ extension: 'png', size: 2048 })}) | [JPG](${user.displayAvatarURL({ extension: 'jpg', size: 2048 })}) | [WEBP](${user.displayAvatarURL({ extension: 'webp', size: 2048 })}) | [GIF](${user.displayAvatarURL({ extension: 'gif', size: 2048 })})**`)
      .setImage(user.displayAvatarURL({dynamic: true, size: 2048 }))
      .setFooter({ text: `Pedido por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
.setColor("Random")
.setTimestamp()
      return interaction.reply({embeds: [ AvatarUsuario ] })      
    }else{  
const AvatarUsuario = new EmbedBuilder()
.setTitle(`🖼 | Avatar de ${usuario.user.username}`)
.setDescription(`**Descargar Avatar:\n\n📝 | [PNG](${user.displayAvatarURL({ extension: 'png', size: 2048 })}) | [JPG](${user.displayAvatarURL({ extension: 'jpg', size: 2048 })}) | [WEBP](${user.displayAvatarURL({ extension: 'webp', size: 2048 })}) | [GIF](${user.displayAvatarURL({ extension: 'gif', size: 2048 })})**`)
.setImage(usuario.user.displayAvatarURL({dynamic: true, size: 2048}))
.setFooter({ text: `Pedido por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
.setColor("Random")
.setTimestamp()
      
const AvatarGuild = new EmbedBuilder()
.setTitle(`🖼 | Avatar de ${usuario.user.username}`)
.setDescription(`**<:Descargar Avatar:\n\n📝 | [PNG](${AvGuildPng}) | [JPG](${AvGuildJpg}) | [WEBP](${AvGuildWebp}) | [GIF]($${AvGuildGif})**`)
.setImage(AvGuildPng)
.setFooter({ text: `Pedido por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
.setColor("Random")
.setTimestamp()

    const m = await interaction.reply({embeds: [AvatarGuild], components: [row]})

    const ifilter = i => i.user.id = interaction.user.id;
  
    const collector = interaction.channel.createMessageComponentCollector({ filter: ifilter })

    collector.on("collect", async i => {
      if(i.customId === "b2" ) {
        await i.deferUpdate()
        i.editReply({embeds: [AvatarGuild], allowedMentions: {repliedUser: false}, components: [row]})
      }
    })
    collector.on("collect", async i => {
      if(i.customId === "b1" ) {
        await i.deferUpdate()
        i.editReply({embeds: [AvatarUsuario], allowedMentions: {repliedUser: false}, components: [row2]})
      }
    })
  }

  }

}