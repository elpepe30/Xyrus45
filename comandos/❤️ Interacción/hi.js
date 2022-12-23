const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
    .setName("hi")
    .setDescription("Saluda a Alguien !")
    .setDMPermission(false)
    .addUserOption(option => option.setDescription("¿Un Saludo?").setName("usuario").setRequired(false)),
    async run(client, interaction) {
        require('request')("https://api.otakugifs.xyz/gif?reaction=wave&format=gif", function (error, response, body){
            var data = JSON.parse(body);
          
            const user = interaction.options.getUser("usuario");
         
            const user1 = interaction.options.getUser("usuario");

            
            const embedtodos = new EmbedBuilder()
            .setTitle(`${interaction.user.username} Saludo a todo el mundo`)
            .setImage(data.url)
            if(!user1) return interaction.reply({embeds:[embedtodos]});


        let embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username} Saludo a ${user.username}`).setColor("Random").setImage(data.url);
            
            
            interaction.reply({embeds:[embed]});
        })
    }
}