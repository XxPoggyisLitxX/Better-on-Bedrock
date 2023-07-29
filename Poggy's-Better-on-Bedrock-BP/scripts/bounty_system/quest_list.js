import { world, ItemStack,  DynamicPropertiesDefinition, ItemTypes } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

import * as Bounties from "./constants/Bounties.js";
import * as BountyStatus from "./constants/BountyStatus.js";

/*world.afterEvents.worldInitialize.subscribe(
    ({ propertyRegistry }) => {
        const playerCompShowTick = new DynamicPropertiesDefinition();
        
        playerCompShowTick.defineString( "bounties", 102 );
            
        propertyRegistry.registerEntityTypeDynamicProperties(
            playerCompShowTick, MinecraftEntityTypes["player"]
        );
    },
);*/

const getFormattedStatus = ( status ) => {
    if (status == 0) return "§dOpen";
    else if (status == 1) return "§cSearching Bounty...";
    else if (status == 2) return "§aBounty Found!";
    else if (status == 3) return "§dClaimed";
};

const bounties = [
    {
        id: Bounties.CowSlayer,
        progress: 0,
        status: BountyStatus.Open,
    }
];

const quests = [
    {
        id: Bounties.CowSlayer,
        name: "Cow Slayer",
        functions: {
            start: ( player ) => {
                const savedBounties = JSON.parse(player.getDynamicProperty( "bounties" ));
                const form = new ActionFormData();
                form.title( "Cow Slayer" );
                form.body( "Hunt down 3 cows.\n§7Rewards: 22 Coal and 20 XP" );
                form.button( "Start Hunt" );
                form.button( "Not Now" );
                form.show( player ).then(
                    (response) => {
                        switch (response?.selection) {
                            case 0:
                                player.sendMessage("§aQuest Started!");
                                savedBounties.find((b) => b.id == Bounties.CowSlayer).status = BountyStatus.Busy;
                                player.setDynamicProperty(
                                    "bounties",
                                    JSON.stringify( savedBounties ),
                                );
                            break;
                        };
                    },
                );
            },
            about: ( player ) => {
                const form = new ActionFormData();
                form.title( "Cow Slayer" );
                form.body( "Hunt down 3 cows.\n§7Rewards: 22 Coal and 20 XP" );
                form.button( "Got It!" );
                form.show( player );
            },
            claim: ( player ) => {
                const savedBounties = JSON.parse(player.getDynamicProperty( "bounties" ));
                const form = new ActionFormData();
                form.title( "Cow Slayer" );
                form.body( "You hunted down 3 cows, claim your reward!\n/7Rewards: 22 Coal and 20 XP" );
                form.button("Claim!");
                form.show( player ).then(
                    (response) => {
                        switch (response?.selection) {
                            case 0:
                                const bounty = savedBounties.find((b) => b.id == Bounties.CowSlayer);
                                if (bounty.status != BountyStatus.Claimed) {
                                    player.runCommandAsync( "xp 20" );
                                    player.runCommandAsync( "give @s coal 22" );
                                    bounty.status = BountyStatus.Claimed;
                                    player.setDynamicProperty(
                                        "bounties",
                                        JSON.stringify( savedBounties ),
                                    );
                                };
                            break;
                        };
                    },
                );
            },
        },
    },
];

/*const quests = [
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
                            savedQuests.find((q) => q.id == Quests.BowMaster).status = QuestStatus.Busy;
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
                            if (quest.status != QuestStatus.Claimed) {
                                console.warn(quest.status);
                                player.runCommandAsync( "xp 15" );
                                player.runCommandAsync( "give @s bow 1" );
                                quest.status = QuestStatus.Claimed;
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
        icon: "textures/items/gunpowder",
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
                            savedQuests.find((q) => q.id == Quests.StayingHealthy).status = QuestStatus.Busy;
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
                            if (quest.status != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 10" );
                                player.runCommandAsync( "give @s better_on_bedrock:healthy_carrot_item 8" );
                                quest.status = QuestStatus.Claimed;
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
        icon: "textures/items/string",
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
                            savedQuests.find((q) => q.id == Quests.ArmoredUp).status = QuestStatus.Busy;
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
                            if (quest.status != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 50" );
                                quest.status = QuestStatus.Claimed;
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
        icon: "textures/items/gunpowder",
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
                            savedQuests.find((q) => q.id == Quests.WillagerHat).status = QuestStatus.Busy;
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
                            if (quest.status != QuestStatus.Claimed) {
                                player.runCommandAsync( "xp 200" );
                                player.runCommandAsync( "give @s enchanted_golden_apple 1" );
                                quest.status = QuestStatus.Claimed;
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
];*/

export const bounty_tier_page = ( player ) => {
    let savedBounties = JSON.parse(player.getDynamicProperty( "bounties" ));
    for (const savedBounty of savedBounties) {
        if (!quests.find((q) => q.id == savedBounty.id)) {
            savedBounties = savedBounties.filter((q) => q.id != savedBounty.id);
        };
    };
    
    player.setDynamicProperty(
        "bounties",
        JSON.stringify( savedBounties ),
    );
    
    const form = new ActionFormData();
    form.title( "§fBounties" );
    form.body( "Welcome to the bounty screen. Select an exisitng bounty, or a newly unlocked bounty and follow the instructions. Each bounty will have a difficulty indicated by 'I, II, III, IV, V'." );
    
    for (const questO of quests) {
        const quest = savedBounties.find((b) => b.id == questO.id);
        const questStatus = getFormattedStatus(quest.status);
        
        form.button(
            (
                quest.status == BountyStatus.Open
                || quest.status == BountyStatus.Claimed
                    ? "§7"
                    : "§f"
            )
            + questO.name + " - " + questStatus,
            questO.icon
        );
    };
    
    form.show( player ).then(
        (response) => {
            if (response.canceled) return;
            const bounty = savedBounties.find((b) => b.id == response.selection);
            const b = quests.find((b) => b.id == response.selection);
            
            if (bounty.status == BountyStatus.Open) b.start( player );
            else if (bounty.status == BountyStatus.Busy) b.info( player );
            else if (bounty.status == BountyStatus.Completed) b.claim( player );
        },
    );
};

world.beforeEvents.ItemUse.subscribe(
    ({ source: player, item }) => {

                if( item?.typeId == "better_on_bedrock:quest_scroll_closed"){
                player.addTag( "cow_bounty_open" )
                const inventory = player.getComponent( "inventory" ).container;
                const newItem = new ItemStack(ItemTypes?.get("better_on_bedrock:quest_scroll_opened"));
                
                inventory.setItem( player.selectedSlot, newItem );
            }

                if(item?.typeId == "better_on_bedrock:quest_scroll_opened"){

                if (!player.getDynamicProperty( "bounties" )) {
                    player.setDynamicProperty(
                        "bounties",
                        JSON.stringify( bounties ),
                    );
                };

                bounty_tier_page( player );

        };
    },
);