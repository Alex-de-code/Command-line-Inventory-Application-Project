import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
//because of the use of ECMAScript Modules (ES modules) and how Node.js handles the import of JSON files, have to use assertion to specify the "type" for the imported module
// import classStats from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/data/classStats.json' assert { type: 'json' };
import { readJSONFile, writeJSONFile } from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/src/helpers.js'
import { inventory, equip } from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/src/playerController.js'

const ClassStats = readJSONFile('./data', 'ClassStats.JSON');
const playerInventory = readJSONFile('./data', 'playerInventory.JSON'); 
const merchantInventory = readJSONFile('./data', 'merchantInventory.JSON');

const log = console.log;

// //commented out fancy terminal formatting to focus on logic
// chalkAnimation.glitch((`Who said we're disconnected?`));

// setTimeout(() => {
//     chalkAnimation.karaoke(`Connecting...`);
// }, 5000);

// setTimeout(() => {
//     console.log(chalk.greenBright(`Welcome to this demo for my inventory management system for "Cyber". Here you will be able to access a 'Merchant Shop', check 'Player Inventory', pick a 'class' and buy, sell, equip, and unequip items to change stats. Money is limited in the beta, so choose your buffs wisely. ${chalk.yellowBright("The rift is dangerous,")} ${chalk.redBright("try not to die...")}`));
// }, 12000);

function run() {
    const action = process.argv[2];
    const item = process.argv[3];
    let errorMessage = "";
    let writeToFile = false;
    let updatedPlayerInventory = [];
    const foundItem = merchantInventory.find(item => item.name === process.argv[3]);

    switch (action) {
        case "inventory":
            const itemsView = inventory(playerInventory);
            log(itemsView);
            break;
        case "equip":
            if(foundItem) {
                updatedPlayerInventory = equip(playerInventory, item);
                writeToFile = true;
            } else {
                log("Item not found. This merchant doesn't sell what you're trying to buy.")
            }
            break; 
    // add remaining player actions below this line  
        default: 
            log('There was an error. Please fix Cyber Deck.');
    }

    if (writeToFile) {
        writeJSONFile('./data', 'playerInventory.json', updatedPlayerInventory); 
    } 

};

run()

// log(classStats);