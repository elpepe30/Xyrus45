const { SlashCommandBuilder } = require("@discordjs/builders")
const { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require("discord.js")
const fs = require("fs")
const Discord = require("discord.js")
  
module.exports = {
  data: new SlashCommandBuilder()
  .setName("help")
  .setDescription("Menu de ayuda."),

  async run (client, interaction) {

    const optionsArr = []

const commandsFolder = fs.readdirSync('./comandos')
for (const category of commandsFolder) {
    optionsArr.push({ label: `${category}`, description: `Mis comandos de ${category}`, value: `${category}` })
}

const embed = new EmbedBuilder()
.setTitle('Menu de ayuda')
.setColor('#FFFFFF')
.setDescription(`Hola **${interaction.user.username}**  ! Soy Xyrus Este es 
mi menu de ayuda aqui podras ver todos mis comandos que buscan mejorar tu servidor 

recuerda ver estos links


[**Servidor de Soporte**](https://discord.gg/x6hTAVYN35)

[**Pagina Web**](https://Xyrus.wolf-gamergame1.repl.co)

[**Invitacion Del Bot**](https://discord.com/oauth2/authorize?client_id=1042170678725582848&permissions=536870382718&scope=bot%20applications.commands)

`)

const menu = new ActionRowBuilder()
.setComponents(
    new SelectMenuBuilder()
    .setCustomId('menu-help')
    .addOptions(optionsArr)
)

await interaction.reply({ embeds: [embed], components: [menu] }).then(async (msg) => {
    const filter = (m) => m.user.id == interaction.user.id
    const collector = msg.createMessageComponentCollector({ filter, time: 60000 })

    collector.on('collect', async (i) => {
        i.deferUpdate();
        const seleccionado = i.values[0]
        const commandsArr = []
        const commandsFiles = fs.readdirSync(`./comandos/${seleccionado}`)

        for (const command of commandsFiles) {
            if (command.endsWith('.js')) {
                commandsArr.push(command.replace(/.js/g, ''))
            }
        }

        embed.setDescription(`Comandos de  ${seleccionado}`)
        embed.setFields([
            { name: 'Comandos', value: `\`\`\`${commandsArr.join(', ')}\`\`\`` }
        ])

        interaction.editReply({ embeds: [embed] })
    })
})

}
}