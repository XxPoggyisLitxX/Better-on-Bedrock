function getItemAmountFromPlayerInventory(item, player) {
  var result = 0;
  const inventory = player.getComponent(EntityInventoryComponent.componentId);
  for (let slot = 0; slot < inventory.container.size; slot++) {
      const itemStack = inventory.container.getItem(slot);
      if (itemStack?.typeId === item.id)
          result += itemStack.amount;
  }
  ;
  return result;
}
;