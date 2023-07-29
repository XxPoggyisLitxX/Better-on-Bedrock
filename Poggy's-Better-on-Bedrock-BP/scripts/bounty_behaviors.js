import { world, Player } from "@minecraft/server";

import * as Bounties from "./bounty_system/constants/Bounties.js";
import * as BountyStatus from "./bounty_system/constants/BountyStatus.js";

world.afterEvents.entityDie.subscribe(
    ({ deadEntity, damageSource: { damagingEntity } }) => {
        if (!damagingEntity instanceof Player) return;
        if (deadEntity.typeId == "minecraft:cow") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.CowSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 3) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.ZombieSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:zombie") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.ZombieSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 8) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.PigSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:pig") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.PigSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 6) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.SheepSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:sheep") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.SheepSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 3) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.GhastSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:ghast") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.GhastSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 6) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.PhantomSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:phantom") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.PhantomSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 12) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.DeerSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "better_on_bedrock:deer") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.DeerSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 5) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.SpiderSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:spider") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.SpiderSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 5) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.SkeletonSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:skeleton") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.SkeletonSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 5) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.BlazeSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:blaze") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.BlazeSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 13) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.PiglinSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:piglin_brute") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.PiglinSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 7) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.VexSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:vex") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.VexSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 5) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.EndermanSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:enderman") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.EndermanSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 16) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.VindicatorSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:vindicator") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.VindicatorSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 4) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.WitchSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:witch") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.WitchSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 5) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.EvokerSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:evocation_illager") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.EvokerSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 10) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.RavagerSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "minecraft:ravager") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.RavagerSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 5) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.WillagerSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "better_on_bedrock:willager") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.WillagerSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 1) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounties.find((q) => q[0] == Bounties.LichSlayer)[2] = BountyStatus.Open;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "better_on_bedrock:fire_place" || deadEntity.typeId == "better_on_bedrock:lich") { //lich phase 2
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.LichSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 1) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounties.find((q) => q[0] == Bounties.EnchanterSlayer)[2] = BountyStatus.Open;
                    savedBounty[2] = BountyStatus.Completed;
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        } else if (deadEntity.typeId == "better_on_bedrock:enchanter") {
            const savedBounties = JSON.parse(damagingEntity.getDynamicProperty( "bounties" ));
            const savedBounty = savedBounties.find((q) => q[0] == Bounties.EnchanterSlayer);
            if (savedBounty[2] == 1) { //If you see this, I am gonna make a list of mobs to be part of the system
                savedBounty[1]++;
                if (savedBounty[1] >= 1) {
                    damagingEntity.sendMessage( "§aBounty Completed!" );
                    savedBounty[2] = BountyStatus.Completed;
                    damagingEntity.sendMessage( "§aCongratulations you have completed all the bounties!" );
                    savedBounty[1] = 0;
                };

                damagingEntity.setDynamicProperty(
                    "bounties",
                    JSON.stringify( savedBounties ),
                );
            };
        };
    },
);