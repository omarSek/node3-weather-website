const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me ',
        name: 'Andrew Mead'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        
        helpText: 'this is some helpful text.',
        title :'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather',(req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }geocode (req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error){
           return res.send({
               error
           })
           
        }
        forecast(latitude , longitude , (error, {temperature,feelslike,humidity}) => {
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                temperature,
                feelslike,
                humidity,
                address: req.query.address
            })
           
          })
    })
    
})

app.get('/products',(req,res) => {
    if(!req.query.search){
       return res.send({
           error: 'You must provide a search term'
       }) 
    }
    console.log(req.query.rating)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res) => {
    res.render(('404'),{
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Serveur is up on port ' + port)
})