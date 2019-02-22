const router = require('express').Router();
const { commonServices } = require('./services/index');

router.post('/', async (req, res) => {
    console.log(req.body);
    const remoteAddress = req.connection.remoteAddress;
    const { error_message, error_stack, info } = req.body;

    let posted = await commonServices.postError(error_message, error_stack, info.componentStack, remoteAddress);
    if (posted) {
        res.status(200).end();
    } else {
        res.status(500).end();
    }
})

module.exports = router;