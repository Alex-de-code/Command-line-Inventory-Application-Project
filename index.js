#!/usr/bin/env node 

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation'; 
import inquirer from 'inquirer'; 

//because of the use of ECMAScript Modules (ES modules) and how Node.js handles the import of JSON files, have to use assertion to specify the "type" for the imported module
//import classStats from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/data/classStats.json' assert { type: 'json' };
import { readJSONFile, writeJSONFile } from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/src/helpers.js'
import { welcome, merchantInventory, inventory, equip, study, unequip, swap, wipe, wallet, classes } from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/src/playerController.js'

const ClassStats = readJSONFile('./data', 'ClassStats.JSON');
const playerInventory = readJSONFile('./data', 'playerInventory.JSON'); 
const log = console.log; 
let playerName;

// //commented out fancy terminal formatting to focus on logic
chalkAnimation.glitch((`Who said we're disconnected?`));

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
    let playerCredits = 7000;

    switch (action) {
        case "start":
            welcome();
            break; 
        case "inventory":
            const itemsView = inventory(playerInventory);
            if (itemsView) {
            log(`\∆∆∆ CYDEX ∆∆∆\n-------------------------\n${itemsView}\n`);
            } else {
                log(chalk.red(`\nThere is nothing equipped. Look elsewhere.\n`))
            }
            break;
        case "equip":
            const itemCost = foundItem.credits;
            const canEquip = playerCredits - wallet(playerInventory) >= itemCost 

            if(foundItem && foundItem.inStock === true && canEquip) {
                updatedPlayerInventory = equip(playerInventory, item);
                writeToFile = true;
                log(chalk.green(`\nSuccessfully equipped ${foundItem.name}.\n`))
            } else if (foundItem.inStock === false) {
                log(chalk.red(`\nItem is not in stock. Must return to this merchant at a later date.\n`))
            } else if (!canEquip && foundItem) {
                log(chalk.red(`n\Not enough credits. Must go on a mission to earn more.\n`))
            } else {
                log(chalk.red(`\nItem not found. This merchant doesn't sell what you're trying to buy.\n`))
            } 
            break;
        case "study":
            if(foundId) {
                const itemView = study(playerInventory, item);
                log(itemView);
            } else {
                log(chalk.red(`\nYou must enter a proper item id to access full specs. Please re-enter id.\n`))
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
            if(playerInventory.length > 0) {
                updatedPlayerInventory = wipe(playerInventory);
                writeToFile = true;
                log(chalk.yellow(`\nCydex has been fully wiped. Proceed with caution.\n`))
            } else {
                log(chalk.red(`\nCydex is already empty. No need to wipe.\n`))
            }
            break; 
        case "wallet":
            log(chalk.blue(`\nCredits left: ${(playerCredits - wallet(playerInventory))}\n`))
            break; 
        case "classes": 
            log(classes(ClassStats)); 
            break; 
    // add remaining player actions below this line  
        // default: 
        //     log(`\nThere was an error. Please fix Cydex.\n`);
    }

    if (writeToFile) {
        writeJSONFile('./data', 'playerInventory.json', updatedPlayerInventory); 
    } 

};

// console.clear();
// await welcome();

run(); 