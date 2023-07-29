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
        id: Quests.Metallis,
        name: "Metallis",
        icon: "textures/items/raw_iron",
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fStone Age" );
            form.body( "Get 1 Raw Iron.\n§7Rewards: 16 Cobblestone and 25 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests" ));
            const form = new ActionFormData();
            form.title( "Start Quest?" );
            form.body( "Get 1 Raw Iron.\n§7Rewards: 16 Cobblestone and 25 XP" );
            form.button( "Start Quest!" );
            form.button( "Cancel" );
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_1");
                            
                            player.sendMessage("§aQuest Started!");
                            savedQuests.find((q) => q.id == Quests.Metallis).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests",
                                JSON.stringify( savedQuests ),
                            );
                        break;
                    };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests" ));
            const form = new ActionFormData();
            form.title("§fStone Age");
            form.body("§7Claim: 16 Cobblestone and 25 XP");
            form.button("Claim");
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.Metallis);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 25" );
                                player.runCommandAsync( "give @s cobblestone 16" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests",
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
        id: Quests.LightMyDay,
        name: "Light My Day",
        icon: "textures/items/coal",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Metallis\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fLight My Day" );
            form.body( "Get Coal.\n§7Rewards: 4 Torches and 25 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get Coal.\n§7Rewards: 4 Torches and 25 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                             player.removeTag("unlocked_2")
                             
                             player.sendMessage("§aQuest Started!")
                             savedQuests.find((q) => q.id == Quests.LightMyDay).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests" ));
            const form = new ActionFormData()
            form.title("§fLight My Day")
            form.body("§7Claim: 4 Torches and 25 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.LightMyDay);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 25" );
                                player.runCommandAsync( "give @s torch 4" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests",
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
        id: Quests.WitchcraftBlue,
        name: "Witchcraft Blue",
        icon: "textures/items/dye_powder_blue",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Light My Day\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title("§fWitchcraft Blue");
            form.body("Get 32 Lapis Lazuli.\n§7Rewards: 1 Block of Lapis and 50 XP");
            form.button("Ok");
            form.show( player );
        },
        start: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests" ));
            const form = new ActionFormData();
            form.title("Start Quest?");
            form.body("Get 32 Lapis Lazuli.\n§7Rewards: 1 Block of Lapis and 50 XP");
            form.button("Start Quest!");
            form.button("Cancel");
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_3");
                            
                            player.sendMessage("§aQuest Started!");
                            savedQuests.find((q) => q.id == Quests.WitchcraftBlue).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests",
                                JSON.stringify( savedQuests ),
                            );
                        break;
                    };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests" ));
            const form = new ActionFormData();
            form.title( "§fWitchcraft Blue" );
            form.body( "§7Claim: 1 Block of Lapis and 50 XP" );
            form.button( "Claim" );
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.WitchcraftBlue);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 50" );
                                player.runCommandAsync( "give @s lapis_block 1" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests",
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
        id: Quests.Amethysts,
        name: "Amethysts",
        icon: "textures/items/amethyst_shard",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Witchcraft Blue\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§fAmethysts" );
            form.body( "Get 32 Amethyst Shards.\n§7Rewards: 4 Blocks of Amethyst and 50 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests" ));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get 32 Amethyst Shards.\n§7Rewards: 4 Blocks of Amethyst and 50 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_4");
                            
                            player.sendMessage("§aQuest Started!");
                            savedQuests.find((q) => q.id == Quests.Amethysts).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests",
                                JSON.stringify( savedQuests ),
                            );
                        break;
                    };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests" ));
            const form = new ActionFormData()
            form.title("§fAmethysts")
            form.body("§7Claim: 4 Blocks of Amethyst and 50 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.Amethysts);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 50" );
                                player.runCommandAsync( "give @s amethyst_block 4" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests",
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
        id: Quests.Diamonds,
        name: "Diamonds???",
        icon: "textures/items/diamond",
        locked: ( player ) => player.sendMessage( "§cYou need to complete \"Amethysts\" in order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData()
            form.title( "§fDiamonds???" );
            form.body( "Get 9 Diamonds.\n§7Rewards: 1 Diamond and 100 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests" ));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get 9 Diamonds.\n§7Rewards: 1 Diamond and 100 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_5");
                            
                            player.sendMessage("§aQuest Started!");
                            savedQuests.find((q) => q.id == Quests.Diamonds).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests",
                                JSON.stringify( savedQuests ),
                            );
                        break;
                    };
                },
            );
        },
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests" ));
            const form = new ActionFormData()
            form.title("§fDiamonds???")
            form.body("§7Claim: 1 Diamond and 100 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.Diamonds);
                            if (quest.s != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 100" );
                                player.runCommandAsync( "give @s diamond 1" );
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests",
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

export const time_to_mine = ( player ) => {
    let savedQuests = JSON.parse(player.getDynamicProperty( "quests" ));
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
        "quests",
        JSON.stringify( savedQuests ),
    );
    
    const form = new ActionFormData();
    form.title( "§fTime to Mine" );
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