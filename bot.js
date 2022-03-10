require('dotenv').config()
const tmi = require('tmi.js')
const fs = require('fs')

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

let data = {}

try {
    data = JSON.parse(fs.readFileSync('data.json'))
} catch (error) {
    console.error(`file ${error.paht} does not exist`)
}

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
        if(!data.deaths) data.deaths = 0
        data.deaths++
        fs.writeFileSync('data.json', JSON.stringify(data))
        client.say(channel, `Brady has died ${data.deaths} times, what a loser LUL`)
    }
}