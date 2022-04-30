const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('ok');
})
app.get('/login', (req, res) => {
    res.send('ok');
})
app.get('/userview', (req, res) => {
    res.send('ok');
})
app.listen(port, () => {
   console.log(`App listening on port ${port}`)
})

app.use(express.static('public'));
