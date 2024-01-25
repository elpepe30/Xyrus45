const discord = require("discord.js")
const fs = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { clientId, Token } = require("./config.json")

const commands = [];


require('dotenv').config();

fs.readdirSync('./comandos').forEach(async(subcarpetas) => {
const slashcommandsFiles = fs.readdirSync(`./comandos/${subcarpetas}`).filter(file => file.endsWith('.js'));
for (const file of slashcommandsFiles) {
	const command = require(`./comandos/${subcarpetas}/${file}`);
    console.log(`=======================|\n${file}\n=======================|\n`)
	commands.push(command.data.toJSON());
}
})

const rest = new REST({ version: '9' }).setToken(process.env['Token']);

(async () => {
	try {
		console.log('Iniciando la actualización de (/) comandos de aplicación');

		await rest.put(
			Routes.applicationCommands(process.env['BotID']),
			{ body: commands },
		)
        .then(() => console.log(`(/) Comandos de aplicación recargados con éxito`));
	} catch (error) {
		console.error(error);
	}
})();
