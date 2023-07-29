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
        id: Quests.ZombieSlayer,
        name: "Zombie Slayer",
        icon: "textures/items/raw_iron",
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fZombie Slayer" );
            form.body( "Get 32 Rotten Flesh.\n§7Rewards: 6 Cooked Beef and 10 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests3" ));
            const form = new ActionFormData();
            form.title( "Start Quest?" );
            form.body( "Get 32 Rotten Flesh.\n§7Rewards: 6 Cooked Beef and 10 XP" );
            form.button( "Start Quest!" );
            form.button( "Cancel" );
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_1");
                            player.onScreenDisplay.setTitle('zombieSlayerQuestStart');
                            player.sendMessage("§aQuest Started!");
                            savedQuests.find((q) => q.id == Quests.ZombieSlayer).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests3",
                                JSON.stringify( savedQuests ),
                            );
                        break;
                    };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests3" ));
            const form = new ActionFormData();
            form.title("§fZombie Slayer");
            form.body("§7Claim: 6 Cooked Beef and 10 XP");
            form.button("Claim");
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.ZombieSlayer);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 10" );
                                player.runCommandAsync( "give @s cooked_beef 6" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests3",
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
        id: Quests.CreeperHunter,
        name: "Creeper Hunter",
        icon: "textures/items/gunpowder",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Zombie Slayer\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fCreeper Hunter" );
            form.body( "Get 16 Gunpowder.\n§7Rewards: 5 TNT and 15 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests3" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 16 Gunpowder.\n§7Rewards: 5 TNT and 15 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('creeperHunterQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.CreeperHunter).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests3",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests3" ));
            const form = new ActionFormData()
            form.title("§fCreeper Hunter")
            form.body("§7Claim: 5 TNT and 15 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.CreeperHunter);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 15" );
                                player.runCommandAsync( "give @s tnt 5" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests3",
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
        id: Quests.StringySituation,
        name: "Stringy Situation",
        icon: "textures/items/string",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Creeper Hunter\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fStringy Situation" );
            form.body( "Get 14 String.\n§7Rewards: Shears and 15 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests3" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 14 String.\n§7Rewards: Shears and 15 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('stringySituationQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.StringySituation).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests3",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests3" ));
            const form = new ActionFormData()
            form.title("§fStringy Situation")
            form.body("§7Claim: Shears and 15 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.StringySituation);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 15" );
                                player.runCommandAsync( "give @s shears 1" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests3",
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
        id: Quests.MoreSouls,
        name: "More Souls",
        icon: "textures/items/trophies/soul_star",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"More Souls\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fMore Souls" );
            form.body( "Get 2 Souls.\n§7Rewards: 2 Diamonds and 100 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests3" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 14 String.\n§7Rewards: 2 Diamonds and 100 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('moreSoulsQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.MoreSouls).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests3",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests3" ));
            const form = new ActionFormData()
            form.title("§fMore Souls")
            form.body("§7Claim: 2 Diamonds and 100 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.MoreSouls);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 100" );
                                player.runCommandAsync( "give @s diamond 2" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests3",
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

export const monster_looter = ( player ) => {
    let savedQuests = JSON.parse(player.getDynamicProperty( "quests3" ));
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
        "quests3",
        JSON.stringify( savedQuests ),
    );
    
    const form = new ActionFormData();
    form.title( "§fMonster Looter" );
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