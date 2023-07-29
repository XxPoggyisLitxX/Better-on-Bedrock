import { world, system, Vector, EquipmentSlot } from "@minecraft/server";
system.runInterval(
    () => {
        const players = world.getAllPlayers().filter(
            (p) => {
                const equipmentInventory = p.getComponent( "equipment_inventory" );
                const velocity = (new Vector(p.getVelocity().x, p.getVelocity().y, p.getVelocity().z)).length();
                if (
                    equipmentInventory.getEquipment( EquipmentSlot.head )?.typeId == "better_on_bedrock:amethyst_helmet"
                    && equipmentInventory.getEquipment( EquipmentSlot.chest )?.typeId == "better_on_bedrock:amethyst_chestplate"
                    && equipmentInventory.getEquipment( EquipmentSlot.legs )?.typeId == "better_on_bedrock:amethyst_leggings"
                    && equipmentInventory.getEquipment( EquipmentSlot.feet )?.typeId == "better_on_bedrock:amethyst_boots"
                    && velocity > 0.09
                ) {
                    return true;
                } else {
                    return false;
                };
            },
        );
        
        for (const player of players) {
            for (const p of world.getAllPlayers()) p.playSound( "step.amethyst_block", player.location );
        };
    },
    6,
);
system.runInterval(
    () => {
        const players = world.getAllPlayers().filter(
            (p) => {
                const equipmentInventory = p.getComponent( "equipment_inventory" );
                const velocity = (new Vector(p.getVelocity().x, p.getVelocity().y, p.getVelocity().z)).length();
                if (
                    equipmentInventory.getEquipment( EquipmentSlot.head )?.typeId == "better_on_bedrock:amethyst_helmet"
                    && equipmentInventory.getEquipment( EquipmentSlot.chest )?.typeId == "better_on_bedrock:amethyst_chestplate"
                    && equipmentInventory.getEquipment( EquipmentSlot.legs )?.typeId == "better_on_bedrock:amethyst_leggings"
                    && equipmentInventory.getEquipment( EquipmentSlot.feet )?.typeId == "better_on_bedrock:amethyst_boots"
                    && velocity == 0
                ) {
                    return true;
                } else {
                    return false;
                };
            },
        );
        
        for (const player of players) {
            for (const p of world.getAllPlayers()) p.playSound( "chime.amethyst_block", player.location );
        };
    },
    150,
);