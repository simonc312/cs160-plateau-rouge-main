//GLOBALS
var activeTiles = [0,0,0,0];
var scanTiles = [0,0,0,0];
var stolenTiles = [0,0,0,0];
var tileOneXY = [0,0];
var tileTwoXY = [0,0];
var tileThreeXY = [0,0];
var tileFourXY = [0,0];
var tileCoords = [tileOneXY,tileTwoXY,tileThreeXY,tileFourXY];
var storageCoords = {x: {min: 0, max: 25}, y: {min: 0, max: 25} }; //any tile that lies between these coordinates are in storage

//quantity will eventually need to be separated
var tileProperties = [
	{name: "New Era Snapback", quantity: 5, price: 40, image: "assets/hat-thumbnail.jpg"},
	{name: "Sperry Navy Shorts", quantity: 15, price: 35, image: "assets/shorts-thumbnail.jpg"},
	{name: "Zara Men's White Tee", quantity: 25, price: 15, image: "assets/white-tee-thumbnail.jpg"},
	{name: "J Crew Blazer", quantity: 3, price: 75, image: "assets/blazer-thumbnail.jpg"}
	
]

var TileCollection = {
	notificationCount: 0,
	notificationItem: null,
	tileList: [],
	addNotification: function(item){
		this.notificationCount++;
		this.notificationItem = item;
	},
	subtractNotification: function(){
		this.notificationCount = Math.max(0,this.notificationCount - 1);
		this.notificationItem = {refresh: true};
	},
	resetNotification: function(){
		this.resetNotificationCount();
		this.resetNotificationItem();
	},
	resetNotificationCount: function(){
		this.notificationCount = 0;
	},
	resetNotificationItem: function(){
		this.notificationItem = null;
	}
}

var storageCollection = Object.create(TileCollection);
var soldCollection = Object.create(TileCollection);
var floorCollection = Object.create(TileCollection);

var storageTiles = [];
var soldTiles = [];
var floorTiles = [];
var newStorageCount = 0;
var newSoldCount = 0;
var newInventoryCount = 0;
var newStorageItem;
var newSoldItem;
var newInventoryItem;

var searchFilter = new RegExp("");


onFloor = function(index){
	return ( tileCoords[index][0] > storageCoords.x.max || tileCoords[index][1] > storageCoords.y.max);
}

inStorage = function(tileIndex){
	return !onFloor(tileIndex);
}

copyTileProperty = function(origTile){
	newTile = {};
	Object.keys(origTile).forEach(function(key) {
     newTile[ key ] = origTile[ key ];
}); 
	return newTile;
}
//delegates which array to place item when tag is activated and inactivated
// ex if active and on floor add to inventory
handleItem = function(index){
	var newItem = copyTileProperty(tileProperties[index]); //don't update tileProperty from array only separate copy
	if(activeTiles[index] == 1){
		if(onFloor(index))
			addInventory(newItem);
		else
			addStorage(newItem);
	}	
	else{
		transferSold(newItem,index);
	}
}

addStorage = function(newItem){
	//need to update time of all items in storageTiles when adding new storage item
	storageTiles = storageTiles.map(updateStorageTime);
	storageTiles.unshift(initializeStorageTime(newItem)); //initialize time prop of new item; 
	storageCollection.addNotification(storageTiles[0]);
	//trigger update view for history tab if that is current tab.
}

addInventory = function(newItem){
	floorTiles = floorTiles.map(updateInventoryTime);
	floorTiles.unshift(initializeInventoryTime(newItem));
	floorCollection.addNotification(floorTiles[0]);
}

addSold = function(newItem){
	//need to update time of all items in soldTiles when adding new sale
	soldTiles = soldTiles.map(updateSoldTime);
	soldTiles.unshift(initializeSoldTime(newItem));
	soldCollection.addNotification(soldTiles[0]);
}
//currently only checking for matching names - we could make unique ids for items instead
// but for this prototype there are only 4 tiles. 
transferToInventoryFilter = function(item,index){
	if(item.name != tileProperties[index].name) 
		return item;
	else{
		trace("added item to floor");
		addInventory(item)
		storageCollection.subtractNotification();
		}
}

transferToStorageFilter = function(item,index){
	if(item.name != tileProperties[index].name)
		return item;
	else{
		trace("added item to storage");
		addStorage(item)
		floorCollection.subtractNotification();
		}
}

transferToSoldFilter = function(item,index){
	if(item.name != tileProperties[index].name)
		return item;
	else{
		trace("added item to sold");
		addSold(item)		
		}
}

transferSold = function(item,index){
	var currentLocation = onFloor(index);
	if(activeTiles[index]) //we are only transferring inactive tags
		return;
	else if(currentLocation){
		floorTiles = floorTiles.filter(transferToSoldFilter);
		floorCollection.subtractNotification();
	}
	else{
		storageTiles = storageTiles.filter(transferToSoldFilter);
		storageCollection.subtractNotification();
	}
}

transferItem = function (index,oldLocation){
	var currentLocation = onFloor(index);
	if( !activeTiles[index] || currentLocation == oldLocation)
		return; 
	else if(currentLocation){
		trace("removed from storage");
		storageTiles = storageTiles.filter(transferToInventoryFilter);
	}else{
		trace("removed from inventory");
		floorTiles = floorTiles.filter(transferToStorageFilter);
	}
}

initializeTime = function(itemProperty,newMessage){
	itemProperty.dateTime = new Date();
	itemProperty.timeDifference = newMessage;
	return itemProperty;
}

updateTime = function(itemProperty,newMessage){
	var curTime = new Date();
	var origTime = itemProperty.dateTime;
	var minuteDif = curTime.getMinutes() - origTime.getMinutes();
	if(minuteDif == 1)
		itemProperty.timeDifference = newMessage + " 1 minute ago.";
	else
		itemProperty.timeDifference = newMessage + " " + minuteDif + " minutes ago.";
	return itemProperty;
}

initializeStorageTime = function(itemProperty){
	return initializeTime(itemProperty,"Just Stored!");
}
updateStorageTime = function(itemProperty){
	return updateTime(itemProperty,"stored: ");
}
initializeInventoryTime = function(itemProperty){
	return initializeTime(itemProperty,"Just Added!");
}
updateInventoryTime = function(itemProperty){
	return updateTime(itemProperty,"added: ");
}
initializeSoldTime = function(itemProperty){
	return initializeTime(itemProperty,"Just Sold!");
}
updateSoldTime = function(itemProperty){
	return updateTime(itemProperty,"sold: ");
}

containsSearchFilter = function(item){
	if(item && ('name' in item) && item.name.match(searchFilter)) 
		return item; 
}

filter = function(items){
	if(searchFilter.test(""))
		return items;
	else
		return items.filter(containsSearchFilter);	
}

//SERVER SIDE HANDLERS 

//for sold items
Handler.bind("/getSoldTags", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify({items: filter(soldTiles)});
		message.status = 200;
	}
}));
//for stored items
Handler.bind("/getStorageTags", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify({items: filter(storageTiles)});
		message.status = 200;
	}
}));
//for current inventory must have XY beyond storageCoords
Handler.bind("/getInventoryTags", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify({items: filter(floorTiles)});
		message.status = 200;
	}
}));

Handler.bind("/getNotifications", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify({
			stored: storageCollection.notificationCount, 
			storageItem: storageCollection.notificationItem,
		 	sold: soldCollection.notificationCount, 
		 	soldItem: soldCollection.notificationItem,
		 	inventoried: floorCollection.notificationCount, 
		 	inventoryItem: floorCollection.notificationItem
		 	})
		message.status= 200;
		soldCollection.resetNotificationItem();
		floorCollection.resetNotificationItem();
		storageCollection.resetNotificationItem();
	}
}));

Handler.bind("/resetStorageNotifications", Behavior({
	onInvoke: function(handler, message){
		storageCollection.resetNotificationCount();
	}
}));
Handler.bind("/resetSoldNotifications", Behavior({
	onInvoke: function(handler, message){	
		soldCollection.resetNotificationCount();
	}
}));
Handler.bind("/resetInventoryNotifications", Behavior({
	onInvoke: function(handler, message){
		floorCollection.resetNotificationCount();
	}
}));


Handler.bind("/searchFilter", Object.create(Behavior.prototype, {
	onInvoke: { value: function( handler, message){
		if(message && message.requestText){
			searchFilter = new RegExp(JSON.parse(message.requestText).filter,'i');
		}
	}}
}));

Handler.bind("/tileone", Object.create(Behavior.prototype, {
	onInvoke: { value: function( handler, message ){
		application.distribute( "tileoneReading", message.requestObject );
	}}
}));

Handler.bind("/tiletwo", Object.create(Behavior.prototype, {
	onInvoke: { value: function( handler, message ){
		application.distribute( "tiletwoReading", message.requestObject );
	}}
}));

Handler.bind("/tilethree", Object.create(Behavior.prototype, {
	onInvoke: { value: function( handler, message ){
		application.distribute( "tilethreeReading", message.requestObject );
	}}
}));

Handler.bind("/tilefour", Object.create(Behavior.prototype, {
	onInvoke: { value: function( handler, message ){
		application.distribute( "tilefourReading", message.requestObject );
	}}
}));

Handler.bind("/getTiles", Object.create(Behavior.prototype, {

	onInvoke: { value: function( handler, message ){
				message.responseText = JSON.stringify( { validTiles: activeTiles } );
				message.status = 200;
			}}
}));

Handler.bind("/scanTiles", Object.create(Behavior.prototype, {

	onInvoke: { value: function( handler, message ){
				message.responseText = JSON.stringify( { validTiles: scanTiles } );
				message.status = 200;
			}}
}));

Handler.bind("/stolenTiles", Object.create(Behavior.prototype, {

	onInvoke: { value: function( handler, message ){
				message.responseText = JSON.stringify( { validTiles: stolenTiles } );
				message.status = 200;
			}}
}));


Handler.bind("/tileOneCord", Object.create(Behavior.prototype, {

	onInvoke: { value: function( handler, message ){
				message.responseText = JSON.stringify( { validTiles: tileOneXY } );
				message.status = 200;
			}}
}));

Handler.bind("/tileTwoCord", Object.create(Behavior.prototype, {

	onInvoke: { value: function( handler, message ){
				message.responseText = JSON.stringify( { validTiles: tileTwoXY } );
				message.status = 200;
			}}
}));
Handler.bind("/tileThreeCord", Object.create(Behavior.prototype, {

	onInvoke: { value: function( handler, message ){
				message.responseText = JSON.stringify( { validTiles: tileThreeXY } );
				message.status = 200;
			}}
}));
Handler.bind("/tileFourCord", Object.create(Behavior.prototype, {

	onInvoke: { value: function( handler, message ){
				message.responseText = JSON.stringify( { validTiles: tileFourXY } );
				message.status = 200;
			}}
}));




var MainContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0, }});

var MainCanvas = Canvas.template(function($) { return { left: 10, right: 10, top: 10, bottom: 10, behavior: Object.create((MainCanvas.behaviors[0]).prototype), }});
MainCanvas.behaviors = new Array(1);
MainCanvas.behaviors[0] = function(content, data, dictionary) {
	Behavior.call(this, content, data, dictionary);
}
MainCanvas.behaviors[0].prototype = Object.create(Behavior.prototype, {
	onDisplaying: { value: function(content) {
			application.invoke( new MessageWithObject( "pins:/tileone/read?repeat=on&callback=/tileone&interval=70" ) );
			application.invoke( new MessageWithObject( "pins:/tiletwo/read?repeat=on&callback=/tiletwo&interval=70" ) );
			application.invoke( new MessageWithObject( "pins:/tilethree/read?repeat=on&callback=/tilethree&interval=70" ) );
			application.invoke( new MessageWithObject( "pins:/tilefour/read?repeat=on&callback=/tilefour&interval=70" ) );
		},
	},
	tileoneReading: { value: function(params, data) {
	    if (activeTiles[0]!= data.a){
			activeTiles[0] = data.a;
			handleItem(0);
		}
		if (scanTiles[0]!=data.s){
			scanTiles[0] = data.s;
		}
		if (stolenTiles[0]!=data.t){
			stolenTiles[0] = data.t;
		}
		if ( (tileOneXY[0] != data.x) || (tileOneXY[1] != data.y) ){
			var oldLocation = onFloor(0);
			tileOneXY[0] = Math.round(100*data.x);
			tileOneXY[1] = Math.round(100*data.y);
			transferItem(0,oldLocation);
		}
	}},
	tiletwoReading: { value: function(params, data) {
	    if (activeTiles[1]!= data.a){
			activeTiles[1] = data.a;
			handleItem(1);
		}
		if (scanTiles[1]!=data.s){
			scanTiles[1] = data.s;
		}
		if (stolenTiles[1]!=data.t){
			stolenTiles[1] = data.t;
		}
		if ( (tileTwoXY[0] != data.x) || (tileTwoXY[1] != data.y) ){
			tileTwoXY[0] = Math.round(100*data.x);
			tileTwoXY[1] = Math.round(100*data.y);
		}
	}},
	tilethreeReading: { value: function(params, data) {
	    if (activeTiles[2]!= data.a){
			activeTiles[2] = data.a;
			handleItem(2);
		}
		if (scanTiles[2]!=data.s){
			scanTiles[2] = data.s;
		}
		if (stolenTiles[2]!=data.t){
			stolenTiles[2] = data.t;
		}
		if ( (tileThreeXY[0] != data.x) || (tileThreeXY[1] != data.y) ){
			tileThreeXY[0] = Math.round(100*data.x);
			tileThreeXY[1] = Math.round(100*data.y);
		}
	}},
	tilefourReading: { value: function(params, data) {
	    if (activeTiles[3]!= data.a){
			activeTiles[3] = data.a;
			handleItem(3);
		}
		if (scanTiles[3]!=data.s){
			scanTiles[3] = data.s;
		}
		if (stolenTiles[3]!=data.t){
			stolenTiles[3] = data.t;
		}
		if ( (tileFourXY[0] != data.x) || (tileFourXY[1] != data.y) ){
			tileFourXY[0] = Math.round(100*data.x);
			tileFourXY[1] = Math.round(100*data.y);
		}
	}},
});

//ADD TO MAIN COMPONENTS
var mainCanvas = new MainCanvas();
application.add( mainCanvas );

application.invoke( new MessageWithObject( "pins:configure", {
    tilefour: {
        require: "tilefour",
        pins: {
            x: { pin: 25 },
            y: { pin: 26 },
            a: { pin: 27 },
            s: { pin: 28 },
            t: { pin: 29 },
        }
    },
    tilethree: {
        require: "tilethree",
        pins: {
            x: { pin: 35 },
            y: { pin: 36 },
            a: { pin: 37 },
            s: { pin: 38 },
            t: { pin: 39 },
        }
    },
    tiletwo: {
        require: "tiletwo",
        pins: {
            x: { pin: 9 },
            y: { pin: 10 },
            a: { pin: 11 },
            s: { pin: 12 },
            t: { pin: 13 },
        }
    },
    tileone: {
        require: "tileone",
        pins: {
            x: { pin: 30 },
            y: { pin: 31 },
            a: { pin: 32 },
            s: { pin: 33 },
            t: { pin: 34 },
        }
    },
}));

//APPLICATION BEHAVIOR 
var ApplicationBehavior = Behavior.template({
	onLaunch: function(application) {
		application.shared = true;
	},
	onQuit: function(application) {
		application.shared = false;
	},
})

application.behavior = new ApplicationBehavior();