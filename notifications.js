const {
  PUSHOVER_USER,
  PUSHOVER_TOKEN,
  PUSHOVER_PRIORITY,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID
} = process.env;

const axios = require('axios');

const TelegramBot = require('node-telegram-bot-api');
const telegramBot = TELEGRAM_BOT_TOKEN ? new TelegramBot(TELEGRAM_BOT_TOKEN) : null;

const PUSHOVER_ENABLED = PUSHOVER_USER && PUSHOVER_TOKEN;
const PUSHOVER_ENDPOINT = 'https://api.pushover.net/1/messages.json';
const PUSHOVER_DEFAULT_PRIORITY = 0;
const TELEGRAM_BOT_ENABLED = telegramBot && TELEGRAM_CHAT_ID;

const trySendPushover = (message = undefined) => {
  if(!PUSHOVER_ENABLED || !message) return;
  const priority = PUSHOVER_PRIORITY ?? PUSHOVER_DEFAULT_PRIORITY;
  const headers = { 'Content-Type': 'application/json' };
  axios.post(PUSHOVER_ENDPOINT, {
    token: PUSHOVER_TOKEN,
    user: PUSHOVER_USER,
    message,
    priority
  }, { headers });
};

const trySendTelegram = (message = undefined) => {
  if(!TELEGRAM_BOT_ENABLED || !message) return;
  telegramBot.sendMessage(TELEGRAM_CHAT_ID, message);
};


const sendNotifications = (message = undefined) => {
  trySendPushover(message);
  trySendTelegram(message);
};

module.exports = {
  PUSHOVER_ENABLED,
  TELEGRAM_BOT_ENABLED,
  sendNotifications
};