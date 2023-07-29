import { world, system } from "@minecraft/server";
const viewDistance = 7.5;
export const toolTip = ( player ) => {
    const entity = player.getEntitiesFromViewDirection()[0]?.entity;
    const block = player.getBlockFromViewDirection({ maxDistance: viewDistance })?.block;
    
    if (
        entity
        && isInRange( player.getHeadLocation(), entity.location )
    ) {
        const item = entity.getComponent( "minecraft:item" );
        const tameProbability = (
            entity.getComponent( "minecraft:tameable" )
            ? entity.getComponent( "minecraft:tameable").probability
            : 0
        );
        const isBaby = entity.getComponent( "minecraft:is_baby" ) != null;
        const entityId = entity.typeId.split(":")[1];
        const addonIdentifier = (
            item != null
            ? item.itemStack.typeId.split( ":" )[0]
            : entity.typeId.split( ":" )[0]
        );

        const addonId = (
            addonIdentifier
            .replaceAll( "_", " " )
            .replace( /(\b[a-z](?!\s))/g, (x) => x.toUpperCase() )
        );
        
        if (item) {
            const isBlock = MinecraftBlockTypes.getAllBlockTypes().map((block) => block.id).includes( item.itemStack.typeId );
            player.onScreenDisplay.setActionBar(
                {
                    rawtext: [
                        {
                            translate: isBlock ? ( `tile.${item.itemStack.typeId.split( ":" )[0] == "minecraft" ? "" : ( item.itemStack.typeId.split(":")[0] + ":" )}${item.itemStack.typeId.split(":")[1]}.name` ) : ( `item.${item.itemStack.typeId.split( ":" )[0] == "minecraft" ? ( item.itemStack.typeId.split( ":" )[1] + ".name" ) : item.itemStack.typeId}` ),
                        },
                        {
                            text: ` x${item.itemStack.amount}`,
                        },
                        {
                            text: item.itemStack.nameTag ? ( "\n§7Display name: " + item.itemStack.nameTag ) : "",
                        },
                        {
                            text: `\n§9§o${addonId}`,
                        },
                    ],
                },
            );
        } else {
            const health = entity.getComponent( "minecraft:health" );
            player.onScreenDisplay.setActionBar(
                {
                    rawtext: [
                        {
                            translate: entity.typeId == "minecraft:player" ? "Player" : "entity." + (( addonIdentifier == "minecraft" ? "" : entity.typeId.split( ":" )[0] + ":" ) + entityId ) + ".name",
                        },
                        {
                            text: entity.typeId == "minecraft:player" ? ( "\n§7Name: " + entity.name ) : "",
                        },
                        {
                            text: entity.typeId != "minecraft:player" && entity.nameTag ? ( "\n§7Nametag: " + entity.nameTag ) : "",
                        },
                        {
                            text: health ? ( "\n" + healthToText( health.currentValue, health.defaultValue ) ) : ""
                        },
                        {
                            text: isBaby ? "\n§7Baby" : "",
                        },
                        {
                            text: tameProbability > 0 ? ( "\n§7Tame Chance: " + tameProbability ) : "",
                        },
                        {
                            text: `\n§9§o${addonId}`,
                        },
                    ],
                },
            );
        };
    } else if (block) {
        const tool = getTool( block );
        const addonId = (
            block.typeId.split( ":" )[0]
            .replaceAll( "_", " " )
            .replace( /(\b[a-z](?!\s))/g, (x) => x.toUpperCase() )
        );
        
        player.onScreenDisplay.setActionBar(
            {
                rawtext: [
                    {
                        translate: `tile.${addonId == "Minecraft" ? "" : ( block.typeId.split(":")[0] + ":" )}${block.typeId.split(":")[1]}.name`,
                    },
                    {
                        text: `${tool?.tool ? ( `\n§7Correct Tool: §3${tool.tool}§r\n§7Farmable: ${tool.farmable ? "§aYes" : "§cNo"}`) : ""}`,
                    },
                    {
                        text: `\n§9§o${addonId}`,
                    },
                ],
            },
        );
    };
};

export const getTool = ( block ) => {
    if (
        block.typeId.includes( "brick" )
        || block.typeId.includes( "spawner" )
        || block.typeId.includes( "lantern" )
        || block.typeId.includes( "_wall" )
        || block.typeId.includes( "ore" )
        || block.typeId.includes( "stone" )
        || block.typeId.includes( "deepslate" )
        || block.hasTag( "metal" )
        || block.hasTag( "diamond_pick_diggable" )
    ) {
        return {
            tool: "Pickaxe",
            farmable: false,
        };
    } else if (
        block.typeId.includes( "log" )
        || block.typeId.includes( "chest" )
        || block.typeId.includes( "table" )
        || block.typeId.includes( "book" )
        || block.typeId.includes( "wall_banner" )
        || block.typeId.includes( "planks" )
        || block.typeId.includes( "fence" )
        || block.typeId.includes( "nut" )
        || block.typeId.includes( "pumpkin" )
        || block.hasTag( "log" )
        || block.hasTag( "wood" )
    ) {
        return {
            tool: "Axe",
            farmable: false,
        };
    } else if (
        block.typeId.includes( "farm" )
        || block.typeId.includes( "dirt" )
        || block.typeId.includes( "path" )
        || block.typeId.includes( "podzol" )
        || block.hasTag( "dirt" )
        || block.hasTag( "grass" )
    ) {
        return {
            tool: "Shovel",
            farmable: false,
        };
    } else if (
        block.typeId.includes( "crop" )
        || block.typeId.includes( "grape" )
        || block.typeId.includes( "bush" )
        || block.typeId.includes( "wild" )
        || block.typeId.includes( "flower" )
        || block.hasTag( "minecraft:crop" )
    ) {
        return {
            tool: "All",
            farmable: true,
        };
    } else if (
        block.typeId.includes( "leaves" )
        || block.typeId.includes( "vine" )
        || block.typeId.includes( "grass" )
        || block.typeId.includes( "root" )
        || block.typeId.includes( "plant" )
        || block.typeId.includes( "lich" )
    ) {
        return {
            tool: "Shears",
            farmable: true,
        };
    } else if (block.typeId.includes( "wool" )) {
        return {
            tool: "Shears",
            farmable: false,
        };
    } else if (block.typeId.includes( "hat" )) {
        return {
            tool: "Hand",
            farmable: false,
        };
    };
};

export const isInRange = ( getHeadLocation, targetLocation ) => {
    return (
        Math.abs( targetLocation.x - getHeadLocation.x ) < viewDistance &&
        Math.abs( targetLocation.z - getHeadLocation.z ) < viewDistance &&
        Math.abs( targetLocation.y - getHeadLocation.y ) < viewDistance
    );
};

export const healthToText = ( currentHealth, maxHealth ) => {
    return (
        maxHealth >= 0
        ? "§7Health: " + Math.round(currentHealth) + " / " + maxHealth
        : null
    );
};