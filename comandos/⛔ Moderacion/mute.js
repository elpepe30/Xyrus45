const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
	data: new SlashCommandBuilder()
	.setName("mute")
	.setDescription("Mutea a un usuario.")
	.addUserOption(option => option.setName("miembro").setDescription("Elige el miembro que sera muteado.").setRequired(true))
	.addStringOption(option => option.setName("tiempo").setDescription("Elige el tiempo que quieres mutear al miembro.").setRequired(true))
	.addStringOption(option => option.setName("razón").setDescription("Escribe la razón por la que el usuario sera muteado.").setRequired(false)),

	async run(client, interaction){

    const user = interaction.options.getUser("miembro");
	  const tiempo = interaction.options.getString("tiempo");
	  const razon = interaction.options.getString("razón")|| "No especificada.";

		if(!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply({ content: "¡No tienes permisos para usar este comando!", ephemeral: true })

    if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply({ content: '¡No tengo permisos para aislar a alguien!', ephemeral: true })

		const member = await interaction.guild.members.fetch(user.id)

    if(member.permissions.has("Administrator")) return interaction.reply({ content: "❌ | Ese usuario tiene el rol de administrador no puedo aislarlo.", ephemeral: true })

		if(member.isCommunicationDisabled()) return interaction.reply({ content: "❌ | Ese miembro ya ha sido muteado.", ephemeral: true })

		const time = ms(tiempo)

		await member.timeout(time, razon) 

    const embed = new Discord.EmbedBuilder()
		.setDescription(`<:Timeout:1031225800118255636> | ${user} ha sido muteado.\n\n👮‍♂️ | Moderador/Administrador: ${interaction.user}\n\n⏰ | Tiempo: ${tiempo}\n\n📋 | Razón: ${razon}`)
		.setColor("Random")

		interaction.reply({ embeds: [embed] })

		
	}
}