// KPR Script file //PLATEAU ROUGE PHONE 
//UPSELLING//
//var STYLES = require('styles.js');
/**
 * Skins
 */
var whiteSkin = new Skin( { fill:"white" } );
var whiteGrayBorderSkin = new Skin( { fill:"white", borders:{top:1}, stroke:"#D6D6D6" } );
var graySkin = new Skin( { fill:"#2B2B2B", borders:{top:1}, stroke:"#D6D6D6" } );
var redSkin = new Skin( { fill:"#FF4136" } );
 
/**
 * Styles
 */
var titleStyle = new Style( { font:"25px", color:"black" } );
var scanTextStyle = new Style( { font:"24px", color:"white", lines: 1 } );
var altTextStyle = new Style( { font:"17px", color:"#FF4136" } );
var textStyle = new Style( { font:"17px", color:"gray" } );
var buttonStyle = new Style( { font:"25px", color:"white" } );

var whiteTextStyle = new Style( { font:"17px", color:"white" } );
/**
 * Miscel Variables, Constants, and Functions
 */
var backArrowPic = "assets/back.png";
var scanPic = "assets/scan.png";
var scanHelperPic = "assets/scan-helper.png";
var storePic = "assets/store.jpg";
var arrowPic = "assets/location-red.png";
var IMGS = ["assets/white-tee-large.jpg", "assets/hat-large.jpg", "assets/shorts-large.jpg", "assets/blazer-large.jpg"];
//var THUMBNAILS = ["white-tee-thumbnail.jpg", "hat-thumbnail.jpg", "shorts-thumbnail.jpg", "blazer-thumbnail.jpg"];
var PRICES = [15, 40, 45, 75];
var NAMES = ["Zara Men's White Tee", "New Era Snapback", "Sperry Print Shorts", "J. Crew Blazer"];
var scannedItems = [];
exports.scannedItems = scannedItems; 
//var pic = ""; //stores the url of the image of the item recently scanned
//var price = ""; //stores the price of the item recently scanned
//var name = ""; ////stores the name of the item recently scanned


function displayItem(scannedItems) { //returns the url of the picture of the item scanned
	var pic = "";
	if (scannedItems[0] == 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		pic = IMGS[0];
	} else if (scannedItems[0] != 1 && scannedItems[1] == 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		pic = IMGS[1];
	} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] == 1 && scannedItems[3] != 1) {
		pic = IMGS[2];
	} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] == 1) {
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
	} else if (scannedItems[0] != 1 && scannedItems[1] == 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		price = PRICES[1];
	} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] == 1 && scannedItems[3] != 1) {
		price = PRICES[2];
	} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] == 1) {
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
	} else if (scannedItems[0] != 1 && scannedItems[1] == 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		name = NAMES[1];
	} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] == 1 && scannedItems[3] != 1) {
		name = NAMES[2];
	} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] == 1) {
		name = NAMES[3];
	} else {
		name = NAMES[0]; //the first item is used as a default name 
	}
	return name; 
}

function hardcodedRecOne(scannedItems) {
	var item;
	if (scannedItems[0] == 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		item = { name: NAMES[1], price: PRICES[1], img: IMGS[1]};
	} else if (scannedItems[0] != 1 && scannedItems[1] == 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		item = { name: NAMES[2], price: PRICES[2], img: IMGS[2]};
	} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] == 1 && scannedItems[3] != 1) {
		item = { name: NAMES[3], price: PRICES[3], img: IMGS[3]};
	} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] == 1) {
		item = { name: NAMES[0], price: PRICES[0], img: IMGS[0]};
	} else {
		item = { name: NAMES[1], price: PRICES[1], img: IMGS[1]}; //the first item is used as a default name 
	}
	return item; 
} 

function hardcodedRecTwo(scannedItems) {
	var item;
	if (scannedItems[0] == 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		item = { name: NAMES[2], price: PRICES[2], img: IMGS[2]};
	} else if (scannedItems[0] != 1 && scannedItems[1] == 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
		item = { name: NAMES[3], price: PRICES[3], img: IMGS[3]};
	} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] == 1 && scannedItems[3] != 1) {
		item = { name: NAMES[0], price: PRICES[0], img: IMGS[0]};
	} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] == 1) {
		item = { name: NAMES[1], price: PRICES[1], img: IMGS[1]};
	} else {
		item = { name: NAMES[2], price: PRICES[2], img: IMGS[2]}; //the first item is used as a default name 
	}
	return item; 
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
			mainContainer.run( new TRANSITIONS.Push(), upsellingColumn, recommendedColumn, { direction : "left", duration : 400 } );
			//mainContainer.remove(upsellingColumn);
			//mainContainer.add(recommendedColumn);
		}}
	})
	
}
//trace("we are in recommendedButton");
});

var upsellingButton = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the main Upselling view
	left: 0, right: 10, height:40, top: 200, width: 200,
	contents: [
		new Label({left:0, right:0, height:40, skin: graySkin, string:"< Back to My Item", style: whiteTextStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			mainContainer.run( new TRANSITIONS.Push(), recommendedColumn, upsellingColumn, { direction : "right", duration : 400 } );
			
			//mainContainer.remove(recommendedColumn);
			//mainContainer.add(upsellingColumn);
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
			mainContainer.run( new TRANSITIONS.Push(), locationColumn, upsellingColumn, { direction : "right", duration : 400 } );
			//mainContainer.remove(locationColumn);
			//mainContainer.add(upsellingColumn);
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
			mainContainer.run( new TRANSITIONS.Push(), upsellingColumn, scanColumn, { direction : "right", duration : 400 } );			
			//mainContainer.remove(upsellingColumn);
			//mainContainer.add(scanColumn);
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
			mainContainer.run( new TRANSITIONS.TimeTravel(), recommendedColumn, scanColumn, { direction : "forward", duration : 400 } );
			//mainContainer.remove(recommendedColumn);
			//mainContainer.add(scanColumn);
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
		    mainContainer.run( new TRANSITIONS.TimeTravel(), locationColumn, scanColumn, { direction : "forward", duration : 400 } );
			
			//mainContainer.remove(locationColumn);
			//mainContainer.add(scanColumn);
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
		    mainContainer.run( new TRANSITIONS.Push(), recommendedColumn, locationColumn, { direction : "left", duration : 400 } );
			//mainContainer.remove(recommendedColumn);
			//mainContainer.add(locationColumn);
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
		    mainContainer.run( new TRANSITIONS.Push(), upsellingColumn, locationColumn, { direction : "left", duration : 400 } );
			//mainContainer.remove(upsellingColumn);
			//mainContainer.add(locationColumn);
		}}
	})
}});       

/**
 * Main container
 */
var mainContainer = new Container({
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin
});

exports.mainContainer = mainContainer;

/**
 * Scan Screen
 */
var scanColumn = new Column({
    left:0, right:0, top:0, bottom:0, skin: STYLE.whiteSkin,
    contents: [ //backButtonToInventoryView
    	/*new Picture({height: 300, width: 200, right: 0, left: 0, top: 10, name: "backToInventory", url: scanPic,
    	 behavior: Object.create(Container.prototype, {
    	 	onTouchEnded: { value: function(container) {
    	 		application.remove(mainContainer);
				//application.add(main);
			}}},*/
        new Line({left:0, right:0, top:0, height: STYLE.header.height, skin: STYLE.redSkin,
            contents: [new Container({ left: 10, top: 10, active:true,
				contents: [
					new Picture({height: 25, width: 25, right: 0, left: 0, top: 0, name: "backarrow", url: backArrowPic})],
					behavior: Object.create(Container.prototype, {
						onTouchEnded: { value: function(container) {
							application.remove(mainContainer);
							application.add(main);
				}}}) }) , 
			
		new Text({left: 10,right:0, top:10, height:40, string:"Upselling Recomendations",style: STYLE.headerTitleStyle})]
        }),
        new Container({ left: 10, right: 10, top: 30, active:true,
	contents: [
		new Picture({height: 300, width: 200, right: 0, left: 0, top: 10, name: "scanner", url: scanPic}),
		
    ], 
    behavior: Object.create(Container.prototype, {
		onDisplaying: { value: function(content) {
		    content.start();
		    content.interval = 400;
		}},
		onTimeChanged: { value: function(content) {
		   if(deviceURL != "") content.invoke(new Message(deviceURL + "scanTiles"), Message.JSON);
		}},	
	    onComplete: { value: function(content, message, json) {
	        if(json && json.validTiles.indexOf(1) != -1) {
                scannedItems = json.validTiles;
                mainContainer.run(new TRANSITIONS.TimeTravel(), scanColumn, upsellingColumn, { direction : "forward", easeType : "sineEaseIn", duration: 100 });
	        }
	    }},
	})
	
    }),
    new Text({left: 10,right:0, top:10, height:30, string:"Place Phone Near SmartTag", style: scanTextStyle}),
    new Picture({height: 64, width: 128, right: 0, left: 0, top: 0, name: "scan-helper", url: scanHelperPic}),
   ] 	
   
});

exports.scanColumn = scanColumn;

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
        new Container({ name:"displayItem", left: 0, right: 0, top: 0, bottom: 0, active:true, skin: whiteSkin,
	        contents: [
		        new Picture({height: 350, width: 360, right: 0, left: 0, top: 60, url: displayItem(scannedItems)})
            ]
        }),
    	new Label({name:"price", top: 150, left:150, right:0, bottom: 250, height:40, string:"Price: " + displayPrice(scannedItems), style: textStyle}),
    	new Label({name:"itemName", left:0, right:10, height:40, bottom: 340, string:displayName(scannedItems), style: titleStyle, skin: redSkin}),
    	new recommendedButton({bottom: 40}),
    	new upselling_to_rescanButton({bottom: 20})
    ],
    behavior: Object.create(Container.prototype, {
		onDisplaying: { value: function(content) {
		    content.displayItem.first.url = displayItem(scannedItems);
		    content.price.string = "Price: " + displayPrice(scannedItems);
		    content.itemName.string = displayName(scannedItems);
		}},
    })
});

exports.upsellingColumn = upsellingColumn;

/**
 * Recommended Items View 
 */ 
 
 var recommendedColumn = new Column({
    left:13, right:0, top:10, bottom:20, skin: whiteSkin,
    contents: [
        new Line({left:0, right:0, top:0,
            contents: [new Label({left:50, top:20, height:25, string:"Recommended Items", style:titleStyle})]
        }),
        new Container({ name:"imgOne", left: 10, right: 10, top: 20, active:true, backgroundTouch:true, skin: whiteSkin,
	contents: [ 
		new Picture({height: 150, width: 180, right: 200, left: 0, top: 0, name: "displayRecommendedItem1", url: IMGS[1]}), //need to create a function that will generate a list of items excluding the one that is scanned
		new Label({name: "price", top: 0, left:100, height:40, string:"Price: " + PRICES[1], style: textStyle}),
		new Label({name: "itemName", top: 30, left: 100, height:40, string:NAMES[1], style: textStyle}),
		new Label({top: 60, left:100, height:40, string:"Bestselling item!", style: altTextStyle}),
		new recommended_to_locationButton(),
    ],
        behavior: Object.create(Behavior.prototype, {
            onTouchBegan: { value: function(content) {
                locationColumn.behavior = new MapBehavior(mapItem);
            }},
        })
    }),
    	new Container({ name:"imgTwo", left: 10, right: 10, top:10, active:true, backgroundTouch:true, skin: whiteSkin,
	contents: [ 
		new Picture({height: 150, width: 180, right: 200, left: 0, top: 0, name: "displayRecommendedItem2", url: IMGS[2]}), //need to create a function that will generate a list of items excluding the one that is scanned
		new Label({name: "price", top: 0, left:100, height:40, string:"Price: " + PRICES[2], style: textStyle}),
		new Label({name: "itemName", top: 30, left:100, height:40, string:NAMES[2], style: textStyle}),
		new recommended_to_locationButton(),
		new upsellingButton,
    ],
        behavior: Object.create(Behavior.prototype, {
            onTouchBegan: { value: function(content) {
                locationColumn.behavior = new MapBehavior(mapItemTwo);
            }},
        })
    })
    	
    	
    	
    ],
    behavior: Object.create(Container.prototype, {
		onDisplaying: { value: function(content) {
		    var recOne = hardcodedRecOne(scannedItems);
		    var recTwo = hardcodedRecTwo(scannedItems);
		    content.imgOne.displayRecommendedItem1.url = recOne.img;
		    content.imgOne.price.string = "Price: " + recOne.price;
		    content.imgOne.itemName.string = recOne.name;
		    content.imgTwo.displayRecommendedItem2.url = recTwo.img;
		    content.imgTwo.price.string = "Price: " + recTwo.price;
		    content.imgTwo.itemName.string = recTwo.name;     
		}},
    })
});

/**
 * Store Layout View
 */
Handler.bind("/mapOne", {
    onInvoke: function(handler, message) {
        if(deviceURL != "") handler.invoke(new Message(deviceURL + "tileOneCord"), Message.JSON);
    },
    onComplete: function(handler, message, json) {
        if(json) {
            locationColumn.imgs.arrow.coordinates = { left: x(json.validTiles[0]), top: y(json.validTiles[1]) };
        }
    }
});

Handler.bind("/mapTwo", {
    onInvoke: function(handler, message) {
        if(deviceURL != "") handler.invoke(new Message(deviceURL + "tileTwoCord"), Message.JSON);
    },
    onComplete: function(handler, message, json) {
        if(json) {
            locationColumn.imgs.arrow.coordinates = { left: x(json.validTiles[0]), top: y(json.validTiles[1]) };
        }
    }
});

Handler.bind("/mapThree", {
    onInvoke: function(handler, message) {
        if(deviceURL != "") handler.invoke(new Message(deviceURL + "tileThreeCord"), Message.JSON);
    },
    onComplete: function(handler, message, json) {
        if(json) {
            locationColumn.imgs.arrow.coordinates = { left: x(json.validTiles[0]), top: y(json.validTiles[1]) };
        }
    }
});

Handler.bind("/mapFour", {
    onInvoke: function(handler, message) {
        if(deviceURL != "") handler.invoke(new Message(deviceURL + "tileFourCord"), Message.JSON);
    },
    onComplete: function(handler, message, json) {
        if(json) {
            locationColumn.imgs.arrow.coordinates = { left: x(json.validTiles[0]), top: y(json.validTiles[1]) };
        }
    }
});

function x(x) {
    // width 50 to 240
    return 50 + x*190/100;
}

function y(y) {
    // height 20 to 330
    return 20 + y*310/100;
} 

function mapItem(content) {
     if(deviceURL != "") {
		if (scannedItems[0] == 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
			content.invoke(new Message("/mapTwo"));
		} else if (scannedItems[0] != 1 && scannedItems[1] == 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
			content.invoke(new Message("/mapThree"));
		} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] == 1 && scannedItems[3] != 1) {
			content.invoke(new Message("/mapFour"));
		} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] == 1) {
			content.invoke(new Message("/mapOne"));
		} else {
			content.invoke(new Message("/mapTwo")); 
		}
	}
}

function mapItemTwo(content) {
     if(deviceURL != "") {
		if (scannedItems[0] == 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
			content.invoke(new Message("/mapThree"));
		} else if (scannedItems[0] != 1 && scannedItems[1] == 1 && scannedItems[2] != 1 && scannedItems[3] != 1) {
			content.invoke(new Message("/mapFour"));
		} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] == 1 && scannedItems[3] != 1) {
			content.invoke(new Message("/mapOne"));
		} else if (scannedItems[0] != 1 && scannedItems[1] != 1 && scannedItems[2] != 1 && scannedItems[3] == 1) {
			content.invoke(new Message("/mapTwo"));
		} else {
			content.invoke(new Message("/mapThree")); 
		}
	}
}

var MapBehavior = function(func) {
    this.func = func;
}

MapBehavior.prototype = Object.create(Container.prototype, {
    func: { value: mapItem, writable: true },
	onDisplaying: { value: function(content) {
	    this.func(content);
	    content.start();
	}},
	onTimeChanged: { value: function(content) {
	    this.func(content);
	}},
});
 
var locationColumn = new Column({
    left:0, right:0, top:0, bottom:0, skin: whiteSkin,
    contents: [
        new Line({left:0, right:0, top:0,
            contents: [new Label({left: 90, top:20, height:25, string:"Store Layout", style:titleStyle})]
        }),
        new Container({ name:"imgs", left: 10, right: 10, top: 10, active:true,
	contents: [
		new Picture({height: 400, width: 200, right: 0, left: 0, top: 0, name: "store", url: storePic}),
		new Picture({height: 50, width: 50, left: 200, top: 250, name: "arrow", url: arrowPic}),
		new location_to_rescanButton(),
		new location_to_upsellingButton1({top: 50})
    ]
    })
    ],
});

//application.behavior = new ApplicationBehavior();
mainContainer.add(scanColumn);
//application.add(mainContainer);
