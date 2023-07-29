import { world, ItemStack, ItemTypes, system, Vector, MinecraftEntityTypes, DynamicPropertiesDefinition } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

world.afterEvents.worldInitialize.subscribe(
  ({ propertyRegistry }) => {
    let playerCompShowTick = new DynamicPropertiesDefinition();
    playerCompShowTick.defineBoolean("hardcoreDeath");
    playerCompShowTick.defineBoolean("hardcoreOption");
    playerCompShowTick.defineBoolean("joined");

    propertyRegistry.registerEntityTypeDynamicProperties(playerCompShowTick, MinecraftEntityTypes.player);
  },
);

system.beforeEvents.watchdogTerminate.subscribe(data => data.cancel = true);

const DimensionNames = {
  ["minecraft:overworld"]: "Overworld",
  ["minecraft:nether"]: "Nether",
  ["minecraft:the_end"]: "End"
};

export const onPlayerDeath = () => {
  for (const player of world.getAllPlayers()) {
    const playerHealt = player.getComponent( "minecraft:health" ).current;
    if (
      playerHealt == 0
      && !player.hasTag( "death" )
    ) {
      const dName = DimensionNames[ player.dimension.id ];
      player.addTag( "death" );
      let entity = player.dimension.spawnEntity( "better_on_bedrock:player_corpse", new Vector(player.location.x, player.location.y, player.location.z));
      entity.nameTag = "Corpse of " + player.name;
      player.sendMessage( `§a${player.nameTag} §rdied at: §l§e${Math.round(player.location.x)}, ${Math.round(player.location.y)}, ${Math.round(player.location.z)},§r§f in The §a${dName}` );
      player.addTag( "lol" );
    } else if (playerHealt > 0) player.removeTag( "death" );
    else if (
      playerHealt == 0
      && player.hasTag( "selected" )
    ) player.addTag( "hardcoreDeath" );
    
    if(
      playerHealt == 20
      && player.hasTag("hardcoreDeath")
    ) player.runCommandAsync("function hardcore");
  };
};

//system.runSchedule(onPlayerDeath)
world.afterEvents.entityHit.subscribe(
  ({ entity, hitEntity }) => {
    if (hitEntity?.typeId == "better_on_bedrock:player_corpse") {
      console.warn("lol");
      const form = new ActionFormData();
      form.title( "Are You Sure?" );
      form.body( "You are about to turn your corpse into ashes.\n\nIf you decide to turn your corpse into ash, all stored items will be lost." )
      ///buttons
      form.button( "Dust" )
      form.button( "Spare" )
      form.show(entity).then(
        (response) => {
          switch (response?.selection) {
            case 0: console.warn( "Dust" ); hitEntity.triggerEvent( "entity_transform" ); break;
            case 1: console.warn( "Spare" ); break;
          };
        },
      );
    };
  },
);

let itemed;
function saveItem(itemStack) {
  if(!itemed) {
    itemed = itemStack;
    return true;
  } else return false;
};

world.afterEvents.itemReleaseCharge.subscribe(
  (data) => {
    for (const player of world.getAllPlayers()) {
      const item = player.getComponent( "inventory" ).container.getItem( player.selectedSlot );
      let newItem;
      switch ( item?.typeId ) {
        case "runecraft:wooden_spear":
          player.removeTag( "wooden_spear" );
        break;
        case "better_on_bedrock:iron_spear":
          newItem =  new ItemStack( ItemTypes?.get( "better_on_bedrock:iron_spear" ) );
          player.removeTag( "iron_spear" );
        break;
        case "better_on_bedrock:golden_spear":
          newItem =  new ItemStack( ItemTypes?.get( "better_on_bedrock:golden_spear" ) );
          player.removeTag( "golden_spear" );
        break;
        case "better_on_bedrock:diamond_spear":
          newItem =  new ItemStack( ItemTypes?.get( "better_on_bedrock:diamond_spear" ) );
          player.removeTag( "diamond_spear" );
        break;
      };

      let e = system.runInterval(
        () => {
          if(
            itemed?.typeId == "runecraft:wooden_spear"
            && player?.hasTag( "wooden_spear" )
            && item?.getComponent( "durability" ).damage <= 25
          ) {
            itemed.getComponent( "durability" ).damage = item.getComponent( "durability" ).damage += 1;
            container.addItem( itemed );
          };
      
          if(
            player.hasTag( "iron_spear" )
            && item?.typeId === "better_on_bedrock:iron_spear"
            && item?.getComponent("durability").damage <= 125
          ) {
            console.warn( item?.getComponent( "durability" ).damage );
            player.removeTag( "iron_spear" );
            newItem.getComponent("durability" ).damage = item.getComponent( "durability" ).damage + 1;
            container.addItem( newItem );
            
            system.clearRun(e);
          };
          
          if(
            player.hasTag( "golden_spear" )
            && item?.typeId === "better_on_bedrock:golden_spear"
            && item?.getComponent("durability").damage <= 125
          ) {
            console.warn( item?.getComponent( "durability" ).damage );
            player.removeTag( "golden_spear" );
            newItem.getComponent( "durability" ).damage = item.getComponent( "durability" ).damage + 1;
            container.addItem( newItem );
            
            system.clearRun(e);
          };
      
          if(
            player.hasTag("diamond_spear")
            && item?.typeId === "better_on_bedrock:diamond_spear"
            && item?.getComponent( "durability" ).damage <= 125
          ) {
            console.warn( item?.getComponent( "durability" ).damage );
            player.removeTag( "diamond_spear" );
            newItem.getComponent( "durability" ).damage = item.getComponent( "durability" ).damage + 1;
            container.addItem( newItem );

            system.clearRun(e);
          };
        },
      );
    };
  },
);