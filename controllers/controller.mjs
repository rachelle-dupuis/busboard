import {getBuses} from "../index.mjs";

export const getCoordinates = (req, res) => {
    let data = getBuses();
    res.render({data: data});
}
