import { world,  ItemStack, Entity, ItemEnchantsComponent, ItemTypes, EntityInventoryComponent, Block, Enchantment,  } from "@minecraft/server"
import { system } from "@minecraft/server";
import { MinecraftEntityTypes, DynamicPropertiesDefinition } from "@minecraft/server"
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"

world.beforeEvents.itemUseOn.subscribe((use) => {
  let player = use.source,
    item = use.itemStack; // this do not work. can't get item no more
  let blockTest = player.getBlockFromViewDirection();
    if (
      (item?.typeId == "better_on_bedrock:coconut_nut") &&
      blockTest?.typeId == "minecraft:stone"
    ) {
        console.warn("test")
      world.getDimension(player.dimension.id).runCommandAsync("give @p better_on_bedrock:broken_open_coconut 1 0")
       world.getDimension(player.dimension.id).runCommandAsync("clear @p better_on_bedrock:coconut_nut 0 1")
    }
    //custom shovel and hoe sounds when they change dirt to farmland and grass to paths.
    //We uses this to prevent server lag caused by run_command.
    if (
      (item?.typeId == "better_on_bedrock:stardust_hoe") &&
      (blockTest?.typeId == "minecraft:grass" || blockTest?.typeId == "minecraft:dirt" || blockTest?.typeId == "minecraft:coarse_dirt")
    ) {
        console.warn("test")
       world.getDimension(player.dimension.id).runCommandAsync("playsound use.gravel @p")
    }
    if (
      (item?.typeId == "better_on_bedrock:stardust_shovel") &&
      (blockTest?.typeId == "minecraft:grass" || blockTest?.typeId == "minecraft:dirt")
    ) {
        console.warn("test")
       world.getDimension(player.dimension.id).runCommandAsync("playsound step.grass @p")
    }
    //step.grass
  });

  world.afterEvents.itemUse.subscribe((use) => {
    let player = use.source,
      item = use.itemStack; // this do not work. can't get item no more
    let blockTest = player.getBlockFromViewDirection();
    if(item.typeId=='better_on_bedrock:amethyst_helmet'){
      player.runCommand("playsound step.amethyst_block @p")
    }
    if(item.typeId=='better_on_bedrock:amethyst_chestplate'){
      player.runCommand("playsound step.amethyst_block @p")
    }
    if(item.typeId=='better_on_bedrock:amethyst_leggings'){
      player.runCommand("playsound step.amethyst_block @p")
    }
    if(item.typeId=='better_on_bedrock:amethyst_boots'){
      player.runCommand("playsound step.amethyst_block @p")
    }
  })