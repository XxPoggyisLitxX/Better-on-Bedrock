import { world,  ItemStack,Entity, ItemEnchantsComponent, ItemTypes, EntityInventoryComponent, Block, Enchantment } from "@minecraft/server"
import { system } from "@minecraft/server";
import { MinecraftEntityTypes, DynamicPropertiesDefinition } from "@minecraft/server"
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"

world.afterEvents.itemUse.subscribe(data => {
  let { source: player } = data

    let invi = player.getComponent("inventory").container;
    let items = invi.getItem(player.selectedSlot);
    //this spawns the entity with a tag with the player name when the player does not have tag 'backpack1'
    if (items?.typeId == "better_on_bedrock:uncommon_lootbag") {
        player.runCommandAsync("function lootbag_uncommon")
    }
    if (items?.typeId == "better_on_bedrock:common_lootbag") {
      player.runCommandAsync("function common_lootbag")
  }
   if (items?.typeId == "minecraft:stick") {
    console.warn("test")
      player.runCommandAsync("structure save nameId ~-5 ~-1 ~-5 ~+5 ~+5 ~+5 true memory false")
  }
})
/*
system.runInterval((data) => {
  let players = world.getPlayers();
  for (let player of players) {
  let invi = player.getComponent("inventory").container;
  let items = invi.getItem(player.selectedSlot); 

  if(items?.typeId == "minecraft:stick"){
    system.runInterval((data) => {
    console.warn("test")
    player.runCommandAsync("structure load nameId ~-5 ~-1 ~-5")
    })
    system.clearRun()
  }
  if(items?.typeId != "minecraft:stick"){
      console.warn("test")
    player.runCommandAsync("structure save nameId ~-5 ~-1 ~-5 ~+5 ~+5 ~+5 true memory false")
    system.clearRun()
  }

}
  })*/