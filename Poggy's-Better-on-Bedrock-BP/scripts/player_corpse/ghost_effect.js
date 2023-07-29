import { setTimeout, setImmediate, setInterval, clearImmediate, clearInterval, clearTimeout } from "./timers.js";
import { world } from "@minecraft/server";
export function stdout() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    
    return world.getDimension("overworld").runCommandAsync("effect @p slowness 0 0 true") 
        
}
;
function stderr() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    return world.getDimension("overworld").runCommand("say \u00A7c" + data.join(" "));
}
;
world.afterEvents.itemUse.subscribe(data => {
    let { source: player } = data

    let invi = player.getComponent("inventory").container;
    let items = invi.getItem(player.selectedSlot);
    //this spawns the entity with a tag with the player name when the player does not have tag 'backpack1'
    if (items?.typeId == "better_on_bedrock:fixed_ghost_necklace" && player.getItemCooldown('ghost') == 0) {
        player.runCommandAsync('effect @p night_vision 10 10 true')
        player.startItemCooldown('ghost', 1200);
        items.getComponent("durability").damage = items.getComponent("durability").damage + 1;
        invi.setItem(player.selectedSlot, items);
        player.runCommandAsync( 'gamemode spectator @p')
        setTimeout(function (arg, arg1) {
            player.runCommandAsync( 'gamemode s @p')
            stdout("Returned", "to normal form.");
        }, 10000, "hello", "world", 1);
        stdout("");
        
    }

    
})