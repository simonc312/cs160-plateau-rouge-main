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
		//trigger update view for history tab if that is current tab. 
	}
	else{
		soldTiles.unshift(tileProperties[index]);
		newSoldCount++;
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

//SERVER SIDE HANDLERS 

//for sold items
Handler.bind("/getSoldTags", Behavior({
	onInvoke: function(handler, message){
		trace("inside getSoldTags \n");
		message.responseText = JSON.stringify({items: soldTiles});
		message.status = 200;
	}
}));
//for delivery history
Handler.bind("/getNewTags", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify({items: deliveredTiles});
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
		message.responseText = JSON.stringify({items: activeTags});
		message.status = 200;
	}
}));

Handler.bind("/getNotifications", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify({delivered: newDeliveryCount, sold: newSoldCount })
		message.status= 200;
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



Handler.bind("/potResult", Object.create(Behavior.prototype, {

	onInvoke: { value: function( handler, message ){
				application.distribute( "receiveReading", message.requestObject );
			}}
}));
Handler.bind("/accelResult", Object.create(Behavior.prototype, {

	onInvoke: { value: function( handler, message ){
				application.distribute( "receiveAccelReading", message.requestObject );
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
	onDisplaying: { value: 

		function(content) {
			this.canvas = content;
            	this.newPoint = true;
            	this.lastX = false;
				application.invoke( new MessageWithObject( "pins:/accelerometer/read?repeat=on&callback=/accelResult&interval=70" ) );
                this.clear();
		},
	},
	clear: { value: 

		function(content) {
			var ctx = this.canvas.getContext( "2d" );
				var w = this.canvas.width;
                var h = this.canvas.height;
      	        ctx.fillStyle = "black";
				ctx.fillRect( 0,0,w,h );
				this.newPoint = true;
		},
	},
	receiveReading: { value: 

		function(params, data) {
			if ( this.newPoint ){
                	this.startLine( { x: data.xPos, y: data.yPos } );
                }
                else {
                	this.lineTo( { x: data.xPos, y: 1 - data.yPos } );
                }
		},
	},
	startLine: { value: 

		function(params) {
			var ctx = this.canvas.getContext( "2d" );
				var w = this.canvas.width;
                var h = this.canvas.height;
                ctx.strokeStyle = "white";
                ctx.lineWidth = 2;
                ctx.moveTo( params.x*w, params.y*h ); 
                ctx.beginPath();
                this.newPoint = false;
		},
	},
	lineTo: { value: 

		function(params) {
			var ctx = this.canvas.getContext( "2d" );
				var w = this.canvas.width;
                var h = this.canvas.height;
                ctx.strokeStyle = "white";
                ctx.lineWidth = 2;
                ctx.lineTo( params.x*w, params.y*h ); 
				ctx.stroke();
		},
	},
	receiveAccelReading: { value: 

		function(params, data) {
			var threshold = .001; 
				if (activeTiles[0]!=data.a1){
					addDelivery(0);
					activeTiles[0] = data.a1;
				}
				if (activeTiles[1]!=data.a2){
					addDelivery(1);
					activeTiles[1] = data.a2;
				}
				if (activeTiles[2]!=data.a3){
					addDelivery(2);
					activeTiles[2] = data.a3;
				}
				if (activeTiles[3]!=data.a4){
					addDelivery(3);
					activeTiles[3] = data.a4;
				}
				if (scanTiles[0]!=data.s1){
					scanTiles[0] = data.s1;
				}
				if (scanTiles[1]!=data.s2){
					scanTiles[1] = data.s2;
				}
				if (scanTiles[2]!=data.s3){
					scanTiles[2] = data.s3;
				}
				if (scanTiles[3]!=data.s4){
					scanTiles[3] = data.s4;
				}
				if (stolenTiles[0]!=data.t1){
					stolenTiles[0] = data.t1;
				}
				if (stolenTiles[1]!=data.t2){
					stolenTiles[1] = data.t2;
				}
				if (stolenTiles[2]!=data.t3){
					stolenTiles[2] = data.t3;
				}
				if (stolenTiles[3]!=data.t4){
					stolenTiles[3] = data.t4;
				}
				if ( (tileOneXY[0] != data.x1) || (tileOneXY[1] != data.y1) ){
					tileOneXY[0] = Math.round(100*data.x1);
					tileOneXY[1] = Math.round(100*data.y1);
				}
				if ( (tileTwoXY[0] != data.x2) || (tileTwoXY[1] != data.y2) ){
					tileTwoXY[0] = Math.round(100*data.x2);
					tileTwoXY[1] = Math.round(100*data.y2);
				}
				if ( (tileThreeXY[0] != data.x3) || (tileThreeXY[1] != data.y3) ){
					tileThreeXY[0] = Math.round(100*data.x3);
					tileThreeXY[1] = Math.round(100*data.y3);
				}
				if ( (tileFourXY[0] != data.x4) || (tileFourXY[1] != data.y4) ){
					tileFourXY[0] = Math.round(100*data.x4);
					tileFourXY[1] = Math.round(100*data.y4);
				}
				
		},
	},
});

//ADD TO MAIN COMPONENTS
var mainCanvas = new MainCanvas();
application.add( mainCanvas );

application.invoke( new MessageWithObject( "pins:configure", {

    accelerometer: {
        require: "accelerometer",
        pins: {
            x1: { pin: 15 }, 
			y1: { pin: 16 }, 
			a1: { pin: 17 }, 
			s1: { pin: 18 }, 
			
			x2: { pin: 19 }, 
			y2: { pin: 20 }, 
			a2: { pin: 21 }, 
			s2: { pin: 22 }, 
			
			x3: { pin: 23 }, 
			y3: { pin: 24 }, 
			a3: { pin: 3 }, 
			s3: { pin: 4 }, 
			
			x4: { pin: 5 }, 
			y4: { pin: 6 }, 
			a4: { pin: 7 }, 
			s4: { pin: 8 }, 
			
        }
    }
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