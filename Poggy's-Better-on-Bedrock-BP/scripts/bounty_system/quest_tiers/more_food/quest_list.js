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
        id: Quests.ABigNut,
        name: "A Big Nut",
        icon: "textures/items/biome_update/Opened_Coconut",
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fA Big Nut" );
            form.body( "Get a Broken Open Coconut.\n§7Rewards: 125 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
            const form = new ActionFormData();
            form.title( "Start Quest?" );
            form.body( "Get a Broken Open Coconut.\n§7Rewards: 125 XP" );
            form.button( "Start Quest!" );
            form.button( "Cancel" );
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_1");
                            player.onScreenDisplay.setTitle('ABigNutQuestStart');
                            player.sendMessage("§aQuest Started!");
                            savedQuests.find((q) => q.id == Quests.ABigNut).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests6",
                                JSON.stringify( savedQuests ),
                            );
                        break;
                    };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
            const form = new ActionFormData();
            form.title("§fA Big Nut");
            form.body("§7Claim: 125 XP");
            form.button("Claim");
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.ABigNut);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 125" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests6",
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
        id: Quests.EggsAsPlants,
        name: "Eggs as plants?",
        icon: "textures/items/biome_update/Eggplant_Item",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"A Big Nut\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fEggs as plants?" );
            form.body( "Get 32 Baked Eggplants.\n§7Rewards: 100 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 32 Baked Eggplants.\n§7Rewards: 100 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('EggsAsPlantsQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.EggsAsPlants).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests6",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
            const form = new ActionFormData()
            form.title("§fEggs as plants?")
            form.body("§7Claim: 100 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.EggsAsPlants);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 100" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests6",
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
        id: Quests.AGoodDiet,
        name: "A Good Diet",
        icon: "textures/items/biome_update/salad",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Eggs as plants?\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fA Good Diet" );
            form.body( "Get 8 Salad.\n§7Rewards: 3 Healthy Carrots and 50 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 8 Salad.\n§7Rewards: 3 Healthy Carrots and 50 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('AGoodDietQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.AGoodDiet).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests6",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
            const form = new ActionFormData()
            form.title("§fA Good Diet")
            form.body("§7Claim: 3 Healthy Carrots and 50 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.AGoodDiet);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 50" );
                                player.runCommandAsync( "give @s better_on_bedrock:healthy_carrot_item 3" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests6",
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
        id: Quests.WildinFood,
        name: "Wildin' Food",
        icon: "textures/items/biome_update/wild_carrot",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"A Good Diet\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fWildin' Food" );
            form.body( "Get 16 Wild Carrots.\n§7Rewards: 5 Healthy Carrots and 50 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 16 Wild Carrots.\n§7Rewards: 5 Healthy Carrots and 50 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('WildinFoodQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.WildinFood).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests6",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
            const form = new ActionFormData()
            form.title("§fWildin' Food")
            form.body("§7Claim: 5 Healthy Carrots and 50 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.WildinFood);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 50" );
                                player.runCommandAsync( "give @s better_on_bedrock:healthy_carrot_item 5" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests6",
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
        id: Quests.GreenHay,
        name: "Green Hay?",
        icon: "textures/items/biome_update/barley",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Wildin' Food\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fGreen Hay?" );
            form.body( "Get 5 Barley Stew.\n§7Rewards: 2 Barley Stew and 50 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 5 Barley Stew.\n§7Rewards: 2 Barley Stew and 50 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('GreenHayQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.GreenHay).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests6",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
            const form = new ActionFormData()
            form.title("§fGreen Hay?")
            form.body("§7Claim: 2 Barley Stew and 50 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.GreenHay);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 50" );
                                player.runCommandAsync( "give @s better_on_bedrock:barley_soup 2" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests6",
                                    JSON.stringify( savedQuests ),
                                );
                            };
                        break;
                    };
                },
            );
        },
    },//This code has issues (the code below me)
    {
        id: Quests.CureForTears,
        name: "Cure for tears",
        icon: "textures/items/biome_update/onion",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Green Hay?\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fCure for tears" );
            form.body( "Get 32 Baked Onion.\n§7Rewards: Barley Stew and 50 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 32 Baked Onion.\n§7Rewards: Barley Stew and 50 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('CureForTearsQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.CureForTears).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests6",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
            const form = new ActionFormData()
            form.title("§fCure for tears")
            form.body("§7Claim: Barley Stew and 50 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.CureForTears);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 50" );
                                player.runCommandAsync( "give @s better_on_bedrock:barley_soup 1" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests6",
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
        id: Quests.LeBaguette,
        name: "Le Baguette",
        icon: "textures/items/biome_update/baguete",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Cure for tears\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fLe Baguette" );
            form.body( "Get a Baguette.\n§7Rewards: 6 Bread and 100 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get a Baguette.\n§7Rewards: 6 Bread and 100 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('LeBaguetteQuestStart')
                            player.sendMessage("§aQuest Started!")
                            savedQuests.find((q) => q.id == Quests.LeBaguette).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests6",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
            const form = new ActionFormData()
            form.title("§fLe Baguette")
            form.body("§7Claim: 6 Bread and 100 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.LeBaguette);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 50" );
                                player.runCommandAsync( "give @s better_on_bedrock:barley_soup 1" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests6",
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

export const more_food = ( player ) => {
    let savedQuests = JSON.parse(player.getDynamicProperty( "quests6" ));
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
        "quests6",
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