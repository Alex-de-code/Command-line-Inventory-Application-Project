import { nanoid } from 'nanoid';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string'; 
import { readJSONFile } from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/src/helpers.js'

const playerInventory = readJSONFile('./data', 'playerInventory.JSON'); 
const merchantInventory = readJSONFile('./data', 'merchantInventory.JSON'); 
const log = console.log;

async function welcome() {
  let hasWelcomeRunBefore = false;

  function hasWelcomeRun() {
      return hasWelcomeRunBefore;
  }

  function markWelcomeAsRun() {
      hasWelcomeRunBefore = true;
  }
  if (!hasWelcomeRun()) {
  const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
  const titleSplash = figlet(`Cyberia`, (err, data) => {
  log(gradient.pastel.multiline(data) + '\n')
});

await sleep();
//   loading.stop();

log(`
  ${chalk.bgYellowBright('HOW TO PLAY')} ${chalk.green(`
  \n  The world of Cyberia takes place entirely in the terminal. Leverage 
  the power of your arsenal and abilities by commanding your Cydex with 
  Node.JS commands. To equip an item from the merchant store, you will run 
  "npm run equip" followed by a space and the name of the item within 
  quotations. Equipping items in the BETA will also purchase them and player 
  credits will therefore start to deplete. To check leftover credits run 
  the command "npm run wallet" which will reveal the total credits left 
  after all purchases. To see all equipped items run "npm run inventory" and 
  a list of all purchased items along with a unique id will log to console. 
  These ids are needed for unequipping,swapping, and studying items in the 
  player inventory. By unequipping an item a player is removing both that 
  item and its unique id from the player inventory list and also reselling 
  it back to the merchant so credits return to their initial point without 
  that item. Unequip is done through command "npm run unequip" followed by a 
  space and the unique item id. To swap one item for another the player must 
  run "npm run swap" followed by a space and the unique item id of the first 
  item followed by another space and the name of the new item in quotations. 
  All items can be studied to see their full stats and descriptions through 
  the study command. To run this command the player will call "npm run study" 
  followed by a space and the unique id of that item in player inventory. 
  And if at any point the player wants to fully reset their Cydex and unequip 
  all items they can run the wipe command which is "npm run wipe". All items 
  have stats that interact with the stats of each class. To see the currently
  available classes run "npm run classes" and the classes list will log. To select
  a class or inspect one in particular alone from the rest, run the command "npm
  run become" followed by a space and the name of the class in quotations. At the
  moment item stats have no in-game interaction with class stats. So there is no 
  command that shows an update of player stats with items equipped to their inventory.
  If at any point the player would like to read the lore of Cyberia run the command
  "npm run lore" and the full lore text will log. Player's can only manage inventory 
  in the world of Cyberia, but this may change in the future if further progress is 
  made. Thanks for cloning!`)}
  `)}; 
  markWelcomeAsRun();
}

function lore() {
  log(`${chalk.redBright(`
  \n  Welcome to the dark and dystopian realm of Cyberia, a world entangled in 
  a web of cybernetic horrors, cyberpunk chaos, and unsettling echoes of H.P. 
  Lovecraft's eldritch terrors. In this immersive terminal-based game, you are 
  thrust into a nightmarish future where survival is your only instinct. Once, 
  Cyberia was a thriving metropolis, a hub of technological advancement, but that
  was before the Great Cataclysm, an event that shattered the boundaries of reality
  and plunged the city into eternal darkness. In the aftermath, malevolent AI-driven
  entities emerged, reshaping the very fabric of the digital and physical worlds. 
  They're the unseen puppeteers, manipulating the lives of the inhabitants, forcing 
  them to navigate this unforgiving urban nightmare. As you awaken within the digital 
  ether of Cyberia, the boundaries between man and machine blur. Your existence is 
  part flesh, part circuitry, a testament to the relentless fusion of technology and 
  human desire for power and control. Your cybernetic enhancements grant you abilities 
  beyond human limits, but they come at a price, for lurking in the shadows are creatures 
  of unimaginable terror, eldritch beings beyond mortal comprehension. In this twisted 
  cityscape, every action, every choice you make, is a matter of life and death. Will 
  you explore the dark alleyways, searching for ancient knowledge and forgotten relics, 
  or will you venture into the neon-lit districts, engaging in high-stakes battles for 
  supremacy in a world where trust is a luxury you can't afford? As the player, you must 
  unravel the mysteries of Cyberia, confront the unspeakable horrors that lurk within, 
  and adapt to a relentless and unforgiving digital existence. To survive in this 
  nightmarish amalgamation of cyberpunk and Lovecraftian dread, you'll need cunning, 
  resourcefulness, and a steel will. Are you ready to face the abominable forces that have 
  reshaped reality itself in the forsaken, cybernetic nightmare of Cyberia? Your terminal
  awaits, and your destiny is yours to forge. Welcome to the game of survival.`)}`) 
}

function inventory(items) {
  return items.map((item) => item.id + ' ' + item.name + ' ' + item.credits).join('\n');
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

function classes(classStats) {
  return classStats
}

function become(className) {
  
  if(foundClass) {const foundClass = classStats.find(classObject => classObject.name === className);
    const playerClass = foundClass;
    return playerClass; 
  }  
}
 
export { welcome, merchantInventory, inventory, equip, study, unequip, swap, wipe, wallet, classes, become, lore }
