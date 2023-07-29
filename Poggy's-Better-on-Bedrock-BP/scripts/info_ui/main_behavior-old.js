//keep this in here just incase mine doesn't work!

import {
  world,
  
  ItemStack,
  Entity,
  ItemEnchantsComponent,
  ItemTypes,
  system,
  EntityInventoryComponent,
  Block,
  Enchantment,
  
} from "@minecraft/server";

let viewDistance = 5;

export function toolTip() {
  let players = world.getPlayers();
  for (let player of players) {
    /*
    Entity Info Indicator
    Here we get all sorts of info about the entity we are looking at.
    We can get health values, tame probability and if they are a baby
    */
    let lookingEntities = player.getEntitiesFromViewDirection()
    if (lookingEntities.length != 0) {
      if (targetIsOnRange(player.getHeadLocation(), lookingEntities[0].location)) {
        let itemComponent = lookingEntities[0].getComponent("item");

        let tameProbability = 0;
        if (lookingEntities[0].getComponent("tameable")) {
          tameProbability =
            lookingEntities[0].getComponent("tameable").probability;
        }

        let heartsToShow =
          lookingEntities[0].getComponent("health") != null
            ? getHealthText(
                lookingEntities[0].getComponent("health").current,
                lookingEntities[0].getComponent("health").value
              )
            : "";
        let isBaby = lookingEntities[0].getComponent("is_baby") != null;

        let entityName = lookingEntities[0].typeId.split(":")[1];
        let addonID =
          itemComponent != null
            ? itemComponent.itemStack.typeId.split(":")[0]
            : lookingEntities[0].typeId.split(":")[0].replaceAll("_", " ").replace(/(\b[a-z](?!\s))/g, (x) => {
              return x.toUpperCase();
          });

        if (itemComponent == null) {
          player.runCommandAsync(
            `titleraw @s actionbar {"rawtext":[{"translate":"entity.${
              addonID == "minecraft" ? "" : addonID + ":"
            }${entityName}.name"}, {"text":"${
              heartsToShow.length != 0 ? "\n" + heartsToShow : ""
            }${isBaby ? "\n§7Baby" : ""}${
              tameProbability != 0 ? "\n§7Tame Chance: " + tameProbability : ""
            }\n§9§o${addonID}"}]}`
          );
        }
        if (lookingEntities[0].getComponent("item")?.typeId.includes("minecraft")) {
          player.runCommandAsync(
            `titleraw @s actionbar {"rawtext":[{"translate":"item.${
              itemComponent.itemStack.typeId.split(":")[1]
            }.name"}, {"text":" x${
              itemComponent.itemStack.amount
            }\n§9§o${addonID}"}]}`
          );
        }
        //if (itemComponent.itemStack.typeId.includes("better_on_bedrock")) {
         //// player.runCommandAsync(
            //`titleraw @s actionbar {"rawtext":[{"translate":"item.${itemComponent.itemStack.typeId}"}, {"text":" x${itemComponent.itemStack.amount}\n§9§o${addonID}"}]}`
          //);
        //}
        if (lookingEntities[0].getComponent("item")?.typeId.includes("better_on_bedrock")) {
          player.runCommandAsync(
            `titleraw @s actionbar {"rawtext":[{"translate":"item.${itemComponent.typeId}"}, {"text":" x${itemComponent.itemStack.amount}\n§9§o${addonID}"}]}`
          );
        }
      }
    } else {
      //If we're not looking at an entity, but a block, we use this to display the block info
      let lookingBlock = player.getBlockFromViewDirection()

      if (lookingBlock) {
        let blockName = lookingBlock.typeId.split(":")[1];
        let addonID = lookingBlock.typeId.split(":")[0].replaceAll("_", " ").replace(/(\b[a-z](?!\s))/g, (x) => {
          return x.toUpperCase();
      });
        let blockTime = lookingBlock.getComponent("destroy_time");

        if (targetIsOnRange(player.getHeadLocation(), lookingBlock.location)) {
          if (blockName.includes("log") && addonID === "minecraft") {
            blockName = "log." + lookingBlock.getTags()[2];
          }
          if (
            lookingBlock.typeId.includes("brick") ||
            lookingBlock.typeId.includes("spawner") ||
            lookingBlock.typeId.includes("lantern") ||
            lookingBlock.typeId.includes("_wall") ||
            lookingBlock.typeId.includes("ore") ||
            lookingBlock.typeId.includes("stone") ||
            lookingBlock.typeId.includes("deepslate") ||
            lookingBlock.hasTag("metal") ||
            lookingBlock.hasTag("diamond_pick_diggable")
          ) {
            let tool = "§7Correct Tool: §3Pickaxe";
            let harvets = "§7Harvestable: §cNo";
            //console.warn(lookingBlock.getTags())
            // blockName += ".cobblestone.";
            player.runCommandAsync(
              `titleraw @s actionbar {"rawtext":[{"translate":"tile.${
                addonID == "minecraft" ? "" : addonID + ":"
              }${blockName}.name"}, {"text":"\n${tool}\n${harvets}\n§9§o${addonID}"}]}`
            );
          } else if (
            lookingBlock.typeId.includes("log") ||
            lookingBlock.typeId.includes("chest") ||
            lookingBlock.typeId.includes("table") ||
            lookingBlock.typeId.includes("book") ||
            lookingBlock.typeId.includes("wall_banner") ||
            lookingBlock.typeId.includes("planks") ||
            lookingBlock.typeId.includes("fence") ||
            lookingBlock.typeId.includes("nut") ||
            lookingBlock.typeId.includes("pumpkin") ||
            lookingBlock.hasTag("log") ||
            lookingBlock.hasTag("wood")
          ) {
            let tool = "§7Correct Tool: §3Axe";
            let harvets = "§7Harvestable: §cNo";
            //console.warn(lookingBlock.getTags())
            // blockName += ".cobblestone.";
            player.runCommandAsync(
              `titleraw @s actionbar {"rawtext":[{"translate":"tile.${
                addonID == "minecraft" ? "" : addonID + ":"
              }${blockName}.name"}, {"text":"\n${tool}\n${harvets}\n§9§o${addonID}"}]}`
            );
          } else if (
            lookingBlock.typeId.includes("farm") ||
            lookingBlock.typeId.includes("dirt") ||
            lookingBlock.typeId.includes("path") ||
            lookingBlock.typeId.includes("podzol") ||
            lookingBlock.hasTag("dirt") ||
            lookingBlock.hasTag("grass")
          ) {
            let tool = "§7Correct Tool: §3Shovel";
            let harvets = "§7Harvestable: §cNo";
            //console.warn(lookingBlock.getTags())
            // blockName += ".cobblestone.";
            player.runCommandAsync(
              `titleraw @s actionbar {"rawtext":[{"translate":"tile.${
                addonID == "minecraft" ? "" : addonID + ":"
              }${blockName}.name"}, {"text":"\n${tool}\n${harvets}\n§9§o${addonID}"}]}`
            );
          } else if (
            lookingBlock.typeId.includes("crop") ||
            lookingBlock.typeId.includes("grape") ||
            lookingBlock.typeId.includes("bush") ||
            lookingBlock.typeId.includes("wild") ||
            lookingBlock.typeId.includes("flower") ||
            lookingBlock.hasTag("minecraft:crop")
          ) {
            let tool = "§7Correct Tool: §3All";
            let harvets = "§7Harvestable: §aYes";
            //console.warn(lookingBlock.getTags())
            // blockName += ".cobblestone.";
            player.runCommandAsync(
              `titleraw @s actionbar {"rawtext":[{"translate":"tile.${
                addonID == "minecraft" ? "" : addonID + ":"
              }${blockName}.name"}, {"text":"\n${tool}\n${harvets}\n§9§o${addonID}"}]}`
            );
          } else if (
            lookingBlock.typeId.includes("leaves") ||
            lookingBlock.typeId.includes("vine") ||
            lookingBlock.typeId.includes("grass") ||
            lookingBlock.typeId.includes("root") ||
            lookingBlock.typeId.includes("plant") ||
            lookingBlock.typeId.includes("lich")
          ) {
            let tool = "§7Correct Tool: §3Shears";
            let harvets = "§7Harvestable: §aYes";
            //console.warn(lookingBlock.getTags())
            // blockName += ".cobblestone.";
            player.runCommandAsync(
              `titleraw @s actionbar {"rawtext":[{"translate":"tile.${
                addonID == "minecraft" ? "" : addonID + ":"
              }${blockName}.name"}, {"text":"\n${tool}\n${harvets}\n§9§o${addonID}"}]}`
            );
          } else if (
            lookingBlock.typeId.includes("hat")
          ) {
            let tool = "§7Correct Tool: §3Hand";
            let harvets = "§7Harvestable: §cNo";
            //console.warn(lookingBlock.getTags())
            // blockName += ".cobblestone.";
            player.runCommandAsync(
              `titleraw @s actionbar {"rawtext":[{"translate":"tile.${
                addonID == "minecraft" ? "" : addonID + ":"
              }${blockName}.name"}, {"text":"\n${tool}\n${harvets}\n§eLegandary Trophy\n§9§o${addonID}"}]}`
            );
          }
           else {
            //console.warn(lookingBlock.getTags())

            player.runCommandAsync(
              `titleraw @s actionbar {"rawtext":[{"translate":"tile.${
                addonID == "minecraft" ? "" : addonID + ":"
              }${blockName}.name"}, {"text":"\n§9§o${addonID}"}]}`
            );
          }
        }
      }
    }
  }
}

export function targetIsOnRange(getHeadLocation, targetLocation) {
    let players = world.getPlayers();
  for (let player of players) {
  return (
    Math.abs(targetLocation.x - getHeadLocation.x) < viewDistance &&
    Math.abs(targetLocation.z - getHeadLocation.z) < viewDistance &&
    Math.abs(targetLocation.y - getHeadLocation.y) < viewDistance
  );
  }``}

  export function getHealthText(currentHealth, maxHealth) {
  currentHealth = currentHealth - 1;
  let heartsToShow = "";
  if (
    maxHealth >= 0); {
      heartsToShow = "§7Health: " + Math.round(currentHealth) + " / " + maxHealth

}

  return heartsToShow;
}
