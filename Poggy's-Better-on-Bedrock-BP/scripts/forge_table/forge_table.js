import { world, system, Player,  ItemStack, ItemEnchantsComponent, ItemTypes } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

const stardustItems = {
	"better_on_bedrock:netherite_helmet": "better_on_bedrock:stardust_helmet",
	"better_on_bedrock:netherite_chestplate": "better_on_bedrock:stardust_chestplate",
	"better_on_bedrock:netherite_leggings": "better_on_bedrock:stardust_leggings",
	"better_on_bedrock:netherite_boots": "better_on_bedrock:stardust_boots",
	"better_on_bedrock:netherite_sword": "better_on_bedrock:stardust_sword",
	"better_on_bedrock:netherite_axe": "better_on_bedrock:stardust_axe",
	"better_on_bedrock:netherite_pickaxe": "better_on_bedrock:stardust_pickaxe",
  "minecraft:netherite_helmet": "better_on_bedrock:stardust_helmet",
	"minecraft:netherite_chestplate": "better_on_bedrock:stardust_chestplate",
	"minecraft:netherite_leggings": "better_on_bedrock:stardust_leggings",
	"minecraft:netherite_boots": "better_on_bedrock:stardust_boots",
};

const gildedNetheriteItems = {
	"minecraft:netherite_helmet": "better_on_bedrock:netherite_helmet",
	"minecraft:netherite_chestplate": "better_on_bedrock:netherite_chestplate",
	"minecraft:netherite_leggings": "better_on_bedrock:netherite_leggings",
	"minecraft:netherite_boots": "better_on_bedrock:netherite_boots"
};

world.beforeEvents.itemUseOn.subscribe(
	(data) => {

		const { source: player, itemStack: item } = data;
		system.run(() => {
			let block = player.getBlockFromViewDirection()?.block;
			if (block?.typeId != "better_on_bedrock:forge_table") return;
			if (
				stardustItems[item.typeId]
				|| gildedNetheriteItems[item.typeId]
			) UI( player );
			else if(item.typeId != 'minecraft:stick'){
				const form = new ActionFormData();
				form.title( "No Armor?" );
				form.body(
					"§cYou are unable to forge/upgrade your Netherite Armor. To upgrade, hold the netherite armor in your hand and use the table again."
				);
				form.button( "Ok" );
				form.show( player );
			};
  })
		
	},
);

const UI = ( player ) => {
	const form = new ActionFormData();
	form.title( "Upgrade Armor?" );
	form.body(
		"You are about to upgrade your Netherite Armor to Gilded Netherite/Stardust Armor, You need at least 1 Gold/Stardust Ingot to continue.\n§aYou can upgrade your gilded netherite to stardust."
	);
	///buttons
	form.button( "Forge to Gilded Netherite" );
	form.button( "Forge to Stardust" );
	form.button( "Don't Upgrade" );
	form.show( player ).then(
		(response) => {
			const inventory = player.getComponent( "inventory" ).container;
			const item = inventory.getItem( player.selectedSlot );
			switch(response?.selection) {
				case 0:
					if (getItemCount( player, "minecraft:gold_ingot" ) > 0) {
						const newItem = new ItemStack(ItemTypes?.get( gildedNetheriteItems[item.typeId] ));
						newItem.getComponent( ItemEnchantsComponent.componentId ).enchantments = item.getComponent( ItemEnchantsComponent.componentId ).enchantments;
						inventory.setItem( player.selectedSlot, newItem );
						player.runCommandAsync( "clear @p minecraft:gold_ingot 0 1" );
					} else {
						player.sendMessage( "§cYou don't have enough Gold Ingots" );
					};
				break;
				case 1:
					if (getItemCount( player, "better_on_bedrock:stardust_ingot" ) > 0) {
						const newItem = new ItemStack(ItemTypes?.get( stardustItems[item.typeId] ));
						newItem.getComponent( ItemEnchantsComponent.componentId ).enchantments = item.getComponent( ItemEnchantsComponent.componentId ).enchantments;
						inventory.setItem( player.selectedSlot, newItem );
						player.runCommandAsync( "clear @p better_on_bedrock:stardust_ingot 0 1" );
					} else {
						player.sendMessage( "§cYou don't have enough Stardust Ingots" );
					};
				break;
			};
		},
	);
};

const getItemCount = ( player, itemId ) => {
	let itemCount = 0;
	const inventory = player.getComponent( "inventory" ).container;
	for (let slot = 0; slot < inventory.size; slot++) {
		const item = inventory.getItem( slot );
		if (
			item
			&& item.typeId == itemId
		) itemCount += item.amount;
	};
	
	return itemCount;
};