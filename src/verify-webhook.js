require('dotenv').config({ path: 'variables.env' });


const verifyWebhook = (req, res) => {
    
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === variables.env.VERIFY_TOKEN) {
        res.status(200).send(challenge);
    }   else {
        res.sendStatus(403);
        console.log('Problem with token');
    }
    
};

module.exports = verifyWebhook;