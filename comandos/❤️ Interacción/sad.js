const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
    .setName("sad")
    .setDescription("Te pones triste :(")
    .setDMPermission(false),
 
    async run(client, interaction) {
        require('request')("https://api.otakugifs.xyz/gif?reaction=sad&format=gif", function (error, response, body){
            var data = JSON.parse(body);
           
        let embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username} esta triste ayudenlo`)
            .setColor("Random")
            .setImage(data.url);
            
            
            interaction.reply({embeds:[embed]});
        })
    }
}