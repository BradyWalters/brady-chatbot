export function createMessage(channel, tags, message, self) {
    if(self) return

        if(message.toLowerCase() === '!socials') {
            let socialString = `${channel.substring(1)} Socials: `

            for(let social in data.socials) {
                socialString += `${social}: ${data.socials[social]} `
            }

            return socialString
        }
}