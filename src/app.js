const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))

app.get('',(req, res) =>{
    res.render('index', {
        title : 'index page',
        name : 'ankit'
    })
})

app.get('/help',(req, res) =>{
    res.render('help',{
        title : 'help page',
        name : 'ankit'
    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title : 'about page',
        name : 'ankit'
    })
})

app.get ('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Please provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            return res.send({
                
                forecastdata : forecastData,
                location,
                address : req.query.address
            })
          })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title : '404',
        name : 'Ankit',
        error : 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title : '404',
        name : 'Ankit',
        error : 'Page Not Found'
    })  
})

app.listen(3000, ()=>{
    console.log('server listening on port 3000')
})