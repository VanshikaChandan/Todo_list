const express = require("express");
const bodyparser = require("body-parser");

//const path = require("path");

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); //this is because we are using body parser module

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todo1");
const trySchema = new mongoose.Schema({
  name: String,
});
// Define the Mongoose model using the schema
const item = mongoose.model("Item", trySchema);
// async function saveData() {
//   try {
//     const todo = new item({
//       name: "Create videos",
//     });
//     const todo1 = new item({
//       name: "Practice DSA",
//     });
//     const todo2 = new item({
//       name: "Make projects",
//     });

//     await todo.save();
//     await todo1.save();
//     await todo2.save();
//     console.log("Data saved successfully!");
//   } catch (error) {
//     console.error("Error while saving data:", error);
//   }
// }

//saveData();
mongoose.connection.once("open", function () {
  console.log("Connected to MongoDB!");

  app.get("/", async function (req, res) {
    try {
      const foundItems = await item.find({});
      res.render("list", { ejes: foundItems });
    } catch (error) {
      console.error("Error while fetching data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.post("/", function (req, res) {
    const itemName = req.body.ele1;
    const todo4 = new item({
      name: itemName,
    });
    todo4.save();
    res.redirect("/");
  });

  app.post("/delete", async function (req, res) {
    const checked = req.body.checkbox1;
    try {
      await item.findByIdAndRemove(checked).exec();
      console.log("deleted");
      res.redirect("/");
    } catch (error) {
      console.error("Error while deleting data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.listen(3000, function () {
    console.log("server created");
  });
});
