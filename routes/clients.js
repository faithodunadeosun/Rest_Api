const express = require('express');
const router = express.Router();
const Client = require('../models/clientModel')
    //All these should be in controllers
    //Getting All
router.get('/', async(req, res) => {
        try {
            const clients = await Client.find()
            res.json(clients)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })
    //Getting One
router.get('/:id', getClient, (req, res) => {
        res.json(res.client)
    })
    //Creating One
router.post('/', async(req, res) => {
        const client = new Client({
            clientsName: req.body.clientsName,
            clientsSubscribedChannel: req.body.clientsSubscribedChannel
        })
        try {
            const newClient = await client.save()
            res.status(201).json(newClient)
        } catch (err) {
            //server error
            res.status(400).json({ message: err.message })
        }
    })
    //Updating One
router.patch('/:id', getClient, async(req, res) => {
        if (req.body.clientsName != null) {
            res.client.clientsName = req.body.clientsName
        }
        if (req.body.clientsSubscribedChannel != null) {
            res.client.clientsSubscribedChannel = req.body.clientsSubscribedChannel
        }
        try {
            const updatedClient = await res.client.save()
            res.json(updatedClient)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    })
    //Deleting One
router.delete('/:id', getClient, async(req, res) => {
    try {
        await res.client.remove()
        res.json({ message: 'Deleted Client' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//This is middleware
async function getClient(req, res, next) {
    let client
    try {
        client = await Client.findById(req.params.id)
        if (client == null) {
            return res.status(404).json({ message: 'cannot find client' })
        }
    } catch (err) {
        //server error
        return res.status(500).json({ message: err.message })
    }
    res.client = client
    next()
}

module.exports = router