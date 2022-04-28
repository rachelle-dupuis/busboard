import * as testController from './controllers/controller.mjs'
import {getBuses} from "./index.mjs";
import express from 'express';
const app = express();
const port = 3000

app.use(express.static('frontend'));
app.get('/', (req, res) => {
    res.send();
})

app.get('/departureBoards/:postcode', async function (req, res, next) {
    const buses = await getBuses(req.params.postcode);
    res.json(buses);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})