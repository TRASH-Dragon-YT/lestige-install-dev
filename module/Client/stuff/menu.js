const { isArray } = require('util')

module.exports = class Menu {
    constructor(){
        this.menu = {};
        
        this.menu.type = 3;
        if(this.menu.disabled === undefined || this.menu.disabled === null) this.menu.disabled = false
        this.menu.options = []
       // this.menu.min_values = 1
       // this.menu.max_values = 3
    }

    getJSON(){    
        return this.menu;
    }

    setId(id){
        if(!id){
            throw new Error('[Lestige]: You must provide a custom ID;');
        }
     this.menu.custom_id = id;
     
     return this;
    }
    
    setPlaceholder(placeholder){
     if(!placeholder){
         throw new Error('You must set a placeholder!');
     }
     
     this.menu.placeholder = placeholder;

     return this;
    }


      
    addOption(label, menuOptions = {}){

        throw new Error('[Lestige]: .addOption has been deprecated. Please use .addOptions!')

         this.emoji = {}
         this.default = false
        if(!label){
            throw new Error('[Lestige]: You must add a label!')
        }
        if(!menuOptions){
            throw new Error('[Lestige]: You must add menu options!')
        }if(menuOptions && !menuOptions.description){
            throw new Error('[Lestige]: You must add a description!')
        }if(menuOptions && !menuOptions.value){
            throw new Error('[Lestige]: You must add a value!')
        }if(menuOptions.emoji){
            if(!menuOptions.emoji.name){
                throw new Error('[Lestige]: You must add a emoji!')
            }
             if(!menuOptions.emoji.id && typeof(menuOptions.emoji.name) !== "string"){
                this.emoji.id = null
            }else if(!menuOptions.emoji.id && typeof(menuOptions.emoji.name) == "string"){
                throw new Error('[Lestige]: You must add a emoji id!')
            }
            if(this.emoji.id !== null){
                this.emoji.id = menuOptions.emoji.id
            }
            this.emoji.name = menuOptions.emoji.name
            
        }if(menuOptions && !menuOptions.default){
            this.default = false
        }else{
            this.default = menuOptions.default
        }

        

       this.menu.options.push({
         label: label,
         value: menuOptions.value,
         description: menuOptions.description,
         default: this.default,
         emoji: {
             name: this.emoji.name,
             id: this.emoji.id
         },
        });


        return this;
    };

    addOptions(ArrayData) {

        //console.log(ArrayData)
        if(!isArray(ArrayData)) throw new Error('[Lestige]: Options must be an array! \n Array is this []')
        ArrayData.forEach(async (data) => {
            this.menu.options.push({
                label: data.name,
                value: data.value,
                description: data.description,
                default: data.isDefault,
                emoji: {
                    name: data.emoji.name,
                    id: data.emoji.id
                },
            });
        });

        return this;
    }

      setDisabled(boolean){
        if(!boolean){
        this.menu.disabled = true
        }if(boolean == false){
           this.menu.disabled = false   
        }if(boolean == true){
           this.menu.disabled = true   
        }
   
        return this
       }


}