const Discord = require(`discord.js`);

module.exports = {
    paginacion
}

async function paginacion(client, interaction, texto, titulo = `Paginacion`, elementos_por_pagina = 1) {

    var embeds = [];
    var dividido = elementos_por_pagina;
    for (let i = 0; i < texto.length; i += dividido) {
        let desc = texto.slice(i, elementos_por_pagina);
        elementos_por_pagina += dividido;

        let embed = new Discord.EmbedBuilder()
            .setTitle(titulo.toString())
            .setDescription(desc.join(` `))
            .setColor("Random")
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        embeds.push(embed)
    }

    let paginaActual = 0;

    if (embeds.length === 1) return interaction.reply({ embeds: [embeds[0]] })

    let boton_atras = new Discord.ButtonBuilder().setStyle('Success').setCustomId('Atrás').setEmoji('⬅').setLabel('Atrás')
    let boton_inicio = new Discord.ButtonBuilder().setStyle('Danger').setCustomId('Inicio').setEmoji('🏠').setLabel('Inicio')
    let boton_avanzar = new Discord.ButtonBuilder().setStyle('Success').setCustomId('Avanzar').setEmoji('➡').setLabel('Avanzar')

    let embedpaginas = await interaction.reply({
        embeds: [embeds[0].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })],
        components: [new Discord.ActionRowBuilder().addComponents([boton_atras, boton_inicio, boton_avanzar])]
    });
    const collector = interaction.channel.createMessageComponentCollector({ filter: i => i?.isButton() && i.user.id === interaction.user.id, time: 180e3 });
    collector.on(`collect`, async b => {

        switch (b.customId) {
            case `Atrás`: {

                collector.resetTimer();

                if (paginaActual !== 0) {

                    paginaActual -= 1

                    await b.message.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [b.message.components[0]] })
                    await b.deferUpdate();
                } else {
                    paginaActual = embeds.length - 1

                    await b.message.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [b.message.components[0]] })
                    await b.deferUpdate();
                }
            }
                break;

            case `Inicio`: {
                collector.resetTimer();
                paginaActual = 0;
                await b.message.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [b.message.components[0]] })
                await b.deferUpdate();
            }
                break;

            case `Avanzar`: {

                collector.resetTimer();

                if (paginaActual < embeds.length - 1) {

                    paginaActual++
                    await b.message.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [b.message.components[0]] })
                    await b.deferUpdate();

                } else {

                    paginaActual = 0

                    await b.message.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [b.message.components[0]] })
                    await b.deferUpdate();
                }
            }
                break;

            default:
                break;
        }
    });
}