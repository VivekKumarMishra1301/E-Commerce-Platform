const express=require('express');
const app = express();



app.use('/', (req, res) => {
    res.send('<h1>hello world</h1>');
})
app.listen((3000) => {
    console.log('server is listening on port 3000');

})