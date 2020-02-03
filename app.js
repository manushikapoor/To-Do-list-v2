//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true,useUnifiedTopology: true} );

const itemSchema={
name : String
};

const item=mongoose.model("item",itemSchema);

const item1=new item({
  name : "Welcome to To-Do List"
});

const item2=new item({
  name : "Hit the + button to add an item"
});

const item3=new item({
  name : "<-- Hit this to delete an item"
});

const items=[item1,item2,item3];

item.insertMany(items,function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("success");
  }
});


app.get("/", function(req, res) {
  item.find(function(err,results){
    if(err){
      console.log(err);
    }else{
        res.render("list", {listTitle: "Today", newListItems: results});
    }
  });

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
