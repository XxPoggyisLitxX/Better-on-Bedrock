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
        id: Quests.BowMaster,
        name: "Bow Master",
        icon: "textures/items/arrow",
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fBow Master" );
            form.body( "Get 48 Arrows.\n§7Rewards: Bow and 15 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests5" ));
            const form = new ActionFormData();
            form.title( "Start Quest?" );
            form.body( "Get 48 Arrows.\n§7Rewards: Bow and 15 XP" );
            form.button( "Start Quest!" );
            form.button( "Cancel" );
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_1");
                            player.onScreenDisplay.setTitle('bowMasterQuestStart');
                            player.sendMessage("§aQuest Started!");
                            savedQuests.find((q) => q.id == Quests.BowMaster).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests5",
                                JSON.stringify( savedQuests ),
                            );
                        break;
                    };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests5" ));
            const form = new ActionFormData();
            form.title("§fBow Master");
            form.body("§7Claim: Bow and 15 XP");
            form.button("Claim");
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.BowMaster);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 15" );
                                player.runCommandAsync( "give @s bow 1" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests5",
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
        id: Quests.StayingHealthy,
        name: "Staying Healthy",
        icon: "textures/items/biome_update/healthy_carrot",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Zombie Slayer\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fStaying Healthy" );
            form.body( "Get 16 Healthy Carrots.\n§7Rewards: 8 Healthy Carrots and 10 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests5" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 16 Healthy Carrots.\n§7Rewards: 8 Healthy Carrots and 10 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('stayingHealthyQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.StayingHealthy).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests5",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests5" ));
            const form = new ActionFormData()
            form.title("§fStaying Healthy")
            form.body("§7Claim: 8 Healthy Carrots and 10 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.StayingHealthy);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 10" );
                                player.runCommandAsync( "give @s better_on_bedrock:healthy_carrot_item 8" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests5",
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
        id: Quests.ArmoredUp,
        name: "Armored Up",
        icon: "textures/items/diamond_chestplate",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Creeper Hunter\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fArmored Up" );
            form.body( "Get Diamond Chestplate.\n§7Rewards: 50 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests5" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get Diamond Chestplate.\n§7Rewards: 50 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('armoredUpQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.ArmoredUp).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests5",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests5" ));
            const form = new ActionFormData()
            form.title("§fArmored Up")
            form.body("§7Claim: 50 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.ArmoredUp);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 50" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests5",
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
        id: Quests.WillagerHat,
        name: "Willager Hat",
        icon: "textures/items/trophies/willager_hat",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Stringy Situation\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fWillager Hat" );
            form.body( "Get the Willager's Hat.\n§7Rewards: 1 Enchanted Golden Apple and 200 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests5" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get the Willager's Hat.\n§7Rewards: 1 Enchanted Golden Apple and 200 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('willagerHatQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.WillagerHat).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests5",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests5" ));
            const form = new ActionFormData()
            form.title("§fWillager Hat")
            form.body("§7Claim: 1 Enchanted Golden Apple and 200 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.WillagerHat);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 200" );
                                player.runCommandAsync( "give @s enchanted_golden_apple 1" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests5",
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

export const the_willager = ( player ) => {
    let savedQuests = JSON.parse(player.getDynamicProperty( "quests5" ));
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
        "quests5",
        JSON.stringify( savedQuests ),
    );
    
    const form = new ActionFormData();
    form.title( "§fThe Willager" );
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