const express = require('express');
const login = require('../controllers/nishu/login');
const authenticate  = require('../controllers/nishu/authentication');
const { createMessage, getMessage, deleteMessage } = require('../controllers/nishu/messageController');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({ status: true, msg: "API working fine ✔️" })
})

router.post('/login', login)
router.post('/create', createMessage)
router.get('/get', authenticate, getMessage)
router.delete('/delete/:id', authenticate, deleteMessage)

router.all("/*", (req, res) => {
    return res.status(400).send({ status: false, message: "❌invalid path❌" })
})



module.exports = router;