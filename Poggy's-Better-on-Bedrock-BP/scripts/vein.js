function bob(i) {
  let form = new ActionFormData()
    form.title("§fBetter on Bedrock")
    form.body("Complete Better on Bedrock Quests to unlock more. Completing a quest will unlock another one.")
    ///one button
      form.button("§fA whole new world\n[§eUnlocked§f]", "textures/items/emerald") else if (i.getDynamicProperty('busy4') == true) {
      form.button("A whole new world [§dBusy§f]", "textures/items/emerald")
    } else if (i.getDynamicProperty("wholeNewComplete") == true) {
      form.button("A whole new world [§aCompleted§f]", "textures/items/emerald")
    }

    if (i.hasTag("unlocked_5")) {
      form.button("§fTeleport Stone?\n[§eUnlocked§f]", "textures/ui/3d_blocks_for_bounty_ui/waystone")
    } else if (i.getDynamicProperty('busy5') == true) {
      form.button("Teleport Stone? [§dBusy§f]", "textures/ui/3d_blocks_for_bounty_ui/waystone")
    } else if (i.getDynamicProperty("tpStoneCompleted") == true) {
      form.button("Teleport Stone? [§aCompleted§f]", "textures/ui/3d_blocks_for_bounty_ui/waystone")
    } else if (i.getDynamicProperty("locked5") == true) {
      form.button("Teleport Stone? [§cLocked§f]", "textures/ui/3d_blocks_for_bounty_ui/waystone")
    }

    if (i.hasTag("unlocked_6")) {
      form.button("§fTeleport To Stone?\n[§eUnlocked§f]", "textures/items/waystone/waypoint_marker")
    } else if (i.getDynamicProperty('busy6') == true) {
      form.button("Teleport To Stone? [§dBusy§f]", "textures/items/waystone/waypoint_marker")
    } else if (i.getDynamicProperty("tpToBountyComplete") == true) {
      form.button("Teleport To Stone? [§aCompleted§f]", "textures/items/waystone/waypoint_marker")
    } else if (i.getDynamicProperty("locked6") == true) {
      form.button("Teleport To Stone? [§cLocked§f]", "textures/items/waystone/waypoint_marker")
    }

    if (i.hasTag("unlocked_7")) {
      form.button("§fMore space\n[§eUnlocked§f]", "textures/items/backpack")
    } else if (i.getDynamicProperty('busy7') == true) {
      form.button("More space [§dBusy§f]", "textures/items/backpack")
    } else if (i.getDynamicProperty("spaceComplete") == true) {
      form.button("More space [§aCompleted§f]", "textures/items/backpack")
    } else if (i.getDynamicProperty("locked7") == true) {
      form.button("More space [§cLocked§f]", "textures/items/backpack")
    }

    if (i.hasTag("unlocked_8")) {
      form.button("§fForging Time\n[§eUnlocked§f]", "textures/ui/3d_blocks_for_bounty_ui/foge_table")
    } else if (i.getDynamicProperty('busy8') == true) {
      form.button("Forging Time [§dBusy§f]", "textures/ui/3d_blocks_for_bounty_ui/foge_table")
    } else if (i.getDynamicProperty("forgeCompleted") == true) {
      form.button("Forging Time [§aCompleted§f]", "textures/ui/3d_blocks_for_bounty_ui/foge_table")
    } else if (i.getDynamicProperty("locked8") == true) {
      form.button("Forging Time [§cLocked§f]", "textures/ui/3d_blocks_for_bounty_ui/foge_table")
    }

    if (i.hasTag("unlocked_9")) {
      form.button("§fMiners dream\n[§eUnlocked§f]", "textures/ui/3d_blocks_for_bounty_ui/enchant_table")
    } else if (i.getDynamicProperty('busy9') == true) {
      form.button("Miners dream [§dBusy§f]", "textures/ui/3d_blocks_for_bounty_ui/enchant_table")
    } else if (i.getDynamicProperty("mineBountyComplete") == true) {
      form.button("Miners dream [§aCompleted§f]", "textures/ui/3d_blocks_for_bounty_ui/enchant_table")
    } else if (i.getDynamicProperty("locked9") == true) {
      form.button("Miners dream [§cLocked§f]", "textures/ui/3d_blocks_for_bounty_ui/enchant_table")
    }

    if (i.hasTag("unlocked_10")) {
      form.button("§fOxedised\n[§eUnlocked§f]", "textures/items/copper_update/copper_chestplate")
    } else if (i.getDynamicProperty('busy10') == true) {
      form.button("Oxedised [§dBusy§f]", "textures/items/copper_update/copper_chestplate")
    } else if (i.getDynamicProperty("copperComplete") == true) {
      form.button("Oxedised [§aCompleted§f]", "textures/items/copper_update/copper_chestplate")
    } else if (i.getDynamicProperty("locked10") == true) {
      form.button("Oxedised [§cLocked§f]", "textures/items/copper_update/copper_chestplate")
    }

    if (i.hasTag("unlocked_11")) {
      form.button("§fYumm!\n[§eUnlocked§f]", "textures/items/biome_update/grape")
    } else if (i.getDynamicProperty('busy11') == true) {
      form.button("Yumm [§dBusy§f]", "textures/items/biome_update/grape")
    } else if (i.getDynamicProperty("yummCompleted") == true) {
      form.button("Yumm [§aCompleted§f]", "textures/items/biome_update/grape")
    } else if (i.getDynamicProperty("locked11") == true) {
      form.button("Yumm [§cLocked§f]", "textures/items/biome_update/grape")
    }

    ///one button
    //button interactions
    form.show(i).then((response) => {
      let returnProperty = i.getDynamicProperty("wholeNewComplete")
      if (response.selection === 0 && i.hasTag("unlocked_4")) {
        bobStart(i)
      } else if (response.selection === 0 && i.getDynamicProperty('locked4') == true && !i.getDynamicProperty("wholeNewComplete") == true) {
        world.getDimension('overworld').runCommandAsync('tellraw @a {\"rawtext\": [{\"text\":\"§cThis bounty is Locked. Complete an existing or busy bounty to unlock this one.\"}]}')
      } else if (response.selection === 0 && i.getDynamicProperty('busy4') == true) {
        bobStartInfo(i)
      } else if (response.selection === 0 && i.getDynamicProperty("wholeNewComplete") == true && i.getDynamicProperty('locked4') == true && i.getDynamicProperty("claimed4") == false) {
        bobStartComplete(i)
        world.getDimension('overworld').runCommandAsync('tellraw @a {\"rawtext\": [{\"text\":\"§aYou completed this bounty.\"}]}')
      }

      if (response.selection === 1 && i.hasTag("unlocked_5")) {
        bobTp(i)
      } else if (response.selection === 1 && i.getDynamicProperty('locked5') == true && !i.getDynamicProperty("tpStoneCompleted") == true) {
        world.getDimension('overworld').runCommandAsync('tellraw @a {\"rawtext\": [{\"text\":\"§cThis bounty is Locked. Complete an existing or busy bounty to unlock this one.\"}]}')
      } else if (response.selection === 1 && i.getDynamicProperty('busy5') == true) {
        bobTpInfo(i)
      } else if (response.selection === 1 && i.getDynamicProperty("tpStoneCompleted") == true && i.getDynamicProperty('locked5') == true && i.getDynamicProperty('claimed5') == false) {
        bobTpComplete(i)
        world.getDimension('overworld').runCommandAsync('tellraw @a {\"rawtext\": [{\"text\":\"§aYou completed this bounty.\"}]}')
      }

      if (response.selection === 2 && i.hasTag("unlocked_6")) {
        bobTpTo(i)
      } else if (response.selection === 2 && i.getDynamicProperty('locked6') == true && !i.getDynamicProperty("tpToBountyComplete") == true) {
        world.getDimension('overworld').runCommandAsync('tellraw @a {\"rawtext\": [{\"text\":\"§cThis bounty is Locked. Complete an existing or busy bounty to unlock this one.\"}]}')
      } else if (response.selection === 2 && i.getDynamicProperty('busy6') == true) {
        bobTpToInfo(i)
      } else if (response.selection === 2 && i.getDynamicProperty("tpToBountyComplete") == true && i.getDynamicProperty('locked6') == true && i.getDynamicProperty('claimed6') == false) {
        bobTpToComplete(i)
        world.getDimension('overworld').runCommandAsync('tellraw @a {\"rawtext\": [{\"text\":\"§aYou completed this bounty.\"}]}')
      }

      if (response.selection === 3 && i.hasTag("unlocked_7")) {
        bobSpace(i)
      } else if (response.selection === 3 && i.getDynamicProperty('locked7') == true && !i.getDynamicProperty("spaceComplete") == true) {
        world.getDimension('overworld').runCommandAsync('tellraw @a {\"rawtext\": [{\"text\":\"§cThis bounty is Locked. Complete an existing or busy bounty to unlock this one.\"}]}')
      } else if (response.selection === 3 && i.getDynamicProperty('busy7') == true) {
        bobSpaceInfo(i)
      } else if (response.selection === 3 && i.getDynamicProperty("spaceComplete") == true && i.getDynamicProperty('locked7') == true && i.getDynamicProperty('claimed7') == false) {
        bobSpaceComplete(i)
        world.getDimension('overworld').runCommandAsync('tellraw @a {\"rawtext\": [{\"text\":\"§aYou completed this bounty.\"}]}')
      }

      if (response.selection === 4 && i.hasTag("unlocked_8")) {
        bobforge(i)
      } else if (response.selection === 4 && i.getDynamicProperty('locked8') == true && !i.getDynamicProperty("forgeCompleted") == true) {
        world.getDimension('overworld').runCommandAsync('tellraw @a {\"rawtext\": [{\"text\":\"§cThis bounty is Locked. Complete an existing or busy bounty to unlock this one.\"}]}')
      } else if (response.selection === 4 && i.getDynamicProperty('busy8') == true) {
        bobforgeInfo(i)
      } else if (response.selection === 4 && i.getDynamicProperty("forgeCompleted") == true && i.getDynamicProperty('locked8') == true && i.getDynamicProperty('claimed8') == false) {
        bobforgeComplete(i)
        world.getDimension('overworld').runCommandAsync('tellraw @a {\"rawtext\": [{\"text\":\"§aYou completed this bounty.\"}]}')
      }

      if (response.selection === 5 && i.hasTag("unlocked_9")) {
        bobvein(i)
      } else if (response.selection === 5 && i.getDynamicProperty('locked9') == true && !i.getDynamicProperty("mineBountyComplete") == true) {
        world.getDimension('overworld').runCommandAsync('tellraw @a {\"rawtext\": [{\"text\":\"§cThis bounty is Locked. Complete an existing or busy bounty to unlock this one.\"}]}')
      } else if (response.selection === 5 && i.getDynamicProperty('busy9') == true) {
        bobveinInfo(i)
      } else if (response.selection === 5 && i.getDynamicProperty("mineBountyComplete") == true && i.getDynamicProperty('locked9') == true && i.getDynamicProperty('claimed9') == false) {
        bobveinComplete(i)
        world.getDimension('overworld').runCommandAsync('tellraw @a {\"rawtext\": [{\"text\":\"§aYou completed this bounty.\"}]}')
      }
    })
}