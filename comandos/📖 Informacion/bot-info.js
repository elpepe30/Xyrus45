const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("bot-info")
  .setDescription("Muestra la información del bot."),

  run: async (client, interaction) => {


  let days = 0;
let week = 0;

    let uptime = ``; 
    let totalSeconds = (client.uptime / 1000); 
    let hours = Math.floor(totalSeconds / 3600); 
    totalSeconds %= 3600;  
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    if(hours > 23){ 
        days = days + 1;
        hours = 0;
    }

    if(days == 7){ 
        days = 0;
        week = week + 1;
    }

    if(week > 0){
        uptime += `${week} week, `;
    }

    if(minutes > 60){
        minutes = 0;
    }

    uptime += `${days} Dias, ${hours} Horas, ${minutes} Minutos ${seconds} Segundos.`; 
const embed = new Discord.EmbedBuilder()
.setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
.setThumbnail(client.user.avatarURL())
  .addFields([
    { name: "👑 | Developer", value: `[! 𝗡𝗢𝗧𝗛𝗜𝗡𝗚 ¡#5134](https://discord.com/users/692390107457781760)` },
    { name: "📊 | Servers", value: `${client.guilds.cache.size}` },
    { name: "👥 | Usuarios", value: `${client.users.cache.size}` },
    { name: "📈 | Canales", value: `${client.channels.cache.size}` },
    { name: "📚 | Comandos", value: `${client.slashcommands.size}` },
    { name: "⏲️ | Uptime", value: uptime },
    { name: "📲 | Ram", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB` },
    { name: "🗂️ | Lenguaje", value: `JavaScript` },
    { name: "📚 | Libreria", value: `Discord.js v14.6.0` },
  ])  
.setColor("Random")
interaction.reply({ embeds: [embed] })
}
} 