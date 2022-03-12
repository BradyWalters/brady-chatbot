import { Client } from 'tmi.js'
import 'dotenv/config'
import { readFileSync } from 'fs'
import { createMessage } from './utils.mjs'

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

const client = Client(opts)

client.on('connected', onConnectedHandler)
client.on('message', onMessageHandler)

client.connect()

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`)
}

function onMessageHandler(channel, tags, message, self) {
    const messageString = createMessage(channel, tags, message, self, data)
    
    if(!messageString) {
        return
    } else if(messageString === '~delete') {
        client.deletemessage(channel, tags.id)
    } else {
        console.log(tags)
        try{
            client.say(channel, messageString)
        } catch(e) {
            console.error(e)
        }
    }
    
}
