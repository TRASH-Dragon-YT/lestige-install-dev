<div align="center">
  <br />
  <p>
    <a href="https://discord.gg/YM9KxHpcWb"><h1>Image soon!</h1></a>
  </p>
  <br />
  <p>
    <a href="https://discord.gg/YM9KxHpcWb"><img src="https://img.shields.io/discord/863339994000654346?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/lestige"><img src="https://img.shields.io/npm/v/lestige.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/lestige"><img src="https://img.shields.io/npm/dt/lestige.svg?maxAge=3600" alt="NPM downloads" /></a>
  </p>
</div>


## Important
> Lestige is still in development so it's only able to do some things. <br>
> Lestige also supports all versions of nodejs that are above 16.x.

## Update



## About

Lestige is a powerful [Node.js](https://nodejs.org) module that allows you to easily interact with the
[Discord API](https://discord.com/developers/docs/intro).

- Object-oriented
- Predictable abstractions
- Performant
- 100% coverage of the Discord API



## Example usage


```js
const {Client, Intents} = require('lestige')
const client = new Client({intents: [Intents.Flags.GUILDS, Intents.Flags.GUILD_MESSAGES, Intents.Flags.GUILD_MESSAGE_REACTIONS]})

client.on('ready', () => {
  console.log(`${client.me.tag} is ready.`)
})

client.on('message', message => {
    if(message.author.bot) return;

    if(message.content == '!help'){
      message.channel.say('I am here to help :D')
    }
})

client.login('Your secret token.')
//If you use replit.com, instead of doing 'token', do process.env.token.
```
