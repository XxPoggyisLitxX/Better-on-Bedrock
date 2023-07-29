import { world, system, MinecraftBlockTypes, BlockStates } from "@minecraft/server";
const viewDistance = 7.5;
export const toolTip = ( player ) => {
    const entity = player.getEntitiesFromViewDirection()[0]?.entity;
    const block = player.getBlockFromViewDirection({ maxDistance: viewDistance })?.block;
    
    if (
        entity
        && isInRange( player.getHeadLocation(), entity.location )
    ) {
        const item = entity.getComponent( "minecraft:item" );
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
                        { text: ` x${item.itemStack.amount}` },
                        {
                            text: item.itemStack.nameTag ? ( "\n§7Display name: " + item.itemStack.nameTag ) : "",
                        },
                        { text: `\n§9§o${addonId}` },
                    ],
                },
            );
        } else {
            const tameProbability = entity.getComponent( "minecraft:tameable")?.probability.toFixed(2) * 100 || 0;
            const isBaby = entity.getComponent( "minecraft:is_baby" ) != null;
            const entityId = entity.typeId.split(":")[1];
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
                            text: health ? ( "\n" + healthToText( Math.round( health.currentValue ), health.defaultValue ) ) : ""
                        },
                        { text: ( isBaby ? "\n§7Baby" : "" ) },
                        {
                            text: tameProbability > 0 ? ( "\n§7Tame Chance: " + tameProbability + "%" ) : "",
                        },
                        { text: `\n§9§o${addonId}` },
                    ],
                },
            );
        };
    } else if (block) {
        const tool = getTool( block );
        const blockInfo = getBLockInfo( block );
        const addonId = (
            block.typeId.split( ":" )[0]
            .replaceAll( "_", " " )
            .replace( /(\b[a-z](?!\s))/g, (x) => x.toUpperCase() )
        );

        const honeyLevel = block.permutation.getState( "honey_level" );
        let growth = null;
        if (crops[ block.typeId ]) {
            const maxGrowth = crops[ block.typeId ];
            const currentGrowth = block.permutation.getState( "growth" ) / maxGrowth || block.permutation.getState( "better_on_bedrock:growth_stage" ) / maxGrowth;
            const percentage = Math.round((currentGrowth !== 0 ? currentGrowth.toFixed(2) : 0) * 100);
            growth = (
                percentage == 100
                ? "§aGrown"
                : `${percentage}%`
            );
        };
       
        player.onScreenDisplay.setActionBar(
            {
                rawtext: [
                    {
                        translate: `tile.${addonId == "Minecraft" ? "" : ( block.typeId.split(":")[0] + ":" )}${blocks[block.typeId.split(":")[1]] || block.typeId.split(":")[1]}.name`,
                    },
                    {
                        text: `${growth ? ( `\n§7Growth: ${growth}` ) : ""}`,
                    },
                    {
                        text: `${honeyLevel ? ( `\n§7Honey: ${honeyLevel}/5` ) : ""}`,
                    },
                    {
                        text: `${block.getRedstonePower() > 0 ? ( `\n§7Redstone Power: ${block.getRedstonePower()}` ) : ""}`,
                    },
                    {
                        text: `${tool?.tool ? ( `\n§7Correct Tool: §3${tool.tool}§r\n§7Farmable: ${tool.farmable ? "§aYes" : "§cNo"}` ) : ""}`,
                    },
                    {
                        text: `${blockInfo?.blockInfo ? ( `\n§7Block Info: §3${blockInfo.blockInfo}§r` ) : ""}`,
                    },
                    { text: `\n§9§o${addonId}` },
                ],
            },
        );
    };
};

export const getTool = ( block ) => {
    if (
        (
            block.typeId != "minecraft:redstone_wire"
        )
        && (
            block.typeId.includes( "brick" )
            || block.typeId.includes( "spawner" )
            || block.typeId.includes( "lantern" )
            || block.typeId.includes( "_wall" )
            || block.typeId.includes( "ore" )
            || block.typeId.includes( "stone" )
            || block.typeId.includes( "deepslate" )
            || block.hasTag( "metal" )
            || block.hasTag( "diamond_pick_diggable" )
        )
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
        || (
            block.typeId.includes( "pumpkin" )
            && !block.typeId.includes( "stem" )
        )
        || (
            block.typeId.includes( "melon" )
            && !block.typeId.includes( "stem" )
        )
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
        || block.typeId.includes( "stem" )
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
    } ;
};
export const getBLockInfo = ( block ) => {
if (block.typeId.includes( "soul" )) {
        return {
            blockInfo: "§cNeeds 4 souls to summon §5Lich"
        };
    };
};

export const isInRange = ( getHeadLocation, targetLocation ) => {
    return (
        Math.abs( targetLocation.x - getHeadLocation.x ) < viewDistance
        && Math.abs( targetLocation.z - getHeadLocation.z ) < viewDistance
        && Math.abs( targetLocation.y - getHeadLocation.y ) < viewDistance
    );
};

const Hearts = { heart: "", halfHeart: "", emptyHeart: "" };
export const healthToText = ( currentHealth, maxHealth ) => {
    if (!maxHealth) return;
    if (maxHealth <= 40) {
        const max = Math.ceil( maxHealth / 2 );
        const health = Math.floor( currentHealth / 2 );
        const half = currentHealth % 2 === 1 && health < max;
        const empty = max - health - ( half ? 1 : 0 );
        const hearts = Hearts.heart.repeat( health ) + (half ? Hearts.halfHeart : "") + Hearts.emptyHeart.repeat( empty );

        return splitHearts( hearts );
    } else return "§7Health: " + currentHealth + " / " + maxHealth;
};

const splitHearts = ( string ) => {
    let result = "";
    for (let i = 0; i < string.length; i += 10) {
        result += string.substr( i, 10 ) + "\n";
    };

    let data = result.split( "\n" );
    data = data.filter((item) => item.trim().length != 0);

    return data.join( "\n" );
};

const blocks = {
    white_glazed_terracotta: "glazedTerracotta.white",
    silver_glazed_terracotta: "glazedTerracotta.silver",
    gray_glazed_terracotta: "glazedTerracotta.gray",
    black_glazed_terracotta: "glazedTerracotta.black",
    brown_glazed_terracotta: "glazedTerracotta.brown",
    red_glazed_terracotta: "glazedTerracotta.red",
    orange_glazed_terracotta: "glazedTerracotta.orange",
    yellow_glazed_terracotta: "glazedTerracotta.yellow",
    lime_glazed_terracotta: "glazedTerracotta.lime",
    green_glazed_terracotta: "glazedTerracotta.green",
    cyan_glazed_terracotta: "glazedTerracotta.cyan",
    light_blue_glazed_terracotta: "glazedTerracotta.light_blue",
    blue_glazed_terracotta: "glazedTerracotta.blue",
    purple_glazed_terracotta: "glazedTerracotta.purple",
    magenta_glazed_terracotta: "glazedTerracotta.magenta",
    pink_glazed_terracotta: "glazedTerracotta.pink",

    white_wool: "wool.white",
    light_gray_wool: "wool.silver",
    gray_wool: "wool.gray",
    black_wool: "wool.black",
    brown_wool: "wool.brown",
    red_wool: "wool.red",
    orange_wool: "wool.orange",
    yellow_wool: "wool.yellow",
    lime_wool: "wool.lime",
    green_wool: "wool.green",
    cyan_wool: "wool.cyan",
    light_blue_wool: "wool.lightBlue",
    blue_wool: "wool.blue",
    purple_wool: "wool.purple",
    magenta_wool: "wool.magenta",
    pink_wool: "wool.pink",


    white_concrete: "concrete.white",
    light_gray_concrete: "concrete.silver",
    gray_concrete: "concrete.gray",
    black_concrete: "concrete.black",
    brown_concrete: "concrete.brown",
    red_concrete: "concrete.red",
    orange_concrete: "concrete.orange",
    yellow_concrete: "concrete.yellow",
    lime_concrete: "concrete.lime",
    green_concrete: "concrete.green",
    cyan_concrete: "concrete.cyan",
    light_blue_concrete: "concrete.lightBlue",
    blue_concrete: "concrete.blue",
    purple_concrete: "concrete.purple",
    magenta_concrete: "concrete.magenta",
    pink_concrete: "concrete.pink",

    pitcher_crop: "pitcher_plant",
    torchflower_crop: "torchflower",

    oak_fence: "fence",
    spruce_fence: "spruceFence",
    birch_fence: "birchFence",
    jungle_fence: "jungleFence",
    acacia_fence: "acaciaFence",
    dark_oak_fence: "darkOakFence",

    cobblestone_wall: "cobblestone_wall.normal",
    oak_log: "log.oak",
    acacia_log: "log.acacia",
    dark_oak_log: "log.big_oak",
    spruce_log: "log.spruce",
    birch_log: "log.birch",
    jungle_log: "log.jungle",

    spruce_door: "spruce_door",

};

const crops = {
    "minecraft:wheat": 7,
    "minecraft:potatoes": 7,
    "minecraft:carrots": 7,
    "minecraft:beetroot": 7,
    "minecraft:pitcher_crop": 4,
    "minecraft:torchflower_crop": 7,
    "minecraft:pumpkin_stem": 7,
    "minecraft:melon_stem": 7,
    "minecraft:sweet_berry_bush": 3,
    "better_on_bedrock:tomato_crop": 2,
    "better_on_bedrock:barley_crop": 3,
    "better_on_bedrock:cabbage_crop": 4,
    "better_on_bedrock:onion_crop": 3,
    "better_on_bedrock:grape": 3,
    "better_on_bedrock:blueberry_block": 3,
    "better_on_bedrock:eggplant_crop": 3,
};