const express = require('express');
const fs = require('fs');


const app = express();

app.use(express.json())
app.get('/', (req, res) => {
    res.send("Welcome to Number to letter api")
})



app.put('/dbUpdate', (req, res) => {

    steName = req.query.ste;
    console.log("updating db " + steName)

    if (steName != "bahij" && steName != "perle") {
        res.json({ errorCode: 404, desc: "not found" })
    } else {

        let json = req.body;

        let filename = __dirname + "//jsonDB/" + steName + ".json";
        fs.writeFile(filename, JSON.stringify(json), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        res.end("success");
    }


})

app.get('/dbGet', (req, res) => {

    steName = req.query.ste;
    console.log("getting db " + steName)
    if (steName != "bahij" && steName != "perle") {
        res.json({ errorCode: 404, desc: "not found" })
    } else {
        fs.readFile(__dirname + "//jsonDB/" + steName + ".json", 'utf8', (err, txt) => {
            res.json(JSON.parse(txt));
        })

    }
})


app.get('/appAuth', (req, res) => {
    console.log("getting  auth " + steName)
    res.sendFile(__dirname + "//jsonDB/authorisation.json");
})




var listener = app.listen(3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});