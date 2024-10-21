const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send({ status: true, msg: "Default Api working properly ✔️" })
})

router.all("/*", (req, res) => {
    return res.status(400).send({ status: false, message: "❌invalid path❌" })
})

module.exports = router