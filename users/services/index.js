const Users = require('../userModel');
const UsersServices = require('./usersServices');

const userService = new UsersServices(Users);

module.exports = { userService };
