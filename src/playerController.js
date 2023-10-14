import nanoid from 'nanoid'

import lodash from 'lodash'

import merchantInventory from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/data/merchantInventory.JSON' assert { type: 'json' };

const log = console.log;
//need to update this so it subtracts from player credits
function equip(inventory, itemName) {
    const gameItem = {
        name: itemName,
        id: nanoid(5),
        credits: _get(merchantInventory[itemName.credits])
    }
    inventory.push(gameItem);
    return inventory; 
}