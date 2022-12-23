const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
	.setName("unmute")
	.setDescription("Desmutea a un usuario muteado.")
	.addUserOption(option => option.setName("miembro").setDescription("Elige al miembro que se le va a remover el mute.").setRequired(true)),

	async run(client, interaction){

    const user = interaction.options.getUser("miembro")
	  
		if(!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply({ content: "¡No tienes permisos para esto!", ephemeral: true })

    if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply({ content: '¡No tengo permisos para esto!', ephemeral: true })

		const member = await interaction.guild.members.fetch(user.id)

		if(!member.isCommunicationDisabled()) return interaction.reply({ content: "Ese miembro no esta muteado.", ephemeral: true })

		await member.timeout(null) 

		interaction.reply(`✅ | Se le a removido el mute a **${user.username}** correctamente!`)

		
	}
}