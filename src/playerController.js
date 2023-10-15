import { nanoid } from 'nanoid';
import _ from 'lodash'; 
import chalk from 'chalk';
// import merchantInventory from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/data/merchantInventory.json' assert { type: 'json'}
import { readJSONFile } from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/src/helpers.js'
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
}; 
  
export { merchantInventory, inventory, equip, study }
