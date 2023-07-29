import { world, system, Player,  DynamicPropertiesDefinition } from '@minecraft/server'
import { ActionFormData, ModalFormData } from '@minecraft/server-ui'
import { getPlayerExperienceLevel } from 'get_level_tests'


 system.events.scriptEventReceive.subscribe(
   ({ id, sourceEntity })=>{
       if (!(sourceEntity instanceof Player)) return;
       if (id == "bob:test") {
         UI3(sourceEntity)
       };
       if (id == "bob:test2") {
         UI4(sourceEntity)
       };
   },
   {
       namespaces: [
           "bob",
       ],
   },
);








world.afterEvents.itemUse.subscribe(use => { 
      
    let player = use.source, item = use.itemStack;
    let level = player.runCommandAsync('xp 0 @s').level
       const warpTags = player.getTags().filter(v => v.startsWith('Warp:'))
    if (!player.hasTag('inUI')) {

      let blockTest = player.getBlockFromViewDirection();
        if (item?.typeId == 'better_on_bedrock:nether_waystone_key' && blockTest?.typeId == 'better_on_bedrock:waystone') {
        UI(player)
        player.addTag('inUI');
  } else if (/**/item?.typeId == 'better_on_bedrock:nether_waystone_key' && player.getItemCooldown('marker') == 0 ) {
   UI2(player)
} else if (item?.typeId == 'better_on_bedrock:nether_waystone_key' && player.getItemCooldown('marker') > 0 ){
   player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYour Waystone Marker is on cooldown!"}]}`);
}
if (item?.typeId != 'better_on_bedrock:nether_waystone_key' && blockTest?.typeId == 'better_on_bedrock:waystone' && warpTags.length > 0 && !player.isSneaking == true) {
   UI4(player)
 player.addTag('inUI');
} else if (player.dimension.id== 'minecraft:overworld' && item?.typeId != 'better_on_bedrock:nether_waystone_key' && blockTest?.typeId == 'better_on_bedrock:waystone' && warpTags.length == 0 && !player.isSneaking == true) {
UI3(player)
player.addTag('inUI');
} if (player.isSneaking == true && item?.typeId != 'better_on_bedrock:nether_waystone_key' && blockTest?.typeId == 'better_on_bedrock:waystone'){
UI3(player)
player.addTag('inUI');
}
if(player.dimension.id != 'minecraft:overworld' && blockTest?.typeId == 'better_on_bedrock:waystone'){
   player.sendMessage("§cWaystone does not work in this dimension.")
}
}




})

world.afterEvents.blockBreak.subscribe(({ block, player, brokenBlockPermutation, r }) => {
   if (brokenBlockPermutation.type.id == "better_on_bedrock:waystone" && player.getTags().filter(v => v.startsWith('Warp:'))) {
       const warpTags = player.getTags().filter(v => v.startsWith('Warp:'))
           for (let tag of warpTags) {
      let warpName = tag.match(/(?<=Warp:).*?(?=-)/)[0];
      let test = `Warp:${warpName}-${block.location.x}|${block.location.y}|${block.location.z}|${player.dimension.id}`
      player.removeTag(test)
   }}
   })

function UI2(player, entity) {
   let level = player.runCommandAsync('xp 0 @s').level
      const warpMenu = new ActionFormData()
    
              .title('§l§5Waystone Menu')
              .body('To add another waystone, crouch and interact on the waystone.\n')
           const warpTags = player.getTags().filter(v => v.startsWith('Warp:'))
           for (let tag of warpTags) {
              warpMenu.button(`Waystone: §6${tag.match(/(?<=Warp:).*?(?=-)/)[0]}`);
           } if (warpTags.length > 0) {
              player.addTag('inUI');
              warpMenu.show(player).then((r) => {
                 player.removeTag('inUI');
                 let selectedWarp = warpTags[r.selection];
                 let warpName = selectedWarp.match(/(?<=Warp:).*?(?=-)/)[0];
                 const [entity] = player.dimension.getEntities({tags: [`player:${player.name}`]})
                 const form =new ActionFormData()
                 form.title(`Waystone: §6${warpName}`) 
                 form.body('You are about to teleport to this Waystone. \n\nTeleporting to this waystone requires §e3 xp levels§r. \n\nIf you are teleporting across dimensions, it will cost §c6 xp levels.')
                 form.button('§qTeleport to this Waystone')
                 form.button('§6Remove this Waystone')
                 form.show(player).then((r) => {
                       player.removeTag('inUI');
                       if (r.selection == 0 && !selectedWarp.includes('minecraft:')) {
                      UI5(player)
 }


                       if (r.selection == 0 && getPlayerExperienceLevel(player) >= 3) {
                        
                          if(selectedWarp.includes('nether')){
                           player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§anether!"}]}`);
                           let [,warpName,xCord, yCord, zCord, waystoneDim] = selectedWarp.match(/(?:Warp:)(.*?)-((?:-|)\d+)\|((?:-|)\d+)\|((?:-|)\d+)\|(minecraft:.+)/)
                        
                           /*let xCord = selectedWarp.match(/(?<=-).*?(?=\|)/)[0];
                             let yCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                             let zCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                          let waystoneDim = selectedWarp.match(/[^\|]*$/)[0];*/
                             
                             let d = 200;
                                console.warn(xCord, yCord, zCord, waystoneDim)
                                
                                player.teleport({x: Number(xCord), y: Number(yCord), z: Number(zCord)}, {dimension: world.getDimension(waystoneDim)})
                                player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aTeleported to Waystone §e${warpName}!"}]}`);
                                player.runCommandAsync('playsound portal.travel @p')
                                player.runCommandAsync(`effect @s nausea 0 255 true`);
                                player.runCommandAsync(`xp -3l @s`);
                                player.startItemCooldown('marker', 600);
                                world.afterEvents.tick.unsubscribe(e);
                          } else if (r.selection == 0 && getPlayerExperienceLevel(player) < 3) {
                                 player.sendMessage("§cYou don't have enough levels");
       
                        }
                           else if (!selectedWarp.includes('nether')) {
                        let [,warpName,xCord, yCord, zCord, waystoneDim] = selectedWarp.match(/(?:Warp:)(.*?)-((?:-|)\d+)\|((?:-|)\d+)\|((?:-|)\d+)\|(minecraft:.+)/)
                        
                        /*let xCord = selectedWarp.match(/(?<=-).*?(?=\|)/)[0];
                          let yCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                          let zCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                       let waystoneDim = selectedWarp.match(/[^\|]*$/)[0];*/
                          
                          let d = 200;
                             console.warn(xCord, yCord, zCord, waystoneDim)
                             
                             player.teleport({x: Number(xCord), y: Number(yCord), z: Number(zCord)}, {dimension: world.getDimension(waystoneDim)})
                             player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aTeleported to Waystone §e${warpName}!"}]}`);
                             player.runCommandAsync('playsound portal.travel @p')
                             player.runCommandAsync(`effect @s nausea 0 255 true`);
                             player.runCommandAsync(`xp -3l @s`);
                             player.startItemCooldown('marker', 600);
                             world.afterEvents.tick.unsubscribe(e);
                       } else if (r.selection == 0 && getPlayerExperienceLevel(player) < 3) {
                              player.sendMessage("§cYou don't have enough levels");
    
                     } }
                       
                       else if(r.selection == 0 && level < 3) {
                          player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou don't have enough levels!"}]}`);
                       }
                        if (r.selection == 1) {
                          player.removeTag(selectedWarp);
                          player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aRemoved Waystone ${warpName}!"}]}`);
                          player.runCommandAsync(`playsound note.pling @s ~~~ 1 1.5`);
                       }
                    })
              })
           } else {
              player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou have no Waystones set!"}]}`);
              player.runCommandAsync(`playsound note.pling @s ~~~ 1 0.5`);
           }
}

    function UI(player, r) {
        const warpTags = player.getTags().filter(v => v.startsWith('Warp:'))
        const getBlockLocation = player.getBlockFromViewDirection();;
         new ModalFormData()
            .title('§l§aAdd a Waystone')
            .textField('§6Enter the Waystone name\n\n§7If this field is not filled, the Waystone name will be "Default".\n\nIf a name is the same as a current Waystone, the old Waystone will be overwritten.\n\n§7You have §c' + warpTags.length + '/10 Waystones set.', '   ')
            .show(player).then((r) => {
               player.removeTag('inUI');
               let warpName = r.formValues[0];
               var test = `Warp:${warpName}-${getBlockLocation.x}|${getBlockLocation.y}|${getBlockLocation.z}|${player.dimension.id}`
               if (warpName == '') warpName = 'Default';
               if (warpName.toLowerCase() == 'warp') warpName += 'ing';
               if (warpTags.find(v => v.includes(warpName))) {
                  player.removeTag(warpTags.find(v => v.includes(warpName)));
                  player.addTag(test)
                  player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSet Waystone to: §e${warpName}!"}]}`);
                  player.runCommandAsync(`playsound note.pling @s ~~~ 1 1.5`);
               } else if (warpTags.length >= 25) {
                  player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou have the max amount of Waystones set already!"}]}`);
                  player.runCommandAsync(`playsound note.pling @s ~~~ 1 0.5`);
               } else {
                player.addTag(test)
                  player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSet Waystone to: §e${warpName}!"}]}`);
                  player.runCommandAsync(`playsound note.pling @s ~~~ 1 1.5`);
               }
            }).catch(n=>console.error(n, n.stack));
    }
    function UI4(player, entity) {
      let level = player.runCommandAsync('xp 0 @s').level
      const warpMenu = new ActionFormData()
    
              .title('§l§5Waystone Menu')
              .body('To add another waystone, crouch and interact on the waystone.\n')
           const warpTags = player.getTags().filter(v => v.startsWith('Warp:'))
           for (let tag of warpTags) {
              warpMenu.button(`Waystone: §6${tag.match(/(?<=Warp:).*?(?=-)/)[0]}`);
           } if (warpTags.length > 0) {
              player.addTag('inUI');
              warpMenu.show(player).then((r) => {
                 player.removeTag('inUI');
                 let selectedWarp = warpTags[r.selection];
                 let warpName = selectedWarp.match(/(?<=Warp:).*?(?=-)/)[0];
                 const [entity] = player.dimension.getEntities({tags: [`player:${player.name}`]})
                 const form =new ActionFormData()
                 form.title(`Waystone: §6${warpName}`) 
                 form.body('You are about to teleport to this Waystone. \n\nTeleporting to this waystone requires §e3 xp levels§r. \n\nIf you are teleporting across dimensions, it will cost §c6 xp levels.')
                 form.button('§qTeleport to this Waystone')
                 form.button('§6Remove this Waystone')
                 form.show(player).then((r) => {
                       player.removeTag('inUI');
                       if (r.selection == 0 && !selectedWarp.includes('minecraft:')) {
                      UI5(player)
 }


                       if (r.selection == 0 && getPlayerExperienceLevel(player) >= 3) {
                        
                          if(selectedWarp.includes('nether')){
                           player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§anether!"}]}`);
                           let [,warpName,xCord, yCord, zCord, waystoneDim] = selectedWarp.match(/(?:Warp:)(.*?)-((?:-|)\d+)\|((?:-|)\d+)\|((?:-|)\d+)\|(minecraft:.+)/)
                        
                           /*let xCord = selectedWarp.match(/(?<=-).*?(?=\|)/)[0];
                             let yCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                             let zCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                          let waystoneDim = selectedWarp.match(/[^\|]*$/)[0];*/
                             
                             let d = 200;
                                console.warn(xCord, yCord, zCord, waystoneDim)
                                
                                player.teleport({x: Number(xCord), y: Number(yCord), z: Number(zCord)}, {dimension: world.getDimension(waystoneDim)})
                                player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aTeleported to Waystone §e${warpName}!"}]}`);
                                player.runCommandAsync('playsound portal.travel @p')
                                player.runCommandAsync(`effect @s nausea 0 255 true`);
                                player.runCommandAsync(`xp -3l @s`);
                                player.startItemCooldown('marker', 600);
                                world.afterEvents.tick.unsubscribe(e);
                          } else if (r.selection == 0 && getPlayerExperienceLevel(player) < 3) {
                                 player.sendMessage("§cYou don't have enough levels");
       
                        }
                           else if (!selectedWarp.includes('nether')) {
                        let [,warpName,xCord, yCord, zCord, waystoneDim] = selectedWarp.match(/(?:Warp:)(.*?)-((?:-|)\d+)\|((?:-|)\d+)\|((?:-|)\d+)\|(minecraft:.+)/)
                        
                        /*let xCord = selectedWarp.match(/(?<=-).*?(?=\|)/)[0];
                          let yCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                          let zCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                       let waystoneDim = selectedWarp.match(/[^\|]*$/)[0];*/
                          
                          let d = 200;
                             console.warn(xCord, yCord, zCord, waystoneDim)
                             
                             player.teleport({x: Number(xCord), y: Number(yCord), z: Number(zCord)}, {dimension: world.getDimension(waystoneDim)})
                             player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aTeleported to Waystone §e${warpName}!"}]}`);
                             player.runCommandAsync('playsound portal.travel @p')
                             player.runCommandAsync(`effect @s nausea 0 255 true`);
                             player.runCommandAsync(`xp -3l @s`);
                             player.startItemCooldown('marker', 600);
                             world.afterEvents.tick.unsubscribe(e);
                       } else if (r.selection == 0 && getPlayerExperienceLevel(player) < 3) {
                              player.sendMessage("§cYou don't have enough levels");
    
                     } }
                       
                       else if(r.selection == 0 && level < 3) {
                          player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou don't have enough levels!"}]}`);
                       }
                        if (r.selection == 1) {
                          player.removeTag(selectedWarp);
                          player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aRemoved Waystone ${warpName}!"}]}`);
                          player.runCommandAsync(`playsound note.pling @s ~~~ 1 1.5`);
                       }
                    })
              })
           } else {
              player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou have no Waystones set!"}]}`);
              player.runCommandAsync(`playsound note.pling @s ~~~ 1 0.5`);
           }
    }
    
    function UI5(player, entity) {
       let level = player.runCommandAsync('xp 0 @s').level
       const warpMenu = new ActionFormData()
               .title('§l§cError')
               .body('§cCould not teleport to the waystone. Reason:\n\n§eThe waystone uses the old system.\n\n§cTo update the waystone to the new system, go to its location and remove the waystone and save it again! You can find the waystone location in the player tag list via §e/tag @s add, §cand looking for "Warp:".\n\n§lDO NOT REMOVE ANY TAGS AS IT WILL BREAK THE ADD-ON!')
                .button('Ok')
                .show(player).then((r) => {
                   if(r.selection == 0){
                   }
                })
     }
    
       function UI3(player, entity) {
            const addStone = new ModalFormData()
            const getBlockLocation = player.getBlockFromViewDirection();;
            const warpTags = player.getTags().filter(v => v.startsWith('Warp:'))
            addStone.title('§l§aAdd a Waystone')
            addStone.textField('§6Enter the Waystone name\n\n§7If this field is not filled, the Waystone name will be "Default".\n\nIf a name is the same as a current Waystone, the old Waystone will be overwritten.\n\n§7You have §c' + warpTags.length + '/25 Waystones set.', '   ')
            addStone.show(player).then((r) => {
             if(r.isCanceled == true){
                player.removeTag('inUI')
                console.warn('no')
             }
                  player.removeTag('inUI');
                  let warpName = r?.formValues[0];
                  var test = `Warp:${warpName}-${getBlockLocation.x}|${getBlockLocation.y}|${getBlockLocation.z}|${player.dimension.id}`
                  if (warpName == '') warpName = 'Default';
                  if (warpName.toLowerCase() == 'warp') warpName += 'ing';
                  if (warpTags.find(v => v.includes(warpName))) {
                     player.removeTag(warpTags.find(v => v.includes(warpName)));
                     player.addTag(test)
                     player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSet Waystone to: §e${warpName}!"}]}`);
                     player.runCommandAsync(`playsound note.pling @s ~~~ 1 1.5`);
                  } else if (warpTags.length >= 25) {
                     player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou have the max amount of Waystones set already!"}]}`);
                     player.runCommandAsync(`playsound note.pling @s ~~~ 1 0.5`);
                  } else {
                   player.addTag(test)
                     player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSet Waystone to: §e${warpName}!"}]}`);
                     player.runCommandAsync(`playsound note.pling @s ~~~ 1 1.5`);
                  }
               }).catch(n=>console.error(n, n.stack));
       }
       function UI6(player, entity) {
         let level = player.runCommandAsync('xp 0 @s').level
         const warpMenu = new ActionFormData()
       
                 .title('§l§5Waystone Menu')
                 .body('To add another waystone, crouch and interact on the waystone.\n')
              const warpTags = player.getTags().filter(v => v.startsWith('Warp:'))
              for (let tag of warpTags) {
                 warpMenu.button(`Waystone: §6${tag.match(/(?<=Warp:).*?(?=-)/)[0]}`);
              } if (warpTags.length > 0) {
                 player.addTag('inUI');
                 warpMenu.show(player).then((r) => {
                    player.removeTag('inUI');
                    let selectedWarp = warpTags[r.selection];
                    let warpName = selectedWarp.match(/(?<=Warp:).*?(?=-)/)[0];
                    const [entity] = player.dimension.getEntities({tags: [`player:${player.name}`]})
                    new ActionFormData()
                       .title(`Waystone: §6${warpName}`) 
                       .body('§c§lRemove this wasytone and save it to update this waystone to the new system.')
                       .button('§kunknown')
                       .button('§6Remove this Waystone')
                       .show(player).then((r) => {
                          player.removeTag('inUI');
                          if (r.selection == 0 && getPlayerExperienceLevel(player) >= 3) {
                           
                             if(selectedWarp.includes('nether')){
                              player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§anether!"}]}`);
                              let [,warpName,xCord, yCord, zCord, waystoneDim] = selectedWarp.match(/(?:Warp:)(.*?)-((?:-|)\d+)\|((?:-|)\d+)\|((?:-|)\d+)\|(minecraft:.+)/)
                           
                              /*let xCord = selectedWarp.match(/(?<=-).*?(?=\|)/)[0];
                                let yCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                                let zCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                             let waystoneDim = selectedWarp.match(/[^\|]*$/)[0];*/
                                
                                let d = 200;
                                   console.warn(xCord, yCord, zCord, waystoneDim)
                                   
                                   player.teleport({x: Number(xCord), y: Number(yCord), z: Number(zCord)}, {dimension: world.getDimension(waystoneDim)})
                                   player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aTeleported to Waystone §e${warpName}!"}]}`);
                                   player.runCommandAsync('playsound portal.travel @p')
                                   player.runCommandAsync(`effect @s nausea 0 255 true`);
                                   player.runCommandAsync(`xp -3l @s`);
                                   player.startItemCooldown('marker', 600);
                                   world.afterEvents.tick.unsubscribe(e);
                             } else if (r.selection == 0 && getPlayerExperienceLevel(player) < 3) {
                                    player.sendMessage("§cYou don't have enough levels");
          
                           }
                              else if (!selectedWarp.includes('nether')) {
                           let [,warpName,xCord, yCord, zCord, waystoneDim] = selectedWarp.match(/(?:Warp:)(.*?)-((?:-|)\d+)\|((?:-|)\d+)\|((?:-|)\d+)\|(minecraft:.+)/)
                           
                           /*let xCord = selectedWarp.match(/(?<=-).*?(?=\|)/)[0];
                             let yCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                             let zCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                          let waystoneDim = selectedWarp.match(/[^\|]*$/)[0];*/
                             
                             let d = 200;
                                console.warn(xCord, yCord, zCord, waystoneDim)
                                
                                player.teleport({x: Number(xCord), y: Number(yCord), z: Number(zCord)}, {dimension: world.getDimension(waystoneDim)})
                                player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aTeleported to Waystone §e${warpName}!"}]}`);
                                player.runCommandAsync('playsound portal.travel @p')
                                player.runCommandAsync(`effect @s nausea 0 255 true`);
                                player.runCommandAsync(`xp -3l @s`);
                                player.startItemCooldown('marker', 600);
                                world.afterEvents.tick.unsubscribe(e);
                          } else if (r.selection == 0 && getPlayerExperienceLevel(player) < 3) {
                                 player.sendMessage("§cYou don't have enough levels");
       
                        } }
                          
                          else if(r.selection == 0 && level < 3) {
                             player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou don't have enough levels!"}]}`);
                          }
                           if (r.selection == 1) {
                             player.removeTag(selectedWarp);
                             player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aRemoved Waystone ${warpName}!"}]}`);
                             player.runCommandAsync(`playsound note.pling @s ~~~ 1 1.5`);
                          }
                       })
                 })
              } else {
                 player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou have no Waystones set!"}]}`);
                 player.runCommandAsync(`playsound note.pling @s ~~~ 1 0.5`);
              }
       }