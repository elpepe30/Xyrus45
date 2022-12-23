const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription("Besa a alguien 7w7...")
    .setDMPermission(false)
    .addUserOption(option => option.setDescription("¿Un Beso? 7w7").setName("usuario").setRequired(true)),
    async run(client, interaction) {
        require('request')("https://api.otakugifs.xyz/gif?reaction=kiss&format=gif", function (error, response, body){
            var data = JSON.parse(body);
            const user = interaction.options.getUser("usuario");
           

            const autor = interaction.user;
            if(user.id === autor.id) return interaction.reply({ content: "No  puedes besar a ti mismo 🙄", ephemeral: true });


              
const botid = (`${client.user.id}`)
if(user.id === botid ) return interaction.reply({ content: "Porfavor besa a otra persona 😳", ephemeral: true});

        let embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username} beso a ${user.username}`)
            .setColor("Random")
            .setImage(data.url);
            
            
            interaction.reply({embeds:[embed]});
        })
    }
}