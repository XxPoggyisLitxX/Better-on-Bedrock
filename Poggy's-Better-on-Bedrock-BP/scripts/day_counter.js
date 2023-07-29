import { world, system, DynamicPropertiesDefinition, Player } from "@minecraft/server";


world.afterEvents.worldInitialize.subscribe(
    ( data ) => {
        const property = new DynamicPropertiesDefinition();
        property.defineNumber( "daysCount" );
        
        data.propertyRegistry.registerWorldDynamicProperties( property );
        
        if (!world.getDynamicProperty( "daysCount" )) world.setDynamicProperty( "daysCount", 1 );
        
        system.runInterval(
            () => {
                if (world.getTimeOfDay() == 0) {
                    world.setDynamicProperty( "daysCount", world.getDynamicProperty( "daysCount" ) + 1 )
                        let e = system.runInterval(() => {

                                world.sendMessage( "Day: " + world.getDynamicProperty( "daysCount" ) );
                            system.clearRun(e)
                        })  
                }; 
                
               
            },
            )
            /*world.beforeEvents.Chat.subscribe((chatEvent) => {
                let message = chatEvent.message.toLowerCase();
                if (message.startsWith("!")) {
                  chatEvent.cancel = true;
                  switch (message) {
                    //help list
              
                    case "!day":
                        for (const player of world.getAllPlayers()) {
                            player.sendMessage( "Day: " + world.getDynamicProperty( "daysCount" ) );
                        };
                    break;
                  }
                }
                })*/
        
    }
)