const { Schema, model } = require("mongoose")

const verificacion = new Schema({
      guildID: {
        type: String,
        required: true
      },

      roleID: {
        type: String,
        required: true
      },
})

module.exports = model("verificacion", verificacion)