import { world, Vector,  ItemStack, Entity, Player, ItemEnchantsComponent, ItemTypes, EntityInventoryComponent, Block, Enchantment  } from "@minecraft/server"
import { system } from "@minecraft/server";
import {  DynamicPropertiesDefinition } from "@minecraft/server"
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"




      const DimensionNames = {
        ["minecraft:overworld"]: "§aOverworld",
        ["minecraft:nether"]: "§cNether",
        ["minecraft:the_end"]: "§5End"
      };

      ///
      let playerLevel = 0
      export function onPlayerDeath(player) {
          /*let players = world.getPlayers()
          for (let player of players) {*/
            let playerHealt = player.getComponent("minecraft:health").currentValue
            let isDeath = player.hasTag("death")
            let Dimension = world.getDimension(player.dimension.id)
            if (playerHealt == 0 && isDeath == false) {
              const dName = DimensionNames[player.dimension.id];
              player.addTag("death")
              let entity = Dimension.spawnEntity("better_on_bedrock:player_corpse", new Vector(player.location.x, player.location.y, player.location.z));
              entity.nameTag = "Corpse of " + player.name;
              player.runCommand(`tp @e[type=item,r=10] @e[type=better_on_bedrock:player_corpse, r=1`)
              //player.runCommandAsync(`sendMessageraw @s{"rawtext":[{"text": "§a${player.nameTag} §rdied at: §l§e${Math.round(player.location.x)}, ${Math.round(player.location.y)}, ${Math.round(player.location.z)},§r§f in The §a${dName}"}]}`)
              //player.sendMessage({"rawtext":[{"text": "§a" + player.nameTag + " §rdied at: §l§e" + Math.round(player.location.x) + ", " + Math.round(player.location.y) + ", " + Math.round(player.location.z) + ", §r§f in The §a " + dName}]})
              player.sendMessage({"rawtext":[{"translate": "status.playerDied", "with": [`${player.nameTag}`, `${Math.round(player.location.x)}`, `${Math.round(player.location.y)}`, `${Math.round(player.location.z)}`, `${dName}`]}]})
              player.addTag("lol")
            } else if (playerHealt > 0) {
              player.removeTag("death")
            } else if(playerHealt == 0 && player.hasTag("selected") == true) {
              player.addTag("hardcoreDeath")
              
            } if(playerHealt == 20 && player.hasTag("hardcoreDeath") == true) {
              player.runCommandAsync("function hardcore")
            }
        //}
        }
      
      

        world.afterEvents.entityHitEntity.subscribe(data => {
          let { damagingEntity, hitEntity } = data;
          if (!(damagingEntity instanceof Player)) return;
      if(data.hitEntity?.typeId == 'better_on_bedrock:player_corpse'){
        console.warn(damagingEntity);
        bounty_tier_page(damagingEntity, hitEntity)
          }})
      
          function bounty_tier_page(damagingEntity, hitEntity) {
            let form = new ActionFormData()
              form.title(`Dust?`)
              form.body(`Dusting the corpse will delete all items inside it. To recover your items, open the corpse's inventory.`)
              ///buttons
              form.button(`Dust It!`)
              form.button(`Keep Corpse`)
              form.show(damagingEntity).then((response) => {
                if (response.selection == 0) {
                  console.warn("Dust")
                  hitEntity.triggerEvent('entity_transform')
                  //world.getDimension('overworld').runCommandAsync('tag @e[type=better_on_bedrock:player_corpse] add dusted')
                }
                if (response.selection == 1) {
                  console.warn("Spare")
                }
              })
          }