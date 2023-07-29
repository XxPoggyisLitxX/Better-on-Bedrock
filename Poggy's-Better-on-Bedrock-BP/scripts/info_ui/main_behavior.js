import { world } from "@minecraft/server";
const viewDistance = 16;
export const toolTipt = () => {
  for (const player of world.getAllPlayers()) {
    const entity = player.getEntitiesFromViewDirection()[0];
    const block = player.getBlockFromViewDirection();
    if (
      entity
      && isInRange(player.getHeadLocation(), entity.location)
    ) {
      const item = entity.getComponent( "item" );
      const tameProbability = (
        entity.getComponent( "tameable" )
          ? entity.getComponent( "tameable").probability
          : 0
      );
      const isBaby = entity.getComponent( "is_baby" ) != null;
            
      const entityId = entity.typeId.split(":")[1];
      const addonId = (
        item != null
          ? item.itemStack.typeId.split( ":" )[0]
          : entity.typeId.split( ":" )[0]
            .replaceAll( "_", " " )
            .replace(
              /(\b[a-z](?!\s))/g,
              (x) => {
                return x.toUpperCase();
              },
            )
      );
            
      if (item) {
        player.sendMessage(item.nameTag);
        player.runCommandAsync(
          `titleraw @s actionbar {"rawtext":[{"translate":"item.`
          + (
            item.itemStack.typeId.split(":")[0] == "minecraft"
              ? item.itemStack.typeId.split(":")[1]
              : item.typeId
          )
          + `.name"}, {"text":" x`
          + item.itemStack.amount
          + (
            item.nameTag
              ? ( "\n§7Nametag: " + item.nameTag )
              : ""
          )
          + `\n§9§o`
          + addonId
          + `"}]}`
        );
      } else {
        player.runCommandAsync(
          `titleraw @s actionbar {"rawtext":[{"translate":"entity.`
          + ( entity.typeId.split( ":" )[0] + ":" )
          + entityId
          + `.name"}, {"text":"`
          + (
            entity.typeId == "minecraft:player"
              ? ( "\n§7Name: " + entity.name )
              : ""
          )
          + (
            entity.typeId != "minecraft:player" && entity.nameTag
              ? ( "\n§7Nametag: " + entity.nameTag )
              : ""
          )
          + (
            entity.getComponent("health").value >= 0
              ? (
                "\n"
                + healthToText(
                  entity.getComponent("health").current,
                  entity.getComponent("health").value
                )
              )
              : ""
          )
          + (
            isBaby
              ? "\n§7Baby"
              : ""
          )
          + (
            tameProbability > 0
              ? ( "\n§7Tame Chance: " + tameProbability )
              : ""
          )
          + `\n§9§o`
          + addonId
          + `"}]}`
        );
      };
    } else if (
      block
      && isInRange(player.getHeadLocation(), block.location)
    ) {
      const addonId = (
        block.typeId.split(":")[0]
          .replaceAll("_", " ")
          .replace(
            /(\b[a-z](?!\s))/g,
            (x) => {
              return x.toUpperCase();
            },
          )
      );
      const blockName = (
        block.typeId.split(":")[1].includes("log")
        && addonId == "Minecraft" 
          ? ( "log." + block.getTags()[2] )
          : block.typeId.split(":")[1]
      );
      const tool = getTool( block );
      player.runCommandAsync(
        `titleraw @s actionbar {"rawtext":[{"translate":"tile.`
        + (
          addonId == "Minecraft"
            ? ""
            : ( block.typeId.split(":")[0] + ":" )
        )
        + block.typeId.split(":")[1]
        + `.name"}, {"text":"\n§7Correct Tool: §3`
        + (
          tool?.tool
            ? (
              tool.tool
              + `\n§7Farmable: `
              + (
                tool.armable
                  ? "§aYes"
                  : "§cNo"
              )
            )
            : ""
        )
        + `\n§9§o`
        + addonId
        + `"}]}`
      );
    };
  };
};

export const getTool = (block) => {
  if (
    block.typeId.includes("brick")
    || block.typeId.includes("spawner")
    || block.typeId.includes("lantern")
    || block.typeId.includes("_wall")
    || block.typeId.includes("ore")
    || block.typeId.includes("stone")
    || block.typeId.includes("deepslate")
    || block.hasTag("metal")
    || block.hasTag("diamond_pick_diggable")
  ) {
    return {
      tool: "Pickaxe",
      armable: false,
    };
  } else if (
    block.typeId.includes("log")
    || block.typeId.includes("chest")
    || block.typeId.includes("table")
    || block.typeId.includes("book")
    || block.typeId.includes("wall_banner")
    || block.typeId.includes("planks")
    || block.typeId.includes("fence")
    || block.typeId.includes("nut")
    || block.typeId.includes("pumpkin")
    || block.hasTag("log")
    || block.hasTag("wood")
  ) {
    return {
      tool: "Axe",
      armable: false,
    };
  } else if (
    block.typeId.includes("farm")
    || block.typeId.includes("dirt")
    || block.typeId.includes("path")
    || block.typeId.includes("podzol")
    || block.hasTag("dirt")
    || block.hasTag("grass")
  ) {
    return {
      tool: "Shovel",
      armable: false,
    };
  } else if (
    block.typeId.includes("crop")
    || block.typeId.includes("grape")
    || block.typeId.includes("bush")
    || block.typeId.includes("wild")
    || block.typeId.includes("flower")
    || block.hasTag("minecraft:crop")
  ) {
    return {
      tool: "All",
      armable: true,
    };
  } else if (
    block.typeId.includes("leaves")
    || block.typeId.includes("vine")
    || block.typeId.includes("grass")
    || block.typeId.includes("root")
    || block.typeId.includes("plant")
    || block.typeId.includes("lich")
  ) {
    return {
      tool: "Shears",
      armable: true,
    };
  } else if (block.typeId.includes( "hat" )) {
    return {
      tool: "Hand",
      armable: false,
    };
  };
};

export const isInRange = (getHeadLocation, targetLocation) => {
  return (
    Math.abs(targetLocation.x - getHeadLocation.x) < viewDistance &&
    Math.abs(targetLocation.z - getHeadLocation.z) < viewDistance &&
    Math.abs(targetLocation.y - getHeadLocation.y) < viewDistance
  );
};

export const healthToText = (currentHealth, maxHealth) => {
  return (
    maxHealth >= 0
      ? "§7Health: " + Math.round(currentHealth) + " / " + maxHealth
      : null
  );
};