const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();


let weatherData = require('./services/MeteoApi')

let publicStaticDirPath = path.join(__dirname, './public')

let viewsPath = path.join(__dirname, './routes/views')

let partialsPath = path.join(__dirname, './routes/partials')



app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicStaticDirPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Orai Lietuvoje'
    })
})


app.get('/weather', (req, res) => {
    let places = req.query.places
    if (!places) {
        return res.send({
            error: 'You must enter correct city name!'
        })
    }

    weatherData(places, (error, { temperature, description, cityName } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName)
        res.send({
            temperature,
            description,
            cityName
        })
    })
})





app.get('*', (req, res) => {
    res.render('404', {
        title: 'page not found'
    })
})
module.exports = app;