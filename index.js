const discord = require("discord.js")
const fs = require("fs")
const { Client, GatewayIntentBits, Partials,ClientPresence,ClientUser  } = require("discord.js")
const client = new Client({ intents: 3276799 })  
const mongoose = require("mongoose") 
const naotori = require('naotori')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType, ChannelType, PermissionsBitField, Collection, Guild } = require("discord.js");
const AsciiTable = require("ascii-table")
const qdb = require('quick.db')

require('dotenv').config();

client.slashcommands = new discord.Collection()
fs.readdirSync('./comandos').forEach(async(subcarpetas) => {
const slashcommandsFiles = fs.readdirSync(`./comandos/${subcarpetas}`).filter(file => file.endsWith('.js'));

for (const file of slashcommandsFiles) {
	const slash = require(`./comandos/${subcarpetas}/${file}`);
    //console.log(`Los comandos: ${file} Fueron cargados con exito!...`)
	client.slashcommands.set(slash.data.name, slash)
 }
})


mongoose.connect("mongodb+srv://xyrus1234:NOTHING@cluster0.xrkrple.mongodb.net/?retryWrites=true&w=majority", {
    strictQuery: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
var table = new AsciiTable('🛰️ Estado de MongoDB 🛰️')
table
.addRow(`🟢 ¡Base de datos conectada! 🟢`)

console.log(table.toString())
}).catch((e) => {
var table = new AsciiTable('🛰️ Estado de MongoDB 🛰️')
table
.addRow(`🔴 ¡Ocurrió un error al conectarse a MongoDB! 🔴`)

console.log(table.toString())
})

const time = (1000*5)

  let status = [
    [{
      name: `/help | @Xyrus`, ////aqui poner lo que quieras de status////
      type: ActivityType.Playing
    }],
    [{
      name: `1.0.0 | #Xyrus`,
      type: ActivityType.Watching
    }],
    [{
      name: `🎵 | Musica.`,
      type: ActivityType.Listening
    }],
  ]
  setInterval(()=>{
    function randomStatus() {
      let rstatus = status[Math.floor(Math.random() * status.length)];
      client.user.setPresence({ activities: rstatus, status: 'dnd' });
    }
    randomStatus();
  }, time )

  //Cuando el bot encienda
  var table = new AsciiTable('🟢 ¡Bot encendido! 🟢')
  table
    .addRow(`📚 | Comandos`, `${client.slashcommands.size}`)
    .addRow(`📘 | Servidores`, `${client.guilds.cache.size}`)
    .addRow(`📢 | Canales`, `${client.channels.cache.size}`)
    .addRow(`👤 | Usuarios`, `${client.users.cache.size}`)
    .addRow(`🪁 | Memoria`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`)
  .addRow("🏓 | Ping del Bot", `${client.ws.ping} ms`)
  
    console.log(table.toString())
  
//AntiCrash\\
process.on("uncaughtException", (err) => console.log(`\x1b[91m\x1b[1m${err.stack}\x1b[0m`))
process.on("unhandledRejection", (reason) => console.log(`\x1b[91m\x1b[1m${reason.stack}\x1b[0m`))
process.on("shardError", (err) => console.log(`\x1b[91m\x1b[1m${reason.stack}\x1b[0m`))
//AntiCrash\\

//Rol Arcoiris\\
client.on("ready", () => {
    const guild1 = client.guilds.cache.get("1042182580650393640")
    const colorRole = guild1.roles.cache.find(x => x.id === "1042246239892287588");
    setInterval(() => {
        colorRole.edit({
            color: Math.floor(Math.random() * 16777215).toString(16)
        })
    }, 60000);
})

///Cuando mencionan el bot///
client.on('messageCreate', async (message) => {
  
  if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)`)))
{
      if(message.author.bot) return;
  
      const links = new Discord.ActionRowBuilder()
      .addComponents([
        new Discord.ButtonBuilder({
          style: ButtonStyle.Link,
         url: "https://discord.com/oauth2/authorize?client_id=1042170678725582848&permissions=536870382718&scope=bot%20applications.commands",
          label: "Invitame",
          emoji: "🤖",
        }),
        new Discord.ButtonBuilder({
          style: ButtonStyle.Link,
           url: "https://discord.gg/x6hTAVYN35",
          label: "Soporte",
          emoji: "🛠️",
        }), //Xd
                      new Discord.ButtonBuilder({
          style: ButtonStyle.Link,
          url: "https://Xyrus.wolf-gamergame1.repl.co",
          label: "Mi web En Desarrollo",
          emoji: "🖥️",
        }),
    ])

      const embed = new Discord.EmbedBuilder()
       .setTitle("**Xyrus**") 
       .setDescription(`Hola soy Xyrus utiliza **</help:1042183845497286749>** para ver mis comandos \n si necesitas ayuda unete a mi servidor de soporte \n  invitame a tu servidor para disfrutar de mis comandos `)
       .setTimestamp()
       .setColor(" #FFFFFF")

      message.channel.send({ embeds: [embed], components: [links] })
  
  }
})

  ///Cuando mencionan el bot///



 ///Tickets///

const Discord = require('discord.js')

client.on("interactionCreate", (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === "ticket") {
            if (interaction.guild.channels.cache.find(ca => ca.name === `🎟-${interaction.user.discriminator}`)) {
                let canal = interaction.guild.channels.cache.find(ca => ca.name === `🎟-${interaction.user.discriminator}`);

let jaTem = new Discord.EmbedBuilder()
.setDescription(`❌ **Ya tienes un ticket creado: ${canal}.**`)
.setColor('#ff0000')
              
interaction.reply({ embeds: [jaTem], ephemeral: true })
            } else {
                interaction.guild.channels.create({
                    name: `🎟-${interaction.user.discriminator}`,
                    type: 0, //Canal de texto
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ["ViewChannel"]
                        },
                        {
                            id: interaction.user.id,
                            allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
                        },
                    ]
                }).then(ca => {

                    let direciandoaocanal = new Discord.ActionRowBuilder().addComponents(
                        new Discord.ButtonBuilder()
                        .setLabel(`Ticket`)
                        .setEmoji(`🎟️`)
                        .setStyle(5)
                        .setURL(`https://discord.com/channels/${interaction.guild.id}/${ca.id}`)
                    )
                    let newTicket = new Discord.EmbedBuilder()
                    .setDescription(`${interaction.user} **Un nuevo ticket fue abierto: ${ca}!**`)
                    .setColor('Random')

                    interaction.reply({ embeds: [newTicket], components: [direciandoaocanal], ephemeral: true })
                    
                    
                    const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")

let embed = new Discord.EmbedBuilder()
.setTitle(`Bienvenido A Tu Ticket ${interaction.user.username}! `)
.setDescription(`${interaction.user} ** 👋🏼 | Bienvenido , gracias por abrir un ticket.

⏰ | Se te atendera en un momento, solo ten paciencia mientras un miembro del staff te atiende.**`);

const rows = new Discord.ActionRowBuilder()
.addComponents([
   new Discord.ButtonBuilder({
     customId: "closet",                  
     style: ButtonStyle.Danger,
     label: "Borrar Ticket",
     emoji: "🗑",  
   }),
 ]) 

ca.send({ content:` ${everyone}` , embeds: [embed], components: [rows]  }).then(msg => msg.pin())
ca.send(`${interaction.user}`).then(msg => setTimeout(msg.delete.bind(msg), 5000)) 
                })
            }

        } else if (interaction.customId === "closet") {

let bye = new Discord.EmbedBuilder()
.setDescription(`📤 **El ticket sera borrado en: \`5 segundos\` .**`)
.setColor('Random')

            interaction.reply({ embeds: [bye]}).then(() => {
                setTimeout(() => {
                    interaction.channel.delete();
                }, 5000)
            })
        }
    }
}); 

  ///Tickets///
 
//verificacion bot

  const embedverificación = new Discord.EmbedBuilder()
  .setTitle(`✅ |  Verificado Correctamente - Bienvenid@ Al Servidor`)
  .setColor("Green") 
  
  
  client.on("interactionCreate", interaction => {
  if(interaction.isButton()) {
  if(interaction.customId == "Stars") {
    interaction.member.roles.add("1042246242077519995")
    interaction.reply({ embeds: [embedverificación], ephemeral: true })
     
  }
  }
  
  })

//Antilinks\\

const dc = require('discord.js');
const antilinkSchema = require('./Schemas/AntilinkSchema'); // Aqui Tu Schema

client.on(`messageCreate`, async(msg) => {

    if(!msg.guild) return;
    if(msg.author?.bot) return;

    const guild = msg.guild;

    let requireDB = await antilinkSchema.findOne({ _id: guild.id })
    if(!requireDB) return;

    if(requireDB.logs === false) return;

    if(requireDB.logs === true) {

    if(!guild.members.me.permissions.has(dc.PermissionsBitField.Flags.ManageMessages)) return;
    if(msg.member.permissions.has(dc.PermissionsBitField.Flags.Administrator)) return;

    const e = new dc.EmbedBuilder()
    .setDescription(`🗑 No puedes mandar links!`)
    .setColor('Random')

    const url = /((([(https)(http)]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    // Créditos: A NOTHING

    setTimeout(async() => {

    if(url.test(msg) || msg.content.includes('discord.gg/')) {
        msg.channel.send({ embeds: [e], content: `${msg.author}` }).then(mg => setTimeout(mg.delete.bind(mg), 10000 ))
        msg.delete();

        return;
    }

        
    }, 1000); //Aqui coloca el limite de tiempo que quieras
 }

})


//Antibots\\

client.on("guildMemberAdd", async(member) => {

  
    const dc = require("discord.js");
    const botSchema = require("./Schemas/AntibotsSchema"); //Caminho até o schema.

    const guild = member.guild;

    const logs = await botSchema.findOne({ _id: guild.id });

    if(!guild.members.me.permissions.has(dc.PermissionsBitField.Flags.ManageRoles)) return;
    if(!member.user?.bot) return;

    if(!logs) return;
    if(logs?.logs === false) return;

    if(logs?.logs === true) {

        const auditoria = await guild.fetchAuditLogs({
            limit: 1,
            type: 28 //Bot add
          });
          const author = auditoria.entries.first().executor; //Type: User;
          const authorMember = await guild.members.fetch(author.id); // Transformando o author que é um user em membro.
          
          member.kick("Anti bots").catch(e => { console.log(`No tengo permisos para expulsar a: ${member.user.username}(Bot)`) });
          authorMember.kick("Anti Bots").catch(e => { console.log(`No tengo permisos para expulsar a: ${author.username}(User)`) });
    }

});
//Sistema de Niveles
client.on('messageCreate', async (message) => {
  if(message.author.bot) return;

 const levels = require("./Schemas/NivelesSchema")
 const config2 = require('./Schemas/ConfiguracionSchema')

 const data2 = await config2.findOne({ guildId: message.guild.id })

 if(!data2){
   let n = new config2({ 
     guildId: message.guild.id,
     activado: false
   })
  await n.save()
 } 
 
 const data = await levels.findOne({ guildId: message.guild.id, userId: message.author.id })
 
 if(data2.activado === false) return;
 
let randomXp
if(message.content.length <= 5){
       randomXp = Math.floor(Math.random() * 3) + 1
} else if (message.content.length >= 5 && message.content.length <= 30){
       randomXp = Math.floor(Math.random() * 20) + 1
} else if (message.content.length >= 30 && message.content.length <= 50){
       randomXp = Math.floor(Math.random() * 45) + 1
} else if (message.content.length >= 50 && message.content.length <= 70){
       randomXp = Math.floor(Math.random() * 60) + 1
} else if (message.content.length >= 70 && message.content.length <= 80){
       randomXp = Math.floor(Math.random() * 70) + 1
} else if (message.content.length > 80){
       randomXp = Math.floor(Math.random() * 75) + 1
}

if(!data){
      const newdata = new levels({
            guildId: message.guild.id,
            userId: message.author.id, 
            xp: randomXp,
      })

       return await newdata.save()
}

       const xpTotal = data.xp + randomXp

       if(xpTotal >= data.limit){

         const qdb = require('quick.db')

         let canal = await qdb.get(`niveles_${message.guild.id}`)

   if(client.channels.cache.get(await canal)){

     client.channels.cache.get(await canal).send({ content: `¡Felicidades, **${message.author.username}**! has llegado al nivel **${data.level + 1}**.` })
        } else {
           message.channel.send({ content: `¡Felicidades, **${message.author.username}**! has llegado al nivel **${data.level + 1}**.` })
        } 
     
               return await levels.findOneAndUpdate({ guildId: message.guild.id, userId: message.author.id }, { xp: xpTotal, level: data.level + 1, limit: data.limit + 500})
       }

        await levels.findOneAndUpdate({ guildId: message.guild.id, userId: message.author.id }, { xp: xpTotal})
       
 ///Sistema de Niveles///

});

//verificacion bot
const verifi = require("./Schemas/VerificacionSchema")

const embedve = new Discord.EmbedBuilder()
.setTitle(`✅ |  Verificado Correctamente - Bienvenid@ Al Servidor`)
.setColor("Green") 

client.on("interactionCreate", async interaction => {

  const roles = await verifi.findOne({ guildID: interaction.guild.id })
  
  if(interaction.isButton()) {
if(interaction.customId == "verificarse") {
  interaction.member.roles.add(roles.roleID)
  interaction.reply({ embeds: [embedverificación], ephemeral: true })
}
}

})

//Bienvenidas\\

const bs = require("./Schemas/BienvenidasSchema")


client.on("interactionCreate", async interaction  => {

client.on("guildMemberAdd", async member  => {

  const bienvenidas = require("./Schemas/BienvenidasSchema")

  const moment = require('moment');

  let canale = await bs.findOne({ guildID: interaction.guild.id })

  const naotori = require('naotori')

  const holaCard = await new naotori.WelcomeCard()
.setBackground('https://cdn.discordapp.com/attachments/1042246663743483996/1050134930543366246/fondo_transparente_png_by_imsnowbieber_d3jme6i-fullview.png')
.setMemberIcon(member.user.displayAvatarURL({ extension: 'png', size: 4096}))
.setCircleColor('WHITE')
.setTitle(`Bienvenid@ ${member.user.username}`)
.setDescription('Espero que la pases muy bien en el servidor')
.setFont('DEFAULT')

let cardhola = await holaCard.render()
const imagenhola = new Discord.AttachmentBuilder(cardhola, { name: 'bienvenida.png' });

 client.channels.cache.get(canale.cID).send({ files:[imagenhola], })

})
 })


//Despedidas\\

const ds = require("./Schemas/DespedidasSchema")


client.on("interactionCreate", async interaction  => {

client.on("guildMemberRemove", async member  => {

  const moment = require('moment');

  let canale = await ds.findOne({ guildID: interaction.guild.id })

  const naotori = require('naotori')

  const holaCard = await new naotori.WelcomeCard()
.setBackground('https://cdn.discordapp.com/attachments/1042246663743483996/1050134930543366246/fondo_transparente_png_by_imsnowbieber_d3jme6i-fullview.png')
.setMemberIcon(member.user.displayAvatarURL({ extension: 'png', size: 4096}))
.setCircleColor('WHITE')
.setTitle(`Adios ${member.user.username}`)
.setDescription('Esperamos volver a verte')
.setFont('DEFAULT')

let cardhola = await holaCard.render()
const imagenhola = new Discord.AttachmentBuilder(cardhola, { name: 'bienvenida.png' });

 client.channels.cache.get(canale.canalID).send({ files:[imagenhola], })

})
 })



//afk\\

client.on('messageCreate', async (message) => {
  
    const Discord = require("discord.js")

    const afk = require("./Schemas/AfkSchema")
  
    let data = await afk.findOne({ guildId: message.guild.id, userId: message.author.id })
  
    if(message.author.bot) return;
    
    if(data){
      
      await data.delete()
  
      const time = Math.floor(data.TimeAgo / 1000)
  
      if(message.author.id === message.guild.ownerId){
  
        const embed = new Discord.EmbedBuilder()
        .setTitle("✅ | AFK Removido")
        .setDescription(`👋 | ¡Estas de vuelta!\n\n😴 | Su modo afk ha sido removido.\n\n⏰ | Tiempo AFK: <t:${time}:R>`)
        .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
        .setFooter({ text: "✅ | Su afk ha sido removido exitosamente."})
        .setColor("Green")
        .setTimestamp()
  
        message.channel.send({ embeds: [embed] })
        
      } else {
  
        const embed1 = new Discord.EmbedBuilder()
        .setTitle("✅ | AFK Removido")
        .setDescription(`👋 | ¡Estas de vuelta!\n\n😴 | Su modo afk ha sido removido.\n\n⏰ | Tiempo AFK: <t:${time}:R>`)
        .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
        .setFooter({ text: "✅ | Su afk ha sido removido exitosamente."})
        .setColor("Green")
        .setTimestamp()
  
        if(message.member.nickname === null){
         message.member.setNickname(`${message.author.username}`)
        } else {
          message.member.setNickname(`${message.member.nickname.replace("(AFK)", "")}`)
        }
  
        message.channel.send({ embeds: [embed1] })
        
      }
    }
  
    let member = message.mentions.members.first()
  
    if(member){
  
      const afk1 = require("./Schemas/AfkSchema")
      
      let data1 = await afk1.findOne({ guildId: message.guild.id, userId: member.user.id })
  
      if(data1){
  
        const time = Math.floor(data1.TimeAgo / 1000)
  
        const embed2 = new Discord.EmbedBuilder()
        .setTitle("❌ | AFK Activo")
        .setDescription(`😴 | ${member.user.username} no esta disponible.\n\n📋 | Motivo: ${data1.Reason}\n\n⏰ | Tiempo AFK: <t:${time}:R>`)
        .setColor("Red")
         
        message.channel.send({ embeds: [embed2] })
        
      }
    }
    
  });
  

  ///afk///
  
console.log(`Iniciando reactores!...`)


client.on('interactionCreate', async(interaction) => {
	if(!interaction.isCommand()) return;

    const slashcmds = client.slashcommands.get(interaction.commandName)

    if(!slashcmds) return;

    try{
        await slashcmds.run(client, interaction)
    } catch(e) {
        console.error(e)
    }
    
});

const { GiveawaysManager } = require(`discord-giveaways`);

const manager = new GiveawaysManager(client, {
  storage: `./giveaways.json`,
  default: {
    botsCanWin: false,
    embedColor: `#FF0000`,
    embedColorEnd: `#000000`,
    reaction: `🎉`
  }
})

client.giveawaysManager = manager;

fs.readdirSync('./Events').forEach(async(categorias) => {
  const eventFiles = fs.readdirSync(`./Events/${categorias}`).filter(file => file.endsWith(".js"))
 
  for (const file of eventFiles){
    const event = require(`./Events/${categorias}/${file}`);
    client.on(event.name, (...args) => event.run(client, ...args));
  }
})
client.login("MTA0MjE3MDY3ODcyNTU4Mjg0OA.GIx9d8.Zsn_38qZFuBk174d_1P6LstsetHfXe0j_JoVtQ")
