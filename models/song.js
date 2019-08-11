const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var songSchema = new Schema({
  sont_title: {
    type: String
  },
  artists: [
    {
      type: Schema.Types.ObjectId,
      ref: "song"
    }
  ],
  album_name: {
    type: String
  },
  genre: {
    type: String
  },
  release_date: {
    type: Date
  }
});

module.exports = mongoose.model("song", songSchema);
