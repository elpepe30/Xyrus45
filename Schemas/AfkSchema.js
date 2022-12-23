const { Schema, model } = require("mongoose")

const afk = new Schema({
  guildId: String,
  userId: String,
  TimeAgo: String,
  Reason: String
})

module.exports = model("afk", afk)