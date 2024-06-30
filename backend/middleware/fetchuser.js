const jwt = require('jsonwebtoken');

JWT_SECRET = 'RS256';

const fetchuser = (req, res, next) => {
    // Get the user id from jwt tocken and add it to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token!..." });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Something went wrong!..." });
    }
}

module.exports = fetchuser;