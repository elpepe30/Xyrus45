const {model, Schema} = require("mongoose")

const warns = new Schema({
  
  guildID: {
    type: String,
    required: true
  },

  userID: {
    type: String,
    required: true
  },

  id: {
    type: String,
    required: true
  },

  moderatorID: {
    type: String,
    required: true
  },

  reason: {
    type: String,
    required: true
  },

  date: {
    type: Number,
    required: true
  }
  
})

module.exports = model("warns", warns)