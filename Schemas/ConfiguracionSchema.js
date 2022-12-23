const { Schema, model } = require("mongoose")

const configlevels = new Schema({
      guildId: {
        type: String,
        required: true
      },

      activado: {
        type: Boolean,
        default: false
      }
})

module.exports = model("config", configlevels)