const events = require('events');
const { isArray } = require('util')
const  Ws  = require("../ws/WebSocketManager")
const getter = require("./Functions/getIntents")

var Token = null

class Client extends events {
   constructor(options){
    super()
    if(!options){
        throw new Error("[Lestige]: Please define intents.")
    }
    if(!isArray(options.intents)){
        throw new Error("[Lestige]: Intents must be in a array.")
    }
    this.token = null
    this.intents = options.intents
    this.username = null
    this.tag = null
    this.id = null
    this.ws = null

   }
   
   _commandHandler = {
    SLASH_COMMANDS: "0",
    CHAT_COMMANDS: "1"
   } 

   async login(token){
       this.token = token

       Token = this.token

       if(!token){
           throw new Error('[Lestige]: Token is invalid!')
       }

       const intents = getter(this.intents)
       this.intents = intents
       Ws(this)
   }
}
module.exports = Client

module.exports.fetch = {
    getToken: async () => {
        if(Token == null) setTimeout(() => {
              if(Token == null) return;
              else return Token;
        }, 3500)
        else return Token;
    }
}