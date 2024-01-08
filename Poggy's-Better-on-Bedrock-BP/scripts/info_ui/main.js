import { MinecraftBlockTypes } from "@minecraft/server";
const viewDistance = 7;
const excludedEntities = [ "better_on_bedrock:backpack" ];
export const toolTip = ( player ) => {
    const entity = player.getEntitiesFromViewDirection({ excludeTypes: excludedEntities })[0]?.entity;
    const block = player.getBlockFromViewDirection({ maxDistance: viewDistance })?.block;
    
    if (
        entity
        && isInRange( player.getHeadLocation(), entity.location )
    ) {
        const item = entity.getComponent( "minecraft:item" );
        const tameProbability = entity.getComponent( "minecraft:tameable")?.probability.toFixed(2) || 0;
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
                            translate: (
                                isBlock
                                ? ( `tile.${item.itemStack.typeId.split( ":" )[0] == "minecraft" ? "" : ( item.itemStack.typeId.split(":")[0] + ":" )}${item.itemStack.typeId.split(":")[1]}.name` )
                                : ( `item.${item.itemStack.typeId.split( ":" )[0] == "minecraft" ? ( item.itemStack.typeId.split( ":" )[1] + ".name" ) : item.itemStack.typeId}` )
                            ),
                        },
                        { text: ` x${item.itemStack.amount}` },
                        { text: item.itemStack.nameTag ? ( "\n§7Display name: " + item.itemStack.nameTag ) : "" },
                        { text: `\n§9§o${addonId}` },
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
                            text: health ? ( "\n" + healthToText( Math.round( health.currentValue ), health.defaultValue ) ) : ""
                        },
                        { text: isBaby ? "\n§7Baby" : "" },
                        { text: tameProbability > 0 ? ( "\n§7Tame Chance: " + tameProbability ) : "" },
                        { text: `\n§9§o${addonId}` },
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

        const color = block.permutation.getState( "color" );
        const wallType = block.permutation.getState( "wall_block_type" );
        const saplingType = block.permutation.getState( "sapling_type" );
        const oldLeafType = block.permutation.getState( "old_leaf_type" );
        const newLeafType = block.permutation.getState( "new_leaf_type" );
        const woodType = block.permutation.getState( "wood_type" );
        const flowerType = block.permutation.getState( "flower_type" );
        const doublePlantType = block.permutation.getState( "double_plant_type" );
        const tallGrassType = block.permutation.getState( "tall_grass_type" );
        const monsterEggStoneType = block.permutation.getState( "monster_egg_stone_type" );
        const spongeType = block.permutation.getState( "sponge_type" );
        const dirtType = block.permutation.getState( "dirt_type" );
        const sandType = block.permutation.getState( "sand_type" );
        const strippedBit = block.permutation.getState( "stripped_bit" );
        const sandStoneType = block.permutation.getState( "sand_stone_type" );
        const prismarineBlockType = block.permutation.getState( "prismarine_block_type" );
        const chiselType = block.permutation.getState( "chisel_type" );
        const damage = block.permutation.getState( "damage" );
        const coralColor = block.permutation.getState( "coral_color" );
        const deadBit = block.permutation.getState( "dead_bit" );
        const coralHangTypeBit = block.permutation.getState( "coral_hang_type_bit" );
        
        const stoneSlabType = block.permutation.getState( "stone_slab_type" );
        const stoneSlabType2 = block.permutation.getState( "stone_slab_type_2" );
        const stoneSlabType3 = block.permutation.getState( "stone_slab_type_3" );
        const stoneSlabType4 = block.permutation.getState( "stone_slab_type_4" );

        const honeyLevel = block.permutation.getState( "honey_level" );
        const brushedProgress = block.permutation.getState( "brushed_progress" );
        const clusterCount = block.permutation.getState( "cluster_count" );
        const candles = block.permutation.getState( "candles" );
        const turtleEggCount = block.permutation.getState( "turtle_egg_count" );
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

        const blockName = (
            (
                blocks[block.typeId.split(":")[1]]
                || block.typeId.split(":")[1]
            )
            + ( color ? "." + ( type[color] || color ) : "" )
            + ( wallType ? "." + ( type.wall[wallType] || wallType ) : "" )
            + ( ( saplingType && !block.typeId.includes( "bamboo_sapling" ) ) ? "." + ( type[saplingType] || saplingType ) : "" )
            + ( oldLeafType ? "." + ( type[oldLeafType] || oldLeafType ) : "" )
            + ( newLeafType ? "." + ( type[newLeafType] || newLeafType ) : "" )
            + ( woodType ? "." + ( strippedBit ? "stripped." : "" ) + ( block.typeId.includes( "slab" ) && woodType == "dark_oak" ? type[woodType] : woodType ) : "" )
            + ( flowerType ? "." + ( type[flowerType] || flowerType ) : "" )
            + ( doublePlantType ? "." + ( type[doublePlantType] || doublePlantType ) : "" )
            + ( tallGrassType ? "." + ( type[tallGrassType] || tallGrassType ) : "" )
            + ( monsterEggStoneType ? "." + ( type.monsterEgg[monsterEggStoneType] || monsterEggStoneType ) : "" )
            + ( spongeType ? "." + spongeType : "" )
            + ( dirtType ? "." + ( type[dirtType] || dirtType ) : "" )
            + ( sandType ? "." + ( type[sandType] || sandType ) : "" )
            + ( sandStoneType ? "." + ( type[sandStoneType] || sandStoneType ) : "" )
            + ( prismarineBlockType ? "." + ( type.prismarine[prismarineBlockType] || prismarineBlockType ) : "" )
            + ( chiselType ? "." + chiselType : "" )
            + ( damage ? "." + ( type.damage[damage] || damage ) : "" )
            + ( coralColor ? "." + coralColor + ( deadBit ? "_dead" : "" ) : "" )

            + ( block.typeId.split(":")[1] == "coral_fan_hang" ? ( deadBit ? "_dead" : "" ) + "." + (coralHangTypeBit ? "pink_fan" : "blue_fan") : "" )
            + ( block.typeId.split(":")[1] == "coral_fan_hang2" ? ( deadBit ? "_dead" : "" ) + "." + (coralHangTypeBit ? "red_fan" : "purple_fan") : "" )
            + ( block.typeId.split(":")[1] == "coral_fan_hang3" ? ( deadBit ? "_dead" : "" ) + "." + (coralHangTypeBit ? "" : "yellow_fan") : "" )

            + ( stoneSlabType ? "." + ( type.slab[stoneSlabType] || stoneSlabType ) : "" )
            + ( stoneSlabType2 ? "." + ( type.slab[stoneSlabType2] || stoneSlabType2 ) : "" )
            + ( stoneSlabType3 ? "." + ( type.slab[stoneSlabType3] || stoneSlabType3 ) : "" )
            + ( stoneSlabType4 ? "." + ( type.slab[stoneSlabType4] || stoneSlabType4 ) : "" )
        );
        
        player.onScreenDisplay.setActionBar(
            {
                rawtext: [
                    {
                        translate: (
                            customTranslation[block.typeId]
                            ? customTranslation[block.typeId]
                            : `tile.${addonId == "Minecraft" ? "" : ( block.typeId.split(":")[0] + ":" )}${blockName}.name`
                        ),
                    },
                    {
                        text: `${growth ? ( `\n§7Growth: ${growth}` ) : ""}`,
                    },
                    {
                        text: `${clusterCount != null ? ( `\n§7Cluster Count: ${clusterCount + 1}` ) : ""}`,
                    },
                    {
                        text: `${candles != null ? ( `\n§7Candles: ${candles + 1}` ) : ""}`,
                    },
                    {
                        text: `${turtleEggCount ? ( `\n§7Egg Count: ${getEggCount( turtleEggCount )}` ) : ""}`,
                    },
                    {
                        text: `${honeyLevel ? ( `\n§7Honey: ${honeyLevel}/5` ) : ""}`,
                    },
                    {
                        text: `${brushedProgress ? ( `\n§7Brushed Progress: ${(brushedProgress / 4) * 100}%` ) : ""}`,
                    },
                    {
                        text: `${block.getRedstonePower() > 0 ? ( `\n§7Redstone Power: ${block.getRedstonePower()}` ) : ""}`,
                    },
                    {
                        text: `${tool?.tool ? ( `\n§7Correct Tool: §3${tool.tool}§r\n§7Farmable: ${tool.farmable ? "§aYes" : "§cNo"}` ) : ""}`,
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
            || block.typeId.includes( "raw_" )
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
    };
};

export const isInRange = ( getHeadLocation, targetLocation ) => {
    return (
        Math.abs( targetLocation.x - getHeadLocation.x ) < viewDistance
        && Math.abs( targetLocation.z - getHeadLocation.z ) < viewDistance
        && Math.abs( targetLocation.y - getHeadLocation.y ) < viewDistance
    );
};

const Hearts = { heart: "！", halfHeart: "＂", emptyHeart: "＃" };
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

    white_carpet: "carpet.white",
    light_gray_carpet: "carpet.silver",
    gray_carpet: "carpet.gray",
    black_carpet: "carpet.black",
    brown_carpet: "carpet.brown",
    red_carpet: "carpet.red",
    orange_carpet: "carpet.orange",
    yellow_carpet: "carpet.yellow",
    lime_carpet: "carpet.lime",
    green_carpet: "carpet.green",
    cyan_carpet: "carpet.cyan",
    light_blue_carpet: "carpet.lightBlue",
    blue_carpet: "carpet.blue",
    purple_carpet: "carpet.purple",
    magenta_carpet: "carpet.magenta",
    pink_carpet: "carpet.pink",

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

    concrete_powder: "concretePowder",
    stained_glass: "stained_glass",

    white_shulker_box: "shulkerBoxWhite",
    light_shulker_box: "shulkerBoxSilver",
    gray_shulker_box: "shulkerBoxGray",
    black_shulker_box: "shulkerBoxBlack",
    brown_shulker_box: "shulkerBoxBrown",
    red_shulker_box: "shulkerBoxRed",
    orange_shulker_box: "shulkerBoxOrange",
    yellow_shulker_box: "shulkerBoxYellow",
    lime_shulker_box: "shulkerBoxLime",
    green_shulker_box: "shulkerBoxGreen",
    cyan_shulker_box: "shulkerBoxCyan",
    light_blue_shulker_box: "shulkerBoxLightBlue",
    blue_shulker_box: "shulkerBoxBlue",
    purple_shulker_box: "shulkerBoxPurple",
    magenta_shulker_box: "shulkerBoxMagenta",
    pink_shulker_box: "shulkerBoxPink",

    pitcher_crop: "pitcher_plant",
    torchflower_crop: "torchflower",

    oak_fence: "fence",
    spruce_fence: "spruceFence",
    birch_fence: "birchFence",
    jungle_fence: "jungleFence",
    acacia_fence: "acaciaFence",
    dark_oak_fence: "darkOakFence",

    cobblestone_wall: "cobblestone_wall",
    melon_stem: "melon_block",

    bamboo_sapling: "bamboo",

    oak_log: "log.oak",
    spruce_log: "log.spruce",
    birch_log: "log.birch",
    jungle_log: "log.jungle",
    acacia_log: "log.acacia",
    dark_oak_log: "log.big_oak",

    stone_block_slab: "stone_slab",
    stone_block_slab2: "stone_slab2",
    stone_block_slab3: "stone_slab3",
    stone_block_slab4: "stone_slab4",

    daylight_detector_inverted: "daylight_detector",
    lit_redstone_lamp: "redstone_lamp",
    brown_mushroom_block: "brown_mushroom_block.cap",
    sea_lantern: "seaLantern",

    tube_coral: "coral.blue",
    brain_coral: "coral.pink",
    bubble_coral: "coral.purple",
    fire_coral: "coral.red",
    horn_coral: "coral.yellow",

    dead_tube_coral: "coral.blue_dead",
    dead_brain_coral: "coral.pink_dead",
    dead_bubble_coral: "coral.purple_dead",
    dead_fire_coral: "coral.red_dead",
    dead_horn_coral: "coral.yellow_dead",

    coral_fan_hang: "coral_fan",
    coral_fan_hang2: "coral_fan",
    coral_fan_hang3: "coral_fan",

    seagrass: "seagrass.seagrass",

    "wall_sign": "standing_sign",
    "spruce_wall_sign": "spruce_standing_sign",
    "birch_wall_sign": "birch_standing_sign",
    "jungle_wall_sign": "jungle_standing_sign",
    "acacia_wall_sign": "acacia_standing_sign",
    "darkoak_wall_sign": "darkoak_standing_sign",
};

const type = {
    slab: {
        cobblestone: "cobble",
        stone_brick: "brick",
        sandstone: "sand",
        smooth_sandstone: "sandstone.smooth",
        smooth_red_sandstone: "red_sandstone.smooth",
        prismarine_rough: "prismarine.rough",
        prismarine_dark: "prismarine.dark",
        prismarine_brick: "prismarine.bricks",
        end_stone_brick: "end_brick",
        polished_andesite: "andesite.smooth",
        polished_diorite: "diorite.smooth",
        polished_granite: "granite.smooth",
    },
    monsterEgg: {
        cobblestone: "cobble",
        chiseled_stone_brick: "chiseledbrick",
        cracked_stone_brick: "crackedbrick",
        mossy_stone_brick: "mossybrick",
        stone_brick: "brick",
    },
    wall: {
        cobblestone: "normal",
        mossy_cobblestone: "mossy",
    },
    prismarine: {
        default: "rough",
    },
    damage: {
        undamaged: "intact",
        slightly_damaged: "slightlyDamaged",
        very_damaged: "veryDamaged",
    },
    normal: "default",
    dark_oak: "big_oak",
    light_blue: "lightBlue",
    heiroglyphs: "chiseled",

    tall: "grass",

    orchid: "blueOrchid",
    tulip_red: "tulipRed",
    tulip_orange: "tulipOrange",
    tulip_white: "tulipWhite",
    tulip_pink: "tulipPink",
    oxeye: "oxeyeDaisy",
    lily_of_the_valley: "lilyOfTheValley",
};

const customTranslation = {
    "minecraft:flower_pot": "item.flower_pot.name",
    "minecraft:frame": "item.frame.name",
    "minecraft:skull": "item.skull.char.name",
    "minecraft:kelp": "item.kelp.name",

    "minecraft:wooden_door": "item.wooden_door.name",
    "minecraft:spruce_door": "item.spruce_door.name",
    "minecraft:birch_door": "item.birch_door.name",
    "minecraft:jungle_door": "item.jungle_door.name",
    "minecraft:acacia_door": "item.acacia_door.name",
    "minecraft:dark_oak_door": "item.dark_oak_door.name",
    "minecraft:cherry_door": "item.cherry_door.name",
    "minecraft:bamboo_door": "item.bamboo_door.name",
    "minecraft:mangrove_door": "item.mangrove_door.name",

    "minecraft:oak_hanging_sign": "item.oak_hanging_sign.name",
    "minecraft:spruce_hanging_sign": "item.spruce_hanging_sign.name",
    "minecraft:birch_hanging_sign": "item.birch_hanging_sign.name",
    "minecraft:jungle_hanging_sign": "item.jungle_hanging_sign.name",
    "minecraft:acacia_hanging_sign": "item.acacia_hanging_sign.name",
    "minecraft:dark_oak_hanging_sign": "item.dark_oak_hanging_sign.name",
    "minecraft:cherry_hanging_sign": "item.cherry_hanging_sign.name",
    "minecraft:bamboo_hanging_sign": "item.bamboo_hanging_sign.name",
    "minecraft:mangrove_hanging_sign": "item.mangrove_hanging_sign.name",
    "minecraft:warped_hanging_sign": "item.warped_hanging_sign.name",
    "minecraft:crimson_hanging_sign": "item.crimson_hanging_sign.name",
    
    "minecraft:cherry_standing_sign": "item.cherry_sign.name",
    "minecraft:bamboo_standing_sign": "item.bamboo_sign.name",
    "minecraft:mangrove_standing_sign": "item.mangrove_sign.name",
    
    "minecraft:cherry_wall_sign": "item.cherry_sign.name",
    "minecraft:bamboo_wall_sign": "item.bamboo_sign.name",
    "minecraft:mangrove_wall_sign": "item.mangrove_sign.name",
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

const eggs = {
    one_egg: 1,
    two_egg: 2,
    three_egg: 3,
    four_egg: 4,
};

const getEggCount = ( count ) => eggs[count] ? eggs[count] : 0;