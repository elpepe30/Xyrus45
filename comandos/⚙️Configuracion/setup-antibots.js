const dc = require('discord.js');
const botSchema = require('../../Schemas/AntibotsSchema'); //Caminho até seu schema 
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup-antibots")
    .setDescription("si un usuario invita un bot se expulsa el usuario y el bot."),
  
    async run(client, interaction){

    const guild = interaction.guild;

    const e = new dc.EmbedBuilder()
    .setDescription(`❌ No tengo permisos suficientes en el servidor!`)
    .setColor('Red')

    const e1 = new dc.EmbedBuilder()
    .setDescription(`❌ No tienes permisos suficientes en el servidor!`)
    .setColor('Red')

    if(!interaction.member.permissions.has(dc.PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [e1], ephemeral: true })
    if(!guild.members.me.permissions.has(dc.PermissionsBitField.Flags.ManageRoles)) return interaction.reply({ embeds: [e], ephemeral: true })

    await interaction.deferReply();

    let data = await botSchema.findOne({ _id: guild.id });

    if(!data || data?.logs === false) {

        const e = new dc.EmbedBuilder()
        .setTitle(`🛡 Sistema antibots`)
        .setDescription(`✔ El sistema antibots esta **Activado**.\n\n⚠ **Ahora todos los bots que entren al servidor seran expulsados junto al usuario que lo invito!**`)
        .setColor("Green")
        .setTimestamp()

        interaction.editReply({ embeds: [e] })

        await botSchema.findOneAndUpdate({ _id: guild.id }, {
            $set: { logs: true }
          }, { upsert: true })

    } else if(data?.logs === true) {

        const e2 = new dc.EmbedBuilder()
        .setTitle(`🛡 Sistema antibots`)
        .setDescription(`✔ El sistema antibots esta **Desactivado**.\n\n⚠ **Ahora ningun bot ni ningun usuario sera expulsado!**`)
        .setColor("Red")
        .setTimestamp()

        interaction.editReply({ embeds: [e2] });

        await botSchema.findOneAndUpdate({ _id: guild.id }, {
            $set: { logs: false }
          }, { upsert: true })

    }
}};