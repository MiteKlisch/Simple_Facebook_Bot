const _ = require('lodash');
const uuid = require('uuid');
const fetch = require('node-fetch');
const dialogflow = require('dialogflow');

const dialogflowV2 = dialogflow.v2;

// You can find your project ID in your Dialogflow agent settings
const projectId = 'simple-bot-icykaf'; //https://dialogflow.com/docs/agents#settings

const sendTextMessage = (userId, text) => {
  return fetch(
    `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        messaging_type: 'RESPONSE',
        recipient: { id: userId },
        message: { text },
      }),
    }
  );
};

const processMessage = async (event) => {
  const userId = event.sender.id;
  const { text } = event.message;

  const sessionId = uuid.v4();

  const config = {
    credentials: {
      private_key: _.replace(process.env.DIALOGFLOW_PRIVATE_KEY, new RegExp('\\\\n', '\g'), '\n'),
      client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
    }
  };

  const sessionClient = new dialogflowV2.SessionsClient(config);
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode: 'en-US',
      },
    },
  };

  try {

    const dfResponse = await sessionClient.detectIntent(request);
    const replyText = dfResponse[0] && dfResponse[0].queryResult && dfResponse[0].queryResult.fulfillmentText;

    return sendTextMessage(userId, replyText);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { processMessage };
