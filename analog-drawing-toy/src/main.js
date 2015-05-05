//GLOBALS
var activeTiles = [0,0,0,0];
var scanTiles = [0,0,0,0];
var stolenTiles = [0,0,0,0];
var tileOneXY = [0,0];
var tileTwoXY = [0,0];
var tileThreeXY = [0,0];
var tileFourXY = [0,0];

//quantity will eventually need to be separated
var tileProperties = [
	{name: "New Era Snapback", quantity: 5, price: 40, image: "assets/hat-thumbnail.jpg"},
	{name: "Sperry Navy Shorts", quantity: 15, price: 35, image: "assets/shorts-thumbnail.jpg"},
	{name: "Zara Men's White Tee", quantity: 25, price: 15, image: "assets/white-tee-thumbnail.jpg"},
	{name: "J Crew Blazer", quantity: 3, price: 75, image: "assets/blazer-thumbnail.jpg"}
	
]

var deliveredTiles = [];
var soldTiles = [];
var newDeliveryCount = 0;
var newSoldCount = 0;
var newDeliveryItem;
var newSoldItem;

var searchFilter = new RegExp("");

copyTileProperty = function(origTile){
	newTile = {};
	Object.keys(origTile).forEach(function(key) {
     newTile[ key ] = origTile[ key ];
}); 
	return newTile;
}

addDelivery = function(index){
	
	if(activeTiles[index] == 0){
		//need to update time of all items in deliveredTiles when adding new delivery
		for(var i=0; i<deliveredTiles.length;i++){
			deliveredTiles[i] = updateTime(deliveredTiles[i]);
		}
		var newItem = copyTileProperty(tileProperties[index]); //don't update tileProperty from array only separate copy
		deliveredTiles.unshift(updateTime(newItem)); //initialize time prop of new item
		newDeliveryCount++;
		newDeliveryItem = deliveredTiles[0];
		//trigger update view for history tab if that is current tab. 
	}
	else{
		soldTiles.unshift(tileProperties[index]);
		newSoldCount++;
		newSoldItem = soldTiles[0];
		}
}

updateTime = function(itemProperty){
	if(itemProperty.dateTime == undefined){
		itemProperty.dateTime = new Date();
		itemProperty.timeDifference = "New Delivery!";
	}
	else{
		var curTime = new Date();
		var origTime = itemProperty.dateTime;
		var minuteDif = curTime.getMinutes() - origTime.getMinutes();
		if(minuteDif == 1)
			itemProperty.timeDifference = "1 minute ago.";
		else
			itemProperty.timeDifference = minuteDif + " minutes ago.";
	}
	return itemProperty;
}

containsSearchFilter = function(item){
				trace('after re \n');
				if(item && ('name' in item) && item.name.match(searchFilter)) 
					return item; 
			}

filter = function(items){
	if(searchFilter.test(""))
		return items;
	else{
		return items.filter(containsSearchFilter);
			
	}
}

//SERVER SIDE HANDLERS 

//for sold items
Handler.bind("/getSoldTags", Behavior({
	onInvoke: function(handler, message){
		trace("inside getSoldTags \n");
		message.responseText = JSON.stringify({items: filter(soldTiles)});
		message.status = 200;
	}
}));
//for delivery history
Handler.bind("/getNewTags", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify({items: filter(deliveredTiles)});
		message.status = 200;
	}
}));
//for current inventory
Handler.bind("/getActiveTags", Behavior({
	onInvoke: function(handler, message){
		var activeTags = [];
		for(var i=0; i<activeTiles.length;i++){
			if(activeTiles[i] == 1)
				activeTags.unshift(tileProperties[i]);
		}
		message.responseText = JSON.stringify({items: filter(activeTags)});
		message.status = 200;
	}
}));

Handler.bind("/getNotifications", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify({delivered: newDeliveryCount, deliveredItem: newDeliveryItem, sold: newSoldCount, soldItem: newSoldItem})
		message.status= 200;
		newDeliveryItem = null;
		newSoldItem = null;
	}
}));

Handler.bind("/resetDeliveryNotifications", Behavior({
	onInvoke: function(handler, message){
		newDeliveryCount = 0;
	}
}));
Handler.bind("/resetSoldNotifications", Behavior({
	onInvoke: function(handler, message){
		
		newSoldCount = 0;
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
			addDelivery(0);
			activeTiles[0] = data.a;
		}
		if (scanTiles[0]!=data.s){
			scanTiles[0] = data.s;
		}
		if (stolenTiles[0]!=data.t){
			stolenTiles[0] = data.t;
		}
		if ( (tileOneXY[0] != data.x) || (tileOneXY[1] != data.y) ){
			tileOneXY[0] = Math.round(100*data.x);
			tileOneXY[1] = Math.round(100*data.y);
		}
	}},
	tiletwoReading: { value: function(params, data) {
	    if (activeTiles[1]!= data.a){
			addDelivery(1);
			activeTiles[1] = data.a;
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
			addDelivery(2);
			activeTiles[2] = data.a;
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
			addDelivery(3);
			activeTiles[3] = data.a;
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