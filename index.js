import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
//because of the use of ECMAScript Modules (ES modules) and how Node.js handles the import of JSON files, have to use assertion to specify the "type" for the imported module
import classStats from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/data/classStats.json' assert { type: 'json' };
import { readJSONFile } from './src/helpers';

const playerInventory = readJSONFile('./data', 'playerInventory.JSON'); 
const log = console.log;


chalkAnimation.glitch((`Who said we're disconnected?`));

setTimeout(() => {
    chalkAnimation.karaoke(`Connecting...`);
}, 5000);

setTimeout(() => {
    console.log(chalk.greenBright(`Welcome to this demo for my inventory management system for "Cyber". Here you will be able to access a 'Merchant Shop', check 'Player Inventory', pick a 'class' and buy, sell, equip, and unequip items to change stats. Money is limited in the beta, so choose your buffs wisely. ${chalk.yellowBright("The rift is dangerous,")} ${chalk.redBright("try not to die...")}`));
}, 12000);

// function run() {
//     const action = process.argv[2];
//     const animal = process.argv[3];
  
//     let writeToFile = false;
//     let updatedPlayerInventory = [];
  
//     switch (action) {
//       case "index":
//         const animalsView = index(animals);
//         inform(animalsView);
//         break;
//     default:
//       inform('There was an error.');
//     }
// }

// run()

log(classStats);