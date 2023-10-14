import { nanoid } from 'nanoid';
import lodash from 'lodash'
// import merchantInventory from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/data/merchantInventory.json' assert { type: 'json'}
import { readJSONFile } from '/Users/alex/Documents/10.3-days/module-two/projects/Command-line-Inventory-Application-Project/src/helpers.js'

const merchantInventory = readJSONFile('./data', 'merchantInventory.JSON');

const log = console.log;
//need to update this so it subtracts from player credits

function inventory(items) {
    return items.map((item) => item.id + ' ' + item.name).join('\n');
  }

export { inventory }