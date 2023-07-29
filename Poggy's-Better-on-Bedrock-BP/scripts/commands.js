import { world,   ItemStack,  DynamicPropertiesDefinition,  BlockType, ScreenDisplay, ItemTypes } from "@minecraft/server"
import "./hardcore_ui/hardcore_selection_screen.js"

import { stdout } from "./player_corpse/ghost_effect.js";
import * as Quests from "./bounty_system/constants/Quests.js";
import * as QuestStatus from "./bounty_system/constants/QuestStatus.js";



/*world.afterEvents.playerSpawn.subscribe(
  ({ player }) => {
    console.warn( "Player Loaded!" );
    //console.warn(player.getDynamicProperty( "uses" ));
    if (player.getDynamicProperty( "uses" ) === undefined) {
      player.setDynamicProperty( "uses", 0 );
    };
  },
);

let uses = 0;
world.beforeEvents.Chat.subscribe(
  ({ sender: player, message, cancel }) => {
    if (!message.startsWith("!")) return;
    cancel = true;
    const command = message.split(" ")[0].slice(1);
    const args = message.slice(message.split(" ")[0].length).trim().split(" ");

    switch (command) {
      case "dev":
        if (args[0] == "reset") {
          if (args[1] == "bounties") {
            for (const player of world.getAllPlayers()) {
              
              player.removeDynamicProperty( "bounties" );
            };
            
            player.sendMessage("Bounties reset!");
          } else if (args[1] == "quests") {
            try {
              for (const player of world.getAllPlayers()) {
                player.removeDynamicProperty( "quests" );
                player.removeDynamicProperty( "quests2" );
                player.removeDynamicProperty( "quests3" );
                player.removeDynamicProperty( "quests4" );
                player.removeDynamicProperty( "quests5" );
                player.removeDynamicProperty( "quests6" );
        
                player.setDynamicProperty(
                  "tiersCompleted",
                  0,
                );
              };

              player.sendMessage("Quests reset!");
            } catch(e) {
              player.sendMessage("" + e);
            };
          };
        } else if (args[0] == "slot") {
          const p = world.getAllPlayers().find((p) => p.name.toLowerCase() == args[1].toLowerCase());
          let slot = args[2];
          if (
            !args[2]
            || isNaN(parseInt(args[2]))
          ) slot = Math.random() * 8;
          if (p) {
            p.selectedSlot = parseInt(slot);
          } else {
            player.sendMessage( "Player not found!" );
          };
        };
      break;
      case "!block_info":
        if (args[0] == "miners_bench") {
          player.sendMessage('§3To use this block, you need to first craft your axe/pickaxe. When you crafted your tool, you need to hold either the axe or pickaxe when interacting §e(L2/LT/TAP/right-click)§3 with the block. When you interacted with the block, it will open a UI with instructions for you to follow.\n§cYou need to craft the axe/pickaxe to get the enchantments.');
        } else if (args[0] == "forge_table") {
          player.sendMessage('§3To use this block, you need to hold any Netherite Armor piece. When you interact §e(L2/LT/TAP/right-click)§3 with the block, a UI will open with instructions to follow.')
        } else if (args[0] == "waystone") {
          player.sendMessage('§3To use this block, you need a Overworld Waystone Key. Hold the key and interact §e(L2/LT/TAP/right-click)§3 on the block. This will open a UI with instructions to follow.')
        } else {
          player.sendMessage('§eGet info about a selected block. §cSyntax:"!block_info miners_bench", "!block_info forge_table", "!block_info waystone".')
        };
      break;
      case "!contributors":
        player.sendMessage("§eContributors:\n§aLegend\n§aCreepager15\n§aHachuden\n§aSumi (Yanna :3)\n§aPan (i,love.pandas)\n§aXorkent\n§aCiosciaa\n§aHerobrine64\n§aElektrika\n§aJayly");
      break;
      case "!difficulty":
        if (args[0] == "normal") {
          if (player.getDynamicProperty("uses") < 3) {
            player.setDynamicProperty("uses", uses += 1);
            player.removeTag("selected");
            player.addTag("selected2");
            player.sendMessage('§aSet Better on Bedrock difficulty to recommended difficulty (Normal Mode).');
            player.removeTag("hardcoreDeath");
          } else if (player.getDynamicProperty("uses") >= 3) {
            player.sendMessage("§cYou already changed your difficulty 3 times. Max uses: 3/3.")
          };
        } else  if (args[0] == "hardcore") {
          if (player.getDynamicProperty("uses") < 3) {
            player.setDynamicProperty("uses", uses += 1);
            player.removeTag("selected2");
            player.addTag("selected");
            player.sendMessage('§aSet Better on Bedrock difficulty to Hardcore Mode.');
          } else if (player.getDynamicProperty("uses") >= 3) {
            player.sendMessage("§cYou already changed your difficulty 3 times. Max uses: 3/3.");
          };
        } else {
          player.sendMessage('§eSet your difficulty. §cSyntax:"!difficulty normal", "!difficulty hardcore"');
        };
      break;
      case "!help":
        player.sendMessage("§e!contributors: §aShows all the people that contributed.\n§e!difficulty: §aAllows to change difficulty only 3 times a world.\n§e!block_info: §aGives a detailed description on the use of selected blocks.");
      break;
    };
  },
);

world.beforeEvents.Chat.subscribe((chatEvent) => {
  return;
  try {
  let message = chatEvent.message.toLowerCase();
  if (message.startsWith("!")) {
    chatEvent.cancel = true;
    const command = message.split(" ")[0].slice(1);
    const args = message.slice(message.split(" ")[0].length).trim().split(" ");

    switch (command) {
      case "dev":
        if (args[0])
      break;
    };

    return;
    switch (message) {
      //help list
/*

[Scripting][error]-Plugin [Poggy's Better on Bedrock Beta v1.0.2 - 1.0.0] - [main.js] ran with error: [ReferenceError: Module [bounty_system/constants/constants/QuestStatus.js] not found. Native module error or file not found.]

*/
/*
      case "!dev reset bounties":
        for (const player of world.getAllPlayers()) player.removeDynamicProperty( "bounties" );
        
        chatEvent.sender.sendMessage("!");
      break;
      case "!dev reset quests":
        
      break;
      case "!block_info":
        chatEvent.sender.sendMessage('§eGet info about a selected block. §cSyntax:"!block_info miners_bench", "!block_info forge_table", "!block_info waystone".')
      break;
      case "!block_info miners_bench":
        console.warn(chatEvent.sender.getDynamicProperty("uses"))
        chatEvent.sender.sendMessage('§3To use this block, you need to first craft your axe/pickaxe. When you crafted your tool, you need to hold either the axe or pickaxe when interacting §e(L2/LT/TAP/right-click)§3 with the block. When you interacted with the block, it will open a UI with instructions for you to follow.\n§cYou need to craft the axe/pickaxe to get the enchantments.')
      break;
      case "!block_info forge_table":
        console.warn(chatEvent.sender.getDynamicProperty("uses"))
        chatEvent.sender.sendMessage('§3To use this block, you need to hold any Netherite Armor piece. When you interact §e(L2/LT/TAP/right-click)§3 with the block, a UI will open with instructions to follow.')
      break;
      case "!block_info waystone":
        console.warn(chatEvent.sender.getDynamicProperty("uses"))
        chatEvent.sender.sendMessage('§3To use this block, you need a Overworld Waystone Key. Hold the key and interact §e(L2/LT/TAP/right-click)§3 on the block. This will open a UI with instructions to follow.')
      break;

      case "!contributors":
        chatEvent.sender.runCommandAsync(
          `tellraw @s{"rawtext":[{"text": "§eContributors:\n§aLegend\n§aCreepager15\n§aHachuden\n§aSumi (Yanna :3)\n§aPan (i,love.pandas)\n§aXorkent\n§aCiosciaa\n§aHerobrine64\n§aElektrika\n§aJayly"}]}`
        );
        break;

        case "!difficulty":
          chatEvent.sender.sendMessage('§eSet your difficulty. §cSyntax:"!difficulty normal", "!difficulty hardcore"')
        break;
        case "!difficulty normal":
          if (chatEvent.sender.getDynamicProperty("uses") < 3){
            chatEvent.sender.setDynamicProperty("uses", uses += 1)
            chatEvent.sender.removeTag("selected")
            chatEvent.sender.addTag("selected2")
            chatEvent.sender.sendMessage('§aSet Better on Bedrock difficulty to recommended difficulty (Normal Mode).')
            chatEvent.sender.removeTag("hardcoreDeath")
           } else if (chatEvent.sender.getDynamicProperty("uses") >= 3) {
            chatEvent.sender.sendMessage("§cYou already changed your difficulty 3 times. Max uses: 3/3.")
           }
            break;
          case "!difficulty hardcore":
             if (chatEvent.sender.getDynamicProperty("uses") < 3){
              chatEvent.sender.setDynamicProperty("uses", uses += 1)
            chatEvent.sender.removeTag("selected2")
            chatEvent.sender.addTag("selected")
            chatEvent.sender.sendMessage('§aSet Better on Bedrock difficulty to Hardcore Mode.')
          } else if (chatEvent.sender.getDynamicProperty("uses") >= 3) {
            chatEvent.sender.sendMessage("§cYou already changed your difficulty 3 times. Max uses: 3/3.")
           }
          break;
        case "!help":
          console.warn(chatEvent.sender.getDynamicProperty("uses"))
          chatEvent.sender.sendMessage("§e!contributors: §aShows all the people that contributed.\n§e!difficulty: §aAllows to change difficulty only 3 times a world.\n§e!block_info: §aGives a detailed description on the use of selected blocks.")
        break;
    }
  }
} catch(e) {
  player.sendMessage(e.message);
};
});*/
