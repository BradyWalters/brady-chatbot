require('dotenv').config()
const tmi = require('tmi.js')

const opts = {
    options: { debug: true },
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL_NAME
    ]
};

let deaths = 0

const client = new tmi.client(opts)

client.on('connected', onConnectedHandler)
client.on('message', onMessageHandler)

client.connect()

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`)
}

function onMessageHandler(channel, tags, message, self) {
    if(self) return

    if(message.toLowerCase() === '!death' && tags.subscriber) {
        deaths++
        client.say(channel, `Brady has died ${deaths} times, what a loser LUL`)
    }
}