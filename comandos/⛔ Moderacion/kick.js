const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kickear a un miembro del servidor.")
    .addUserOption(option => option .setName("miembro").setDescription("El miembro que sera kickeado.").setRequired(true))
    .addStringOption(option => option .setName("razón").setDescription("La razón por la que el miembro sera kickeado.").setRequired(true)),

    async run(client, interaction){

      const user = interaction.options.getUser('miembro');
      const razon = interaction.options.getString('razón')

      if(!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) return interaction.reply({ content: "¡No tienes los suficientes permisos!", ephemeral: true })
      
    if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.KickMembers)) return interaction.reply({ content: '¡No tengo los suficientes permisos!', ephemeral: true })

      const member = await interaction.guild.members.fetch(user.id)

      await member.kick({ reason: razon })

      const kickembed = new Discord.EmbedBuilder()
      .setTitle('✅ | ¡Se ha kickeado a un miembro del servidor!')
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .addFields([
        { name: "👮‍♂️ | Moderador/Administrador:", value: `${interaction.user}` },
        { name: "👤 | Usuario:", value: `${user}` },
        { name: "📋 | Razón:", value: `${razon}` },
      ])  
      .setColor('Random')
      .setTimestamp()
      .setFooter({ text: `Ejecutado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

      interaction.reply({ embeds: [kickembed] })
    }
}