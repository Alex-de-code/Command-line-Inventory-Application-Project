import { nanoid } from 'nanoid';
import _ from 'lodash'; 
import chalk from 'chalk';
// import merchantInventory from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/data/merchantInventory.json' assert { type: 'json'}
import { readJSONFile } from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/src/helpers.js'
const playerInventory = readJSONFile('./data', 'playerInventory.JSON'); 
const merchantInventory = readJSONFile('./data', 'merchantInventory.JSON'); 
const log = console.log;
//need to update this so it subtracts from player credits

function inventory(items) {
  return items.map((item) => item.id + ' ' + item.name).join('\n');
} 

function equip(items, itemName) { 
  const foundItem = merchantInventory.find(item => item.name === itemName);
  if (foundItem) {
    const item = {
      name: itemName, 
      id: nanoid(5),
      credits: foundItem.credits
    };
    items.push(item);
    return items; 
  } 
}

function study(items, itemId) {
    const item = items.find((item) => item.id === itemId);
    const matchingItem = merchantInventory.find(object => object.name === item.name);
    const statNames = Object.keys(matchingItem.stats);
    const statNums = Object.values(matchingItem.stats);
    const fullStats = statNames.map((i, j) => " " + i + " = " + chalk.blue(statNums[j])); 

    if (matchingItem) {
      return `Name: ${item.name} \nItem ID: ${item.id} \nCredits: ${item.credits} \nDescription: ${matchingItem.description} \nStats: ${fullStats}`
    } 
}

function unequip(playerInventory, itemId) {
  const index = playerInventory.findIndex((item) => item.id === itemId);
    if (index > -1) {
      playerInventory.splice(index, 1);
      log(chalk.green('Item successfully removed from cyber deck.'));
      return playerInventory;
    } else {
        log(chalk.red('Item not found. No action taken.'));
        return playerInventory;
    }
}

function swap(playerInventory, itemId, updatedInventoryItem) {
  const itemToSwap = playerInventory.findIndex((item) => item.id === itemId);
  const matchingItem = merchantInventory.find(object => object.name === updatedInventoryItem);
  if (itemToSwap > -1 && matchingItem) {
    playerInventory[itemToSwap].id = itemId;
    playerInventory[itemToSwap].name = updatedInventoryItem;
    playerInventory[itemToSwap].credits = matchingItem.credits;
    log(chalk.green('Item swap successfull.'));
    return playerInventory;
    } else if (itemToSwap === -1) {
      log(chalk.red('Item not found in your inventory. Check item id and enter a correct one. Swap failed.'));
      return playerInventory;
    } else {
      log(chalk.red(`Item not found in the merchant's inventory. Check new item name and enter a correct one. Swap failed.`));
      return playerInventory;   
    }
}

 
  
export { merchantInventory, inventory, equip, study, unequip, swap }
