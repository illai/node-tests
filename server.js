const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engin', 'hbs');

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append file!');
        }
    });
    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (txt) => {
    return txt.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'illai',
    //     things: [
    //         'One thing',
    //         'Tow things',
    //         'Three things'
    //     ]
    // });

    res.render('home.hbs', {
        title: 'Home',
        welcomeMessage: 'Welcome to my site'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Could not find page'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000');
});