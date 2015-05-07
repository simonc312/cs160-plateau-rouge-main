//GLOBALS
var activeTiles = [0,0,0,0];
var scanTiles = [0,0,0,0];
var stolenTiles = [0,0,0,0];
var policeLostTiles = [0,0,0,0];
var policeFoundTiles = [0,0,0,0];
var tileOneXY = [0,0];
var tileTwoXY = [0,0];
var tileThreeXY = [0,0];
var tileFourXY = [0,0];
var tileCoords = [tileOneXY,tileTwoXY,tileThreeXY,tileFourXY];
var storageCoords = {x: {min: 0, max: 25}, y: {min: 0, max: 25} }; //any tile that lies between these coordinates are in storage

//quantity will eventually need to be separated
var tileProperties = [
	{name: "New Era Snapback", quantity: 1, price: 40, image: "assets/hat-thumbnail.jpg"},
	{name: "Sperry Navy Shorts", quantity: 1, price: 35, image: "assets/shorts-thumbnail.jpg"},
	{name: "Zara Men's White Tee", quantity: 1, price: 15, image: "assets/white-tee-thumbnail.jpg"},
	{name: "J Crew Blazer", quantity: 1, price: 75, image: "assets/blazer-thumbnail.jpg"}
	
]

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
initializeLostTime = function(itemProperty){
	return initializeTime(itemProperty,"Lost Item.");
}
updateStolenTime = function(itemProperty){
	return updateTime(itemProperty,"lost: ");
}
initializeRecoverTime = function(itemProperty){
	return initializeTime(itemProperty,"Just Recovered!");
}
initializeStolenTime = function(itemProperty){
	return initializeTime(itemProperty,"Just Stolen!");
}
updateStolenTime = function(itemProperty){
	return updateTime(itemProperty,"stolen: ");
}
initializeRecoveredTime = function(itemProperty){
	return initializeTime(itemProperty,"Just Recovered!");
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


var TileCollection = {
	notificationCount: 0,
	notificationItem: null,
	tileList: [],
	construct: function(name,func1,func2){
		this.name = name;
		this.initializeTileNormal = func1;
		this.updateFuncNormal = func2;
	},
	initializeTile : function(itemProperty){
		if(itemProperty.timeDifference && (itemProperty.timeDifference.match(/[S|s]tolen/) || itemProperty.timeDifference.match(/[L|l]ost/))) //special case once stolen and not recovered yet needs
			return itemProperty;
		else
			return this.initializeTileNormal(itemProperty);
	},
	updateFunc : function(itemProperty){
		if(itemProperty.timeDifference.match(/[S|s]tolen/)) //special case once stolen and not recovered yet needs
			return updateStolenTime(itemProperty); //to stay this way and not be overwritten
		else if(itemProperty.timeDifference.match(/[L|l]ost/)) //special case once stolen and not recovered yet needs
			return updateLostTime(itemProperty);
		else
			return this.updateFuncNormal(itemProperty); //crucial needs to be declared by construct
	},
	refresh : function(){
		this.notificationItem = {refresh: true};
	},
	addNotification: function(){
		this.notificationCount++;
		this.notificationItem = this.tileList[0];
	},
	addRefreshNotification: function(){
		this.notificationCount++;
		this.refresh();
	},
	subtractNotification: function(){
		this.notificationCount = Math.max(0,this.notificationCount - 1);
		this.refresh();
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
	},
	updateTiles : function(){
		this.tileList = this.tileList.map(this.updateFunc);
	},
	addTile: function(newItem){
		if(newItem)
			this.tileList.unshift(this.initializeTile(newItem));
	},
	transfer: function(filterFunc,itemName){
		this.tileList = this.tileList.filter(filterFunc,itemName);
	}
}

var storageCollection = Object.create(TileCollection);
storageCollection.construct("Storage Collection",initializeStorageTime,updateStorageTime);
var soldCollection = Object.create(TileCollection);
soldCollection.construct("Sold Collection",initializeSoldTime,updateSoldTime);

var inventoryCollection = Object.create(TileCollection);
inventoryCollection.construct("Inventory Collection",initializeInventoryTime,updateInventoryTime);

var searchFilter = new RegExp("");


onInventory = function(index){
	return ( tileCoords[index][0] > storageCoords.x.max || tileCoords[index][1] > storageCoords.y.max);
}

inStorage = function(tileIndex){
	return !onInventory(tileIndex);
}

copyTileProperty = function(origTile){
	newTile = {};
	Object.keys(origTile).forEach(function(key) {
     newTile[ key ] = origTile[ key ];
}); 
	return newTile;
}
//delegates which array to place item when tag is activated and inactivated
// ex if active and on inventory add to inventory
handleItem = function(index){
	var newItem = copyTileProperty(tileProperties[index]); //don't update tileProperty from array only separate copy
	if(activeTiles[index] == 1){
		if(onInventory(index))
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
	storageCollection.updateTiles(updateStorageTime);
	storageCollection.addTile(newItem); //initialize time prop of new item; 
	storageCollection.addNotification();
	//trigger update view for history tab if that is current tab.
}

addInventory = function(newItem){
	inventoryCollection.updateTiles(updateInventoryTime);
	inventoryCollection.addTile(newItem);
	inventoryCollection.addNotification();
}

addSold = function(newItem){
	//need to update time of all items in soldTiles when adding new sale
	soldCollection.updateTiles(updateSoldTime);
	soldCollection.addTile(newItem);
	soldCollection.addNotification();
}
//currently only checking for matching names - we could make unique ids for items instead
// but for this prototype there are only 4 tiles. 
transferToInventoryFilter = function(item){
	if(item.name != this) 
		return item;
	else{
		trace("added item to inventory \n");
		addInventory(item)
		storageCollection.subtractNotification();
		}
}

transferToStorageFilter = function(item){
	if(item.name != this)
		return item;
	else{
		trace("added item to storage \n");
		addStorage(item)
		inventoryCollection.subtractNotification();
		}
}

transferToSoldFilter = function(item){
	if(item.name != this) //this refers to item being transferred 
		return item;
	else{
		trace("added item to sold \n");
		addSold(item);		
		}
}

transferLostToSoldFilter = function(item){
	if(item.name != this) //this refers to item being transferred 
		return item;
	else{
		trace("added item to sold \n");
		addSold(initializeLostTime(item));		
		}
}

transferSameStolenFilter = function(item){
	if(item.name != this)
		return item;
	else{
		if(item.timeDifference.match("stolen"))
			return updateStolenTime(item);
		else
			return initializeStolenTime(item);
	}
}

transferRecoverFilter = function(item){
	if(item.name != this)
		return item;
	else{
		trace('found recovered item match \n');
		return initializeRecoverTime(item);
	}
}


transferSold = function(item,index){
	var currentLocation = onInventory(index);
	if(activeTiles[index]) //we are only transferring inactive tags
		return;
	else if(currentLocation){
		trace("removed from inventory \n");
		inventoryCollection.transfer(transferToSoldFilter,item.name);
		inventoryCollection.subtractNotification();
	}
	else{
		trace("removed from storage \n");
		storageCollection.transfer(transferToSoldFilter,item.name);
		storageCollection.subtractNotification();
	}
}

transferStolenItem = function(index){
	var currentLocation = onInventory(index);
	var transferItemName = tileProperties[index].name;
	if(stolenTiles[index] && !policeLostTiles[index] && !policeFoundTiles[index]){ //handle updating active stolen items
		trace("active stolen item detected \n");
		if(currentLocation){
			trace("updated stolen item from inventory \n");
			inventoryCollection.transfer(transferSameStolenFilter,transferItemName);
			inventoryCollection.addRefreshNotification();
		}
		else{
			trace("updated stolen item from storage \n");
			storageCollection.transfer(transferSameStolenFilter,transferItemName);
			storageCollection.addRefreshNotification();
		}
	} else if((policeFoundTiles[index] && !policeLostTiles[index] && stolenTiles[index]) || (!stolenTiles[index] && (!policeFoundTiles[index] && !policeLostTiles[index]))){
		trace('active item reclaimed \n');
		if(currentLocation){
			trace("updated reclaimed item from inventory \n");
			inventoryCollection.transfer(transferRecoverFilter,transferItemName);
			inventoryCollection.addRefreshNotification();
		}
		else{
			trace("updated reclaimed item from storage \n");
			storageCollection.transfer(transferRecoverFilter,transferItemName);
			storageCollection.addRefreshNotification();
		}
	}
	else if((policeLostTiles[index] && !policeFoundTiles[index] && stolenTiles[index])){
		trace('active item lost \n');
		if(currentLocation){
			trace("updated lost item from inventory to sold \n");
			inventoryCollection.transfer(transferLostToSoldFilter,transferItemName);
			inventoryCollection.subtractNotification();
		}
		else{
			trace("updated lost item from storage to sold \n");
			storageCollection.transfer(transferLostToSoldFilter,transferItemName);
			storageCollection.subtractNotification();
		}
	}	
}

transferItem = function (index,oldLocation){
	var currentLocation = onInventory(index);
	var transferItemName = tileProperties[index].name;
	if(!activeTiles[index] || currentLocation == oldLocation)
		return; 
	else if(currentLocation){
		trace("removed from storage \n");
		storageCollection.transfer(transferToInventoryFilter,transferItemName);
	}else{
		trace("removed from inventory \n");
		inventoryCollection.transfer(transferToStorageFilter,transferItemName);
	}
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
		message.responseText = JSON.stringify({items: filter(soldCollection.tileList)});
		message.status = 200;
	}
}));
//for stored items
Handler.bind("/getStorageTags", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify({items: filter(storageCollection.tileList)});
		message.status = 200;
	}
}));
//for current inventory must have XY beyond storageCoords
Handler.bind("/getInventoryTags", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify({items: filter(inventoryCollection.tileList)});
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
		 	inventoried: inventoryCollection.notificationCount, 
		 	inventoryItem: inventoryCollection.notificationItem
		 	})
		message.status= 200;
		soldCollection.resetNotificationItem();
		inventoryCollection.resetNotificationItem();
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
		inventoryCollection.resetNotificationCount();
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
				message.responseText = JSON.stringify( { validTiles: stolenTiles, lostTiles: policeLostTiles, recoveredTiles: policeFoundTiles } );
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
			transferStolenItem(0);
		}
		if (policeLostTiles[0] !=  data.policelost){
			policeLostTiles[0] = data.policelost;
			transferStolenItem(0);
		}
		if (policeFoundTiles[0] != data.policefound){
			policeFoundTiles[0] = data.policefound;
			transferStolenItem(0);
		}
		if ( (tileOneXY[0] != data.x) || (tileOneXY[1] != data.y) ){
			var oldLocation = onInventory(0);
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
			transferStolenItem(1);
		}
		if (policeLostTiles[1] !=  data.policelost){
			policeLostTiles[1] = data.policelost;
			transferStolenItem(1);
		}
		if (policeFoundTiles[1] != data.policefound){
			policeFoundTiles[1] = data.policefound;
			transferStolenItem(1);
		}
		if ( (tileTwoXY[0] != data.x) || (tileTwoXY[1] != data.y) ){
			var oldLocation = onInventory(1);
			tileTwoXY[0] = Math.round(100*data.x);
			tileTwoXY[1] = Math.round(100*data.y);
			transferItem(1,oldLocation);
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
			transferStolenItem(2);
		}
		if (policeLostTiles[2] !=  data.policelost){
			policeLostTiles[2] = data.policelost;
			transferStolenItem(2);
		}
		if (policeFoundTiles[2] != data.policefound){
			policeFoundTiles[2] = data.policefound;
			transferStolenItem(2);
		}
		if ( (tileThreeXY[0] != data.x) || (tileThreeXY[1] != data.y) ){
			var oldLocation = onInventory(2);
			tileThreeXY[0] = Math.round(100*data.x);
			tileThreeXY[1] = Math.round(100*data.y);
			transferItem(2,oldLocation);
			
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
			transferStolenItem(3);
		}
		if (policeLostTiles[3] !=  data.policelost){
			policeLostTiles[3] = data.policelost;
			transferStolenItem(3);
		}
		if (policeFoundTiles[3] != data.policefound){
			policeFoundTiles[3] = data.policefound;
			transferStolenItem(3);
		}
		if ( (tileFourXY[0] != data.x) || (tileFourXY[1] != data.y) ){
			var oldLocation = onInventory(3);
			tileFourXY[0] = Math.round(100*data.x);
			tileFourXY[1] = Math.round(100*data.y);
			transferItem(3,oldLocation);
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