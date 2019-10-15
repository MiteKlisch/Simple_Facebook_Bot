const { processMessage } = require('./process-message');

const replyToEvent = (req, res) => {

    const body = req.body;

    if (body.object && body.object === 'page') {
        body.entry.forEach( entry => {
            const webhook_event = entry.messaging[0];

            console.log(webhook_event);

            entry.messaging.forEach(event => {
                if (event.message && event.message.text) {
                    processMessage(event);
                }
            });
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
};

module.exports = replyToEvent;
