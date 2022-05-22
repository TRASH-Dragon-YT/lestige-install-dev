const { invalidOBJS_Object, invalidOBJS_String } = require('../invalidOBJS')
const fetch = require('node-fetch')
const client = require('../index')
const Ws = require("../../ws/WebSocketManager")

module.exports = class SlashCommands {
    constructor(guildID) {
        this.registerCommands = []
        this.options = []
        this.client = null

        this.OptionTypes = [{
            "SUB_COMMAND": 1,
            "SUB_COMMAND_GROUP": 2,
            "STRING": 3,
            "INTEGER": 4,
            "BOOLEAN": 5,
            "USER": 6,
            "CHANNEL": 7,
            "ROLE": 8,
            "MENTIONABLE": 9,
            "NUMBER": 10,
            "ATTACHMENT": 11,
        }]

        setTimeout(() => {
            if (this.registerCommands == '[]' || this.registerCommands.length === 0) return;
            else {


                this.registerCommands.forEach(async (command) => {

                    this.token = await client.fetch.getToken()

                    await fetch(`https://discord.com/api/users/@me`, {
                        headers: {
                            "Authorization": `Bot ${this.token}`
                        }
                    }).then(req => req.json()).then(res => {
                        this.client = res
                    })

                    if (!guildID) {
                        await fetch(`https://discord.com/api/v10/applications/${this.client.id}/commands`, {
                            method: "POST",
                            body: JSON.stringify(command),
                            headers: {
                                "Authorization": `Bot ${this.token}`,
                                "Content-Type": "application/json"
                            }
                        })
                    }

                    if (guildID && !isNaN(guildID)) {

                        await fetch(`https://discord.com/api/v10/applications/${this.client.id}/guilds/${guildID}/commands`, {
                            method: "POST",
                            body: JSON.stringify(command),
                            headers: {
                                "Authorization": `Bot ${this.token}`,
                                "Content-Type": "application/json"
                            }
                        })
                    }
                })
            }
        }, 2500);
    }


    Addoption(Name, Description, type, required) {

        if (!Name) throw new Error(`[Lestige]: Name not provded.`)
        if (invalidOBJS_String.includes(typeof (Name))) throw new Error('[Lestige]: You must provide a valid name.')

        if (!Description) throw new Error(`[Lestige]: Description not provded.`)
        if (invalidOBJS_String.includes(typeof (Description))) throw new Error('[Lestige]: You must provide a valid Description.')

        if (!required) this.required = false
        else if (required) { this.required = required }

        if (type) {
            if (this.OptionTypes[0][type.toUpperCase()] !== undefined) {
                this._type = this.OptionTypes[0][type.toUpperCase()]
            } else this._type = 3
        }

        this.options.push({
            type: this._type,
            name: Name.toLowerCase(),
            description: Description,
            required: required,
        })
    }


    put(command, _commandData) {

        if (!command) throw new Error(`[Lestige]: Command name not provded.`)
        if (invalidOBJS_String.includes(typeof (command))) throw new Error('[Lestige]: You must provide a name.')

        if (!_commandData) throw new Error(`[Lestige]: Command data must be provided.`)
        if (invalidOBJS_Object.includes(typeof (_commandData))) throw new Error('[Lestige]: Command data must be a object!')

        if (_commandData) {
            if (_commandData.description) {
                this.description = _commandData.description
            } else throw new Error('[Lestige]: Description not provided!')
        }

        this.registerCommands.push({
            name: command.toLowerCase(),
            type: 1,
            description: this.description,
            options: this.options
        })
    }
}