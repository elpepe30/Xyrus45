const { SlashCommandBuilder} = require('@discordjs/builders')
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Discord = require('discord.js')
const math = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('calculadora')
    .setDescription('Usa una calculadora !'),

    async run(client, interaction){

  const embed = new Discord.EmbedBuilder()

       const rows = [
            new ActionRowBuilder().addComponents([
                new ButtonBuilder({
                    customId: 'clear',
                    style: ButtonStyle.Danger,
                    label: "AC",
                }),
                new ButtonBuilder({
                    customId: '(',
                    style: ButtonStyle.Primary,
                    label: "(",
                }),
                new ButtonBuilder({
                    customId: ')',
                    style: ButtonStyle.Primary,
                    label: ")",
                }),
                new ButtonBuilder({
                    customId: '/',
                    style: ButtonStyle.Primary,
                    label: "➗",
                })
            ]),
            new ActionRowBuilder().addComponents([
                new ButtonBuilder({
                    customId: '7',
                    style: ButtonStyle.Secondary,
                    label: "7",
                }),
                new ButtonBuilder({
                    customId: '8',
                    style: ButtonStyle.Secondary,
                    label: "8",
                }),
                new ButtonBuilder({
                    customId: '9',
                    style: ButtonStyle.Secondary,
                    label: "9",
                }),
                new ButtonBuilder({
                    customId: '*',
                    style: ButtonStyle.Primary,
                    label: "✖️",
                })
            ]),
            new ActionRowBuilder().addComponents([
                new ButtonBuilder({
                    customId: '4',
                    style: ButtonStyle.Secondary,
                    label: "4",
                }),
                new ButtonBuilder({
                    customId: '5',
                    style: ButtonStyle.Secondary,
                    label: "5",
                }),
                new ButtonBuilder({
                    customId: '6',
                    style: ButtonStyle.Secondary,
                    label: "6",
                }),
                new ButtonBuilder({
                    customId: '-',
                    style: ButtonStyle.Primary,
                    label: "➖",
                })
            ]),
            new ActionRowBuilder().addComponents([
                new ButtonBuilder({
                    customId: '1',
                    style: ButtonStyle.Secondary,
                    label: "1",
                }),
                new ButtonBuilder({
                    customId: '2',
                    style: ButtonStyle.Secondary,
                    label: "2",
                }),
                new ButtonBuilder({
                    customId: '3',
                    style: ButtonStyle.Secondary,
                    label: "3",
                }),
                new ButtonBuilder({
                    customId: '+',
                    style: ButtonStyle.Primary,
                    label: "➕",
                })
            ]),
            new ActionRowBuilder().addComponents([
                new ButtonBuilder({
                    customId: 'backspace',
                    style: ButtonStyle.Primary,
                    label: "⬅️",
                }),
                new ButtonBuilder({
                    customId: '0',
                    style: ButtonStyle.Secondary,
                    label: "0",
                }),
                new ButtonBuilder({
                    customId: '.',
                    style: ButtonStyle.Primary,
                    label: ".",
                }),
                new ButtonBuilder({
                    customId: 'result',
                    style: ButtonStyle.Success,
                    label: "=",
                })
            ]),
        ];

        const msg = await interaction.reply({
            components: rows,
            embeds: [{
                description: "```\n0000\n```",
            }],
            fetchReply: true,
        });

        let data = "";

        const col = msg.createMessageComponentCollector({
            filter: i => i.user.id === interaction.user.id,
            time: 600000
        });

        col.on('collect', async (i) => {
            if (i.customId === "result") {
                try {
                    data = math.evaluate(data).toString();
                } catch (e) {
                    data = "Ocurrió un error, haga click en AC para reiniciar."
                }
            } else if (i.customId === "clear") {
                    data = "";
            } else if (i.customId === "backspace") {
                data = data.slice(0, data.length - 2);
            } else {
                const lc = data[data.length - 1];

                data += `${(
                    (parseInt(i.customId) == i.customId || i.customId === ".")
                    &&
                    (lc == parseInt(lc) || lc === ".")
                ) ? "" : " "}` + i.customId;
            }

            i.update({
                embeds: [{
                    description: `\`\`\`\n${data}\n\`\`\``
                }]
            })
        })

        col.on('end', () => {
            msg.edit({
                components: [new ActionRowBuilder().addComponents([
                    new ButtonBuilder({
                        label: "Ups la bateria de la calculadora se agoto.",
                        disabled: true,
                        style: ButtonStyle.Danger,
                        customId: "_1_"
                    })
                ])]
            })
        })

    }
}