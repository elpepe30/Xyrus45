const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
    .setName("sleep")
    .setDescription("Te duermes un ratito")
    .setDMPermission(false),
 
    async run(client, interaction) {
        require('request')("https://api.otakugifs.xyz/gif?reaction=sleep&format=gif", function (error, response, body){
            var data = JSON.parse(body);
           
        let embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username} esta durmiendo no lo despierten :shushing_face: `)
            .setColor("Random")
            .setImage(data.url);
            
            
            interaction.reply({embeds:[embed]});
        })
    }
}