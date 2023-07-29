import { world, ItemStack, Vector, EntityInventoryComponent, MinecraftItemTypes, ItemEnchantsComponent } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { getPlayerExperienceLevel } from "get_level_tests";

world.afterEvents.itemUseOn.subscribe(
  (use) => {
    let player = use.source,
    item = use.itemStack; // this do not work. can't get item no more
  let blockTest = player.getBlockFromViewDirection();
    let block = player.getBlockFromViewDirection()?.block;
    if (
      (item?.hasTag('minecraft:is_pickaxe'))
      && block?.typeId == "better_on_bedrock:enchant_bench"
    ) veinMine(player); 
});

function veinMine(player) {
  let level = player.runCommandAsync("xp 0 @s")
  let form = new ActionFormData();
  form.title("Enchant Pickaxe?");
  form.body(
    "§cTo enchant this pickaxe with Vein Miner I, you need at least §e6 experience levels §cand §e1 Vein Miner I Enchanted Book\n\n§aWhen you have both of the requirements, you'll be able to enchant.\n\n§3When you don't have the requirements, you won't be able to enchant your pickaxe."
  );
  ///buttons
  form.button("Enchant");
  form.button("Don't Enchant");
  form.show(player).then((response) => {
    if (response.selection == 0 && getPlayerExperienceLevel(player) >= 6) {
      const inventory = player.getComponent(
        EntityInventoryComponent.componentId
      );
      for (let slot = 0; slot < inventory.container.size; slot++) {
        const itemStack = inventory.container.getItem(slot);
        if (itemStack?.typeId === "better_on_bedrock:vein_miner_book") {
          let inv = player.getComponent("inventory").container;
          let item = inv.getItem(player.selectedSlot);
          if (item.hasTag('minecraft:is_pickaxe')) {
     
            item.setLore(['§r§7Vein Miner I'])
            player.runCommandAsync("clear @p better_on_bedrock:vein_miner_book 0 1");
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

const veinBlocks = [
  "better_on_bedrock:stardust_ore",
  "better_on_bedrock:deepslate_stardust_ore",
  "better_on_bedrock:alluminum_ore",,
  "better_on_bedrock:tin_ore",
  "minecraft:deepslate_lapis_ore",
  "minecraft:deepslate_copper_ore",
  "minecraft:deepslate_coal_ore",
  "minecraft:deepslate_diamond_ore",
  "minecraft:lit_deepslate_redstone_ore",
  "minecraft:deepslate_gold_ore",
  "minecraft:deepslate_emerald_ore",
  "minecraft:deepslate_iron_ore",
  "minecraft:lapis_ore",
  "minecraft:coal_ore",
  "minecraft:emerald_ore",
  "minecraft:iron_ore",
  "minecraft:copper_ore",
  "minecraft:gold_ore",
  "minecraft:quartz_ore",
  "minecraft:lit_redstone_ore",
  "minecraft:diamond_ore"
];

let blocks = [];

 function r(player, block, done, starting) {
    const {dimension, location} = block;
    
  const id = `${location.x} ${location.y} ${location.z}`;
  if (done.has(id)) return;

  done.add(id);
  if (
    starting ||
    veinBlocks.includes(block?.typeId) ||
    block.hasTag("wood_pick_diggable") ||
    block.hasTag("stone_pick_diggable") ||
    block.hasTag("iron_pick_diggable") ||
    block.hasTag("diamond_pick_diggable") ||
    block.hasTag("gold_pick_diggable")
  ) {///better_on_bedrock:tin_ore
    //await null;
      let inv = player.getComponent("inventory").container;
      let item = inv.getItem(player.selectedSlot);
      const brokenBlockPermutation = block
      const enchs = item.getComponent(ItemEnchantsComponent.componentId);
      const enchList = enchs.enchantments;
      let lore = item.getLore();
      if (lore.includes("§r§7Vein Miner I")) {
        /*item.getComponent("durability").damage =
          item.getComponent("durability").damage +
          Math.floor(Math.random(0) * 0) +
          1;-*/
        inv.setItem(player.selectedSlot, item);
        console.warn(item.getComponent(ItemEnchantsComponent.componentId).enchantments.hasEnchantment("fortune") )
        if(item.getComponent(ItemEnchantsComponent.componentId).enchantments.hasEnchantment("fortune") == 1) {
          if(brokenBlockPermutation.type.id == "minecraft:coal_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.coal, 1 ), new Vector(block.location.x, block.location.y, block.location.z))
        }  if(brokenBlockPermutation.type.id == "minecraft:iron_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawIron, 1 ), new Vector(block.location.x, block.location.y, block.location.z))
        }   if(brokenBlockPermutation.type.id == "minecraft:gold_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawGold, 1 ), new Vector(block.location.x, block.location.y, block.location.z))
        }  if(brokenBlockPermutation.type.id == "minecraft:lapis_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.lapisLazuli, 13), new Vector(block.location.x, block.location.y, block.location.z))
        }if(brokenBlockPermutation.type.id == "minecraft:diamond_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.diamond, 1), new Vector(block.location.x, block.location.y, block.location.z))
        }if(brokenBlockPermutation.type.id == "minecraft:copper_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawCopper, Math.floor(Math.random() * 10 - 4.67 + 4.67) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
        }
        if(brokenBlockPermutation.type.id == "minecraft:deepslate_coal_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.coal, 1 ), new Vector(block.location.x, block.location.y, block.location.z))
        }  if(brokenBlockPermutation.type.id == "minecraft:deepslate_iron_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawIron,1 ), new Vector(block.location.x, block.location.y, block.location.z))
        }   if(brokenBlockPermutation.type.id == "minecraft:deepslate_gold_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawGold, 1 ), new Vector(block.location.x, block.location.y, block.location.z))
        }  if(brokenBlockPermutation.type.id == "minecraft:deepslate_lapis_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.lapisLazuli, 13), new Vector(block.location.x, block.location.y, block.location.z))
        }if(brokenBlockPermutation.type.id == "minecraft:deepslate_diamond_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.diamond, 1), new Vector(block.location.x, block.location.y, block.location.z))
        }if(brokenBlockPermutation.type.id == "minecraft:deepslate_copper_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawCopper, Math.floor(Math.random() * 10 - 4.67 + 4.67) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
        }
        
        
        
        //2
       } else if(item.getComponent(ItemEnchantsComponent.componentId).enchantments.hasEnchantment("fortune")  == 2) {
          if(brokenBlockPermutation.type.id == "minecraft:coal_ore"){
          
          player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.coal, 2), new Vector(block.location.x, block.location.y, block.location.z))
        }  if(brokenBlockPermutation.type.id == "minecraft:iron_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawIron, 2), new Vector(block.location.x, block.location.y, block.location.z))
        }   if(brokenBlockPermutation.type.id == "minecraft:gold_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawGold, 2), new Vector(block.location.x, block.location.y, block.location.z))
        }  if(brokenBlockPermutation.type.id == "minecraft:lapis_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.lapisLazuli, Math.floor(Math.random() * 15 - 11.375 - 27) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
        }if(brokenBlockPermutation.type.id == "minecraft:diamond_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.diamond, 2), new Vector(block.location.x, block.location.y, block.location.z))
        }if(brokenBlockPermutation.type.id == "minecraft:copper_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawCopper, Math.floor(Math.random() * 15 - 6.125 - 15) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
        }
        if(brokenBlockPermutation.type.id == "minecraft:deepslate_coal_ore"){
          
          player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.coal, 2), new Vector(block.location.x, block.location.y, block.location.z))
        }  if(brokenBlockPermutation.type.id == "minecraft:deepslate_iron_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawIron, 2), new Vector(block.location.x, block.location.y, block.location.z))
        }   if(brokenBlockPermutation.type.id == "minecraft:deepslate_gold_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawGold, 2), new Vector(block.location.x, block.location.y, block.location.z))
        }  if(brokenBlockPermutation.type.id == "minecraft:deepslate_lapis_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.lapisLazuli, Math.floor(Math.random() * 15 - 11.375 - 27) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
        }if(brokenBlockPermutation.type.id == "minecraft:deepslate_diamond_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.diamond, 2), new Vector(block.location.x, block.location.y, block.location.z))
        }if(brokenBlockPermutation.type.id == "minecraft:deepslate_copper_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawCopper, Math.floor(Math.random() * 15 - 6.125 - 15) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
        }
        
        
        //3//
        } else if(item.getComponent(ItemEnchantsComponent.componentId).enchantments.hasEnchantment("fortune")  == 3) {
          if(brokenBlockPermutation.type.id == "minecraft:coal_ore"){
          
          player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.coal, 3), new Vector(block.location.x, block.location.y, block.location.z))
        }  if(brokenBlockPermutation.type.id == "minecraft:iron_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawIron, 3), new Vector(block.location.x, block.location.y, block.location.z))
        }   if(brokenBlockPermutation.type.id == "minecraft:gold_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawGold, 3), new Vector(block.location.x, block.location.y, block.location.z))
        }  if(brokenBlockPermutation.type.id == "minecraft:lapis_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.lapisLazuli, Math.floor(Math.random() * 24 - 14.3 - 36) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
        }if(brokenBlockPermutation.type.id == "minecraft:diamond_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.diamond, 3), new Vector(block.location.x, block.location.y, block.location.z))
        }if(brokenBlockPermutation.type.id == "minecraft:copper_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawCopper, Math.floor(Math.random() * 20 - 7.7 - 20) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
        }

        if(brokenBlockPermutation.type.id == "minecraft:deepslate_coal_ore"){
          
          player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.coal, 3), new Vector(block.location.x, block.location.y, block.location.z))
        }  if(brokenBlockPermutation.type.id == "minecraft:deepslate_iron_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawIron, 3), new Vector(block.location.x, block.location.y, block.location.z))
        }   if(brokenBlockPermutation.type.id == "minecraft:deepslate_gold_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawGold, 3), new Vector(block.location.x, block.location.y, block.location.z))
        }  if(brokenBlockPermutation.type.id == "minecraft:deepslate_lapis_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.lapisLazuli, Math.floor(Math.random() * 24 - 14.3 - 36) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
        }if(brokenBlockPermutation.type.id == "minecraft:deepslate_diamond_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.diamond, 3), new Vector(block.location.x, block.location.y, block.location.z))
        }if(brokenBlockPermutation.type.id == "minecraft:deepslate_copper_ore"){
          
           player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawCopper, Math.floor(Math.random() * 20 - 7.7 - 20) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
        }
      }
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

      block.dimension.runCommand(
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
            r(player, dimension.getBlock(Vector.add(location, new Vector(x, y, z))), done);
          }
        }
      }

      /*(async (res) => {
        res(
          player.runCommand(
            `setblock ${block.x} ${block.y} ${block.z} air [] destroy`
          )
        );
      })();

      r(player, dimension.getBlock(Vector.add(location, new Vector(1, 0, 0))), done)
      r(player, dimension.getBlock(Vector.add(location, new Vector(-1, 0, 0))), done)
      r(player, dimension.getBlock(Vector.add(location, new Vector(0, 1, 0))), done)
      r(player, dimension.getBlock(Vector.add(location, new Vector(0, -1, 0))), done)
      r(player, dimension.getBlock(Vector.add(location, new Vector(0, 0, 1))), done)
      r(player, dimension.getBlock(Vector.add(location, new Vector(0, 0, -1))), done)*/

      /*r(block.dimension.getBlock(block.location.offset(-1, 0, 0)), done);
      r(block.dimension.getBlock(block.location.offset(0, 1, 0)), done);
      r(block.dimension.getBlock(block.location.offset(0, -1, 0)), done);
      r(block.dimension.getBlock(block.location.offset(0, 0, 1)), done);
      r(block.dimension.getBlock(block.location.offset(0, 0, -1)), done);*/
  }
}
function getRandomInt(max){
  return Math.floor(Math.random() * max);
}
world.afterEvents.blockBreak.subscribe(
  async ({ block, player, brokenBlockPermutation }) => {
      let inv = player.getComponent("inventory").container;
      let item = inv.getItem(player.selectedSlot);
      const enchs = item.getComponent(ItemEnchantsComponent.componentId);
      const enchList = enchs.enchantments;
      if (veinBlocks.includes(brokenBlockPermutation.type.id)) {
        if (
          item?.hasTag('minecraft:is_pickaxe')
        ) {
          let players = world.getPlayers();
            let inv = player.getComponent("inventory").container;
            let item = inv.getItem(player.selectedSlot);
            let lore = item.getLore();
            let loreS = item.nameTag
            if (lore.includes("§r§7Vein Miner I") || loreS.includes("§r§7Vein Miner I") ) {
              if (
                item.getComponent("durability").damage <
                item.getComponent("durability").maxDurability
              ) {
                blocks = [];
                await null;
                r(player, block, new Set(), true);
                console.warn(`§eItem tag is: ${item.getTag}`)
                console.warn(item.getComponent(ItemEnchantsComponent.componentId).enchantments.hasEnchantment("fortune") )
                if(item.getComponent(ItemEnchantsComponent.componentId).enchantments.hasEnchantment("fortune") == 1) {
                  if(brokenBlockPermutation.type.id == "minecraft:coal_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.coal, 1 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }  if(brokenBlockPermutation.type.id == "minecraft:iron_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawIron, 1 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }   if(brokenBlockPermutation.type.id == "minecraft:gold_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawGold, 1 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }  if(brokenBlockPermutation.type.id == "minecraft:lapis_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.lapisLazuli, 1 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }if(brokenBlockPermutation.type.id == "minecraft:diamond_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.diamond, 1), new Vector(block.location.x, block.location.y, block.location.z))
                }if(brokenBlockPermutation.type.id == "minecraft:copper_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawCopper, Math.floor(Math.random() * 10 - 4.67 + 4.67) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }
                if(brokenBlockPermutation.type.id == "minecraft:deepslate_coal_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.coal, 1 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }  if(brokenBlockPermutation.type.id == "minecraft:deepslate_iron_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawIron, 1 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }   if(brokenBlockPermutation.type.id == "minecraft:deepslate_gold_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawGold, 1 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }  if(brokenBlockPermutation.type.id == "minecraft:deepslate_lapis_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.lapisLazuli, 1 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }if(brokenBlockPermutation.type.id == "minecraft:deepslate_diamond_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.diamond, 1), new Vector(block.location.x, block.location.y, block.location.z))
                }if(brokenBlockPermutation.type.id == "minecraft:deepslate_copper_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawCopper, Math.floor(Math.random() * 10 - 4.67 + 4.67) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }
                
                
                
                //2
               } else if(item.getComponent(ItemEnchantsComponent.componentId).enchantments.hasEnchantment("fortune")  == 2) {
                  if(brokenBlockPermutation.type.id == "minecraft:coal_ore"){
                  
                  player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.coal, 2 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }  if(brokenBlockPermutation.type.id == "minecraft:iron_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawIron, 2 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }   if(brokenBlockPermutation.type.id == "minecraft:gold_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawGold, 2 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }  if(brokenBlockPermutation.type.id == "minecraft:lapis_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.lapisLazuli, Math.floor(Math.random() * 15 - 11.375 - 27) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }if(brokenBlockPermutation.type.id == "minecraft:diamond_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.diamond, 1 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }if(brokenBlockPermutation.type.id == "minecraft:copper_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawCopper, Math.floor(Math.random() * 15 - 6.125 - 15) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }
                if(brokenBlockPermutation.type.id == "minecraft:deepslate_coal_ore"){
                  
                  player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.coal, 2 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }  if(brokenBlockPermutation.type.id == "minecraft:deepslate_iron_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawIron, 2 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }   if(brokenBlockPermutation.type.id == "minecraft:deepslate_gold_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawGold, 2 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }  if(brokenBlockPermutation.type.id == "minecraft:deepslate_lapis_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.lapisLazuli, Math.floor(Math.random() * 15 - 11.375 - 27) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }if(brokenBlockPermutation.type.id == "minecraft:deepslate_diamond_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.diamond, 1 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }if(brokenBlockPermutation.type.id == "minecraft:deepslate_copper_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawCopper, Math.floor(Math.random() * 15 - 6.125 - 15) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }
                
                
                //3//
                } else if(item.getComponent(ItemEnchantsComponent.componentId).enchantments.hasEnchantment("fortune")  == 3) {
                  if(brokenBlockPermutation.type.id == "minecraft:coal_ore"){
                  
                  player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.coal, 3 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }  if(brokenBlockPermutation.type.id == "minecraft:iron_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawIron, 3 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }   if(brokenBlockPermutation.type.id == "minecraft:gold_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawGold, 3 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }  if(brokenBlockPermutation.type.id == "minecraft:lapis_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.lapisLazuli, Math.floor(Math.random() * 24 - 14.3 - 36) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }if(brokenBlockPermutation.type.id == "minecraft:diamond_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.diamond, 2 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }if(brokenBlockPermutation.type.id == "minecraft:copper_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawCopper, Math.floor(Math.random() * 20 - 7.7 - 20) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }

                if(brokenBlockPermutation.type.id == "minecraft:deepslate_coal_ore"){
                  
                  player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.coal, 3 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }  if(brokenBlockPermutation.type.id == "minecraft:deepslate_iron_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawIron, 3 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }   if(brokenBlockPermutation.type.id == "minecraft:deepslate_gold_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawGold, 3 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }  if(brokenBlockPermutation.type.id == "minecraft:deepslate_lapis_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.lapisLazuli, Math.floor(Math.random() * 24 - 14.3 - 36) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }if(brokenBlockPermutation.type.id == "minecraft:deepslate_diamond_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.diamond, 2 + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }if(brokenBlockPermutation.type.id == "minecraft:deepslate_copper_ore"){
                  
                   player.dimension.spawnItem(new ItemStack(MinecraftItemTypes.rawCopper, Math.floor(Math.random() * 20 - 7.7 - 20) + blocks.length), new Vector(block.location.x, block.location.y, block.location.z))
                }
              }
                //await null;
                //SO slight issue. It takes a second for the script to kick in.... lol
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