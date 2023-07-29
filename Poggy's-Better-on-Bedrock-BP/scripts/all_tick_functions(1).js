import { world,  ItemStack, Entity, ItemEnchantsComponent, ItemTypes, EntityInventoryComponent, Block, Enchantment,  } from "@minecraft/server"
import { system, Vector } from "@minecraft/server";
import {  DynamicPropertiesDefinition } from "@minecraft/server"
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"
import { onPlayerDeath } from "./player_corpse/death_coords";
import { replaceItemOnBroken } from "./replace_item_when_item_broke";
import { toolTip, targetIsOnRange, getHealthText } from "./info_ui/main_behavior";
import { backPack } from "./backpacks/backpack";

system.runInterval((data) => {
  replaceItemOnBroken()
  toolTip()
  backPack() 
     ////custom advancements for bob
    let players = world.getPlayers();
    for (let player of players) {

      //player.removeTag('inUI')
      let inv = player.getComponent("inventory").container;
      let item = inv.getItem(player.selectedSlot);
      const inventory = player.getComponent(EntityInventoryComponent.componentId);
      for (let slot = 0; slot < inventory.container.size; slot++) {
        var vars = slot;
        const itemStack = inventory.container.getItem(slot);
        const amount = itemStack?.amount;
        const data = itemStack?.data;
  
        //WOOL
        const wool = inventory.container.getItem(slot);
        const woolamount = wool?.amount;
        
        if (
          itemStack?.typeId === "better_on_bedrock:stone_pickaxe" &&
          woolamount >= 1 &&
          !player.hasTag("stone_pickaxe")
        ) {
          player.sendMessage(
          "[§2" + player.nameTag + "§f] Made The Advancement: §eGetting an Upgrade!"
        );
        //player.sendMessage(rawtext)
        player.runCommandAsync("playsound normal_quest @p")
        player.addTag("stone_pickaxe");
        player.runCommandAsync('title @p title stone_pickaxe')
      }

      if (
        itemStack?.typeId === "minecraft:iron_ingot" &&
        woolamount >= 1 &&
        !player.hasTag("iron_ingot")
      ) {
        player.sendMessage(
        "[§2" + player.nameTag + "§f] Made The Advancement: §eAquire Hardware!"
      );
      //player.sendMessage(rawtext)
     
      player.runCommandAsync("playsound normal_quest @p")
      player.addTag("iron_ingot");
      player.runCommandAsync('title @p title iron_ingot')
    }

    if(itemStack?.typeId == "better_on_bedrock:disc_travelers" && !itemStack.getLore().length) {
      let loreItem = new ItemStack(Items.get(itemStack?.typeId), woolamount)
      loreItem.setLore(['§r§7J. Rivers - Travelers'])
      inv.setItem(slot, loreItem);
    }

    if (
      itemStack?.typeId === "minecraft:iron_chestplate" &&
      woolamount >= 1 &&
      !player.hasTag("iron_chestplate")
    ) {
      player.sendMessage(
      "[§2" + player.nameTag + "§f] Made The Advancement: §eSuit Up!"
    );
    //player.sendMessage(rawtext)
    player.runCommandAsync("playsound normal_quest @p")
    player.addTag("iron_chestplate");
    player.runCommandAsync('title @p title iron_chestplate')
  }

  if (
    itemStack?.typeId === "better_on_bedrock:iron_pickaxe" &&
    woolamount >= 1 &&
    !player.hasTag("iron_pickaxe")
  ) {
    player.sendMessage(
    "[§2" + player.nameTag + "§f] Made The Advancement: §5Isn't It Iron Pick!"
  );
  //player.sendMessage(rawtext)
  player.runCommandAsync("playsound epic_quest @p")
  player.addTag("iron_pickaxe");
  player.runCommandAsync('title @p title iron_pickaxe')
}

if (
  itemStack?.typeId === "minecraft:shield" &&
  woolamount >= 1 &&
  !player.hasTag("shield")
) {
  player.sendMessage(
  "[§2" + player.nameTag + "§f] Made The Advancement: §ePotective Stave!"
);
player.runCommandAsync("playsound epic_quest @p")
player.addTag("shield");
player.runCommandAsync('title @p title shield')
}
       ////custom advancements for bob
       if (
        itemStack?.typeId === "better_on_bedrock:wild_carrot_food" &&
        woolamount >= 1 &&
        !player.hasTag("wild_carrot")
      ) {
        player.sendMessage(
        "[§2" + player.nameTag + "§f] Made The Advancement: §5Don't Wild Carrots!"
      );
      player.runCommandAsync("playsound epic_quest @p")
      player.addTag("wild_carrot");
      player.runCommandAsync('title @p title wild_carrot')
      }

      if (
        itemStack?.typeId === "better_on_bedrock:coconut_nut" &&
        woolamount >= 1 &&
        !player.hasTag("coconut_nut")
      ) {
        player.sendMessage(
        "[§2" + player.nameTag + "§f] Made The Advancement: §eCoconut nut is a giant nut?"
      );
      player.runCommandAsync("playsound normal_quest @p")
      player.addTag("coconut_nut");
      player.runCommandAsync('title @p title coconut_nut')
      }
      if (
        itemStack?.typeId === "better_on_bedrock:ender_tear" &&
        woolamount >= 1 &&
        !player.hasTag("ender_tear")
      ) {
        player.sendMessage(
        "[§2" + player.nameTag + "§f] Made The Advancement: §5Sad Days."
      );
      //player.sendMessage(rawtext)
      player.runCommandAsync("playsound epic_quest @p")
      player.addTag("ender_tear");
      player.runCommandAsync('title @p title ender_tear')
      }
      if (
        itemStack?.typeId === "better_on_bedrock:ender_tear" &&
        woolamount >= 1 &&
        !player.hasTag("ender_tear")
      ) {
        player.sendMessage(
        "[§2" + player.nameTag + "§f] Made The Advancement: §5Sad Days."
      );
      //player.sendMessage(rawtext)
      player.runCommandAsync("playsound normal_quest @p")
      player.addTag("ender_tear");
      player.runCommandAsync('title @p title epic_quest')
      }
      if (
        itemStack?.typeId === "better_on_bedrock:waystone" &&
        woolamount >= 1 &&
        !player.hasTag("waystone")
      ) {
        player.sendMessage(
        "[§2" + player.nameTag + "§f] Made The Advancement: §eMore Travels!"
      );
      //player.sendMessage(rawtext)
      player.runCommandAsync("playsound normal_quest @p")
      player.addTag("waystone");
      player.runCommandAsync('title @p title waystone')
      }}


      

//Player Corpse
if(player.hasTag("allow_corpse")){
onPlayerDeath()
}
//item lore and quests
    

   for (let slot = 0; slot < inventory.container.size; slot++) {
     var vars = slot;
       const itemStack = inventory.container.getItem(slot);
       const amount = itemStack?.amount
       const data = itemStack?.data
     

       //WOOL//woolComplete
       const wool = inventory.container.getItem(slot);
       const woolamount = wool?.amount

       if (itemStack?.typeId === 'minecraft:raw_iron' && player.getDynamicProperty("metallis_busy") == true){
         player.setDynamicProperty('metallis_busy', false)
         player.setDynamicProperty('metallis_complete', true)
         player.setDynamicProperty('metallis_claimed', false)
         player.addTag("unlocked_2")
          player.sendMessage("§aQuest Complete! Go claim your reward!")
          player.runCommandAsync("playsound normal_quest @p")
       }
       if (itemStack?.typeId === 'minecraft:coal' && player.getDynamicProperty("light_my_day_busy") == true){
         player.setDynamicProperty('light_my_day_busy', false)
         player.setDynamicProperty('light_my_day_complete', true)
         player.setDynamicProperty('light_my_day_claimed', false)
         player.addTag("unlocked_3")
          player.sendMessage("§aQuest Complete! Go claim your reward!")
          player.runCommandAsync("playsound normal_quest @p")
       }
       if (itemStack?.typeId === 'minecraft:lapis_lazuli' && amount >= 32 && player.getDynamicProperty("witchcraft_blue_busy") == true){
         player.setDynamicProperty('witchcraft_blue_busy', false)
         player.setDynamicProperty('witchcraft_blue_complete', true)
         player.setDynamicProperty('witchcraft_blue_claimed', false)
         player.addTag("unlocked_4")
          player.sendMessage("§aQuest Complete! Go claim your reward!")
          player.runCommandAsync("playsound normal_quest @p")
       }
       if (itemStack?.typeId === 'minecraft:amethyst_shard_shard' && amount >= 32 && player.getDynamicProperty("amethyst_busy") == true){
         player.setDynamicProperty('amethyst_busy', false)
         player.setDynamicProperty('amethyst_complete', true)
         player.setDynamicProperty('amethyst_claimed', false)
         player.addTag("unlocked_5")
          player.sendMessage("§aQuest Complete! Go claim your reward!")
          player.runCommandAsync("playsound normal_quest @p")
       }
       if (itemStack?.typeId === 'minecraft:diamond' && amount >= 9 && player.getDynamicProperty("diamond_busy") == true){
        player.setDynamicProperty('diamond_busy', false)
        player.setDynamicProperty('diamond_complete', true)
        player.setDynamicProperty('diamond_claimed', false)
        player.addTag("unlocked_6")
         player.sendMessage("§aQuest Complete! Go claim your reward!")
         player.sendMessage("§9Tier Complete! Time To Mine.")
         player.runCommandAsync("playsound epic_quest @p")
      }

     /*  if (itemStack?.typeId === 'minecraft:log' && woolamount >= 1 && player.getDynamicProperty("busy") == true){
          player.setDynamicProperty("busy", false)
          player.setDynamicProperty("newStartComplete", true)
          player.setDynamicProperty("locked", true)
          player.setDynamicProperty("claimed", false)
          player.setDynamicProperty("gettinStarted", 2)
          player.addTag("unlocked_2")
          player.sendMessage("§aQuest Complete! Go claim your reward!")
          player.runCommandAsync("playsound normal_quest @p")
          player.runCommandAsync("title @p title complete_wood")
       }
       if (itemStack?.typeId === 'minecraft:leather_chestplate' && player.getDynamicProperty("busy5") == true){
       player.setDynamicProperty("busy5", false)
       player.setDynamicProperty("gearComplete", true)
       player.setDynamicProperty("locked5", true)
       player.setDynamicProperty("claimed5", false)
       player.addTag("unlocked_0")
       player.setDynamicProperty("better_on_bedrock", 3)
       player.sendMessage("§aQuest Complete! Go claim your reward!")
          player.runCommandAsync("playsound normal_quest @p")
       player.runCommandAsync("title @p title miner_end")
    }
       if (itemStack?.typeId === 'minecraft:log2' && woolamount >= 1 && player.getDynamicProperty("busy") == true){
         player.setDynamicProperty("busy", false)
         player.setDynamicProperty("newStartComplete", true)
         player.sendMessage("§aQuest Complete! Go claim your reward!")
          player.runCommandAsync("playsound normal_quest @p")
         player.setDynamicProperty("locked", true)
         player.setDynamicProperty("claimed", false)
         player.setDynamicProperty("gettinStarted", 1)
         player.addTag("unlocked_2")
         player.sendMessage("§aQuest Complete! Go claim your reward!")
         player.runCommandAsync("title @p title complete_wood")
      }
       if (itemStack?.typeId === 'better_on_bedrock:stone_axe' && player.getDynamicProperty("busy4") == true){
          player.setDynamicProperty("busy4", false)
          player.setDynamicProperty("woolComplete", true)
          player.setDynamicProperty("locked4", true)
          player.setDynamicProperty("claimed4", false)
          player.addTag("unlocked_5")
          player.sendMessage("§aQuest Complete! Go claim your reward!")
          player.runCommandAsync("playsound normal_quest @p")
          player.setDynamicProperty("gettinStarted", 0)
          player.runCommandAsync("title @p title wooled_complete")
       }
       if (itemStack?.typeId === 'minecraft:wool' && woolamount == 3 && player.getDynamicProperty("busy3") == true){
         player.setDynamicProperty("busy3", false)
         console.warn("Test")
         player.setDynamicProperty("downGoCompleted", true)
         player.setDynamicProperty("locked3", true)
         player.setDynamicProperty("claimed3", false)
         player.sendMessage("§aQuest Complete! Go claim your reward!")
          player.runCommandAsync("playsound normal_quest @p")
         player.addTag("unlocked_4")
         player.setDynamicProperty("gettinStarted", 0)
         player.runCommandAsync("title @p title wooled_complete")
      }
        //busy9
       if (itemStack?.typeId === 'minecraft:wooden_pickaxe' && player.getDynamicProperty("busy2") == true){
         player.setDynamicProperty("busy2", false)
         player.setDynamicProperty("upgradeComplete", true)
         player.setDynamicProperty("locked2", true)
         player.addTag("unlocked_3")
         player.sendMessage("§aQuest Complete! Go claim your reward!")
          player.runCommandAsync("playsound normal_quest @p")
         player.runCommandAsync("title @p title upgrade_complete")
         player.setDynamicProperty("better_on_bedrock", 1)
         //upgrade_complete
         player.setDynamicProperty("claimed2", false)
      } */


   };
   




//This block of code is used to add info to selected blocks about their useage.
//Since people get confused by THESE blocks, the info should make their use more clear.
//Info Ui

}})
    //This block of code is used to add info to selected blocks about their useage.
    //Since people get confused by THESE blocks, the info should make their use more clear.
