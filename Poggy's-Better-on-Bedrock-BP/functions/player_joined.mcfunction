
execute if entity @p[scores={pig_bounty=3}] run tag @p add completed_2
execute if entity @p[scores={pig_bounty=3}] run title @p actionbar pig_bounty_complete
execute if entity @p[scores={pig_bounty=3}] run playsound goal_yes @p
execute if entity @p[scores={pig_bounty=3}] run tag @p add unlocked_3
execute if entity @p[scores={pig_bounty=3}] run scoreboard objectives remove pig_bounty

 
