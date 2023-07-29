import { world, ItemStack, Location } from "@minecraft/server";
//function loads structure with backpack_uncommon entity
function loadStructure() {
  let players = world.getPlayers();
  for (let player of players) {
  let e = world.afterEvents.tick.subscribe((data) => {
    console.warn(player.Id);
      player.runCommandAsync("structure load " + player.Id + " ~ ~7 ~");
      console.warn(player.nameTag);
      world.afterEvents.tick.unsubscribe(e);
  });
}}
//function saves structure with entity
function saveStructure() {
  let players = world.getPlayers();
  for (let player of players) {
    let e = world.afterEvents.tick.subscribe((data) => {
        player.runCommandAsync(
            "structure save " + player.Id + " ~-1 ~8 ~-1 ~1 ~3 ~1 true disk false"
          );
          player.runCommandAsync(
            "event entity @e[type=better_on_bedrock:backpack_uncommon, r=6] despawn_backpack_uncommon"
          );
          console.warn(player.Id);
        world.afterEvents.tick.unsubscribe(e);1
    });
  }}

world.afterEvents.tick.subscribe((data) => {
  let players = world.getPlayers();
  for (let player of players) {
    const [entity] = player.dimension.getEntities({
      tags: [`player:${player.name}`],
    });
    let inv = player.getComponent("inventory").container;
    let item = inv.getItem(player.selectedSlot);
    //this spawns the entity with a tag with the player name when the player does not have tag 'backpack_uncommon1'
    if (item?.typeId == "better_on_bedrock:backpack_uncommon" && !player.hasTag("backpack_uncommon1")) {
      player.addTag("backpack_uncommon1")
      let Dimension = world.getDimension(player.dimension.id);
      let entity = Dimension.spawnEntity("better_on_bedrock:backpack_uncommon", new Location(player.location.x, player.location.y, player.location.z));
      entity.nameTag = "backpack_uncommon";
      entity.addTag("player:" + player.name);
    }
    if (item?.typeId === "better_on_bedrock:backpack_uncommon" && player.getComponent("movement").current === player.getComponent("movement").value) {
        //if player does not have this tag while holding the item, we run the loadStructure function to load our entity
      if (!player.hasTag("tag")) {
        player.addTag("tag");
        loadStructure();
      }
      //this always run when we hold our item
      entity?.teleport(
        {
          x: Number(player.location.x),
          y: Number(player.location.y + 0.5),
          z: Number(player.location.z),
        },
        world.getDimension(player.dimension.id),
        0,
        0
      );
    } else if (!item?.typeId == "better_on_bedrock:backpack_uncommon" || (items?.typeId == "better_on_bedrock:backpack_uncommon" && player.getComponent("movement").current > player.getComponent("movement").value)) {
        //if the player has this tag while not holding the item, we run the saveStructure function to save our entity
      if (player.hasTag("tag")) {
        player.removeTag("tag");
        saveStructure()
      }
      //this always run when we don't hold the item
      entity?.teleport(
        {
          x: Number(player.location.x),
          y: Number(player.location.y + 8),
          z: Number(player.location.z),
        },
        world.getDimension(player.dimension.id),
        0,
        0
      );
    }
  }
});