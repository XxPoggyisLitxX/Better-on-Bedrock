import { ActionFormData } from "@minecraft/server-ui";

import * as Quests from "../../constants/Quests.js";
import * as QuestStatus from "../../constants/QuestStatus.js";

const getFormattedStatus = ( status ) => {
    if (status == 0) return "§dLocked§r";
    else if (status == 1) return "§aUnlocked§r";
    else if (status == 2) return "§dBusy§r";
    else if (status == 3) return "§aCompleted§r";
    else if (status == 4) return "§aClaimed§r";
};

const quests = [
    {
        //My game crashed. I am booting it up again in case you need to test stuff.
        //Okay, Goodnight <3, ily!
        //Booting up the world will take some time.
        //It's fine
        //How would you test the scripts?
        //We can test them tmr
        //1.16.100 is tmr and the Big Guy might need it tmr... :panic:
        //Who's the Big Guy?
        //The Youtuber.... :hehe:
        //Oh okay, hopefully it doesn't break when 1.16.100 releases
        //It depends what Modules I use.
        //Does this work so far?
        //It should work, i used the /reload command and there were no errors so it should work
        //Test it with completing every quest over and over.... :pain:
        //Okay
        //World is loading...
        //Xbox is saying that you're offline
        //Xbox sleeping
        //I'm booting the world. Besides, the bounties should not be hard since we check if you kill the entity 3 times and then complete it
        //There are no tiers for the bounties btw.
        //Idk if i'm going to be able to complete the bounties before 5am
        //One bounty could do for the showcase.
        //Will try
        //Ok :3 Imma sleep now fr fr :] World is up!
        //I'm already in the world, now, Love you, gn <3
        
        id: Quests.ThatsFine,
        name: "That's fine",
        icon: "textures/items/blaze_rod",
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fThat's fine" );
            form.body( "Get 5 Blaze Rods.\n§7Rewards: 5 Blaze Powder and 15 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
            const form = new ActionFormData();
            form.title( "Start Quest?" );
            form.body( "Get 5 Blaze Rods.\n§7Rewards: 5 Blaze Powder and 15 XP" );
            form.button( "Start Quest!" );
            form.button( "Cancel" );
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_1");
                            player.onScreenDisplay.setTitle('thatsFineQuestStart');
                            player.sendMessage("§aQuest Started!");
                            savedQuests.find((q) => q.id == Quests.ThatsFine).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests4",
                                JSON.stringify( savedQuests ),
                            );
                        break;
                    };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
            const form = new ActionFormData();
            form.title("§fThat's fine");
            form.body("§7Claim: 5 Blaze Powder and 15 XP");
            form.button("Claim");
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.ThatsFine);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 15" );
                                player.runCommandAsync( "give @s blaze_powder 5" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests4",
                                    JSON.stringify( savedQuests ),
                                );
                            };
                        break;
                    };
                },
            );
        },
    },
    {
        id: Quests.Snowwhite,
        name: "Snow white?",
        icon: "textures/items/quartz",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"That's fine\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fSnow white?" );
            form.body( "Get 32 Quartz.\n§7Rewards: 5 Iron Ingots and 10 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 32 Quartz.\n§7Rewards: 5 Iron Ingots and 10 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('snowwhiteQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.Snowwhite).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests4",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
            const form = new ActionFormData()
            form.title("§fSnow white?")
            form.body("§7Claim: 5 Iron Ingots and 10 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.Snowwhite);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 10" );
                                player.runCommandAsync( "give @s iron_ingot 5" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests4",
                                    JSON.stringify( savedQuests ),
                                );
                            };
                        break;
                    };
                },
            );
        },
    },
    {
        id: Quests.Netherite,
        name: "Nether ite?",
        icon: "textures/items/netherite_ingot",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Snow white?\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fNether ite?" );
            form.body( "Get a Netherite Ingot.\n§7Rewards: Smithing Table and 25 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get a Netherite Ingot.\n§7Rewards: Smithing Table and 25 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('netheriteQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.Netherite).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests4",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
            const form = new ActionFormData()
            form.title("§fNether ite?")
            form.body("§7Claim: Smithing Table and 25 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.Netherite);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 25" );
                                player.runCommandAsync( "give @s smithing_table 1" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests4",
                                    JSON.stringify( savedQuests ),
                                );
                            };
                        break;
                    };
                },
            );
        },
    },
    {
        id: Quests.EnderPlayer,
        name: "Ender Player",
        icon: "textures/items/chorus_fruit",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Nether ite?\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fEnder Player" );
            form.body( "Get 64 Chorus Fruit.\n§7Rewards: 3 Ender Pearls and 50 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 64 Chorus Fruit.\n§7Rewards: 3 Ender Pearls and 50 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('enderPlayerQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.EnderPlayer).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests4",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
            const form = new ActionFormData()
            form.title("§fEnder Player")
            form.body("§7Claim: 3 Ender Pearls and 50 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.EnderPlayer);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 50" );
                                player.runCommandAsync( "give @s ender_pearl 3" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests4",
                                    JSON.stringify( savedQuests ),
                                );
                            };
                        break;
                    };
                },
            );
        },
    },
    {
        id: Quests.NetherBed,
        name: "Nether Bed",
        icon: "textures/items/glowstone_dust",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Ender Player\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fNether Bed" );
            form.body( "Get a Respawn Anchor.\n§7Rewards: 8 Glowstone and 75 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get a Respawn Anchor.\n§7Rewards: 8 Glowstone and 75 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('netherBedQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.NetherBed).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests4",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
            const form = new ActionFormData()
            form.title("§fNether Bed")
            form.body("§7Claim: 8 Glowstone and 75 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.NetherBed);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 50" );
                                player.runCommandAsync( "give @s ender_pearl 3" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests4",
                                    JSON.stringify( savedQuests ),
                                );
                            };
                        break;
                    };
                },
            );
        },
    },
    {
        id: Quests.MovableChest,
        name: "Movable Chest",
        icon: "textures/items/shulker_shell",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Nether Bed\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fMovable Chest" );
            form.body( "Get a Shulker Box.\n§7Rewards: 75 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get a Shulker Box.\n§7Rewards: 75 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('movableChestQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.MovableChest).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests4",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
            const form = new ActionFormData()
            form.title("§fMovable Chest")
            form.body("§7Claim: 75 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.MovableChest);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 75" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests4",
                                    JSON.stringify( savedQuests ),
                                );
                            };
                        break;
                    };
                },
            );
        },
    },
    {
        id: Quests.DragonEgg,
        name: "Dragon Egg",
        icon: "textures/items/chorus_fruit",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Movable Chest\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fDragon Egg" );
            form.body( "Get the Dragon Egg.\n§7Rewards: 1 Enchanted Golden Apple and 175 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get the Dragon Egg.\n§7Rewards: 1 Enchanted Golden Apple and 175 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('dragonEggQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.DragonEgg).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests4",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
            const form = new ActionFormData()
            form.title("§fDragon Egg")
            form.body("§7Claim: 1 Enchanted Golden Apple and 175 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.DragonEgg);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 175" );
                                player.runCommandAsync( "xp enchanted_golden_apple" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests4",
                                    JSON.stringify( savedQuests ),
                                );
                            };
                        break;
                    };
                },
            );
        },
    },
];

export const beyond_the_overworld = ( player ) => {
    let savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
    for (const questO of quests) {
        const qBefore = savedQuests.find((q) => q.id == (questO.id - 1));
        if (!savedQuests.find((q) => q.id == questO.id)) {
            savedQuests.push(
                {
                    id: questO.id,
                    status: (
                        qBefore.s == QuestStatus.Completed
                            ? QuestStatus.Unlocked
                            : QuestStatus.Locked
                    ),
                },
            );
        };
    };
    
    for (const savedQuest of savedQuests) {
        if (!quests.find((q) => q.id == savedQuest.id)) {
            savedQuests = savedQuests.filter((q) => q.id != savedQuest.id);
        };
    };
    
    player.setDynamicProperty(
        "quests4",
        JSON.stringify( savedQuests ),
    );
    
    const form = new ActionFormData();
    form.title( "§fBeyond the Overworld" );
    form.body( "Complete Quests To Unlock The Next Tier" );
    
    for (const questO of quests) {
        const quest = savedQuests.find((q) => q.id == questO.id);
        const questStatus = getFormattedStatus(quest.s);
        
        form.button(
            quest.s == QuestStatus.Locked 
            ? "§7" + questO.name + "\n[" + questStatus + "§7]"
            : "§f" + questO.name + "\n[" + questStatus + "§f]",
            questO.icon
        );
    };
    
    form.show( player ).then(
        (response) => {
            if (response.canceled) return;
            const quest = savedQuests.find((q) => q.id == response.selection);
            const q = quests.find((q) => q.id == response.selection);
            
            if (quest.s == QuestStatus.Locked) q.locked( player );
            else if (quest.s == QuestStatus.Unlocked) q.start( player );
            else if (quest.s == QuestStatus.Busy) q.info( player );
            else if (quest.s == QuestStatus.Completed) q.claim( player );
        },
    );
};