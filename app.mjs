import * as testController from './controllers/controller.mjs'
import express from 'express';
const app = express();
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// app.get('/departureBoards', async function (req, res, next) {
//     const buses = await getBuses('SW112AJ');
//     res.json(buses);
// })

app.get('/departureBoards', testController.getAllBuses);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})