const express = require('express');
const fs = require("fs");
const app = express();
const path = require("path");
app.set("Views", path.join(__dirname,"Views"));
app.set("view engine", "ejs");


app.use(express.static("public"))
app.use(express.urlencoded({extended:false}));

app.get("/", function (req,res) {
   // const htmlFilePath =path.join(__dirname, "Views", "index.html");
    //res.sendFile(htmlFilePath);
    res.render("index");
});

app.get("/about",function (req,res) {
   // const htmlFilePath =path.join(__dirname, "Views", "about.html");
    //res.sendFile(htmlFilePath);
     res.render("about");
});
app.get("/confirm",function (req,res) {
    //const htmlFilePath =path.join(__dirname, "Views", "confirm.html");
    //res.sendFile(htmlFilePath);
     res.render("confirm");
});

app.get("/recommend",function (req,res) {
    //const htmlFilePath =path.join(__dirname, "Views", "recommend.html");
    //res.sendFile(htmlFilePath);
     res.render("recommend");

});

app.post("/recommend", function(req, res){
    const restaurant = req.body;
    const filePath =path.join(__dirname, "data", "restaurants.json"); 
    const fileDate = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileDate);
    storedRestaurants.push(restaurant);
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
    res.redirect("/confirm");

});


{/*app.get("/restaurants",function (req,res) {
    //const htmlFilePath =path.join(__dirname, "Views", "restaurant.html");
    //res.sendFile(htmlFilePath);
     res.render("restaurants");
});*/}
app.get("/restaurants", function(req,res){
    const filePath =path.join(__dirname, "data", "restaurants.json"); 
    const fileDate = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileDate);
    res.render("restaurants",{NumberOfRestaurants : storedRestaurants.length})

})
app.listen(3000)
 
 