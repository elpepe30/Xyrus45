const { AttachmentBuilder, PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRow } = require('discord.js');
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("user-info")
  .setDescription("Mira tu información o de otro usuario.")
  .addUserOption(option => option.setName("usuario").setDescription("Selecciona a un usuario.")),

  async run(client, interaction) {

    const user1 = interaction.options.getUser('usuario') || interaction.user
    const member = interaction.options.getMember('usuario') || interaction.member

    let estadosalda = {
      "online": "🟢 \`En Línea\`",
      "idle": "🟠 \`Ausente\`",
      "dnd": "🔴 \`No molestar\`",
      "offline": "⚫ \`Desconectado/invisible\`"
    };

    let creado = user1.createdTimestamp
    let joined = member.joinedTimestamp
    let unix = Math.floor(creado / 1000)
    let unix2 = Math.floor(joined / 1000)
    const fetchuser = await client.users.fetch(user1.id, { force: true }) 
    const hex = fetchuser.hexAccentColor 
    const banner = fetchuser.bannerURL({ dynamic: true, size: 2048 }) || null

    let rolesname;
    let roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
    
    rolesname = roles.join(", ")
    if(member.roles.cache.size < 1) rolesname = "No Tiene Roles"
    if(!member.roles.cache.size || member.roles.cache.size - 1 < 1) roles = `\`None\``

 const Menu = new Discord.SelectMenuBuilder()
      .setCustomId("Menu")
      .setPlaceholder("Informacion del usuario")
      .addOptions([
        {
          label: "Miembro",
          description: "Mira La Informacion Como Miembro.",
          value: "miembro",
          emoji: "<:miembros:1038523066306805760>" 
        },
        {
          label: "Usuario",
          description: "Mira La Informacion Del Usuario.",
          value: "usuario",
          emoji: "<:usuarios:1038522142733647944>"
        },
      ]);

           const links = new Discord.ActionRowBuilder()
      .addComponents([
        new Discord.ButtonBuilder({
          style: ButtonStyle.Link,
           url: `https://discord.com/users/${user1.id}`,
          label: "perfil",
          emoji: "<:perfil:1038527037171830814>",
        }), //Xd
    ])

           const user = interaction.user;

    let embed1 = new Discord.EmbedBuilder()
    .setTitle(`<:Discord:1030239379882516550> informacion de ${user1.tag}`)
    .setColor("Red")

     const cmp = new Discord.ActionRowBuilder()
    .addComponents(Menu)

     let mensaje = await interaction.reply({ embeds: [embed1], components: [cmp, links] })

    const filtro = i => i.user.id === interaction.user.id; user.id; 

    let collector = interaction.channel.createMessageComponentCollector({ filter: filtro })

const usuarioembed = new EmbedBuilder()

.setAuthor({ name: `Información del usuario: ${user1.tag}`, iconURL: `${member.displayAvatarURL({ dynamic: true })}` })
.setThumbnail(`${member.displayAvatarURL({ dynamic: true })}`)
.addFields({ name: "🗒 | Nombre:", value: `\`${member.user.username}\``, inline: false })
.addFields({ name: "🆔 | ID:", value: `\`${member.id}\``, inline: false })
.addFields({ name: "⏳ | Fecha de creación:", value: `<t:${unix}:R>`, inline: false })
.setImage(banner)
.setColor("White")

const miembroembed = new EmbedBuilder()

.setAuthor({ name: `Información del miembro: ${user1.tag}`, iconURL: `${user1.displayAvatarURL({ dynamic: true })}` })
.setThumbnail(`${user1.displayAvatarURL({ dynamic: true })}`)
.addFields({ name: "🗒 | Apodo:", value: `${member.nickname !== null ?  `\`${member.nickname}\``: '\`No tiene apodo.\`'}`, inline: false })
.addFields({ name: "🆔 | ID:", value: `\`${user1.id}\``, inline: false })
.addFields({ name: `🚀 | Booster`, value: `${member.premiumSince ? ' \`Si Booster\`' + member.premiumSince.toLocaleString() : '\`No Booster\`'} `, inline: false })
.addFields({ name: "📅 | Fecha de llegada:", value: `<t:${unix2}:R>`, inline: false })
.addFields({ name: "📋 | Roles:", value: `${rolesname || "\`No tiene roles.\`"}`, inline: false }) 
.setImage(banner)
.setColor('White')

           collector.on("collect", async menu => {
      if(menu.values[0] === "miembro"){
        await menu.deferUpdate()
        menu.editReply({ embeds: [miembroembed], components: [cmp] })
       } 
      if(menu.values[0] === "usuario"){
        await menu.deferUpdate()
        menu.editReply({ embeds: [usuarioembed], components: [cmp] })
       } 
           })

 }
} 