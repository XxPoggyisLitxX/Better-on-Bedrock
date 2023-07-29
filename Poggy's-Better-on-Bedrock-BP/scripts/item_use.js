import { world  } from "@minecraft/server"
import { system } from "@minecraft/server";
import {TicksPerSecond, EquipmentSlot } from "@minecraft/server";
system.runInterval(ev => {
  world.getAllPlayers().filter(
    (p) => {
        const equipment = p.getComponent( "equipment_inventory" );
        if (
            equipment.getEquipment( EquipmentSlot.head )?.typeId == "better_on_bedrock:stardust_helmet"
            && equipment.getEquipment( EquipmentSlot.chest )?.typeId == "better_on_bedrock:stardust_chestplate"
            && equipment.getEquipment( EquipmentSlot.legs )?.typeId == "better_on_bedrock:stardust_leggings"
            && equipment.getEquipment( EquipmentSlot.feet )?.typeId == "better_on_bedrock:stardust_boots"
        ) return true;
    },
).forEach((p) => p.addEffect( "health_boost", TicksPerSecond * 2, { amplifier: 4, showParticles: false } )); 

},
1 * 20,)
