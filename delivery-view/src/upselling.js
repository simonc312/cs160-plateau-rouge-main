// KPR Script file //PLATEAU ROUGE PHONE 
//UPSELLING//
//var STYLES = require('styles.js');

//IMPORTED MODULES and JS FILES
var THEME = require('themes/sample/theme');
var BUTTONS = require("controls/buttons");
var CONTROL = require('mobile/control');
var DIALOG = require('mobile/dialog');
var MODEL = require('mobile/model');
var KEYBOARD = require('mobile/keyboard');
var SCREEN = require('mobile/screen');
var SCROLLER = require('mobile/scroller');
var TRANSITIONS = require('transitions');
var STYLE = require('styles.js');

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
var recommendedStyle = new Style( {font: "30px", color: "gray" } );

var whiteTextStyle = new Style( { font:"17px", color:"white" } );
/**
 * Miscel Variables, Constants, and Functions
 */
var backArrowPic = "assets/back.png";
var scanPic = "assets/scan.png";
var scanHelperPic = "assets/scan.png";
var question = "assets/question.png";
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
		new Label({left:0, right:0, width: STYLE.button.width.lg, height:40, skin: STYLE.redSkin, string:"Give Me Recommendations", style: STYLE.whiteButtonStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
	    onTouchBegan: { value: function(content){
	        content.first.skin = STYLE.darkerRedSkin;
	    }},
		onTouchEnded: { value: function(content){
		    content.first.skin = STYLE.redSkin;
			mainContainer.run( new TRANSITIONS.Push(), upsellingColumn, recommendedColumn, { direction : "left", duration : 400 } );
		}}
	})
	
}
//trace("we are in recommendedButton");
});

var upsellingButton = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the main Upselling view
	left: 0, right: 0, height:40, top: 0, width: 350,
	contents: [
		new Line({
	        left:0, right:0, top:0, skin:STYLE.redSkin,
	        contents: [
	            new Picture({left:-5, height:20, url:"assets/back.png", active:true,
	                behavior: Object.create(Behavior.prototype, { 
				        onTouchBegan: { value: function(content){
				           content.url = "assets/back-dark.png";
				        }},
				        onTouchEnded: { value: function(content){
				            content.url = "assets/back.png";
				            mainContainer.run( new TRANSITIONS.Push(), recommendedColumn, upsellingColumn, { direction : "right", duration : 400 } );
						}}
					})
	            }),
	            new Label({height:40, string:"Back to My Item", style:STYLE.headerTitleStyle}),
	        ]
	    }),
	],
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
		new Line({
	        left:0, right:0, top:0, skin:STYLE.redSkin,
	        contents: [
	            new Picture({left:-5, height:20, url:"assets/back.png", active:true,
	                behavior: Object.create(Behavior.prototype, { 
				        onTouchBegan: { value: function(content){
				           content.url = "assets/back-dark.png";
				        }},
				        onTouchEnded: { value: function(content){
				            content.url = "assets/back.png";
				            mainContainer.run( new TRANSITIONS.Push(), upsellingColumn, scanColumn, { direction : "right", duration : 400 } );			
						}}
					})
	            }),
	            new Label({height:40, string:"Rescan", style:STYLE.headerTitleStyle}),
	        ]
	    }),
	],

}});

var recommended_to_rescanButton = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the main Scanning view
	left: 0, right: 10, height:40, 
	contents: [
		new Label({left:0, right:0, height:40, skin: graySkin, string:"Rescan", style: whiteTextStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			mainContainer.run( new TRANSITIONS.TimeTravel(), recommendedColumn, scanColumn, { direction : "forward", duration : 400 } );

		}}
	})
}});

var location_to_rescanButton = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the main Scanning view
	top: 30, left: 10, right: 10, height:40, width: 400, skin: graySkin,
	contents: [
		new Label({left:0, right:0, width: STYLE.button.width.lg, height:40, skin: STYLE.redSkin, string:"Rescan", style: STYLE.whiteButtonStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
		    mainContainer.run( new TRANSITIONS.TimeTravel(), locationColumn, scanColumn, { direction : "forward", duration : 400 } );
	
		}}
	})
}});

var recommended_to_locationButton = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the store layout view
	left: 130, right: 60, height:30, top: 100, 
	contents: [
		new Label({left:0, right:0, height:30, skin: STYLE.redSkin, string:"Find item", style: STYLE.buttonStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTouchBegan: { value: function(content){
            content.first.skin = STYLE.darkerRedSkin;
        }},
        onTouchEnded: { value: function(content){
            content.first.skin = STYLE.redSkin;
		    mainContainer.run( new TRANSITIONS.Push(), recommendedColumn, locationColumn, { direction : "left", duration : 400 } );
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

var location_to_recommended = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the main Upselling view
	top:0, left: 0, right: 0, height:40, width: 350, skin: graySkin,
	contents: [
	    new Line({
	        left:0, right:0, top:0, skin:STYLE.redSkin,
	        contents: [
	            new Picture({left:-5, height:20, url:"assets/back.png", active:true,
	                behavior: Object.create(Behavior.prototype, { 
				        onTouchBegan: { value: function(content){
				           content.url = "assets/back-dark.png";
				        }},
				        onTouchEnded: { value: function(content){
				            content.url = "assets/back.png";
			                mainContainer.run( new TRANSITIONS.Push(), locationColumn, recommendedColumn, { direction : "right", duration : 400 } );
						}}
					})
	            }),
	            new Label({height:40, string:"Back", style:STYLE.headerTitleStyle}),
	        ]
	    }),
	],
}});  
   
var location_to_inventory = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the main Upselling view
	top: 75, left: 10, right: 10, height:40, width: 350, skin: graySkin,
	contents: [
		new Label({left:0, right:0, height:40, skin: STYLE.redSkin, string:"Done Upselling", style: STYLE.whiteButtonStyle})
		
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			application.run(new TRANSITIONS.TimeTravel(), mainContainer, main, { direction : "forward", duration : 400 });
		}}
	})
}}); 

var scan_to_inventory = BUTTONS.Button.template(function($){ return{ //when pressed, it directs you to the main Upselling view
	top: 0, left: 0, right: 0, height:40, width: 350, skin: graySkin,
	contents: [
        new Line({
	        left:0, right:0, top:0, skin:STYLE.redSkin,
	        contents: [
	            new Picture({left:-5, height:20, url:"assets/back.png", active:true,
	                behavior: Object.create(Behavior.prototype, { 
				        onTouchBegan: { value: function(content){
				           content.url = "assets/back-dark.png";
				        }},
				        onTouchEnded: { value: function(content){
				            content.url = "assets/back.png";
				            application.remove(mainContainer);
							application.add(main);
						}}
					})
	            }),
	            new Label({height:40, string:"Back to Inventory", style:STYLE.headerTitleStyle}),
	        ]
	    }),
	],
}});


/**
 * Main container
 */
var mainContainer = new Container({
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin
});

exports.mainContainer = mainContainer;

/**
* Alert Container -- What is Upselling? 
*/


var alertContainer = new Container({
	left: 10, right: 10, top: 350, bottom: 0, active:true, skin: STYLE.whiteSkin,
	contents: [
	    new Line({left:0, right:0, top:10, skin: STYLE.whiteSkin,
	        contents: [
	            new Picture({left:13, top:3, height:50, width:50, url:"assets/exclaim.png"}),
	            new Line({left:0, top:0, height:25, string:"Upselling helps you find", style:STYLE.textStyle}),
	            new Line({left:0, top:10, height:25, string:"the right recommendations for your customer", style:STYLE.textStyle}),
           		new Line({left:0, top:20, height:25, string:"based on a given item", style:STYLE.textStyle})
	        ]
	    }),
	]
});

/**
 * Scan Screen
 */

 var upsellQuestion = new Line({left:0, right:0, top:0, height: STYLE.header.height, skin: STYLE.redSkin,
            contents: [new Container({ left: 10, top: 10, active:true,
				contents: [
					new Picture({height: 40, width: 40, right: 0, left: 0, top: 0, name: "question", url: question})],
					behavior: Object.create(Container.prototype, {
						onTouchEnded: { value: function(container) {
							application.remove(mainContainer);
							application.add(main);
				}}}) }) ] });
			

var scanColumn = new Column({
    left:0, right:0, top:0, bottom:0, skin: STYLE.whiteSkin,
    contents: [
        new scan_to_inventory(),
        new Container({ left: 15, right: 10, top: 30, active:true,
	contents: [
		new Picture({height: 300, width: 130, right: 0, left: 0, top: 10, name: "scanner", url: scanHelperPic}),
		new Text({left: 10,right:0, top:30, height:30, style: new Style( {font: "25px", color: "gray" } ), string:"Place Phone Near SmartTag"}),
		
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
    //new Text({left: 10,right:0, top:10, height:30, string:"Place Phone Near SmartTag", style: scanTextStyle}),
    //new Picture({height: 64, width: 128, right: 0, left: 0, top: 0, name: "scan-helper", url: scanHelperPic}),
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
    left:0, top:0, width: 350, bottom:0, skin: whiteSkin,
    contents: [
    	new upselling_to_rescanButton,
        new Line({left:0, right:0, top:0, name:"displayName",
            contents: [
            new Label({left:0, right:15, top:10, height:40, width: 350, string:"", style:new Style({color: "gray", horizontal: "center", font: "30px"}) }) ]
            
        }),
        new Container({ name:"displayItem", left: 0, right: 0, top: 0, bottom: 0, active:true, skin: whiteSkin,
	        contents: [
		        new Picture({height: 350, width: 360, right: 20, left: 0, top: 20, url: displayItem(scannedItems)}),
		        new Label({left:45, bottom: 5, height:40, width: 350, string:"Price: $15", style:new Style({color: "green", font: "20px"}) }),
		        new Label({left:150, bottom: 5, height:40, width: 350, string:"Num. of Stocks: 1!", style:new Style({color: "#5C0B0B", font: "20px"}) })
            ]
        }),
    	new Label({name:"price", top: 50, left:0, right:0, bottom: 250, height:40, string:"Price: " + displayPrice(scannedItems), style: textStyle}),
    	new Label({name:"itemName", left:0, right:10, height:40, bottom: 340, string:"", style: titleStyle}),
    	
    	//new upsellButton(),
    	new recommendedButton({bottom: 0, width: 500}),
    	
    ],
    behavior: Object.create(Container.prototype, {
		onDisplaying: { value: function(content) {
		    content.displayName.first.string = displayName(scannedItems);
		    content.displayItem.first.url = displayItem(scannedItems);
		    content.price.string = "Price: " + displayPrice(scannedItems);
		}},
    })
});

exports.upsellingColumn = upsellingColumn;

/**
 * Recommended Items View 
 */ 
 
 var recommendedColumn = new Column({
    left:0, right:0, top:0, bottom:0, skin: whiteSkin,
    contents: [
    	new upsellingButton,
        new Line({left:0, right:0, top:0,
            contents: [new Label({top:20, height:40, left: 40, width: 350, string:"Recommended Items", style: recommendedStyle})]
        }),
        new Container({ name:"imgOne", left: 10, right: 10, top: 20, active:true, backgroundTouch:true, skin: whiteSkin,
	contents: [ 
		new Picture({height: 150, width: 180, right: 200, left: 0, top: 0, name: "displayRecommendedItem1", url: IMGS[1]}), //need to create a function that will generate a list of items excluding the one that is scanned
		new Label({name: "price", top: 0, left:130, height:40, string:"Price: $" + PRICES[1], style: textStyle}),
		new Label({name: "itemName", top: 30, left: 130, height:40, string:NAMES[1], style: textStyle}),
		new Label({top: 60, left:130, height:40, string:"Bestselling item!", style: STYLE.storageItemNameStyle}),
		new recommended_to_locationButton({top: 20, left: 130}),
    ],
        behavior: Object.create(Behavior.prototype, {
            onTouchBegan: { value: function(content) {
                locationColumn.behavior = new MapBehavior(mapItem);
            }},
        })
    }),
    	new Line({ top: 10, left: 0, right: 0, height: 1, skin: STYLE.separatorSkin, }),
    	new Container({ name:"imgTwo", left: 10, right: 10, top:10, active:true, backgroundTouch:true, skin: whiteSkin,
	contents: [ 
		new Picture({height: 150, width: 180, right: 200, left: 0, top: 0, name: "displayRecommendedItem2", url: IMGS[2]}), //need to create a function that will generate a list of items excluding the one that is scanned
		new Label({name: "price", top: 0, left:130, height:40, string:"Price: $" + PRICES[2], style: textStyle}),
		new Label({name: "itemName", top: 30, left:130, height:40, string:NAMES[2], style: textStyle}),
		new recommended_to_locationButton({left: 130}),
		
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
		    content.imgOne.price.string = "Price: $" + recOne.price;
		    content.imgOne.itemName.string = recOne.name;
		    content.imgTwo.displayRecommendedItem2.url = recTwo.img;
		    content.imgTwo.price.string = "Price: $" + recTwo.price;
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
    // width 40 to 200
    return 40 + x*200/100;
}

function y(y) {
    // height 0 to 250
    return y*250/100;
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
    	new location_to_recommended(),
        new Line({left:0, right:0, top:0,
            contents: [new Label({left: 90, top:20, height:30, string:"Store Layout", style:recommendedStyle})]
        }),
        new Container({ name:"imgs", left: 0, right: 0, top: 10, active:true,
	contents: [
		new Picture({height: 300, width: 410, right: 0, left: 0, top: 0, name: "store", url: storePic}),
		new Picture({height: 30, width: 30, right: 200, top: 250, name: "arrow", url: arrowPic})
    ]
    }),
    	new Container({ name: "legend", left: 0, right: 0, top: 10, active:true,
    contents: [
    	new Line({ top: 10, left: 0, right: 0, height: 1, skin: STYLE.separatorSkin, }),
    	new location_to_rescanButton(),
    	new location_to_inventory()
    	]
  	})
    ],
});

//application.behavior = new ApplicationBehavior();
mainContainer.add(scanColumn);
//application.add(mainContainer);
