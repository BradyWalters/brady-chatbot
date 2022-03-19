import { Client } from 'tmi.js'
import 'dotenv/config'
import { readFileSync } from 'fs'
import { createMessage } from './utils.mjs'
import { subMessage } from './utils.mjs'

/**
 * TODO: Make this an Express app 
 */

// connection options for tmi.js
const opts = {
    options: { debug: true },
    // connection: {
    //     server: "localhost",
    //     port: 8080
    // },
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL_NAME
    ]
};

//create tmi.js client
const client = Client(opts)

//globals
let data = {}
let numOfMessages = 0

//sends social links on a 1 hour timer
const socialInterval = setInterval(() => {
    client.say(`#${process.env.CHANNEL_NAME}`, createMessage(`#${process.env.CHANNEL_NAME}`, {'display-name': 'BradyWalters'}, "!socials", false, data))
  }, 6000000);
let messageTimer

//if there is a data.json file, put the contents into our data object
try {
    data = JSON.parse(readFileSync('data.json'))
} catch (error) {
    console.error(`file ${error.path} does not exist`)
}

//event listeners
client.on('connected', onConnectedHandler)
client.on('message', onMessageHandler)
client.on("subscription", (channel, username, method, message, userstate) => {
    try {
        client.say(channel, subMessage(channel, username, method, message, userstate))
    } catch(e) {
        console.error(e)
    }
})

//connect to channel
client.connect()

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`)
}

//handles all messages sent on the channel
function onMessageHandler(channel, tags, message, self) {
    if(message === "!socials") {
        socialInterval.refresh()
    }

    const messageString = createMessage(channel, tags, message, self, data)
    
    if(!messageString) {
        return
    } else if(messageString === '~delete') {
        client.deletemessage(channel, tags.id)
    } else {
        try{
            if(numOfMessages < 100) {
                client.say(channel, messageString)
                numOfMessages++
                if(!messageTimer) {
                    messageTimer = setTimeout(() => {
                        numOfMessages = 0
                    }, 30000)
                    messageTimer = null
                }
            }
        } catch(e) {
            console.error(e)
        }
    }
    
}

