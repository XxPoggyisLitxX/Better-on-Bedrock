import { world, Vector, system, EntityInventoryComponent, ItemStack, ItemTypes } from "@minecraft/server";
//function loads structure with backpack entity
import { setTimeout } from "../player_corpse/timers";
import { stdout } from "../player_corpse/ghost_effect";
function loadStructure1() {
  let players = world.getPlayers();
for (let player of players) {
  let a =  system.runInterval(() => {

      
      player.runCommandAsync("structure load " + player.id + "t ~ ~ ~");
      
      system.clearRun(a)
    
  });
}}
//function saves structure with entity
function saveStructure1() {
  let players = world.getPlayers();
for (let player of players) {
    let a =  system.runInterval(() => {
      player.runCommandAsync(
        "structure save " + player.id +"t ~-5 ~6 ~-5 ~+5 ~+5 ~+5 true disk false"
      );

       setTimeout(function (arg, arg1) {

        Array.from(player.dimension.getEntities({tags: [`players:${player.name}`]})).forEach(entity => {entity.triggerEvent('despawn_backpack')});
        stdout("Returned", "to normal form.");
    }, 2, "hello", "world", 1);
    stdout("");
          
          player.sendMessage("§cYou can't Open the Backpack while sprinting!")
          
          system.clearRun(a)
    });
    
          console.warn(Array.from(player.dimension.getEntities({tags: [`players:${player.name}`]})).length)
  }}

  //iron backpack
  function loadStructure2() {
  let players = world.getPlayers();
for (let player of players) {
  let a =  system.runInterval(() => {

      
      player.runCommandAsync("structure load " + player.id + "t ~ ~ ~");
      
      system.clearRun(a)
      
     
    
  });
}}
//function saves structure with entity
function saveStructure2() {
  let players = world.getPlayers();
for (let player of players) {
    let a =  system.runInterval(() => {
      player.runCommandAsync(
        "structure save " + player.id +"t ~-5 ~6 ~-5 ~+5 ~+5 ~+5 true disk false"
      );
      /*player.runCommandAsync(
        "event entity @e[type=better_on_bedrock:backpack, r=2] despawn_backpack"
      );*/
      Array.from(player.dimension.getEntities({tags: [`players:${player.name}`]})).forEach(entity => {entity.triggerEvent('despawn_backpack')});
      player.sendMessage("§cYou can't Open the Backpack while sprinting!")
      
          system.clearRun(a)
    });
  }}

export function backPack(){ 
  let players = world.getPlayers();
  for (let player of players) {
    
      const [entitie] = player.dimension.getEntities({
        tags: [`players:${player.name}`],
      });
      let invi = player.getComponent("inventory").container;
      const {x,y,z} = player.location
      let items = invi.getItem(player.selectedSlot);
      //this spawns the entity with a tag with the player name when the player does not have tag 'backpack1'
      if (items?.typeId == "better_on_bedrock:backpack" && !player.hasTag("backpack2")) {
        player.addTag("backpack2")
        let Dimensions = world.getDimension(player.dimension.id);
        let entitee = Dimensions.spawnEntity("better_on_bedrock:backpack", new Vector(player.location.x, player.location.y, player.location.z));
        entitee.nameTag = "BackPack";
        entitee.addTag("players:" + player.name);
      }
      if (items?.typeId === "better_on_bedrock:backpack" &&+ player.getComponent("movement").current === player.getComponent("movement").value) {
          //if player does not have this tag while holding the item, we run the loadStructure function to load our entity
        if (!player.hasTag("tag1")) {
          player.addTag("tag1");
          loadStructure1();
        }
        //this always run when we hold our item
         Array.from(player.dimension.getEntities({tags: [`players:${player.name}`]})).forEach(entity => {entity.nameTag = "backpack_uncommon"});
        entitie?.teleport(
          {
            x: Number(player.location.x),
            y: Number(player.location.y + 0.5),
            z: Number(player.location.z),
          },
          world.getDimension(player.dimension.id),
          0,
          0
        );
        //This will whitelist all items from the backpack inventory, like shulkers and backpack Item
       /*  let e = system.runInterval(() => {
          const inventory = entitie?.getComponent("inventory");
         
         for (let slot = 0; slot < inventory?.container.size; slot++) {
            let items = inventory?.container.getItem(slot)
            let container = entitie?.getComponent('inventory').container
            let contain = player.getComponent("inventory").container
              const itemStack = inventory?.container.getItem(slot);
              const amount = itemStack?.amount
              const data = itemStack?.data
              let newItem =  new ItemStack(ItemTypes?.get("better_on_bedrock:netherite_helmet"), 0);
              let OldItem =  new ItemStack(ItemTypes?.get("better_on_bedrock:backpack"), 1);
               let shulker =  new ItemStack(ItemTypes?.get("minecraft:undyed_shulker_box"), 1, 0);
              if (items?.typeId == "better_on_bedrock:backpack") {
                var vars = slot;
                player.runCommandAsync("say Hello")
                container.setItem(vars, newItem);
                contain.setItem(player.selectedSlot, OldItem)
                player.runCommandAsync("say ItemSet")
              }
              system.clearRun(e)
          }
            })*/
      } else if ((items?.typeId != "better_on_bedrock:backpack") || (items?.typeId == "better_on_bedrock:backpack" && player.getComponent("movement").current > player.getComponent("movement").value)) {
          //if the player has this tag while not holding the item, we run the saveStructure function to save our entity
        if (player.hasTag("tag1")) {
          player.removeTag("tag1");
          saveStructure1()
          
        }
        //this always run when we don't hold the item
        entitie?.teleport(
          {
            x: Number(player.location.x),
            y: Number(player.location.y + 3),
            z: Number(player.location.z),
          },
          world.getDimension(player.dimension.id),
          0,
          0
        );
      }
  
      //iron_backpack
     /* if (items?.typeId == "better_on_bedrock:backpack_uncommon" && !player.hasTag("backpack_uncommon") && !items?.typeId == "better_on_bedrock:backpack") {
        player.addTag("backpack_uncommon")

      }*/
      if (items?.typeId === "better_on_bedrock:backpack_uncommon" &&+ player.getComponent("movement").current === player.getComponent("movement").value && !items?.typeId == "better_on_bedrock:backpack") {
          //if player does not have this tag while holding the item, we run the loadStructure function to load our entity
        if (!player.hasTag("tag2")) {
          player.addTag("tag2");
          loadStructure2(player.dimension.getEntities({tags: [`players:${player.name}`]}).lenght);
        }
        //this always run when we hold our item
       
        player.runCommandAsync('event entity @e switch_to_big_inv')
        entitie?.teleport(
          {
            x: Number(player.location.x),
            y: Number(player.location.y + 1.5),
            z: Number(player.location.z),
          },
          world.getDimension(player.dimension.id),
          0,
          0
        );
      } else if ((!items?.typeId == "better_on_bedrock:backpack_uncommon") || (items?.typeId == "better_on_bedrock:backpack_uncommon" && player.getComponent("movement").current > player.getComponent("movement").value) && !items?.typeId == "better_on_bedrock:backpack") {
          //if the player has this tag while not holding the item, we run the saveStructure function to save our entity
        if (player.hasTag("tag2")) {
          player.removeTag("tag2");
          saveStructure2()
          //.triggerEvent('entity_transform')
        }
        //this always run when we don't hold the item
        entitie?.teleport(
          {
            x: Number(player.location.x),
            y: Number(player.location.y + 1.5),
            z: Number(player.location.z),
          },
          world.getDimension(player.dimension.id),
          0,
          0
        );
      }
    }
}

