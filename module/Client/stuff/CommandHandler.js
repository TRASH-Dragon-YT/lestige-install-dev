const fs = require('fs')
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = class CommandHandler {
    constructor(_commandType, options) {
        this.folder = null;
        this.Commands = new Map();
        if (options && options.folders) this._sepFolders = options.folders;
        else this._sepFolders = false;
        this.commandType = null

        if (_commandType instanceof Array) {
            for (i = 0; i < _commandType.length; i++) {
                if (i > 2) throw new Error("You've added too many command types (maximum 2!)")
                else this.commandType = [_commandType[0], _commandType[1]]
            }
        } else this.commandType = _commandType
    }

    setFolder(folder) {
        this.folder = folder;

        if (this._sepFolders == true) {
            const commandFolders = fs.readdirSync(folder);

            for (const folder of commandFolders) {
                const commandFiles = fs.readdirSync(folder + `/${folder}`, (err, command) => { if(err) throw new TypeError(`[Lestige]: A error has occurred while opening ${folder}! \n \n Error: ${err}.`)}).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    const command = require(folder + `/${folder}/${file}`);
                    this.Commands.set(command.name, command);
                }
            }
        } else {

        fs.readdir(folder, (err, files) => {
            if (err) throw new TypeError(`[Lestige]: A error has occurred while opening ${folder}! \n \n Error: ${err}.`)

                if (files.length > 0) {
                    if (files instanceof Array) {
                        files.forEach(file => {
                            const command = require(folder+`/${file}`);
                            this.Commands.set(command.name, command);
                        })
                    }
                } else throw new Error(`[Lestige]: A error has occurred while opening ${folder}! \n \n Error: No files found within ${folder}!`)

            return this;
        })
     }
    }

    autoHandle(int, prefix) {
        if(this.folder !== null) {
            if(!messintage.content.startsWith(prefix) || int.author.bot) return;
            var commandName = int.content.substring(prefix.length)
            var cmd = this.Commands.get(commandName)
            var args = commandName.split(' ')

            if(!cmd) return;

            try {
                cmd.execute(int, args)
            } catch(err) {
                throw new Error(`[Lestige]: An error occurred while executing ${commandName}, \n Error: ${err}.`)
            }
        } else return;
    }

}