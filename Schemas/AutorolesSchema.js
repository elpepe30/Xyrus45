const { Schema, model } = require("mongoose")

const autoroles = new Schema({
         GuildId: String,
         MessageId: String,
         Rol1Id: String,
         Rol2Id: String,
         Rol3Id: String,
         Rol4Id: String,
         Rol5Id: String  
})

module.exports = model("autoroles", autoroles);