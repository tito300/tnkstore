const ClientError = require('../ClientErrorModel');
const CommonServices = require('./commonService');

const commonServices = new CommonServices(ClientError);

module.exports = { commonServices };