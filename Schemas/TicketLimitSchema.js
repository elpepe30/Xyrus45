const { Schema, model } = require("mongoose")

const ticket = new Schema({
  guildId: {
    type: String
  },
  limit: {
    type: Number,
    default: 1,
  }
})

module.exports = model("TicketLimit", ticket)