// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let buzzwordList = {
  "buzzwords": []
};

let setScore = 0;
let heard = false;

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res, next) =>{
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/buzzwords', (req, res, next) => {
  res.send(buzzwordList);

});

app.post('/buzzword', (req, res, next) => {
  buzzwordList.buzzwords.push(req.body);
  res.send('{ "success": true }');

});

app.put('/buzzword', (req, res, next) => {
  let response = {success : false, newScore: null};
  for(var i = 0; i < buzzwordList.buzzwords.length; i++){
    if(buzzwordList.buzzwords[i].buzzword === req.body.buzzword){
      setScore += parseInt(buzzwordList.buzzwords[i].points);
        buzzwordList.buzzwords[i].heard = true;
      res.send(`{ "success": "true", newScore: ${setScore} }`);
    }
  }
    res.send('{"success": false}');

});

app.delete('/buzzword', (req, res, next) =>{
  for(var i = 0; i < buzzwordList.buzzwords.length; i++){
    if(buzzwordList.buzzwords[i].buzzword === req.body.buzzword){
      buzzwordList.buzzwords.splice(i, 1);
      res.send('{"success": true');
    }
  }
  res.send('{"success": false');

});


var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('example app listenting at http');
});