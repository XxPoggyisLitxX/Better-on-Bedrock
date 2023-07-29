import { world, ItemType, Vector } from "@minecraft/server"

/*world.afterEvents.blockBreak.subscribe(
    ({ block, player, brokenBlockPermutation, data }) => {
  const grow = brokenBlockPermutation.getProperty('growth')

    if(brokenBlockPermutation.type.id == "minecraft:carrots" && block.permutation.getProperty('growth')) {
        console.warn(data.brokenBlockPermutation.permutation.getProperty('growth').value)
        world.getDimension('overworld').runCommandAsync(`setblock ${block.x} ${block.y} ${block.z} carrots 0 destroy`) //`setblock ${block.x} ${block.y} ${block.z} air 0 destroy`
        
    }
})*/


world.afterEvents.blockBreak.subscribe(data => {
    if(data.brokenBlockPermutation.type.id == 'minecraft:carrots' && data.brokenBlockPermutation.getProperty("growth") == 7){
        console.warn(data.brokenBlockPermutation.getProperty("growth") == 7)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.carrots))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.carrots)
    }
    if(data.brokenBlockPermutation.type.id == 'minecraft:potatoes' && data.brokenBlockPermutation.getProperty("growth") == 7){
        console.warn(data.brokenBlockPermutation.getProperty("growth") == 7)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.potatoes))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.potatoes)
    }
    if(data.brokenBlockPermutation.type.id == 'minecraft:beetroot' && data.brokenBlockPermutation.getProperty("growth") == 7){
        console.warn(data.brokenBlockPermutation.getProperty("growth") == 7)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.beetroot))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.beetroot)
    }
    if(data.brokenBlockPermutation.type.id == 'minecraft:wheat' && data.brokenBlockPermutation.getProperty("growth") == 7){
        console.warn(data.brokenBlockPermutation.getProperty("growth") == 7)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.wheat))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.wheat)
    }

    if(data.brokenBlockPermutation.type.id == 'better_on_bedrock:barley_crop' && data.brokenBlockPermutation.getProperty("better_on_bedrock:growth_stage") == 3){
        console.warn(data.brokenBlockPermutation.getProperty("better_on_bedrock:growth_stage") == 3)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:barley_crop")))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:barley_crop"))
    }
    if(data.brokenBlockPermutation.type.id == 'better_on_bedrock:tomato_crop' && data.brokenBlockPermutation.getProperty("better_on_bedrock:growth_stage") == 2){
        console.warn(data.brokenBlockPermutation.getProperty("better_on_bedrock:growth_stage") == 2)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:tomato_crop")))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:tomato_crop"))
    }
    if(data.brokenBlockPermutation.type.id == 'better_on_bedrock:healthy_carrot_crop' && data.brokenBlockPermutation.getProperty("pa:growth_stage") == 3){
        console.warn(data.brokenBlockPermutation.getProperty("pa:growth_stage") == 3)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:healthy_carrot_crop")))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:healthy_carrot_crop"))
    }
     if(data.brokenBlockPermutation.type.id == 'better_on_bedrock:eggplant_crop' && data.brokenBlockPermutation.getProperty("better_on_bedrock:growth_stage") == 2){
        console.warn(data.brokenBlockPermutation.getProperty("better_on_bedrock:growth_stage") == 2)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:eggplant_crop")))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:eggplant_crop"))
    }
     if(data.brokenBlockPermutation.type.id == 'better_on_bedrock:onion_crop' && data.brokenBlockPermutation.getProperty("better_on_bedrock:growth_stage") == 3){
        console.warn(data.brokenBlockPermutation.getProperty("better_on_bedrock:growth_stage") == 3)
        console.warn(world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:onion_crop")))
        world.getDimension('overworld').getBlock(data.block).setType(MinecraftBlockTypes.get("better_on_bedrock:onion_crop"))
    }
})