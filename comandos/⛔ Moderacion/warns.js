const Discord = require("discord.js")
const warns = require("../../Schemas/WarnsSchema")
const { paginacion } = require("../../Funciones/Paginacion")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("warns")
  .setDescription("Mira los warns de un usuario.")
  .addUserOption(o => o.setName('usuario').setDescription("El usuario que verás los warns.").setRequired(true)),

async run(client, interaction){
  
  try {
    
    const usuario = interaction.options.getUser("usuario")
    const member = interaction.options.getMember("usuario")

    if(!member) return interaction.reply({content: "❌ | Esa persona no se encuentra en el servidor.", ephemeral: true})
            
   const data = await warns.find({userID: member.user.id, guildID: interaction.guild.id})
      
   if(data.length === 0){
    return interaction.reply({ content: "❌ | Ese usuario no tiene warns.", ephemeral:true })
    }

   const texto = data.map((warn, index) => `**═══════════════════\n🆔 | ID del warn: \`${warn.id}\`**\n**📅 | Fecha del warn:** <t:${Math.round(warn.date / 1000)}>\n**📋 | Razón del warn:** \`${warn.reason}\`\n**👮‍♂️ | Autor del warn: <@${warn.moderatorID}>**\n`)

  await paginacion(client, interaction, texto, `🚨 | Warns de ${member.user.tag}`) 

} catch (e) {
    console.log(e)
    return interaction.reply({
        content: `❌ | Ocurrió un error.`,
        ephemeral: true
    })
}

}
}