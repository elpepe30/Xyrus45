const Discord = require("discord.js")
const { EmbedBuilder, PermissionFlagsBits, ButtonStyle } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")


module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup-tickets")
    .setDescription("Sistema de tickets del bot.")
    .addStringOption(options => options.setName(`titulo`).setDescription(`El titulo del sistema de tickets.`).setRequired(true))
    .addStringOption(options => options.setName(`descripcion`).setDescription(`La descripcion del sistema de tickets.`).setRequired(true))
    .addStringOption(options => options.setName(`texto_del_boton`).setDescription(`El texto del boton del sistema de tickets.`).setRequired(false))
    .addStringOption(options => options.setName(`emoji_del_boton`).setDescription(`El texto del boton del sistema de tickets.`).setRequired(false)),
    
   

    async run(client, interaction){

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({content: `❌ **No tienes permisos para ejecutar el sistema de tickets!**`, ephemeral: true}).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 11000)
        })

        let titulo = interaction.options.getString("titulo")
        let descripcion = interaction.options.getString("descripcion")
        let textobtn = interaction.options.getString("texto_del_boton") || "Crear Ticket";
        let emojit = interaction.options.getString("emoji_del_boton") || "🎟";




            let embed = new Discord.EmbedBuilder()
.setColor('Random')
.setTitle(`${titulo}`)
.setDescription(`${descripcion}`);

            let boton = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("ticket")
                .setEmoji(`${emojit}`)
                .setLabel(`${textobtn}`)
                .setStyle(3),
            );

  interaction.channel.send({ embeds: [embed], components: [boton] })
  interaction.reply(({content: `✅ **El sistema de tickets fue ejecutado correctamente!**`, ephemeral: true}))

    }
}