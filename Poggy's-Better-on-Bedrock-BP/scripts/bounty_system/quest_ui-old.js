import { world, ItemStack,  DynamicPropertiesDefinition, ItemTypes } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

world.afterEvents.worldInitialize.subscribe(
    ({ propertyRegistry }) => {
        const playerCompShowTick = new DynamicPropertiesDefinition();
        
        playerCompShowTick.defineString( "bounties", 102 );
            
        propertyRegistry.registerEntityTypeDynamicProperties(
            playerCompShowTick, MinecraftEntityTypes["player"]
        );
    },
);

const Bounties = {
    CowSlayer: 0,
};

const bounties = [
    {
        id: Bounties.CowSlayer,
        progress: 0,
    }
]

const randomXP = Math.floor(Math.random() * 64) + 32;
const quests = [
    {
        id: Bounties.CowSlayer,
        name: "Cow Slayer",
        tag: "cow_bounty",
        functions: {
            start: ( player ) => {
                 const form = new ActionFormData();
                 form.title( "Cow Slayer" );
                 form.body( "Hunt down 3 cows.\n§7Rewards: 22 Coal and 20 XP" );
                 form.button( "Start Hunt" );
                 form.button( "Not Now" );
                 form.show( player ).then(
                     (response) => {
                         switch (response?.selection) {
                             case 0:
                                 player.removeTag( "cow_bounty_open" );
                                 player.addTag( "cow_bounty_busy" );
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
                const form = new ActionFormData();
                form.title( "Cow Slayer" );
                form.body( "You hunted down 3 cows, claim your reward!\n/7Rewards: 22 Coal and 20 XP" );
                form.button("Claim!");
                form.show( player ).then(
                    (response) => {
                        switch (response?.selection) {
                            case 0:
                                player.removeTag( "cow_bounty_completed" );
                                player.addTag( "cow_bounty_claimed" );

                                player.runCommandAsync( "xp 20" );
                                player.runCommandAsync( "give @s coal 22" );
                            break;
                        };
                    },
                );
            },
        },
    },
];

const bounty_tier_page = ( player ) => {
    const form = new ActionFormData();
    form.title("§fBounties");
    form.body("Welcome to the bounty screen. Select an exisitng bounty, or a newly unlocked bounty and follow the instructions. Each bounty will have a difficulty indicated by 'I, II, III, IV, V'.");
    
    for (const quest of quests)
        form.button(
            (
                getBountyStatus( player, quest.tag ) == 0
                || getBountyStatus( player, quest.tag ) == 3
                    ? "§7"
                    : "§f"
            )
            + quest.name + " - " + getFormattedStatus(getBountyStatus( player, quest.tag )),
        );
    
    form.show( player ).then(
        (response) => {
            console.warn(response?.selection);
            
            if (response.canceled) return;
            const quest = quests.find((q) => q.id == response.selection);
            const status = getBountyStatus( player, quest.tag );
                
            if (status == 0) quest.functions.start( player );
            else if (status == 1) quest.functions.about( player );
            else if (status == 2) quest.functions.claim( player );
        },
    );
};

world.beforeEvents.ItemUse.subscribe(
    ({ source: player, item }) => {
        switch (item?.typeId) {
            case "better_on_bedrock:quest_scroll_closed":
                player.addTag( "cow_bounty_open" )
                const inventory = player.getComponent( "inventory" ).container;
                const newItem = new ItemStack(ItemTypes?.get("better_on_bedrock:quest_scroll_opened"));
                
                inventory.setItem( player.selectedSlot, newItem );
            break;
            case "better_on_bedrock:quest_scroll_opened":
                if (!player.getDynamicProperty( "bounties" )) {
                    player.setDynamicProperty(
                        "bounties",
                        JSON.stringify( bounties ),
                    );
                };

                bounty_tier_page( player );
            break;
        };
    },
);

const getBountyStatus = ( player, questName ) => {
    if (player.hasTag( questName + "_open" )) return 0;
    else if (player.hasTag( questName + "_busy" )) return 1;
    else if (player.hasTag( questName + "_completed" )) return 2;
    else if (player.hasTag( questName + "_claimed" )) return 3;
};

const getFormattedStatus = ( status ) => {
    if (status == 0) return "§dOpen";
    else if (status == 1) return "§cSearching Bounty...";
    else if (status == 2) return "§aBounty Found!";
    else if (status == 3) return "§dClaimed";
};