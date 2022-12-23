const { Schema, model } = require("mongoose")

const despedidas = new Schema({
      guildID: {
        type: String,
        required: true
      },

      canalID: {
        type: String,
        required: true
      }
})

module.exports = model("despedidas", despedidas)