import { world, system, EquipmentSlot, ItemStack } from "@minecraft/server";

system.beforeEvents.watchdogTerminate.subscribe((data) => data.cancel = true);
const allowedBlocks = [
	"minecraft:quartz_ore",
	"minecraft:nether_gold_ore",
	"minecraft:coal_ore",
	"minecraft:redstone_ore",
	"minecraft:lapis_ore",
	"minecraft:iron_ore",
	"minecraft:gold_ore",
	"minecraft:diamond_ore",
	"minecraft:emerald_ore",
	"minecraft:deepslate_coal_ore",
	"minecraft:deepslate_redstone_ore",
	"minecraft:deepslate_lapis_ore",
	"minecraft:deepslate_iron_ore",
	"minecraft:deepslate_gold_ore",
	"minecraft:deepslate_diamond_ore",
	"minecraft:deepslate_emerald_ore",
];

const isVeinItem = ( item ) => {
	if (
		item
		&& item.getLore().includes( "Vein Miner" )
	) return true;
	else return false;
};

world.afterEvents.blockBreak.subscribe(
	({ player, dimension, block, brokenBlockPermutation }) => {
		const handItem = player.getComponent( "equipment_inventory" ).getEquipment( EquipmentSlot.mainhand );
		if (
			!isVeinItem( handItem )
			|| !allowedBlocks.includes( brokenBlockPermutation.type.id )
		) return;
		
		breakBlocks( block, true, dimension, brokenBlockPermutation.type.id, player );
	},
);

let locations = [];
const breakBlocks = async ( block, isMainBlock, dimension, blockType, player ) => {
	if (isMainBlock) locations = [];
	if (
		(!isMainBlock && block.typeId != blockType)
		|| locations.includes( block.location )
		|| !removeDurability( player, 1 )
	) return;

	locations.push( block.location );
	await block.dimension.runCommand( `setblock ${block.location.x} ${block.location.y} ${block.location.z} air [] destroy` );

	breakBlocks( dimension.getBlock({ x: block.location.x + 1, y: block.location.y, z: block.location.z }), false, dimension, blockType, player );
	breakBlocks( dimension.getBlock({ x: block.location.x - 1, y: block.location.y, z: block.location.z }), false, dimension, blockType, player );
	breakBlocks( dimension.getBlock({ x: block.location.x, y: block.location.y + 1, z: block.location.z }), false, dimension, blockType, player );
	breakBlocks( dimension.getBlock({ x: block.location.x, y: block.location.y - 1, z: block.location.z }), false, dimension, blockType, player );
	breakBlocks( dimension.getBlock({ x: block.location.x, y: block.location.y, z: block.location.z + 1 }), false, dimension, blockType, player );
	breakBlocks( dimension.getBlock({ x: block.location.x, y: block.location.y, z: block.location.z - 1 }), false, dimension, blockType, player );
};

const removeDurability = ( player, amount = 1 ) => {
	const equipmentInventory = player.getComponent( "equipment_inventory" );
	const handItem = equipmentInventory.getEquipment( EquipmentSlot.mainhand );

	if (
		isVeinItem( handItem )
		&& (handItem.getComponent( "durability" ).damage += amount) < handItem.getComponent( "durability" ).maxDurability
	) {
		handItem.getComponent( "durability" ).damage += amount;
		equipmentInventory.setEquipment( EquipmentSlot.mainhand, handItem );

		return true;
	} else return false;
};

world.beforeEvents.Chat.subscribe(
	({ sender: player, message }) => {
		const item = new ItemStack( "minecraft:netherite_pickaxe" );
		item.setLore([ "Vein Miner" ]);
		player.getComponent( "inventory" ).container.addItem( item );
	},
);