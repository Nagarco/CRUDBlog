
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();


// connect to mongoDB
const dbURI = 'mongodb+srv://nagarco:testingdb123@cluster0.abrlojk.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(() => app.listen(3003))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//routing 

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.use('/blogs',blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
