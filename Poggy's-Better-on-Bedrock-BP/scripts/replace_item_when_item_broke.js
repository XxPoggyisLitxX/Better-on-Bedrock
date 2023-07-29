import { world, system, ItemStack } from "@minecraft/server";

export function replaceItemOnBroken() {
  let players = world.getPlayers();
  for (let player of players) {
    let inventory = player.getComponent("minecraft:inventory").container;
    for (let i = 0; i < inventory.size; i++) {
      let slot = inventory.getItem(i);
      //Item you are looking for
      if (
        slot?.typeId === "better_on_bedrock:fixed_ghost_necklace" &&
        slot?.getComponent("durability").damage == 10
      ) {
        //Item you're replacing when above item has durability of less or equal to 1
        inventory.setItem(i, new ItemStack("better_on_bedrock:broken_ghost_necklace", 1));
      }
    }
  }
}



