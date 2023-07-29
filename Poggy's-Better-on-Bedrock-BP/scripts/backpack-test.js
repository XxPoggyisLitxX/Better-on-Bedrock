import {system, world} from "@minecraft/server"
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"

world.beforeEvents.ItemUse.subscribe(data => {
    let { source: player, item, entity } = data
    //this spawns the entity with a tag with the player name when the player does not have tag 'backpack1'
    if (item.typeId == "minecraft:stick") {
        newForm(data)
    }
    if (item.typeId == "minecraft:arrow") {
        console.warn("test")
        manage(player, entity)
    }
})

function newForm(data){ 
    let { source: player} = data
    let form = new ModalFormData()
    form.title("Add-On Config")
    form.dropdown('Select Your Config!\n\nSelect Gamemode\nSelection will stay permanent', ["Easy", "Normal", "Hard", "Hardcore"], 1)
    form.toggle("Item Info")
    form.toggle("Starter Tools")
    form.toggle("Corpse On Death")
    form.show(data.source).then(r => {
        let [ dropdown, toggle1, toggle2, toggle3
        ] = r.formValues
        if(dropdown == 0){
            player.runCommandAsync("difficulty easy")
            player.addTag("selected2")
            player.sendMessage("§eDifficulty set to §aEasy")
            player.removeTag("selected")
        }
         if(dropdown == 1){
            player.runCommandAsync("difficulty normal")
            player.addTag("selected2")
            player.sendMessage("§eDifficulty set to §eNormal")
            player.removeTag("selected")
        }
         if(dropdown == 2){
            player.runCommandAsync("difficulty hard")
            player.addTag("selected2")
             player.sendMessage("§eDifficulty set to §cHard")
             player.removeTag("selected")
        }
         if(dropdown == 3){
            player.runCommandAsync("difficulty hard")
            player.addTag("selected")
             player.sendMessage("§eDifficulty set to §4Hardcore")
        }
        if(toggle1 == true) {
            player.addTag("add_item_info")
            player.sendMessage("§eItem Info: §aYes")
        } else if(toggle1 == false) {
            player.sendMessage("§eItem Info: §cNo")
            player.removeTag("add_item_info")
        }
        if(toggle2 == true) {
            player.runCommandAsync("give @p digger_test:copper_axe_2")
            player.runCommandAsync("give @p better_on_bedrock:wood_axe")
            player.runCommandAsync("give @p leather_chestplate")
            player.sendMessage("§eStarter Loot: §aYes")
        }else if(toggle2 == false) {
            player.sendMessage("§eStarter Loot: §cNo")
        }
         if(toggle3 == true) {
            player.addTag("allow_corpse")
            player.sendMessage("§eAllow Corpse: §aYes")
        }else if(toggle3 == false) {
             player.sendMessage("§eAllow Corpse: §cNo")
            player.removeTag("allow_corpse")
        }
    })
}