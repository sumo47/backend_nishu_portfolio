// login
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'nishu_porfolio'; // Change this to your actual secret key

const login = (req, res, next) => {
    const { email, password } = req.body;

    // Check if the email and password match
    if (email === 'nishur027@gmail.com' && password === 'Nishu@2024') {
        // Generate a JWT token
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
        return res.status(200).send({ status: true, token: token });
    }

    return res.status(401).json({ message: 'Invalid email or password' });
};

module.exports = login;
