const dc = require('discord.js');
const antilinkSchema = require('../../Schemas/AntilinkSchema');
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup-antilinks")
    .setDescription("activa/desactiva el antilink."),
  
    async run(client, interaction){

    const guild = interaction.guild;

    const e = new dc.EmbedBuilder()
    .setDescription(`❌ No tengo permisos suficientes!`)
    .setColor('Red')

    const e1 = new dc.EmbedBuilder()
    .setDescription(`❌ No tienes permisos suficientes!`)
    .setColor('Red')

    if(!interaction.member.permissions.has(dc.PermissionsBitField.Flags.ManageGuild)) return interaction.reply({ embeds: [e1], ephemeral: true })
    if(!interaction.guild.members.me.permissions.has(dc.PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ embeds: [e], ephemeral: true })

    await interaction.deferReply();

    let requireDB = await antilinkSchema.findOne({ _id: guild.id })

    const sistema = requireDB?.logs === true ? '📗 Activado' : '📕 Desactivado';

    const e2 = new dc.EmbedBuilder()
    .setTitle(`🔗 Antilink`)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor('Random')
    .setDescription(`Antilink en ${guild.name}\n\n Esta  \`${sistema}\`.\nUsa el boton de abajo para encender el antilink!`)
    .setFooter({ text: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
    .setTimestamp(new Date())

    const b = new dc.ButtonBuilder()
    .setLabel(`Activar`)
    .setCustomId(`true`)
    .setStyle(3)
    .setEmoji(`📗`)

    const b1 = new dc.ButtonBuilder()
    .setLabel(`Desactivar`)
    .setCustomId(`false`)
    .setStyle(4)
    .setEmoji(`📕`)

    const ac = new dc.ActionRowBuilder().addComponents(b, b1)

    const tf = await interaction.editReply({ embeds: [e2], components: [ac] })

    const coll = tf.createMessageComponentCollector();

    coll.on('collect', async(ds) => {

        if(ds.user.id !== interaction.user.id) return;

        if(ds.customId === `true`) {

        const e = new dc.EmbedBuilder()
        .setDescription(`📗 El sistema de antilinks  esta  **Activado**!`)
        .setColor('Green')
        
        ds.update({ embeds: [e], components: [] })

        await antilinkSchema.findOneAndUpdate({ _id: guild.id }, {
            $set: { logs: true }
          }, { upsert: true })

        } 

        else

        if(ds.customId === `false`) {

        const e = new dc.EmbedBuilder()
        .setDescription(`📕 El sistema de antilinks esta **Desactivado**!`)
        .setColor('Red')
            
        ds.update({ embeds: [e], components: [] })

        await antilinkSchema.findOneAndUpdate({ _id: guild.id }, {
            $set: { logs: false }
          }, { upsert: true })

        }

    })
}};