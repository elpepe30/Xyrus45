const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Banear a un miembro del servidor.")
    .addUserOption(option => option.setName("miembro").setDescription("El miembro que sera baneado.").setRequired(true))
    .addStringOption(option => option.setName("razón").setDescription("La razón por la que el miembro sera baneado.").setRequired(true)),

    async run(client, interaction){

     const perms = interaction.user.id === "835232480931348531" || interaction.user.id === "979884922468712550"
    
    if (perms) return interaction.reply({ content: "Tú no puedes interactuar conmigo.", ephemeral: true }) 

      const user = interaction.options.getUser('miembro');
      
      const razon = interaction.options.getString('razón')

      if(!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({ content: "¡No tienes permisos para banear personas!", ephemeral: true })
  
      if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({ content: '¡No tengo permisos para banear personas!', ephemeral: true })

      const member = await interaction.guild.members.fetch(user.id)

      await member.ban({ reason: razon })

      const banembed = new Discord.EmbedBuilder()
      .setTitle('✅ | ¡Se ha baneado a un miembro del servidor!')
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .addFields([
        { name: "👮‍♂️ | Moderador/Administrador:", value: `${interaction.user}` },
        { name: "👤 | Usuario:", value: `${user}` },
        { name: "📋 | Razón:", value: `${razon}` },         
      ])
      .setColor('Random')
      .setTimestamp()
      .setFooter({ text: `Ejecutado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

      interaction.reply({ embeds: [banembed] })
    }
}
