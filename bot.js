import { Client } from 'tmi.js'
import 'dotenv/config'
import { readFileSync } from 'fs'
import { createMessage } from './utils';

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
    data = JSON.parse(readFileSync('data.json'))
} catch (error) {
    console.error(`file ${error.path} does not exist`)
}

console.log(data)

const client = Client(opts)

client.on('connected', onConnectedHandler)
client.on('message', onMessageHandler)

client.connect()

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`)
}

function onMessageHandler(channel, tags, message, self) {
    const messageString = createMessage(channel, tags, message, self)

    if(messageString === '') {
        return
    } else {
        try{
            client.say(channel, messageString)
        } catch(e) {
            console.error(e)
        }
    }
    
}
