const { Schema, model } = require("mongoose")

const snipe = new Schema({
  channelId: {
    type: String,
    required: true
  },

  channelName: {
    type: String,
  },

  message: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  avatar: {
    type: String,
  },

  time: {
    type: Number,
    required: true
  },
})

module.exports = model("SnipeSchema", snipe)