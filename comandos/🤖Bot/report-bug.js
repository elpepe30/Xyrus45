const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
const Discord = require("discord.js")


module.exports = {
  data: new SlashCommandBuilder()
  .setName("report-bug") //ponemos un nombre al comando 
  .setDescription("reporta un bug del bot") //ponemos una descripcion 
        .addStringOption(a => a.setName("comando").setDescription("El comando en el que sucede el bug.").setRequired(true)) //ponemos las opciones 
    .addStringOption(a => a.setName("bug").setDescription("El bug que sucede.").setRequired(true)),

  async run(client, interaction){
          
  const comando = interaction.options.getString("comando") //definimos las opciones
    const bug = interaction.options.getString("bug")
          
const solucionado = new ButtonBuilder()  //definimos los botones
		  .setCustomId('solucionado')
		  .setStyle(ButtonStyle.Success)
		  .setLabel('Solucionado')
		  .setEmoji('🟢')

        const nosolucionado = new ButtonBuilder()
                  .setCustomId('nosolucionado')
		  .setStyle(ButtonStyle.Danger)
		  .setLabel('No solucionado')
		  .setEmoji('⛔')

             const borrarreport = new ButtonBuilder()
                  .setCustomId('borrarreport')
		  .setStyle(ButtonStyle.Danger)
		  .setLabel('Borrar')
		  .setEmoji('🗑️')

          const report1 = new ButtonBuilder()
	.setCustomId('report1')
	.setLabel(`Reporte de ${interaction.user.tag}`)
	.setStyle(ButtonStyle.Primary)
	.setDisabled(true);
          
      const boton = new ActionRowBuilder()
        .addComponents(solucionado, nosolucionado, borrarreport, report1) //ponemos los botones 

const embed1 = new Discord.EmbedBuilder() //definimos el embed prencipal 
.setTitle("Nuevo reporte") //ponemos el mensaje principal 
 .addFields(
            {name: "Reporte de:", value: `\`${interaction.user.tag}\``},
            {name: "La ID del usuario es", value: `\`${interaction.user.id}\``}, //xd me tengo q ir bye tengo cole       Bye, hare mas comandos xd xd
            {name: "Del comando:", value: `\`${comando}\``},
            {name: "El reporte es:", value: `\`${bug}\``},
            {name: "Fue en el servidor:", value: `\`${interaction.guild.name}\``},
            {name: "La ID del servidor es:", value: `\`${interaction.guild.id}\``},
            {name: "La hora en cual enviaron el reporte", value: `<t:${Math.round(Date.now()/1000)}:t>`}
          )
           .setColor("Random")
          .setFooter({ text: `Reporte de ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          
          const embed2 = new Discord.EmbedBuilder() //ponemos los embeds para los botones 
          .setTitle("Reporte no solucionado")
          .setDescription(`
          **Reporte no solucionado**
          idUser: ${interaction.user.id}
          user: ${interaction.user.tag}
          reporte: ${bug}
          comando: ${comando}
          `)
          .setColor("Red")
          const embed3 = new Discord.EmbedBuilder()
                .setTitle("Reporte solucionado")
          .setDescription(`
          **Reporte solucionado**
          idUser: ${interaction.user.id}
          user: ${interaction.user.tag}
          reporte: ${bug}
          comando: ${comando}
          `)
          .setColor("Green")

const borrarEmbed = new Discord.EmbedBuilder()
          .setTitle("🗑️| Borra el reporte")
          .setDescription("El reporte se borrara en **5 segundos** ")
          
const m = await client.channels.cache.get("1023059030782001192").send({ embeds: [embed1], components: [boton], fetchReply: true }) //ponemos el canal donde se enviara el embed principal
          const filtro = i => i.user.id === "692390107457781760"; //un filtro 
const collector = m.createMessageComponentCollector({ filter: filtro }) 
         collector.on('collect', async i => {//las interaciones de los botones
		if(i.customId === 'solucionado'){
                    await i.deferUpdate()
            i.editReply({ embeds: [embed3] , components: [] }).then(m => setTimeout(() => m.delete(), 20000)) 
                interaction.user.send({ content: "🌟 El reporte que enviaste fue **solucionado** " })        
        }
		if(i.customId === 'nosolucionado'){
			 await i.deferUpdate()
            i.editReply({ embeds: [embed2] , components: [] }).then(m => setTimeout(() => m.delete(), 20000)) 
                        interaction.user.send({ content: "🔴 El reporte que enviaste  **no pudo ser solucionado** " })
        }
                 	if(i.customId === 'borrarreport'){
			 await i.deferUpdate()
            i.editReply({ embeds: [borrarEmbed] , components: [] }).then(m => setTimeout(() => m.delete(), 5000)) 
                        interaction.user.send({ content: "🗑️ Tu reporte fue borrado " })
        }
         
         })
         interaction.reply({ content: "Reporte enviado correctamente gracias por enviar el reporte haci podemos reparar al bot, recuerda tener el dm activado", ephemeral: true })
  }
}