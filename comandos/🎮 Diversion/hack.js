const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require(`discord.js`)

module.exports = {
    data: new SlashCommandBuilder()
    .setName("hack")
    .setDescription("hackea un usuario.")
    .addUserOption((option) => option.setName('usuario').setDescription('Selecciona a un usuario.').setRequired(false)),
  
    async run(client, interaction){
  
    var ip1 = ["192","198","193", "168"]//las ips que quieras
    var ip2 = ["1226","1572","8021","1020"]//las ips que quieras
    var ip3 =["0175","1013","102","No encontrado"]//las ips que quieras
    var paises = ["España","Puerto rico","Mexico","Venezuela","Italia","Chile","Peru","Portugal","Republica Dominicana","Colombia","El salvador","Honduras","Guatemala","Nicaragua","Panama","Argentina","Uruguay","Paraguay","Bolivia","Estados unidos","Canada",]//Los paises que quieres agregar
    var correos = ["gmail.com","outlock.com","yahoo.com", "protonmail.com"]//Puedes agregar los correos que quieras
    var contraseñas =["Pedroselacome123","Hola123123","megustatuprima671","tuprimaseñacome699","memide50cm","100000cm","1234677","181920"]//las contraseñas que quieras
    var tokens = ["MTAwMTk1NjI1MjU0NjUwMjcxNw.GJH0MA.mjNDr-VlkRbsaJFkmiAA7hITX8cbXjilF_50mo","MTAwNTg2ODQ0NjAxOTQ5Mzk1OA.Gzdxsw.f6f6BNECoFYKwk4fu-DC9b-YMOUiINJ2JRZTF0","MTAwODIxNDM2Mjc2MDE1MTIxMA.G6Xu3s.sJx0mZRRUnsyghWz8TMOMc3wpd4ByVTZX3RfgU","MTAwODQyMzQwMTg1NTEzMTczOA.Gs7H-Y.n70p_DH-dzXEDuL2KDqQtxgTdLeTfK42XYTTF0","MTAyMzM4NjIwNzM0Mzg3ODE0NA.GsIlpV.8r58fc6cIfSVh8b6Dxd_OKU9JZBqAa_e0QFrho"]//Puedes agregar los tokens que quieras aclaro que ninguno funciona
    
    //Esto es para que los resultados sean random
    var ip1 = ip1[Math.floor(Math.random()*ip1.length)]
    var ip2 = ip2[Math.floor(Math.random()*ip2.length)]
    var ip3 = ip3[Math.floor(Math.random()*ip3.length)]
    var correos = correos[Math.floor(Math.random()*correos.length)]
    var contraseñas = contraseñas[Math.floor(Math.random()*contraseñas.length)]
    var paises = paises[Math.floor(Math.random()*paises.length)]
    var tokens = tokens[Math.floor(Math.random()*tokens.length)]
    

    
    const miembro = interaction.options.getUser('usuario') || interaction.user;
  
    const userid = interaction.options.getUser("usuario") || interaction.user;

    
   let ownerid = ["692390107457781760"] 

   const embedowner = new Discord.EmbedBuilder()
   .setTitle(`Pensaste que me podias hackear`)
   .setDescription(`Pues no no puedes`)
   if(ownerid.includes(userid.id)) return interaction.reply({ embeds: [embedowner] })

   const embedusuario = new Discord.EmbedBuilder()
      .setTitle(`Has hackeado a ${miembro.tag}`)
      .setDescription("Los datos estan aqui ")
      .addFields(
        {name: "IP:", value: `${ip1}.${ip2}.${ip3}`},
        {name: "Correo:", value: `**${miembro.tag}@${correos}**`},
        {name: "Contraseña:", value: `**${contraseñas}**`},
        {name: "Pais:", value: `**${paises}**`},
        {name: "Token:", value: `**${tokens}**`}


      )
  
  interaction.reply({ embeds: [embedusuario] })//Envia el embed 
  
      }
  }//Aqui termina el comando