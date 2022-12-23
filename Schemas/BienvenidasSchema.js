const { Schema, model } = require("mongoose")

const bienvenidas = new Schema({
      guildID: {
        type: String,
        required: true
      },

      cID: {
        type: String,
        required: true
      }
})

module.exports = model("bienvenidas", bienvenidas)