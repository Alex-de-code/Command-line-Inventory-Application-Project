import fs from 'fs';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

chalkAnimation.glitch(('Opening a rift'));

setTimeout(() => {
    // Stop the 'Lorem ipsum' animation, then write on a new line.
    chalkAnimation.karaoke(`Teleporting...`);
}, 5000);

setTimeout(() => {
    console.log(chalk.greenBright(`Welcome to this demo for my inventory management system for "Cyber". Here you will be able to access a 'Merchant Shop', check 'Player Inventory', pick a 'class' and buy, sell, equip, and unequip items to change stats. Money is limited in the beta, so choose your buffs wisely. ${chalk.yellowBright("The rift is dangerous, try not to")} ${chalk.redBright("die...")}`));
}, 12000);