const request = require('request')

const forecast = (latitude, longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d432f904f5ffec3b0fbf80037e5626c9&query=' + latitude + ',' + longitude
    
    request({url  , json: true},(error, {body} ) => {
        if (error){
            callback('Unable to connect to location services!',undefined)
        }else if (body.error){
            callback('Unable to find location. Try another search.',undefined)
        }else {
            callback(undefined , { 
                temperature : body.current.temperature,
                feelslike: body.current.feelslike
            }
       )
        }
    })
}

module.exports = forecast