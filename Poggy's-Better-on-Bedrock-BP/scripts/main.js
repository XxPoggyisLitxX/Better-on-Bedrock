import { system } from "@minecraft/server";
system.beforeEvents.watchdogTerminate.subscribe((data) => data.cancel = true);

import "./all_tick_functions.js"
import "./backpacks/backpack.js"
import "./player_corpse/death_coords.js"
import "./bounty_system/bounty_ui.js"
import "./bounty_system/quest_ui.js"
import "./waystones/waystone_functions.js"
import "./enchantments/vein_miner.js"
import "./enchantments/tree_capitator.js"
import "./hardcore_ui/hardcore_selection_screen.js"
import "./forge_table/forge_table.js"
import "./loot_bag_interactions/regular_lootbag.js"
import "./use_item_on_block.js"
import "./advancements/block_place_advancements.js"
import "./bounty_system/quest_tiers/time_to_mine/quest_list.js"
import "./bounty_behaviors.js"
import "./player_corpse/ghost_effect.js"
import "./place_crop_on_broken.js"
import "./day_counter.js"
import "./armor_equip_sounds/stardust_effect.js";
import "./watchdoge.js"