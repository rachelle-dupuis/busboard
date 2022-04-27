import {getBuses} from "./index.mjs";
import * as testController from './controllers/controller.mjs'
import fetch from "node-fetch";
import express from 'express';
const app = express();
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/coordinates', testController.getCoordinates);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})