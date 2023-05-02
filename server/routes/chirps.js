const express = require('express')
let chirpsStore = require("../chirpsstore");

let router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id
    if (id) {
        res.json(chirpsStore.GetChirp(id))
    } else {
        res.json(chirpsStore.GetChirps());
    }
});

router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body)
    res.status(200).json('posted')
});

router.put('/:id?', (req, res) => {
    let id = req.params.id
    if (id) {
        res.json(chirpsStore.UpdateChirp(id, req.body));
    } else {
        res.send(chirpsStore.UpdateChirp())
    }
});

router.delete('/:id?', (req, res) => {
    let id = req.params.id
    if (id) {
        res.sendStatus(200).json(chirpsStore.DeleteChirp(id))
    } else {
        res.json(chirpsStore.DeleteChirp())
    }
});

module.exports = router;