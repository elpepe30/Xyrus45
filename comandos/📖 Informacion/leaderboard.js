const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")
const levels = require("../../Schemas/NivelesSchema");
const niveles = require("../../Schemas/ConfiguracionSchema")

module.exports = {
	data: new SlashCommandBuilder()
	.setName("leaderboard")
	.setDescription("Muestra una tabla con las personas con mas nivel en el servidor."),
	
	async run(client, interaction){

    const perms = interaction.user.id === "835232480931348531" || interaction.user.id === "979884922468712550"
    
    if (perms) return interaction.reply({ content: "Tú no puedes interactuar conmigo.", ephemeral: true })

    let dataxd = await niveles.findOne({ guildId: interaction.guild.id }) 

    if(dataxd.activado === false) return interaction.reply({ content: "El sistema de niveles está desactivado.", ephemeral: true })

                await interaction.deferReply()
                
                let dataGlobal = await levels.find({ guildId: interaction.guild.id }).sort([["xp", "descending"]]).exec();
                dataGlobal = dataGlobal.slice(0, 10);
                if(!dataGlobal) return interaction.reply({ content: "Nadie tiene xp en este servidor.", ephemeral: true });

                const puestoUsuario = dataGlobal.findIndex(dataUser => dataUser.userId === interaction.user.id) + 1

                const embed = new Discord.EmbedBuilder()
.setAuthor({ name: `Leaderboard de ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setDescription(`${dataGlobal.map((data, index) => `${index === 0  ? "🥇 |" : index === 1  ? "🥈 |" : index === 2  ? "🥉 |" : index + 1 ? `${index + 1}.` : index + 1 } ${client.users.cache.get(data.userId)} - \`Nivel ${data.level}\` - \`${data.xp} XP\``).join("\n")}`)
.setColor("Random")

                interaction.followUp({ embeds: [embed] });
		
   	}
  }