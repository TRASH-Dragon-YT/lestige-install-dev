
module.exports = (data) => {
    names = []
    intents = 0

    data.map(intent => {
        if(names.includes(intent.name)){
            throw new Error("[Discordly]: You can't put the same intent more then 1 time")
        }else {
            names.push(intent.name)
            intents += intent.value
        }

        return intents;
    })

return intents
}