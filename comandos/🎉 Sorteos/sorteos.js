const { SlashCommandBuilder } = require(`@discordjs/builders`)
const Discord = require(`discord.js`)
const  ms = require(`ms`)

module.exports = {
    data: new SlashCommandBuilder()
    .setName('sorteos')
    .setDescription("A")
    .addSubcommand(subcommand =>
		subcommand
    .setName(`start`)
    .setDescription(`Iniciara un sorteo.`)
    .addStringOption(option => option.setName(`tiempo`).setDescription(`El tiempo que durara el sorteo.`).setRequired(true))
    .addChannelOption(option => option.setName(`canal`).setDescription(`El canal donde se hara el sorteo.`).setRequired(true))
    .addStringOption(option => option.setName(`ganadores`).setDescription(`El número de ganadores del sorteo.`).setRequired(true))
    .addStringOption(option => option.setName(`premio`).setDescription(`El premio del sorteo.`).setRequired(true)))
    .addSubcommand(subcommand =>
		subcommand
    .setName(`restart`)
    .setDescription(`Quita la pausa de un sorteo mediante su id.`)
    .addStringOption(o => o.setName(`id`).setDescription(`La id del mensaje del sorteo.`).setRequired(true)))
    .addSubcommand(subcommand =>
		subcommand
    .setName(`reroll`) 
    .setDescription(`Da otro ganador de un sorteo mediante su id`)
    .addStringOption(o => o.setName(`id`).setDescription(`la id del mensaje del sorteo`).setRequired(true)))
    .addSubcommand(subcommand =>
		subcommand
    .setName(`pause`) //Establecemos un nombre
    .setDescription(`Pausa un sorteo  mediante su id`)
    .addStringOption(o => o.setName(`id`).setDescription(`la id del mensaje del sorteo`).setRequired(true)))
    .addSubcommand(subcommand =>
		subcommand
    .setName(`end`) //Establecemos un nombre
    .setDescription(`Finaliza un sorteo mediante su id`)
    .addStringOption(o => o.setName(`id`).setDescription(`la id del mensaje del sorteo`).setRequired(true)))
    .addSubcommand(subcommand =>
		subcommand
    .setName(`delete`) //Establecemos un nombre
    .setDescription(`Elimina un sorteo mediante su id`)
    .addStringOption(o => o.setName(`id`).setDescription(`la id del mensaje del sorteo`).setRequired(true))),
  
    /**
     * 
     * @param {*} client 
     * @param {Discord.CommandInteraction} interaction 
     * @returns 
     */
    async run(client, interaction){

      if(interaction.options.getSubcommand() === "start"){
         if(!interaction.member.permissions.has(`ManageGuild`)) return interaction.reply({ content:  `${client.no}  No tienes los permisos necesarios para ejecutar este comando. Para ejecutarlo necesitas los siguientes permisos: \`Gestionar Servidor\``, ephemeral: true})

        const tiempo = interaction.options.getString(`tiempo`)
        const canal = interaction.options.getChannel(`canal`)
        const ganadores = interaction.options.getString(`ganadores`)
        const premio = interaction.options.getString(`premio`)

        let time = ms(tiempo)

        if(!interaction.guild.members.me.permissions.has(`ManageGuild`)) return interaction.reply({ content: `Necesito los permisos de \`Gestionar Servidor\` para usar este comando`, ephemeral: true })

        if(!interaction.member.permissions.has(`ManageGuild`)) return interaction.reply({ content: `Necesitas los permisos de \`Gestionar Servidor\` para usar este comando`, ephemeral: true})

        if(!time) return interaction.reply({ content: `No has espefificado un tiempo valido!`, ephemeral: true })
        client.giveawaysManager.start(canal, {
            duration: time,
            winnerCount: Number(ganadores),
            hostedBy: interaction.user,
            prize: premio,
            messages: {
                giveaway: `🎉 | **Nuevo Sorteo!**`,
                giveawayEnded: `📆 | **Sorteo Finalizado!**`,
                inviteToParticipate: `**Reacciona con \`🎉\` para participar.**`,
                winMessage: ganadores > 1 ? `🥳 | Enhorabuena {winners} Ganaron {this.prize}!` : `🥳 | En hora buena {winners} has ganado {this.prize}!`,
                winners: ganadores > 1 ? `🎁 | Ganadores` : `🎁 | Ganador`,
                hostedBy: `🎉 | Hosteado por {this.hostedBy}`,
                endAt: `⌚ | Finalizado el`,
                drawing: `⌛ | Termina en <t:{Math.round(this.endAt / 1000)}:R>`,
            },
            pauseOptions: {
                isPaused: false,
                content: '⚠️ |  **ESTE SORTEO ESTA PAUSADO**',
                unPauseAfter: null,
                embedColor: '#FFFF00',
                infiniteDurationText: null
            }
        }).then(() => {
            interaction.reply({ content: `✅ | ¡Sorteo iniciado en ${canal} correctamente!`, ephemeral: true })
        })
      } else if(interaction.options.getSubcommand() === "restart"){
        if(!interaction.member.permissions.has(`ManageGuild`)) return interaction.reply({ content:  `❌ | No tienes los permisos necesarios para ejecutar este comando. Para ejecutarlo necesitas los siguientes permisos: \`Gestionar Servidor\``, ephemeral: true})

        const id = interaction.options.getString(`id`)

        client.giveawaysManager.unpause(id).then(() => {
            return interaction.reply({ content: `✅ | Sorteo Reiniciado!`, ephemeral: true })
        }).catch(() => {
            return interaction.reply({ content: `**❌ | No se ha encontrado el sorteo o el sorteo no estaba pausado**`, ephemeral: true })
        })
      } else if(interaction.options.getSubcommand() === "reroll"){
        if(!interaction.member.permissions.has(`ManageGuild`)) return interaction.reply({ content:  `❌ | No tienes los permisos necesarios para ejecutar este comando. Para ejecutarlo necesitas los siguientes permisos: \`Gestionar Servidor\``, ephemeral: true})

        const id = interaction.options.getString(`id`)

        client.giveawaysManager.reroll(id).then(() => {
          interaction.reply(`✅ | Nuevo ganador elegido correctamente!`);
        }).catch((err) => {
          interaction.reply(`❌ | No se ha encontrado el sorteo!`);
        });
      } else if(interaction.options.getSubcommand() === "pause"){
        if(!interaction.member.permissions.has(`ManageGuild`)) return interaction.reply({ content:  `❌ | No tienes los permisos necesarios para ejecutar este comando. Para ejecutarlo necesitas los siguientes permisos: \`Gestionar Servidor\``, ephemeral: true})
        const id = interaction.options.getString(`id`)

        client.giveawaysManager.pause(id).then(() => {
            return interaction.reply({ content: `✅ | Sorteo Pausado!`, ephemeral: true })
        }).catch(() => {
            return interaction.reply({ content: `❌ | No se ha encontrado el sorteo o  ya estaba pausado.`, ephemeral: true })
        })
      } else if(interaction.options.getSubcommand() === "end"){
        if(!interaction.member.permissions.has(`ManageGuild`)) return interaction.reply({ content:  `❌ | No tienes los permisos necesarios para ejecutar este comando. Para ejecutarlo necesitas los siguientes permisos: \`Gestionar Servidor\``, ephemeral: true})
        const id = interaction.options.getString(`id`)

        client.giveawaysManager.end(id).then(() => {
        interaction.reply(`✅ | Sorteo finalizado!`);
            }).catch((err) => {
          interaction.reply(`❌ | No se ha encontrado el sorteo!`);
          });
      } else if(interaction.options.getSubcommand() === "delete"){
        if(!interaction.member.permissions.has(`ManageGuild`)) return interaction.reply({ content:  `❌ | No tienes los permisos necesarios para ejecutar este comando. Para ejecutarlo necesitas los siguientes permisos: \`Gestionar Servidor\``, ephemeral: true})
        const id = interaction.options.getString(`id`)

        client.giveawaysManager.delete(id).then(() => {
            return interaction.reply({ content: `✅ | ¡Sorteo Eliminado!`, ephemeral: true })
        }).catch(() => {
            return interaction.reply({ content: `❌ | No se ha encontrado el sorteo.`, ephemeral: true })
        })
      }
   }
}
