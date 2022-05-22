module.exports = class DiscordButton {
    constructor(){
       this.button = {};

       this.button.type = 2
       this.button.style = 0

       
    }

    getJSON(){
        return this.button
    }

    setName(title){
        this.button.label = title

        return this;
    }

    setUrl(url){
           if(url){
               if(this.button.style == 0 || this.button.style == 1 && this.button.style !== 5){
                this.button.style = 5
               }
               if(this.button.custom_id && this.button.style == 5){
                   throw new Error("[Lestige]: You can't have a button id on a url button!")
               }
               this.button.url = url
               this.custom_id = ''
           }else{
               throw new Error("[Lestige]: You must provide a url!")
           }
       
        return this;
 }

    setStyle(style){
       if(style == 'Primary'){
        this.button.style = 1
       }if(style == 'Secondary'){
        this.button.style = 2
    }if(style == 'Success'){
        this.button.style = 3
    }if(style == 'Danger'){
        this.button.style = 4
    }if(style == 'Link'){
        this.button.style = 5
    }
      return this;
    }

    setEmoji(emoji){
      this.button.emoji = emoji

      return this;
    }

    setId(id){
        if(this.button.url){
            throw new Error("[Lestige]: You can't have a button url on a normal button!")
        }
        if(!id && !this.button.url){
            throw new Error('[Lestige]: You must provide a custom ID;');
        }
      this.button.custom_id = id

      return this;
    }
    

    setDisabled(boolean){
     if(!boolean){
     this.button.disabled = true
     }if(boolean == false){
        this.button.disabled = false   
     }if(boolean == true){
        this.button.disabled = true   
     }

     return this
    }
    
}