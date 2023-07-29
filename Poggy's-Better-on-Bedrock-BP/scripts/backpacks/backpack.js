import { world, system, EquipmentSlot, Vector } from "@minecraft/server";
export const backpack = ( player, backpackId, size = 0 ) => {
	try {
		const backpacks = player.dimension.getEntities({ tags: [ "backpack:" + backpackId ] });
		if (backpacks.length > 2) backpacks.forEach((b) => b.triggerEvent( "despawn_backpack" ));
		
		const [ entity ] = player.dimension.getEntities({ tags: [ "backpack:" + backpackId ] });
		if (entity) {
			const inventory = player.getComponent( "minecraft:inventory" ).container;
			const entityInventory = entity.getComponent( "minecraft:inventory" ).container;
			for (let i = 0; i < entityInventory.size; i++) {
				const item = entityInventory.getItem( i );
				if (
					item?.typeId == "better_on_bedrock:backpack"
					|| item?.typeId == "better_on_bedrock:backpack_medium"
					|| item?.typeId == "better_on_bedrock:backpack_large"
				) {
					entityInventory.setItem( i );
					if (inventory.emptySlotsCount == 0) {
						player.dimension.spawnItem( item, player.location );
					} else {
						inventory.addItem( item );
					};
				};
			};
		};
		
		if (
			player.lastBackpackId
			&& player.lastBackpackId != backpackId
		) {
			const [ entity ] = player.dimension.getEntities({ tags: [ "backpack:" + player.lastBackpackId ] });
			if (entity) {
				entity.runCommand( `structure save "${player.lastBackpackId}" ~-5 ~8 ~-5 ~+5 ~+5 ~+5 true disk false` );
				entity.triggerEvent( "despawn_backpack" );
			};
		};
		
		player.lastBackpackId = backpackId;
		
		const velocity = (new Vector( player.getVelocity().x, player.getVelocity().y, player.getVelocity().z )).length().toFixed(1);
		const onGround = (
			(
				player.location.y <= 320
				&& player.location.y > -64
			)
			? player.dimension.getBlock({ x: player.location.x, y: player.location.y - 0.1, z: player.location.z })?.typeId != "minecraft:air"
			: false
		);
		const isRiding = ( player ) => {
			return (
			   player.dimension.getEntities({ location: player.location, maxDistance: 5 }).find((entity) => entity.getComponent( "minecraft:rideable" )?.getRiders().find((e) => (e instanceof Player) && e.name == player.name)) ? true : false
			);
		};
		
		world.afterEvents.itemUse.subscribe(
			({ source: player, itemStack }) => {
				if (itemStack.typeId == "minecraft:stick") isRiding( player );
			},
		);
		

		
		if (
		  velocity > 0
		  || !onGround || !isRiding( player )
		) {
			if ( entity ) {
				entity.runCommand( `structure save "${backpackId}" ~-5 ~8 ~-5 ~+5 ~+5 ~+5 true disk false` );
				entity.triggerEvent( "despawn_backpack" );
			};
		  
			return;
		};
		
		const { x, y, z } = player.location;
		const [ newEntity ] = player.dimension.getEntities({ tags: [ "backpack:" + backpackId ] });
		if ( !newEntity ) {
			player.runCommand( `structure load "${backpackId}" ~ ~ ~` );
			if (player.dimension.getEntities({ tags: [ "backpack:" + backpackId ] }).length < 1) {
				const e = player.dimension.spawnEntity(
					(
						size == 0
						? "better_on_bedrock:backpack"
						: (
							size == 1
							? "better_on_bedrock:backpack_medium"
							: "better_on_bedrock:backpack_large"
						)
					),
					{ x, y, z },
				);
				e.addTag( "backpack:" + backpackId );
				e.nameTag = (
					size == 0
					? "Backpack"
					: (
						size == 1
						? "Medium Backpack"
						: "Large Backpack"
					)
				);
			};
		} else {
			newEntity?.teleport(
				{
					x,
					y: y + 0.5,
					z,
				},
				player.dimension,
			);
		};
	} catch {};
};

console.warn( "Script loaded." );
system.runInterval(
	() => world.getAllPlayers().filter(
		( player ) => {
			const equipment = player.getComponent( "equipment_inventory" );
			const handItem = equipment.getEquipment( EquipmentSlot.mainhand );
				
			if (
				(
					handItem?.typeId == "better_on_bedrock:backpack"
					|| handItem?.typeId == "better_on_bedrock:backpack_medium"
					|| handItem?.typeId == "better_on_bedrock:backpack_large"
				)
				&& handItem.getLore().length > 0
			) backpack( player, JSON.parse(handItem.getLore()[0]).id, JSON.parse(handItem.getLore()[0])?.size );
			else if (
				handItem?.typeId == "better_on_bedrock:backpack"
				|| handItem?.typeId == "better_on_bedrock:backpack_medium"
				|| handItem?.typeId == "better_on_bedrock:backpack_large"
			) {
				handItem.setLore(
					[
						JSON.stringify(
							{
								id: generateSnowflake(),
								size: (
									handItem?.typeId == "better_on_bedrock:backpack"
									? 0
									: (
										handItem?.typeId == "better_on_bedrock:backpack_medium"
										? 1
										: 2
									)
								),
							},
						),
					],
				);
				
				equipment.setEquipment( EquipmentSlot.mainhand, handItem );
			} else if ( player.lastBackpackId ) {
				const [ entity ] = player.dimension.getEntities({ tags: [ "backpack:" + player.lastBackpackId ] });
				if ( entity ) {
					const inventory = player.getComponent( "minecraft:inventory" ).container;
					const entityInventory = entity.getComponent( "minecraft:inventory" ).container;
					for (let i = 0; i < entityInventory.size; i++) {
						const item = entityInventory.getItem( i );
						if (
							item?.typeId == "better_on_bedrock:backpack"
							|| item?.typeId == "better_on_bedrock:backpack_medium"
							|| item?.typeId == "better_on_bedrock:backpack_large"
						) {
							entityInventory.setItem( i );
							if (inventory.emptySlotsCount == 0) {
								player.dimension.spawnItem( item, player.location );
							} else {
								inventory.addItem( item );
							};
						};
					};
					
					entity.runCommand( `structure save "${player.lastBackpackId}" ~-5 ~6 ~-5 ~+5 ~+5 ~+5 true disk false` );
					entity.triggerEvent( "despawn_backpack" );
				};
				
				player.lastBackpackId = null;
			};
		},
	),
);

const generateSnowflake = () => ((Date.now() - 1420070400000) * Math.pow(2, 22)).toString();