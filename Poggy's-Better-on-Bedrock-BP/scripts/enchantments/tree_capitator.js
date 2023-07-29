import {
  world,
  system,
  //hi :3
  ItemStack,
  Vector,
  Player,
  ItemEnchantsComponent,
  ItemTypes,
  EntityInventoryComponent,
  Block,
  Enchantment,
  
} from "@minecraft/server";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "@minecraft/server-ui";
import { getPlayerExperienceLevel } from 'get_level_tests'

system.afterEvents.scriptEventReceive.subscribe(
  ({ id, sourceEntity })=>{
      if (!(sourceEntity instanceof Player)) return;
      if (id == "bob:warn") {
        blockWarn(sourceEntity)
      }
  },
  {
      namespaces: [
          "bob",
      ],
  },
);


world.afterEvents.itemUseOn.subscribe((use) => {
  let player = use.source,
    item = use.itemStack; // this do not work. can't get item no more
  let blockTest = player.getBlockFromViewDirection()?.block;
  if (
    (item?.hasTag('minecraft:is_axe')) &&
    blockTest?.typeId == "better_on_bedrock:enchant_bench"
  ) {
    console.warn(item.getTags)
    veinMine(player);
  }
});
function blockWarn(player) {
  let form = new ActionFormData();
  form.title("No Tool?");
  form.body(
    "§cYou are unable to enchant your tool. Please hold an Axe or Pickaxe you crafted or found and try again."
  );
    form.button("Ok");
     form.show(player).then((response) => {
    if (response.selection == 0) {

      }
    })
}
function veinMine(player) {
  let level = player.runCommandAsync("xp 0 @s").level;
  let form = new ActionFormData();
  form.title("Enchant axe?");
  form.body(
    "§cTo enchant this axe with Tree Capitator I, you need at least §e6 experience levels §cand §e1 Tree Capitator I Enchanted Book\n\n§aWhen you have both of the requirements, you'll be able to enchant.\n\n§3When you don't have the requirements, you won't be able to enchant your axe."
  );
  ///buttons
  form.button("Enchant");
  form.button("Don't Enchant");
  form.show(player).then((response) => {
    if (response.selection == 0 && getPlayerExperienceLevel(player) >= 6) {
      const inventory = player.getComponent(
        'inventory'
      );
      for (let slot = 0; slot < inventory.container.size; slot++) {
        const itemStack = inventory.container.getItem(slot);
        if (itemStack?.typeId === "better_on_bedrock:tree_cap_book") {
          let inv = player.getComponent("inventory").container;
          let item = inv.getItem(player.selectedSlot);
          let newItem = new ItemStack(ItemTypes?.get("better_on_bedrock:stone_axe"));
          if (item?.hasTag('minecraft:is_axe')) {
            item?.setLore(["§r§7Tree Capitator I"]);
            player.runCommandAsync("clear @p better_on_bedrock:tree_cap_book 0 1");
            player.runCommandAsync("xp -6l @p");
            inv.setItem(player.selectedSlot, item);
            player.runCommandAsync("enchant @p efficiency 1");
          }
         
        }
      }
    } else if (response.selection == 0 && getPlayerExperienceLevel(player) < 6) {
      player.sendMessage("§cYou don't have enough levels.")
    }
    if (response.selection == 1) {

    }
  });
}
//var blockCount = 0;
let blocks = [];

async function a(player, block, done, starting) {
	const {dimension, location} = block
  const id = `${block.x} ${block.y} ${block.z}`;
  if (done.has(id)) {
    return;
  }
  done.add(id);
  if (
    starting ||
    block.hasTag("log") ||
    block.typeId == "minecraft:mangrove_log" ||    block.typeId == "minecraft:cherry_log"
  ) {
    let players = world.getPlayers();
    //await null;
      let inv = player.getComponent("inventory").container;
      let item = inv.getItem(player.selectedSlot);
      let lore = item.getLore();
      if (lore.includes("§r§7Tree Capitator I")) {
        //blockCount += 1;
        //item.getComponent("durability").damage = item.getComponent("durability").damage + 1;

        item.setLore(["§r§7Tree Capitator I"]);
        inv.setItem(player.selectedSlot, item);
      }

      blocks.push(
        {
          x: block.x,
          y: block.y,
          z: block.z,
        },
      );
      
      if (
        item.getComponent("durability").damage >=
        item.getComponent("durability").maxDurability //we cant get more than max (its cute how u fixed this typo) //<3
        //we can brbrbrbrbrbrb
      ) return;

      block.dimension.runCommandAsync(
        `setblock ${block.x} ${block.y} ${block.z} air [] destroy`
      );

      /*(async (res) => {
        res(
          block.dimension.runCommandAsync(
            `setblock ${block.x} ${block.y} ${block.z} air [] destroy`
          )
        );
      })();*/
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            if (x === 0 && y === 0 && z === 0) {
              continue;
            }
            a(player, dimension.getBlock(Vector.add(location, new Vector(x, y, z))), done);
          }
        }
      }
  }
}

async function e(player, block, done, starting) {
  const id = `${block.x} ${block.y} ${block.z}`;
  let players = world.getPlayers();
    let inv = player.getComponent("inventory").container;
    let item = inv.getItem(player.selectedSlot);
    let lore = item.getLore();
    if (done.has(id)) {
      return;
    }
    done.add(id);
    if (
      starting ||
      block.hasTag("log") ||
      block.typeId == "minecraft:mangrove_log"
    ) {
      blockCount += 1;
      if (lore.includes("§r§7Tree Capitator I")) {

          item.getComponent("durability").damage =
            item.getComponent("durability").damage + blockCount;
          item.setLore(["§r§7Tree Capitator I"]);
          inv.setItem(player.selectedSlot, item);

          block.dimension.runCommandAsync(
            `setblock ${block.x} ${block.y} ${block.z} air [] destroy`
          );
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
              if (x === 0 && y === 0 && z === 0) {
              }

              e(player, block.dimension.getBlock(block.location.offset(x, y, z)), done);
            }
          }
        }
      }
    }
}

world.afterEvents.blockBreak.subscribe(
  async ({ block, player, brokenBlockPermutation }) => {
    let inv = player.getComponent("inventory").container;
    let item = inv.getItem(player.selectedSlot);
    let lore = item?.getLore();
    if (
      brokenBlockPermutation.type.id == "minecraft:oak_log" ||
      brokenBlockPermutation.type.id == "minecraft:mangrove_log" ||
      brokenBlockPermutation.type.id == "minecraft:spruce_log" ||
      brokenBlockPermutation.type.id == "minecraft:birch_log" ||
      brokenBlockPermutation.type.id == "minecraft:jungle_log" ||
      brokenBlockPermutation.type.id == "minecraft:acacia_log" ||
      brokenBlockPermutation.type.id == "minecraft:mangrove_log" ||
      brokenBlockPermutation.type.id == "minecraft:cherry_log" ||
            brokenBlockPermutation.type.id == "minecraft:dark_oak_log"
    ) {
      if (
        item?.hasTag('minecraft:is_axe')
      ) {
        if (lore.includes("§r§7Tree Capitator I")) {
          if (
            item.getComponent("durability").damage <
            item.getComponent("durability").maxDurability
          ) {
            //blockCount = 0;
            blocks = [];
            a(player, block, new Set(), true);
              item.getComponent("durability").damage = (
                (item.getComponent("durability").damage + blocks.length) > item.getComponent("durability").maxDurability
                ? item.getComponent("durability").maxDurability
                : item.getComponent("durability").damage + blocks.length
              );
  
              inv.setItem(player.selectedSlot, item);
              

          }
        }
      }
    }
  }
);