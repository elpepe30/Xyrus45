const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const SnakeGame = require('snakecord');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('snake')
    .setDescription('Juega el juego de la serpiente.'),

   async run(client, interaction) {
      
const snakeGame = new SnakeGame({
  title: " El juego de la Serpiente",
  footer: "Juega Con Sabiduria",
  color: "WHITE",
  timestamp: true,
  gameOverTitle: `☠ ${interaction.user.username}, has muerto.`
    })
snakeGame.newGame(interaction);    

interaction.reply({ content: "el juego empezo", ephemeral: true })
           
    }
}