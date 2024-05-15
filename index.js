import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

const weatherAPIKEY = "OPEN_WEATHER_API_KEY";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try{
        const location = await getLocation(70769);
        const lat = location.lat;
        const lon = location.lon;
        const resource = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=d54fda6028a8631705df49f081082bd2&units=imperial`);
        const result = resource.data;



        res.render('index.ejs', {location: location, result: result});

    } catch (err){
        console.log(err.message);
    }

})

app.post('/submit', async (req, res) => {
    const zipCode =  req.body.input
    try{
        const location = await getLocation(zipCode);
        const lat = location.lat;
        const lon = location.lon;
        const resource = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=d54fda6028a8631705df49f081082bd2&units=imperial`);
        const result = resource.data;



        res.render('index.ejs', {location: location, result: result});

    } catch (err){
        console.log(err.message);
    }
})

async function getLocation(zipcode) {
    const weather = await axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=${weatherAPIKEY}`);
    return weather.data;

}


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})