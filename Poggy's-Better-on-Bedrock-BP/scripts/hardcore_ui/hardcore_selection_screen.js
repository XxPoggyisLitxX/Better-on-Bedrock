import { world,  ItemStack, Entity, ItemEnchantsComponent, ItemTypes, EntityInventoryComponent, Block, Enchantment,  } from "@minecraft/server"
import { system } from "@minecraft/server";
import { MinecraftEntityTypes, DynamicPropertiesDefinition } from "@minecraft/server"
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"

function hardcoreUI(player, ui = undefined) {
    if(!ui) ui = uiForHardcore(player);
    ui.show(player).then(response => {
        if(response.cancelationReason == "userBusy") {
          hardcoreUI(player, ui);
            return;
        } else if(response.cancelationReason == "userClosed") {
            return;
        }
          let [toggle1, toggle2, toggle3 ] = response.formValues

    

          if(toggle1 == true && !player.hasTag('selected2')) {
              player.runCommandAsync("give @p digger_test:copper_axe_2")
              player.runCommandAsync("give @p better_on_bedrock:wood_axe")
              player.runCommandAsync("give @p leather_chestplate")
              player.addTag("selected2")
              player.sendMessage("§eStarter Loot: §aYes")
          }else if(toggle1 == false) {
            player.addTag("selected2")
              player.sendMessage("§eStarter Loot: §cNo")
          }
           if(toggle2 == true) {
              player.addTag("allow_corpse")
              player.sendMessage("§eAllow Corpse: §aYes")
              player.addTag("selected2")
          }else if(toggle2 == false) {
               player.sendMessage("§eAllow Corpse: §cNo")
               player.addTag("selected2")
              player.removeTag("allow_corpse")
          }
          if(toggle3 == true) {
            player.addTag("toolTip")
            player.sendMessage("§eWhat's That UI: §aYes")
            player.addTag("selected2")
        }else if(toggle3 == false) {
             player.sendMessage("§eWhat's That UI: §cNo")
             player.addTag("selected2")
            player.removeTag("toolTip")
        }
    });
  }

  export function uiForHardcore(player) {
    let form = new ModalFormData()
    form.title("Add-On Config")
    form.toggle("Starter Tools - Gives Starter Tools")
    form.toggle("Corpse On Death - Enables Player Corpse")
    form.toggle("What Block Is This? [UI] - Enables the 'WAILA' UI")
  return form;
}
function showWelcomeMessage(player) {
  // Get the player's name
  let playerName = player.name;

  // Display the welcome message to the player
  console.warn(`Welcome to the world, ${playerName}!`);
}

world.afterEvents.itemUse.subscribe((ev) => {
  if(ev.itemStack.typeId == 'better_on_bedrock:config'){
     hardcoreUI(ev.source);
  }
})

world.afterEvents.playerSpawn.subscribe((ev) => {

if(!ev.player.hasTag('gotConfig')){
ev.player.runCommandAsync('give @s better_on_bedrock:config')
ev.player.addTag('gotConfig')}
  console.warn('§cI am a test')
  
  if (!ev.player.hasTag("selected") && !ev.player.hasTag("selected2")){
    hardcoreUI(ev.player);
}
}
);