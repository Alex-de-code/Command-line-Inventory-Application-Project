# Cyberia-Inventory-Management-Application

![Cyberia](https://github.com/Alex-de-code/Command-line-Inventory-Application-Project/assets/140418415/520dec91-5acc-4118-a116-b29940e8e691) 
![Cool gif]<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/YtCAXWS94FZbWiKmKH" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/code-ascii-petscii-YtCAXWS94FZbWiKmKH">via GIPHY</a></p> 


Welcome to Cyberia, a dystopian world where cybernetic horrors and Lovecraftian terrors have fused to reshape reality. In this terminal-based game, your cyber-enhanced existence is your only hope in navigating a city teeming with malevolent AI entities, where every choice is a matter of life and death. Can you unravel the dark mysteries, confront unspeakable horrors, and survive the relentless fusion of cyberpunk chaos and eldritch dread that defines Cyberia? Your fate is in your hands as you venture into this unforgiving digital realm. 

The primary function of this application is interactable inventory management for the sake of developing a CRUD application. Features will be listed below.

## Features

### Start
- Users can access a description of in-game commands along with header.

>Use `npm run start` to show a full breakdown of application demands.
``` 
npm run start 
```


### Equip 
- A user can equip an item from the merchant inventory and add it to the player inventory. 
- Each equipped item is assigned a unique ID, ensuring accurate identification and management.
- Item names are case sensitive, and space sensitive. 

>Use `npm run equip <item-name>` to add a new item to the player inventory
```
npm run equip "Nanite Infusion Serum"
npm run equip "Tesla Gauntlets"
npm run equip "Neural Amplifier" 
```
>***Note:*** To access the full list of all merchant inventory items click on the `<data>` folder and select `<merchantInventory.json>`.


### Inventory 
- A user can see a list of all items added to the player inventory, displaying the following information:
  - ID
  - Name
  - Credits  

>Use `npm run inventory` to show a list of all items added to the player inventory.
```
npm run inventory
```


### Study
- A user can see the details of a specific item by its unique id. 
>Use `npm run show <item-id>` to show details of an added inventory item.
```
npm run study lK8c
npm run study z4T2
```
>***Note:*** `npm run inventory` will show a list of all items in the cart along with their unique ids.


### Unequip 
- Users can unequip a specific item in the player inventory by by providing its unique ID.
>Use `npm run unequip <item-id>` to remove a specific item from the player inventory.

>Use `npm run unequip` to show a list of all available cookies to choose from.
``` 
npm run unequip yFr7
```
This will remove the item with the matching item id from the player inventory. 
>***Note:*** `npm run inventory` will show a list of all items in the player inventory along with their unique ids.


### Swap
- Users can swap a current inventory item for a new item by using the exact current item id and the exact name of the new item.
- Item swaps can only occur if item is both inStock and within the player's credit range. 
>Use `npm run swap <item-id> <item-name>` to add a new item to the player inventory
``` 
npm run swap lK8c "Temporal Disruptor" 
```
This will update the cart item to have the details of "Temporal Disruptor", while keeping the id the same.
```
npm run swap g2S0 "Holographic Cloak"
```
This will update the cart item to have the details of "Holographic Cloak", while keeping the id the same.
``


### Wipe
- If a user wants to reset the player inventory they can wipe it clean.
- Wiping the inventory returns player credits equal in value to those taken from the originally equipped items. 
>Use `npm run inventory` to check if player inventory has been fully reset.
``` 
npm run wipe
```

### Wallet 
- A user can check the amount of credits they have by using the wallet command. 
>Use `npm run wallet` to see total player credits.  
```
npm run wallet
```
This will return the total amount of player credits. If items are equipped total their credit cost
will be subtracted from total credits. 


### Classes
- Users have the option to access the list of character classes.
>Use `npm run classes` to see the full list of class types and info.
```
npm run classes 
```


### Become
- Users can select a class-type by running the become command followed the name of the class.
- Class names are case sensitive, and space sensitive. 
>Use `npm run become <class-name>` to select a character class.
```
npm run become "Neon Sleuth" 
```
This will return the full class information of the selected class. 


### Lore
- Users can read more on the lore of Cyberia by running the lore command.
>Use `npm run lore` to get a full description of the world the inventory management application is designed for. 
```
npm run lore
```

### Data File Integrity
- The application includes logic to handle data file integrity. It ensures that actions like creating or deleting items won't corrupt the data file, even if the JSON data is malformed.


## Getting Started

To get started with the Inventory Management Application, you need to set up your development environment, install the necessary dependencies, and configure your data storage.

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Configure your data storage settings for proper data management.
4. Start the application using `npm start`.

Please ensure you have a clear understanding of the technologies used and the project structure to effectively manage your cookie shop.

## Contributing

Contributions to Cyberia are always welcome. If you have ideas for improvements or want to report issues, please open a GitHub issue and submit a pull request.


Enjoy the demo!
