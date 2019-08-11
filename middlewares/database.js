const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://nick57:messi99@ds261567.mlab.com:61567/musicapp",
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      throw err;
    }
    console.log("Database connected");
  }
);

// mongoose and mlab connection
