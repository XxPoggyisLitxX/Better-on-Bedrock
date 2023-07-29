scoreboard objectives add gen dummy gen
scoreboard players set @s gen 0
execute at @s run execute if block ~ ~ ~-6 stonebrick [] run scoreboard players set @s gen 1
execute at @s run execute if block ~ ~ ~-6 stonebrick [] run scoreboard players set @s gen 1
execute at @s run execute if block ~ ~ ~-6 stonebrick [] run scoreboard players set @s gen 1
execute at @s run execute if block ~ ~ ~-6 deepslate_bricks [] run scoreboard players set @s gen 1
execute at @s run execute if block ~ ~ ~-6 deepslate_tiles [] run scoreboard players set @s gen 1
execute at @s run execute if block ~ ~ ~-6 log [] run scoreboard players set @s gen 1
execute at @s[scores={gen=0}] run function n_generate_halls
execute at @s[scores={gen=1}] run scoreboard players set @s gen 2
execute at @s[scores={gen=2}] run execute if block ~ ~ ~-1 stonebrick [] run scoreboard players set @s gen 3
execute at @s[scores={gen=2}] run execute if block ~ ~ ~-1 deepslate_bricks [] run scoreboard players set @s gen 3
execute at @s[scores={gen=2}] run execute if block ~ ~ ~-1 log [] run scoreboard players set @s gen 3
execute at @s[scores={gen=2}] run execute if block ~ ~ ~-1 deepslate_tiles [] run scoreboard players set @s gen 3
execute at @s[scores={gen=2}] run execute at @s[scores={roomCount=1..}] run scoreboard players add "maxRoomCount" roomCount 1
execute at @s[scores={gen=2}] run structure load n_end ~-5 ~ ~0
execute at @s[scores={gen=3}] run execute at @s[scores={roomCount=1..}] run scoreboard players add "maxRoomCount" roomCount 1
execute at @s[scores={gen=3}] run structure load ns_connect ~-5 ~ ~-2