const Users = require('../../models/user');
const UsersServices = require('./usersServices');

const userService = new UsersServices(Users);

module.exports = { userService };
