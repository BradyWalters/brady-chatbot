import { createMessage } from "./utils.mjs";
import { readFileSync } from 'fs'
import { subMessage } from "./utils.mjs"

/**
 * TODO: Look into Twitch CLI for testing!
 */

let data = {}

try {
    data = JSON.parse(readFileSync('data.json'))
} catch (error) {
    console.error(`file ${error.path} does not exist`)
}

test(`!socials test`, () => {
    expect(createMessage('#bradywalters', {'display-name': 'BradyWalters'}, "!socials", false, data).trim()).toBe("BradyWalters Socials: Twitter: https://twitter.com/bradywalters_ Github: https://github.com/BradyWalters Website: https://bradywalters.dev")
})

test(`banned word test`, () => {
    expect(createMessage('#bradywalters', {}, data.bannedWords[Math.floor(Math.random() * data.bannedWords.length)], false, data).trim()).toBe("~delete")
})

test(`sub test`, () => {
    const username = "hello"
    expect(subMessage({}, "hello", {}, {}, {})).toBe(`Thank you ${username} for subscribing!`)
})