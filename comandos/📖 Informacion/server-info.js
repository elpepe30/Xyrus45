const { AttachmentBuilder, PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRow } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName("server-info")
    .setDescription("Mira la información sobre este servidor."),

  async run(client, interaction) {


        const informacion = new ButtonBuilder()
          .setCustomId('informacion')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Informacion')
          .setEmoji('📚')

        const canal = new ButtonBuilder()
        .setCustomId('canal')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Canales')
          .setEmoji('📺')

        const emoji = new ButtonBuilder()
        .setCustomId('emoji')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Emojis')
          .setEmoji('👻')

        const extra = new ButtonBuilder()
        .setCustomId('extra')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Extras')
          .setEmoji('🎈')

        const boton = new ActionRowBuilder()
        .addComponents(informacion, canal, emoji, extra)

    const owner = await interaction.guild.fetchOwner();

    let creado = interaction.guild.createdTimestamp
    let unix = Math.floor(creado / 1000)

    let seguridad; //NONE, LOW, MEDIUM , HIGH , VERY_HIGH
    const perm = interaction.guild.verificationLevel;
    if(perm === "NONE"){
      seguridad = "Ninguna";
    }
    if(perm === "LOW"){
      seguridad = "Bajo";
    };
    if(perm === "MEDIUM"){
      seguridad = "Medio";
    };
    if(perm === "HIGH"){
      seguridad = "Alto";
    };
    if(perm === "VERY_HIGH"){
      seguridad = "Muy Alto";
    };

const embed1 = new EmbedBuilder()
.setTitle(`__Información del servidor: ${interaction.guild.name}__`)
.addFields({ name: "🗒 | Nombre del servidor:", value: `\`${interaction.guild.name}\``, inline: false })
.addFields({ name: "👑 | Owner:", value: `\`${owner.user.tag}\``, inline: false })
.addFields({ name: "🆔 | ID:", value: `\`${interaction.guild.id}\``, inline: false })
.addFields({ name: "📅 | Fecha de creación:", value: `<t:${unix}:D>`, inline: false })
.addFields({ name: "👤 | Usuarios:", value: `\`${interaction.guild.memberCount} Usuarios\``, inline: false })
.addFields({ name:  "🤖| Bots", value: `\`${interaction.guild.members.cache.filter(m => m.user.bot).size} Bots\``, inline: false })
.setThumbnail(interaction.guild.iconURL())
.setImage(interaction.guild.bannerURL({ size: 1024 }))
.setColor("White")

const embed2 = new EmbedBuilder()
.setTitle(`__Información parte | Canales__ *(${interaction.guild.channels.cache.size})*`)
.addFields({ name: "🎙 | Voz", value: `\`${interaction.guild.channels.cache.filter(c => c.type === 'Guild_Voice').size} Canales de Voz\``, inline: false })
.addFields({ name: "⚙ | Texto", value: `\`${interaction.guild.channels.cache.filter(c => c.type === 'Guild_Text').size} Canales de Texto\``, inline: false })
.addFields({ name: "🧵 | Hilos", value: `\`${interaction.guild.channels.cache.filter(c => c.type === 'Guild_New_Thread' && 'GUILD_PRIVATE_THREAD' && 'GUILD_PUBLIC_THREAD').size} Canales de Hilos\``, inline: false })
.addFields({ name: "📡 | Stages", value: `\`${interaction.guild.channels.cache.filter(c => c.type === 'Guild_Stage_Voice').size} Canales de Stages\``, inline: false })
.addFields({ name: "📢 | Anuncios", value: `\`${interaction.guild.channels.cache.filter(c => c.type === 'Guild_News').size} Canales de Anuncios\``, inline: false })
.addFields({ name: "📁 | Categorías", value: `\`${interaction.guild.channels.cache.filter(c => c.type === 'Guild_Category').size} Categorías\``, inline: false })
.setThumbnail(interaction.guild.iconURL())
.setColor("White")

const embed3 = new EmbedBuilder()
.setTitle(`__Información parte | Emojis y Stickers__ *(${interaction.guild.emojis.cache.size + interaction.guild.stickers.cache.size})*`)
.addFields({ name: "🌞 | Stickets:", value: `\`${interaction.guild.stickers.cache.size} Stickets\``, inline: false })
.addFields({ name: "🛸 | Emojis Estaticos:", value: `\`${interaction.guild.emojis.cache.filter(e => !e.animated).size} Emojis Estaticos\``, inline: false })
.addFields({ name: "🌠 | Emojis Animados:", value: `\`${interaction.guild.emojis.cache.filter(e => e.animated).size} Emojis Animados\``, inline: false })
.setThumbnail(interaction.guild.iconURL())
.setColor("White")

const embed4 = new EmbedBuilder()
.setTitle(`__Información parte | Extras__`)
.addFields({ name: "🚀 | Boost:", value: `\`${interaction.guild.premiumSubscriptionCount} Boost\``, inline: false })
.addFields({ name: "🚀 | Boosters:", value: `\`${interaction.guild.roles.cache.size} Boosters\``, inline: false })
.addFields({ name: "📋 | Roles:", value: `${interaction.guild.roles.cache.map(roles => `<@&${roles.id}>`).join(', ')}`, inline: false })
.setThumbnail(interaction.guild.iconURL())
.setColor("White")

const m = await interaction.reply({ embeds: [embed1], components: [boton], fetchReply: true })
      
const filtro = i => i.user.id === interaction.user.id;
const collector = m.createMessageComponentCollector({ filter: filtro, time: 120000 })

    collector.on('collect', async i => {
        if(i.customId === 'informacion'){
            await i.deferUpdate()
            i.editReply({ embeds: [embed1] , components: [boton] })
        }

        if(i.customId === 'canal'){
            await i.deferUpdate()
            i.editReply({ embeds: [embed2] , components: [boton] })  
        }

        if(i.customId === 'emoji'){
            await i.deferUpdate()
            i.editReply({ embeds: [embed3] , components: [boton] })  
        }

        if(i.customId === 'extra'){
            await i.deferUpdate()
            i.editReply({ embeds: [embed4] , components: [boton] })  
        }
    })
 }
}