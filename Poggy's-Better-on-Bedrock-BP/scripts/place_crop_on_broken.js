import { world, ItemType, Vector, MinecraftBlockTypes } from "@minecraft/server"
world.afterEvents.blockBreak.subscribe(
    ({ block, dimension, brokenBlockPermutation }) => {
        if (crops[ block.typeId ]) {
            const maxGrowth = crops[ block.typeId ];
            const currentGrowth = block.permutation.getState( "growth" ) / maxGrowth || block.permutation.getState( "better_on_bedrock:growth_stage" ) / maxGrowth;
            const percentage = (currentGrowth !== 0 ? currentGrowth.toFixed(2) : 0);
            world.sendMessage("Test")
            if (percentage >= 1) block.setType( brokenBlockPermutation.type );
        };
    },
);

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


/*world.afterEvents.blockBreak.subscribe(data => {
    
    
    if(data.brokenBlockPermutation.typeId == 'minecraft:carrots' && data.brokenBlockPermutation.getState("growth") == 7){
        //console.warn(data.brokenBlockPermutation.getState("growth") == 7)
        //console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.carrots))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.carrots)
    }
    if(data.brokenBlockPermutation.type.id == 'minecraft:potatoes' && data.brokenBlockPermutation.getState("growth") == 7){
        console.warn(data.brokenBlockPermutation.getState("growth") == 7)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.potatoes))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.potatoes)
    }
    if(data.brokenBlockPermutation.type.id == 'minecraft:beetroot' && data.brokenBlockPermutation.getState("growth") == 7){
        console.warn(data.brokenBlockPermutation.getState("growth") == 7)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.beetroot))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.beetroot)
    }
    if(data.brokenBlockPermutation.type.id == 'minecraft:wheat' && data.brokenBlockPermutation.getState("growth") == 7){
        console.warn(data.brokenBlockPermutation.getState("growth") == 7)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.wheat))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.wheat)
    }

    if(data.brokenBlockPermutation.type.id == 'better_on_bedrock:barley_crop' && data.brokenBlockPermutation.getState("better_on_bedrock:growth_stage") == 3){
        console.warn(data.brokenBlockPermutation.getState("better_on_bedrock:growth_stage") == 3)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:barley_crop")))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:barley_crop"))
    }
    if(data.brokenBlockPermutation.type.id == 'better_on_bedrock:tomato_crop' && data.brokenBlockPermutation.getState("better_on_bedrock:growth_stage") == 2){
        console.warn(data.brokenBlockPermutation.getState("better_on_bedrock:growth_stage") == 2)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:tomato_crop")))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:tomato_crop"))
    }
    if(data.brokenBlockPermutation.type.id == 'better_on_bedrock:healthy_carrot_crop' && data.brokenBlockPermutation.getState("better_on_bedrock:growth_stage") == 3){
        console.warn(data.brokenBlockPermutation.getState("better_on_bedrock:growth_stage") == 3)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:healthy_carrot_crop")))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:healthy_carrot_crop"))
    }
     if(data.brokenBlockPermutation.type.id == 'better_on_bedrock:eggplant_crop' && data.brokenBlockPermutation.getState("better_on_bedrock:growth_stage") == 2){
        console.warn(data.brokenBlockPermutation.getState("better_on_bedrock:growth_stage") == 2)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:eggplant_crop")))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:eggplant_crop"))
    }
     if(data.brokenBlockPermutation.type.id == 'better_on_bedrock:onion_crop' && data.brokenBlockPermutation.getState("better_on_bedrock:growth_stage") == 3){
        console.warn(data.brokenBlockPermutation.getState("better_on_bedrock:growth_stage") == 3)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:onion_crop")))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:onion_crop"))
    }
})*/