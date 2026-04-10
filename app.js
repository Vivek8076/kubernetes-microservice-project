const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("App is running 🚀");
});

app.post("/data", async (req, res) => {
  const Data = mongoose.model("Data", { name: String });
  const data = new Data({ name: req.body.name });
  await data.save();
  res.send("Data saved");
});

app.listen(3000, () => console.log("Server running"));