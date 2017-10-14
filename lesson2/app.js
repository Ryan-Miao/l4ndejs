var express = require('express');
var utility = require("utility");

var app = express();

app.get("/", function (req, res){

    var name = req.query.name;

    if(name === undefined || name === null){
        name = "";
        res.send("The query param cannot be null. [name] is null.");
        return;
    }

    console.log("name = ",name);
    var md5Value = utility.md5(name);

    res.send(name+"="+md5Value);
});

app.listen(3000, function(req, res){
    console.log("Server is running with port http://localhost:3000.");
})