export function createMessage(channel, tags, message, self, data) {
    if (self) return

    for(let i = 0; i < data.bannedWords.length; i++) {
        if(message.toLowerCase().includes(data.bannedWords[i])) {
            return "~delete"
        }
    }

    if (message.toLowerCase() === '!socials') {
        let socialString = `${tags['display-name']} Socials: `

        for (let social in data.socials) {
            socialString += `${social}: ${data.socials[social]} `
        }

        return socialString
    } else {
        return
    }
}

export function subMessage(channel, username, method, message, userstate) {
    return `Thank you ${username} for subscribing!`
}