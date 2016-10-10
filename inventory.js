'use strict';

/*
	This example script shows how to work with the getInventory() API call and the splitInventory() function.
*/
const pogobuf = require('pogobuf'),
    POGOProtos = require('node-pogo-protos'),
    fs = require('fs');

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// Note: To avoid getting softbanned, change these coordinates to something close to where you last used your account
// edgewood
const lat = config.lat,
    lng = config.lng;

const login = new pogobuf.GoogleLogin(),
    client = new pogobuf.Client();

// Login to Google and get a login token
login.login(config.email, config.password)
    .then(token => {
        // Initialize the client
        client.setAuthInfo('google', token);
        client.setPosition(lat, lng);

        // Uncomment the following if you want to see request/response information on the console
        client.on('request', console.dir);
        client.on('response', console.dir);

        // Perform the initial request
        return client.init();
    })
    .then(() => {
        // Get full inventory
        return client.getInventory(0);
    })
    .then(inventory => {
        if (!inventory.success) throw Error('success=false in inventory response');

        // Split inventory into individual arrays and log them on the console
        inventory = pogobuf.Utils.splitInventory(inventory);
        // console.log('Full inventory:', inventory);

        // console.log('Items:');
        // inventory.items.forEach(item => {
            //console.log(item.count + 'x ' + pogobuf.Utils.getEnumKeyByValue(POGOProtos.Inventory.Item.ItemId, item.item_id));
        // });

        fs.writeFileSync('inventory.json', JSON.stringify(inventory));
    })
    .catch(console.error);
