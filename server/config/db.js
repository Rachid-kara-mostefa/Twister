const mongoose = require("mongoose");
// RELIER LA BDD AU CODE JS
mongoose
    .connect("mongodb+srv://" + process.env.DB_USERMAT +".@cluster0.lca228j.mongodb.net/ProjectAans",
       /* {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }*/
            )
    .then(() => console.log('connected to MongoDb'))
    .catch((err) => console.log("Failed to connect to MongoDb", err));