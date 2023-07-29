/*import { ActionFormData } from "@minecraft/server-ui";
export const adventure_delight = ( player ) => {
    const form = new ActionFormData();
    form.title( "§fAdventure Delight");
    form.body( "Complete Quests To Unlock The Next Tier");

    form.button( "Sad Enderman\n[§cLocked]", "textures/items/waystone/ender_tear" );
    form.button( "Bounty Time!\n[§cLocked]", "textures/items/bounty_system/bounty_scroll_closed" );
    form.button( "Log Collector\n[§cLocked]", "textures/items/stick" );
    form.button( "Ore Collector\n[§cLocked]", "textures/items/copper_ingot" );
    form.button( "Ahoy!\n[§cLocked]", "textures/items/spyglass" );
    form.button( "Evoker Spells\n[§cLocked]", "textures/items/emerald" );

    form.show( player );
};*/
import { Enchantment } from "@minecraft/server";
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
        id: Quests.sadEnderman,
        name: "Sad Enderman",
        icon: "textures/items/waystone/ender_tear",
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fSad Enderman" );
            form.body( "Get 4 Ender Tears.\nRewards: 3 Ender Pearls and 100 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests2" ));
            const form = new ActionFormData();
            form.title( "Start Quest?" );
            form.body( "Get 4 Ender Tears\nRewards: 3 Ender Pearls and 100 XP" );
            form.button( "Start Quest!" );
            form.button( "Cancel" );
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_1");
                            player.onScreenDisplay.setTitle('sadEndermanQuestStart');
                            player.sendMessage("§aQuest Started!");
                            savedQuests.find((q) => q.id == Quests.sadEnderman).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests2",
                                JSON.stringify( savedQuests ),
                            );
                        break;
                    };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests2" ));
            const form = new ActionFormData();
            form.title("§fSad Enderman");
            form.body("Claim: 3 Ender Pearls and 100 XP");
            form.button("Claim");
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.sadEnderman);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 100" );
                                player.runCommandAsync( "give @s ender_pearl 3" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests2",
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
        id: Quests.bountyTime,
        name: "Bounty Time",
        icon: "textures/items/bounty_system/bounty_scroll_closed",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Sad Enderman\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fBounty Time" );
            form.body( "Get a Bounty Scroll.\nRewards: 75 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests2" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get a Bounty Scroll.\nRewards: 75 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                             player.removeTag("unlocked_2")
                             player.onScreenDisplay.setTitle('bountyTimeQuestStart')
                             player.sendMessage("§aQuest Started!")
                             savedQuests.find((q) => q.id == Quests.bountyTime).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests2",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests2" ));
            const form = new ActionFormData()
            form.title("§fBounty Time")
            form.body("Claim: 75 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.bountyTime);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 75" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests2",
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
        id: Quests.logCollector,
        name: "Log Collector",
        icon: "textures/items/stick",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Bounty Time\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title("§fLog Collector");
            form.body("Get 1 Mangrove Log.\nRewards: Travelers Record and 250 XP");
            form.button("Ok");
            form.show( player );
        },
        start: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests2" ));
            const form = new ActionFormData();
            form.title("Start Quest?");
            form.body("Get 1 Mangrove Log.\nRewards: Travels Record and 250 XP");
            form.button("Start Quest!");
            form.button("Cancel");
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_3");
                            player.onScreenDisplay.setTitle('logCollectorQuestStart');
                            player.sendMessage("§aQuest Started!");
                            savedQuests.find((q) => q.id == Quests.logCollector).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests2",
                                JSON.stringify( savedQuests ),
                            );
                        break;
                    };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests2" ));
            const form = new ActionFormData();
            form.title( "§fLog Collector" );
            form.body( "Claim: Travels Record and 250 XP" );
            form.button( "Claim" );
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.logCollector);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 250" );
                                player.runCommandAsync( "give @s better_on_bedrock:disc_travelers 1" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests2",
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
        id: Quests.oreCollector,
        name: "Ore Collector",
        icon: "textures/items/copper_ingot",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Log Collector\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fOre Collector" );
            form.body( "Get All Ore Blocks.\nRewards: Efficiency 5 Iron Pickaxe and 250 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests2" ));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get Get All Ore Blocks.\nRewards: Efficiency 5 Iron Pickaxe and 250 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_4");
                            player.onScreenDisplay.setTitle('oreCollectorQuestStart');
                            player.sendMessage("§aQuest Started!");
                            savedQuests.find((q) => q.id == Quests.oreCollector).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests2",
                                JSON.stringify( savedQuests ),
                            );
                        break;
                    };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests2" ));
            const form = new ActionFormData()
            form.title("§fOre Collector")
            form.body("Claim: Efficiency 5 Iron Pickaxe and 250 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.oreCollector);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 250" );
                               /* const item = new ItemStack( "minecraft:iron_pickaxe" );
                                const enchants = item.getComponent( "minecraft:enchantments" ).enchantments;
                                enchants.addEnchantment(new Enchantment( MinecraftEnchantmentTypes.Efficiency, 5 ));

                                player.getComponent( "minecraft:inventory" ).container.addItem( item );*/
                                player.runCommandAsync( "give @s better_on_bedrock:iron_pickaxe 1" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests2",
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
        id: Quests.evokerSpells,
        name: "Evoker Spells",
        icon: "textures/items/totem",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Ore Collector\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData()
            form.title( "§fEvoker Spells" );
            form.body( "Get a Totem.\nRewards: 2 Golden Apples and 200 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests2" ));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get a Totem.\nRewards: 2 Golden Apples and 200 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_5");
                            player.onScreenDisplay.setTitle('non');
                            player.sendMessage("§aQuest Started!");
                            savedQuests.find((q) => q.id == Quests.evokerSpells).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests2",
                                JSON.stringify( savedQuests ),
                            );
                        break;
                    };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests2" ));
            const form = new ActionFormData()
            form.title("§fEvoker Spells")
            form.body("Claim: 2 Golden Apples and 200 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.evokerSpells);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 200" );
                                player.runCommandAsync( "give @s golden_apple 2" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests2",
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

export const adventure_delight = ( player ) => {
    let savedQuests = JSON.parse(player.getDynamicProperty( "quests2" ));
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
        "quests2",
        JSON.stringify( savedQuests ),
    );
    
    const form = new ActionFormData();
    form.title( "§fAdventure Delight" );
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