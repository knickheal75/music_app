const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var artistSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  is_famous: {
    type: Boolean,
    default: false
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "song"
    }
  ]
});

module.exports = mongoose.model("artist", artistSchema);
