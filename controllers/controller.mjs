import {getBuses} from "../index.mjs";

export const getAllBuses = async (req, res) => {
    const buses = await getBuses('NW5 1TL');
    res.json(buses);
}