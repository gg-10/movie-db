const express = require('express');
const app = express();
const path = require('path');
//whenever we want to request a webpage or api / request results from api
const request = require('request');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static('public'));

app.get('/results',(req,res) => {

    let query = req.query.search; // search used in name of input for search

    request('https://api.themoviedb.org/3/search/movie?api_key=34db9f2a8bcfe569730456d982d46bf5&query='+query,(error,response,body) => {
        if(error)
        {
            console.log("Error in fetching data");
        }
        let data = JSON.parse(body); // we are getting data in form of string and thus we have to parse it to JSON
        res.render('movies', {data:data, searchQuery : query});
    })
    // res.render('movies');
})

app.get('/search',(req,res) => {
    res.render('search');
});

app.listen(3000, (req,res) => {
    console.log('Server started at port 3000');
})