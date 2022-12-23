const { SlashCommandBuilder } = require("discord.js")
const Discord = require("discord.js")
const dc = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
	.setName('anuncio')
	.setDescription("crea un anuncio")
    .addChannelOption(option => option.setName("canal").setDescription("Elige un canal.").setRequired(true)),
	cooldown: 3000,
	  
    async run(client, interaction) {

        let canal = interaction.options.getChannel("canal");
        if (!canal) canal = interaction.channel;

        if(!interaction.member.permissions.has(dc.PermissionsBitField.Flags.ManageGuild)) return interaction.reply({ content: `No tienes permisos suficientes !`, ephemeral: true })
        if(!interaction.guild.members.me.permissions.has(dc.PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ content: `No tengo permisos suficientes !`, ephemeral: true })

            let modal = new Discord.ModalBuilder()
            .setCustomId('modal')
            .setTitle('Anuncio');
      
            let titu = new Discord.TextInputBuilder()
            .setCustomId('titulo')
            .setLabel("Titulo del mensaje")
            .setStyle(Discord.TextInputStyle.Short)
            .setPlaceholder('Introduzca el título del anuncio.')
            .setRequired(true);
      
            let colo = new Discord.TextInputBuilder()
            .setCustomId('color')
            .setLabel("El color del anuncio")
            .setStyle(Discord.TextInputStyle.Short)
            .setValue('#FFFFFF')
            .setPlaceholder('Introduce el color del anuncio en formato hex ej: #00000.')
            .setRequired(true);

            let desc = new Discord.TextInputBuilder()
            .setCustomId('descripcion')
            .setLabel("Descripción del mensaje")
            .setStyle(Discord.TextInputStyle.Paragraph)
            .setPlaceholder('Introduzca la descripción del anuncio.')
            const titulo = new Discord.ActionRowBuilder().addComponents(titu);
            const descripcion = new Discord.ActionRowBuilder().addComponents(desc);
            const color = new Discord.ActionRowBuilder().addComponents(colo);

            modal.addComponents(titulo, descripcion, color);
          
            await interaction.showModal(modal);

            const modalInteraction = await interaction.awaitModalSubmit({ filter: i => i.user.id === interaction.user.id, time: 1200000_000 })

            const colorr = modalInteraction.fields.getTextInputValue('color')
            const titul = modalInteraction.fields.getTextInputValue('titulo')
            const descs = modalInteraction.fields.getTextInputValue('descripcion')

            let embed = new Discord.EmbedBuilder()
                .setColor(`${colorr}`) 
                .setTitle(`${titul}`)
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setTimestamp()
                .setDescription(`${descs}`);

            canal.send({ embeds: [embed] })

            await modalInteraction.deferUpdate()

    }
}
