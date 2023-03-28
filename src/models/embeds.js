const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const embedSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  embed_id: { type: String, required: true },
  channel_id: { type: String, required: true },
  roles: { type: Array, required: true },
  emojis: { type: Array, required: true },
});

module.exports = mongoose.model("Embed", embedSchema);
