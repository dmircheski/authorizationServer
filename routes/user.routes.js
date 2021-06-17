const middleware = require('../middleware/middleware')

module.exports = (app) => {
    const users = require('../controllers/user.controller');

    app.post('/signin', users.signin)
    app.post('/login', users.login)
    app.get('/users', middleware.authenticateTokenAndAdminRole, users.getUsers)

}