import { world, ItemStack, ItemTypes, Entity, EquipmentSlot } from "@minecraft/server"
import { system } from "@minecraft/server";

system.runInterval(cb => {
  for (const player of world.getAllPlayers()) {
    const inventory = player.getComponent( "inventory" ).container; //below this point, lags our tps.  //check discord
        const item = inventory.getItem( player.selectedSlot );
      if( item?.typeId == 'minecraft:stick'){
        player.addTag('shield')
      } else if(!item?.typeId == 'minecraft:stick') {
        player.removeTag('shield')
      }
    }

},
20,
)

world.afterEvents.entityHit.subscribe(ev => {
  for (const player of world.getAllPlayers()) {
    const inventory = player.getComponent( "inventory" ).container; //below this point, lags our tps.  //check discord
        const item = inventory.getItem( player.selectedSlot );
        const equipmentInventory = player.getComponent( "equipment_inventory" );
  if(ev.hitEntity?.typeId == 'minecraft:player' && equipmentInventory.getEquipment( EquipmentSlot.head )?.typeId == "better_on_bedrock:amethyst_helmet" && equipmentInventory.getEquipment( EquipmentSlot.chest )?.typeId == "better_on_bedrock:amethyst_chestplate" && equipmentInventory.getEquipment( EquipmentSlot.legs )?.typeId == "better_on_bedrock:amethyst_leggings" && equipmentInventory.getEquipment( EquipmentSlot.feet )?.typeId == "better_on_bedrock:amethyst_boots") {
    ev.entity.applyKnockback(-ev.entity.getViewDirection().x, -ev.entity.getViewDirection().z, 2, 0.5)
  }}
})
