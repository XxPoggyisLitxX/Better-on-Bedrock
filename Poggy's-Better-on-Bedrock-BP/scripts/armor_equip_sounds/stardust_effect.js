import { world, system, EquipmentSlot } from "@minecraft/server";
import {TicksPerSecond } from "@minecraft/server";
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (p) => {
                const equipmentInventory = p.getComponent( "equipment_inventory" );
                if (
                    equipmentInventory.getEquipment( EquipmentSlot.head )?.typeId == "better_on_bedrock:stardust_helmet"
                    && equipmentInventory.getEquipment( EquipmentSlot.chest )?.typeId == "better_on_bedrock:stardust_chestplate"
                    && equipmentInventory.getEquipment( EquipmentSlot.legs )?.typeId == "better_on_bedrock:stardust_leggings"
                    && equipmentInventory.getEquipment( EquipmentSlot.feet )?.typeId == "better_on_bedrock:stardust_boots"
                ) {
                    p.addEffect( "health_boost", TicksPerSecond * 2, { amplifier: 2, showParticles: false } );
                }; // DOES NOT RUN
                //It should run
            },
        );
    },
);

console.warn( "Script loaded." );