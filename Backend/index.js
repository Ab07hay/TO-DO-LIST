const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 8000;
uri = 'mongodb+srv://abhaymanmode9991:z014vge4nc2Ss4VA@cluster0.9dgvwxo.mongodb.net/Cluster0?retryWrites=true&w=majority'
const todoRoutes = require("./routes/Todo");

const app = express();

// DB connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  }).catch((e)=>{
    console.log(e);
    console.log('connection reject');
  }); 

app.use(cors());
app.use(bodyParser.json());

app.use("/api", todoRoutes);

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
