import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
//because of the use of ECMAScript Modules (ES modules) and how Node.js handles the import of JSON files, have to use assertion to specify the "type" for the imported module
//import classStats from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/data/classStats.json' assert { type: 'json' };
import { readJSONFile, writeJSONFile } from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/src/helpers.js'
import { merchantInventory, inventory, equip, study, unequip, swap, wipe } from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/src/playerController.js'

const ClassStats = readJSONFile('./data', 'ClassStats.JSON');
const playerInventory = readJSONFile('./data', 'playerInventory.JSON'); 
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
    let writeToFile = false;
    let updatedPlayerInventory = [];
    const foundItem = merchantInventory.find(item => item.name === process.argv[3]);
    const foundId = playerInventory.find(item => item.id === process.argv[3]);

    switch (action) {
        case "inventory":
            const itemsView = inventory(playerInventory);
            log(itemsView);
            break;
        case "equip":
            if(foundItem && foundItem.inStock === true) {
                updatedPlayerInventory = equip(playerInventory, item);
                writeToFile = true;
                log(chalk.green(`Successfully equipped ${foundItem.name}.`))
            } else if (foundItem.inStock === false) {
                log(chalk.red("Item is not in stock. Must return to this merchant at a later date."))
            } else {
                log(chalk.red("Item not found. This merchant doesn't sell what you're trying to buy."))
            } 
            break;
        case "study":
            if(foundId) {
                const itemView = study(playerInventory, item);
                log(itemView);
            } else {
                log(chalk.red("You must enter a proper item id to access full specs. Please re-enter id."))
            }
            break; 
        case "unequip":
            updatedPlayerInventory = unequip(playerInventory, item);
            writeToFile = true;
            break;
        case "swap":
            updatedPlayerInventory = swap(playerInventory, item, process.argv[4]);
            writeToFile = true;
            break;
        case "wipe":
            updatedPlayerInventory = wipe(playerInventory);
            writeToFile = true;
            log(chalk.yellow("Cyber deck has been fully wiped. Proceed with caution."))
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