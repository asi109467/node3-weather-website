const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=0c6683aa9e84504b1d8ea7303d8593d7&query='+latitude+','+longitude + '&units=f'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to weather service', undefined)
        } else if(body.error){
            callback('unable to find location. try another search', undefined)
        } else{
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' .It feels like '+ body.current.feelslike)
        }
    })
}

module.exports = forecast