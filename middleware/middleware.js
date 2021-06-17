const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) return res.sendStatus(403)
        next()
    })
}

function authenticateTokenAndAdminRole(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) return res.sendStatus(403)
        if (authenticateIfAdmin(token) === false) return res.sendStatus(403)
        next()
    })
}

function authenticateIfAdmin(token) {
    const tokenBody = jwt.decode(token, { complete: true })
    if (tokenBody.payload.adminRole === false)
        return false
}

module.exports = { authenticateToken, authenticateTokenAndAdminRole }