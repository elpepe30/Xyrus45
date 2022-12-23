const { SlashCommandBuilder } = require("@discordjs/builders");
const { Rank } = require("canvacord");
const Discord = require("discord.js");
const levels = require("../../Schemas/NivelesSchema");
const niveles = require("../../Schemas/ConfiguracionSchema")

module.exports = {
	data: new SlashCommandBuilder()
	.setName("rank")
	.setDescription("Muestra tu xp en el sistema de niveles.")
  .addUserOption(option => option.setName("usuario").setDescription("Mira el rango de otro usuario.")),
	
	async run(client, interaction){

    let dataxd = await niveles.findOne({ guildId: interaction.guild.id }) 

    if(dataxd.activado === false) return interaction.reply({ content: "El sistema de niveles está desactivado.", ephemeral: true })

                const member = interaction.options.getMember("usuario") || interaction.member;

                const data = await levels.findOne({ guildId: interaction.guild.id, userId: member.user.id });
        if(!data) return interaction.reply({ content: "No encontre un progreso registrado.", ephemeral: true})

let dataGlobal = await levels.find({ guildId: interaction.guild.id });
                if(!dataGlobal) return interaction.reply({ content: "Nadie tiene un progreso registrado en este servidor.", ephemeral: true}).sort([["xp", decending]]).exec();

                const rankCard = new Rank()
                .setAvatar(member.user.displayAvatarURL({ size: 2048, format: "png" }))
                .setCurrentXP(data.xp)
                .setRequiredXP(data.limit)
                .setLevel(data.level)
                .setStatus(member.presence ? member.presence.status : "online")
                .setProgressBar("#00FAAF", "COLOR")
                .setOverlay("#000000")
                .setUsername(member.user.username)
                .setDiscriminator(member.user.discriminator)
                .setRank(dataGlobal.findIndex(dataUser => dataUser.userId === member.user.id) + 1)

                const buffer = await rankCard.build();

                const attachment = new Discord.AttachmentBuilder(buffer, {name: "rank.png"});

                interaction.reply({ files: [attachment] })
                
	}
} //no me funcionafunciona