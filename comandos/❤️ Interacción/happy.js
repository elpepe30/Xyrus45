const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
    .setName("happy")
    .setDescription("Te pones feliz :)")
    .setDMPermission(false),
 
    async run(client, interaction) {
        require('request')("https://api.otakugifs.xyz/gif?reaction=happy&format=gif", function (error, response, body){
            var data = JSON.parse(body);
           
        let embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username} esta muy feliz, comparte esa felicidad`)
            .setColor("Random")
            .setImage(data.url);
            
            
            interaction.reply({embeds:[embed]});
        })
    }
}