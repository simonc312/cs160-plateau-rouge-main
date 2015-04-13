// KPR Script file //PLATEAU ROUGE PHONE 
//UPSELLING//
var STYLES = require('styles.js');
/**
 * Skins
 */
var whiteSkin = new Skin( { fill:"white" } );
var whiteGrayBorderSkin = new Skin( { fill:"white", borders:{top:1}, stroke:"#D6D6D6" } );
var graySkin = new Skin( { fill:"#2B2B2B", borders:{top:1}, stroke:"#D6D6D6" } );
var redSkin = new Skin( { fill:"#FF4136" } );

var scanTexture = new Texture("./scan.png");
var scanSkin = new Skin( {texture: scanTexture, width: 150, height: 150, top: 0, bottom: 0, left: 0, right: 0});
 
/**
 * Styles
 */
var titleStyle = new Style( { font:"25px", color:"black" } );
var altTextStyle = new Style( { font:"17px", color:"#FF4136" } );
var textStyle = new Style( { font:"17px", color:"gray" } );
var buttonStyle = new Style( { font:"25px", color:"white" } );

var whiteTextStyle = new Style( { font:"17px", color:"white" } );
/**
 * Miscel Variables, Constants, and Functions
 */
var backArrowPic = "assets/backarrow.png";
var scanPic = "assets/scan.png";
var storePic = "assets/store.jpg";
var arrowPic = "assets/redarrow.png";
var IMGS = ["assets/white-tee-large.jpg", "assets/hat-large.jpg", "assets/shorts-large.jpg", "assets/blazer-large.jpg"];
//var THUMBNAILS = ["white-tee-thumbnail.jpg", "hat-thumbnail.jpg", "shorts-thumbnail.jpg", "blazer-thumbnail.jpg"];
var PRICES = [15, 40, 45, 75];
var NAMES = ["Zara Men's White Tee", "New Era Snapback", "Sperry Print Shorts", "J. Crew Blazer"];
var scan = false;
var scannedItems = [];
//var pic = ""; //stores the url of the image of the item recently scanned
//var price = ""; //stores the price of the item recently scanned
//var name = ""; ////stores the name of the item recently scanned


function displayItem(scannedItems) { //returns the url of the picture of the item scanned
	var pic = "";
	if (scannedItems[0] == 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		pic = IMGS[0];
	} if (scannedItems[0] != 1 && scannedItems[1] == 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		pic = IMGS[1];
	} if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] == 1 && scannedItems[3] != 1) {
		pic = IMGS[2];
	} if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] == 1) {
		pic = IMGS[3];
	} else {
		pic = IMGS[0]; //the first item is used as a default image 
	}
	return pic; 
} 

function displayPrice(scannedItems) { //returns the price of the item scanned
	var price = "";
	if (scannedItems[0] == 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		price = PRICES[0];
	} if (scannedItems[0] != 1 && scannedItems[1] == 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		price = PRICES[1];
	} if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] == 1 && scannedItems[3] != 1) {
		price = PRICES[2];
	} if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] == 1) {
		price = PRICES[3];
	} else {
		price = PRICES[0]; //the first item is used as a default image 
	}
	return price; 
} 

function displayName(scannedItems) { //returns the name of the item scanned
	var name = "";
	if (scannedItems[0] == 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		name = NAMES[0];
	} if (scannedItems[0] != 1 && scannedItems[1] == 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		name = NAMES[1];
	} if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] == 1 && scannedItems[3] != 1) {
		name = NAMES[2];
	} if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] == 1) {
		name = NAMES[3];
	} else {
		name = NAMES[0]; //the first item is used as a default name 
	}
	return name; 
} 

/**
 * Buttons
 */
 
var recommendedButton = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the Recommended Items view
	left: 0, right: 10, height:40, 
	contents: [
		new Label({left:0, right:0, height:40, skin: graySkin, string:"Give Me Recommendations", style: whiteTextStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			mainContainer.remove(upsellingColumn);
			mainContainer.add(recommendedColumn);
		}}
	})
	
}
trace("we are in recommendedButton");});

var upsellingButton = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the main Upselling view
	left: 0, right: 10, height:40, top: 200, width: 200,
	contents: [
		new Label({left:0, right:0, height:40, skin: graySkin, string:"< Back to My Item", style: whiteTextStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			
			mainContainer.remove(recommendedColumn);
			mainContainer.add(upsellingColumn);
		}}
	})
}});

var location_to_upsellingButton1 = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the main Upselling view
	top: 390, left: 10, right: 10, height:40, skin: graySkin,
	contents: [
		new Label({left:0, right:0, height:40, skin: graySkin, string:"< Back to My Item", style: whiteTextStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			
			mainContainer.remove(locationColumn);
			mainContainer.add(upsellingColumn);
		}}
	})
}});

var location_to_upsellingButton2 = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the main Upselling view
	top: 390, left: 10, right: 10, height:40, skin: graySkin,
	contents: [
		new Label({left:0, right:0, height:40, skin: graySkin, string:"< Back to My Item", style: whiteTextStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			
			mainContainer.remove(locationColumn2);
			mainContainer.add(upsellingColumn);
		}}
	})
}});

var upselling_to_rescanButton = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the main Scanning view
	left: 0, right: 10, height:40,
	contents: [
		new Label({left:0, right:0, height:40, skin: graySkin, string:"Rescan", style: whiteTextStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			
			mainContainer.remove(upsellingColumn);
			mainContainer.add(scanColumn);
		}}
	})
}});

var recommended_to_rescanButton = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the main Scanning view
	left: 0, right: 10, height:40, 
	contents: [
		new Label({left:0, right:0, height:40, skin: graySkin, string:"Rescan", style: whiteTextStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			
			mainContainer.remove(recommendedColumn);
			mainContainer.add(scanColumn);
		}}
	})
}});

var location_to_rescanButton = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the main Scanning view
	top: 430, left: 10, right: 10, height:40, skin: graySkin,
	contents: [
		new Label({left:0, right:0, height:40, skin: graySkin, string:"Rescan", style: whiteTextStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			
			mainContainer.remove(locationColumn);
			mainContainer.add(scanColumn);
		}}
	})
}});

var recommended_to_locationButton = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the store layout view
	left: 100, right: 70, height:10, width: 20, top: 80, 
	contents: [
		new Label({left:0, right:0, height:20, skin: graySkin, string:"Find item", style: buttonStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			mainContainer.remove(recommendedColumn);
			mainContainer.add(locationColumn);
		}}
	})
}});

var recommended_to_locationButton2 = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the store layout view
	left: 100, right: 70, height:10, width: 20, top: 100,
	contents: [
		new Label({left:0, right:0, height:20, skin: graySkin, string:"Find item", style: buttonStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			mainContainer.remove(recommendedColumn);
			mainContainer.add(locationColumn2);
		}}
	})
}});

var upselling_to_locationButton = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the store layout view
	left: 0, right: 10, height:40, 
	contents: [
		new Label({left:0, right:0, height:40, skin: graySkin, string:"Find item", style: textStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			mainContainer.remove(upsellingColumn);
			mainContainer.add(locationColumn);
		}}
	})
}});

/**
 * Handlers to check for Scan
 */
Handler.bind("/scanCheck", {
    onInvoke: function(handler, message) {
    	trace("we are in scanCheck");
        if(deviceURL != "") handler.invoke(new Message(deviceURL + "scanTiles"), Message.JSON);
       // else handler.invoke(new Message("/delay"));
    },
    onComplete: function(handler, message, json) {
        if(json && json.validTiles.indexOf(1) != -1 && !scan) {
         
            scan = true;
            scannedItems = json.validTiles;
        if (scannedItems[0] == 1 || scannedItems[1] == 1 || scannedItems[2] == 1 || scannedItems[3] == 1) {  
            pic = displayItem(scannedItems);
         	//application.remove(scanColumn);
            //application.add(upsellingColumn);
     
            
            application.run(new TRANSITIONS.TimeTravel(), scanColumn, upsellingColumn, { direction : "forward", easeType : "sineEaseIn", duration: 100 });
        	//mainContainer.add(upsellingColumn); //
        }
        //handler.invoke(new Message("/delay"));
    }
    }
});

Handler.bind("/delay", {
    onInvoke: function(handler, message) {
        handler.wait(500);
    },
    onComplete: function(handler, message, json) {
        handler.invoke(new Message("/scanCheck"));
    }
});

/**
 * Main container
 */
var mainContainer = new Container({
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin
});

exports.mainContainer = mainContainer;

/**
 * Default Screen
 */
var defaultColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
});

/**
 * Scan Screen
 */
var scanColumn = new Column({
    left:0, right:0, top:0, bottom:0, skin: whiteSkin,
    contents: [ //backButtonToInventoryView
    	/*new Picture({height: 300, width: 200, right: 0, left: 0, top: 10, name: "backToInventory", url: scanPic,
    	 behavior: Object.create(Container.prototype, {
    	 	onTouchEnded: { value: function(container) {
    	 		application.remove(mainContainer);
				//application.add(main);
			}}},*/
        new Line({left:0, right:0, top:0,
            contents: [new Container({ left: 10, top: 10, active:true, skin: STYLES.searchButtonSkin,
	contents: [
		new Picture({height: 50, width: 50, right: 0, left: 0, top: 0, name: "backarrow", url: backArrowPic})],
		behavior: Object.create(Container.prototype, {
			onTouchEnded: { value: function(container) {
				application.remove(mainContainer);
				application.add(main);
			}}}) }) , 
		new Label({left: 10, top:20, height:25, string:"Scan Your Item Here", style:titleStyle})]
        }),
        new Container({ left: 10, right: 10, top: 40, active:true,
	contents: [
		new Picture({height: 300, width: 200, right: 0, left: 0, top: 10, name: "scanner", url: scanPic}),
		
    ], behavior: Object.create(Container.prototype, {
		//onLaunch: { value: function(container) {
			//application.invoke(new Message("/scanCheck"));
			
	//}}
		onTouchEnded: { value: function(container) {
			//application.invoke(new Message("/scanCheck"));
			mainContainer.remove(scanColumn);
			mainContainer.add(upsellingColumn);
			}}
	})
	
    }),
   ] 	
   
});

/*
scanColumn.behavior = Object.create(Behavior.prototype, {
    onDisplaying: { value: function(content) {
        content.start();
        content.interval = 500;
    }},
    onTimeChanged: { value: function(content) {
    	application.invoke(new Message("/scanCheck"));
    }},
    onComplete: { value: function(content, message, json) {
    }},
});
*/

/**
 * Main Upselling View
 */ 
var upsellingColumn = new Column({
    left:13, right:0, top:0, bottom:20, skin: whiteSkin,
    contents: [
        new Line({left:0, right:0, top:0,
            contents: [new Label({left:70, top:20, height:25, string:"Item You Scanned", style:titleStyle})]
        }),
        new Container({ left: 0, right: 0, top: 0, bottom: 0, active:true, skin: whiteSkin,
	contents: [
		new Picture({height: 350, width: 360, right: 0, left: 0, top: 60, name: "displayItem", url: displayItem(scannedItems)})
    ]
    }),
    	new Label({top: 150, left:150, right:0, bottom: 250, height:40, string:"Price: " + displayPrice(scannedItems), style: textStyle}),
    	new Label({left:0, right:10, height:40, bottom: 340, string:displayName(scannedItems), style: titleStyle, skin: redSkin}),
    	new recommendedButton({bottom: 40}),
    	new upselling_to_rescanButton({bottom: 20})
    ]
});

/**
 * Recommended Items View 
 */ 
 
 var recommendedColumn = new Column({
    left:13, right:0, top:10, bottom:20, skin: whiteSkin,
    contents: [
        new Line({left:0, right:0, top:0,
            contents: [new Label({left:50, top:20, height:25, string:"Recommended Items", style:titleStyle})]
        }),
        new Container({ left: 10, right: 10, top: 20, active:true, skin: whiteSkin,
	contents: [ 
		new Picture({height: 150, width: 180, right: 200, left: 0, top: 0, name: "displayRecommendedItem1", url: IMGS[1]}), //need to create a function that will generate a list of items excluding the one that is scanned
		new Label({top: 0, left:100, height:40, string:"Price: " + PRICES[1], style: textStyle}),
		new Label({top: 30, left: 100, height:40, string:NAMES[1], style: textStyle}),
		new Label({top: 60, left:100, height:40, string:"Bestselling item!", style: altTextStyle}),
		new recommended_to_locationButton2()
    ]
    }),
    	new Container({ left: 10, right: 10, top:10, active:true, skin: whiteSkin,
	contents: [ 
		new Picture({height: 150, width: 180, right: 200, left: 0, top: 0, name: "displayRecommendedItem2", url: IMGS[2]}), //need to create a function that will generate a list of items excluding the one that is scanned
		new Label({top: 0, left:100, height:40, string:"Price: " + PRICES[2], style: textStyle}),
		new Label({top: 30, left:100, height:40, string:NAMES[2], style: textStyle}),
		new recommended_to_locationButton(),
		new upsellingButton
    ]
    })
    	
    	
    	
    ]
});

/**
 * Store Layout View
 */
 
 var locationColumn = new Column({
    left:0, right:0, top:0, bottom:0, skin: whiteSkin,
    contents: [
        new Line({left:0, right:0, top:0,
            contents: [new Label({left: 90, top:20, height:25, string:"Store Layout", style:titleStyle})]
        }),
        new Container({ left: 10, right: 10, top: 10, active:true,
	contents: [
		new Picture({height: 400, width: 200, right: 0, left: 0, top: 0, name: "store", url: storePic}),
		new Picture({height: 50, width: 50, right: 0, left: 150, top: 160, name: "arrow", url: arrowPic}),
		new location_to_rescanButton(),
		new location_to_upsellingButton1({top: 50})
    ]
    })
    ]
});

 var locationColumn2 = new Column({
    left:0, right:0, top:0, bottom:0, skin: whiteSkin,
    contents: [
        new Line({left:0, right:0, top:0,
            contents: [new Label({left: 90, top:20, height:25, string:"Store Layout", style:titleStyle})]
        }),
        new Container({ left: 10, right: 10, top: 10, active:true,
	contents: [
		new Picture({height: 400, width: 200, right: 0, left: 0, top: 0, name: "store", url: storePic}),
		new Picture({height: 50, width: 50, right: 0, left: 150, top: 120, name: "arrow", url: arrowPic}),
		new location_to_rescanButton(),
		new location_to_upsellingButton2({top: 50})
    ]
    })
    ]
});

/**
 * Discover and forget device
 */
var deviceURL = "";

Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message) {
		deviceURL = JSON.parse(message.requestText).url;
	}
}));

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message) {
		deviceURL = "";
	}
}));


var ApplicationBehavior = Behavior.template({
    onLaunch: function(application, data) {
  		application.shared = true;
    	//defaultColumn.add(upsellingColumn);
    	//application.invoke(new Message("/scanCheck"));
        
    },
	onDisplayed: function(application) {
		application.discover("smart.tag.server");
	},	
	onQuit: function(application) {
		application.forget("smart.tag.server");
		application.shared = false;
	},
});

//application.behavior = new ApplicationBehavior();
mainContainer.add(scanColumn);
//application.add(mainContainer);
