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
  if (foundItem && foundItem.inStock === true) {
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
      return `\nName: ${item.name} \nItem ID: ${item.id} \nCredits: ${item.credits} \nDescription: ${matchingItem.description} \nStats: ${fullStats}\n`
    } 
}

function unequip(playerInventory, itemId) {
  const index = playerInventory.findIndex((item) => item.id === itemId);
    if (index > -1) {
      log(chalk.green(`\n${playerInventory[index].name} successfully removed from Cydex.\n`));
      playerInventory.splice(index, 1);
      return playerInventory;
    } else {
        log(chalk.red(`\nItem not found. No action taken.\n`));
        return playerInventory;
    }
}

function swap(playerInventory, itemId, updatedInventoryItem) {
  const itemToSwap = playerInventory.findIndex((item) => item.id === itemId);
  const matchingItem = merchantInventory.find(object => object.name === updatedInventoryItem);
  if (itemToSwap > -1 && matchingItem && matchingItem.inStock === true) {
    playerInventory[itemToSwap].id = itemId;
    playerInventory[itemToSwap].name = updatedInventoryItem;
    playerInventory[itemToSwap].credits = matchingItem.credits;
    log(chalk.green(`\nItem swap successfull.\n`));
    return playerInventory;
    } else if (itemToSwap === -1) {
      log(chalk.red(`\nItem not found in your Cydex. Check item id and enter a correct one.\n`));
      return playerInventory;
    } else {
      log(chalk.red(`\nItem not found in the merchant's inventory. Check new item name and whether or not item is in stock.\n`));
      return playerInventory;   
    }
}

function wipe(playerInventory) {
  const emptiedPlayerInventory = [];
  playerInventory = emptiedPlayerInventory;
  return playerInventory;  
}

function wallet(playerInventory) {
  return playerInventory.reduce((acc, current) => acc + current.credits, 0)
}
 
export { merchantInventory, inventory, equip, study, unequip, swap, wipe, wallet }
