/**
 * Skins
 */
var whiteGrayRightSkin = new Skin( { fill:"white", borders:{right:1}, stroke:"#D6D6D6" } );
var whiteGrayBoxSkin = new Skin( { fill:"white", borders:{left:1, right:1, top:1, bottom:1}, stroke:"#D6D6D6" } );
var grayTransparentSkin = new Skin( { fill:"#7f2B2B2B" } );
 
/**
 * Styles
 */
var altTextStyle = new Style( { font:"17px", color:"#FF4136" } );
var darkerTextStyle = new Style( { font:"17px", color:"#595959" } );
var hintStyle = new Style( { font:"17px", color:"#D6D6D6" } );
var redTitleStyle = new Style( { font:"25px", color:"#881212" } );
 
/**
 * Miscel Variables, Constants, and Functions
 */
var X = 30, Y = 50;
var THUMBNAILS = ["assets/white-tee-thumbnail.jpg", "assets/hat-thumbnail.jpg", "assets/shorts-thumbnail.jpg", "assets/blazer-thumbnail.jpg"];
var PRICES = [15, 40, 45, 75];
var NAMES = ["Zara Men's White Tee", "New Era Snapback", "Sperry Print Shorts", "J. Crew Blazer"];
var theft = false;
var stolenItems = [];
var detectedItems = [];
function numItems(items) {
    var count = 0;
    for(var i = 0; i < items.length; i++) {
        if(items[i] == 1) {
            count++;
        }
    }    
    return count;
}

function sumItems(items) {
    var sum = 0;
    for(var i = 0; i < items.length; i++) {
        if(items[i] == 1) {
            sum+=PRICES[i];
        }
    }    
    return sum;
}

/**
 * Handlers to check for theft
 */
Handler.bind("/theftCheck", {
    onInvoke: function(handler, message) {
        if(deviceURL != "") handler.invoke(new Message(deviceURL + "stolenTiles"), Message.JSON);
        else handler.invoke(new Message("/delay2"));
    },
    onComplete: function(handler, message, json) {
        if(json && json.validTiles.indexOf(1) != -1 && !theft) {
            //polling should continue and data should update properly, but there shouldn't be multiple theft alerts at once
            //the above is only implemented so far for the alert screen, for others we act as if data is static once screen
            //is displayed <-- this should be changed later 
            theft = true;
            stolenItems = json.validTiles;
            mainContainer.empty();
            //mainContainer.add(templateColumn);
            mainContainer.add(theftAlertContainer);
            application.add(mainContainer);
        } else if(json && (numItems(stolenItems) != numItems(json.validTiles))) {
            stolenItems = json.validTiles;
        }
        handler.invoke(new Message("/delay2"));
    }
});

Handler.bind("/delay2", {
    onInvoke: function(handler, message) {
        handler.wait(500);
    },
    onComplete: function(handler, message, json) {
        handler.invoke(new Message("/theftCheck"));
    }
});

Handler.bind("/scan", {
    onInvoke: function(handler, message) {
        if(deviceURL != "") handler.invoke(new Message(deviceURL + "scanTiles"), Message.JSON);
    },
    onComplete: function(handler, message, json) {
        if(json) detectedItems = json.validTiles;
    }
});

var detected = false;
function placeDetectItemsButton() {
    if(!detected) {
	    if(Math.abs(mapX(X) - mapContainer.tileone.coordinates.left) <= 5 && Math.abs(mapY(Y) - mapContainer.tileone.coordinates.bottom) <= 5) {
	        detected = true;
	        theftMapColumn.add(detectItemsButton);
	    } else if(Math.abs(mapX(X) - mapContainer.tiletwo.coordinates.left) <= 5 && Math.abs(mapY(Y) - mapContainer.tiletwo.coordinates.bottom) <= 5) {
	        detected = true;
	        theftMapColumn.add(detectItemsButton);
	    } else if(Math.abs(mapX(X) - mapContainer.tilethree.coordinates.left) <= 5 && Math.abs(mapY(Y) - mapContainer.tilethree.coordinates.bottom) <= 5) {
	        detected = true;
	        theftMapColumn.add(detectItemsButton);
	    } else if(Math.abs(mapX(X) - mapContainer.tilefour.coordinates.left) <= 5 && Math.abs(mapY(Y) - mapContainer.tilefour.coordinates.bottom) <= 5) {
	        detected = true;
	        theftMapColumn.add(detectItemsButton);
	    }
	} else {
	    if((Math.abs(mapX(X) - mapContainer.tileone.coordinates.left) > 5 || Math.abs(mapY(Y) - mapContainer.tileone.coordinates.bottom) > 5) &&
	        (Math.abs(mapX(X) - mapContainer.tiletwo.coordinates.left) > 5 || Math.abs(mapY(Y) - mapContainer.tiletwo.coordinates.bottom) > 5) &&
	        (Math.abs(mapX(X) - mapContainer.tilethree.coordinates.left) > 5 || Math.abs(mapY(Y) - mapContainer.tilethree.coordinates.bottom) > 5) &&
	        (Math.abs(mapX(X) - mapContainer.tilefour.coordinates.left) > 5 || Math.abs(mapY(Y) - mapContainer.tilefour.coordinates.bottom) > 5)) {
            detected = false;
            theftMapColumn.remove(detectItemsButton);
        }
	}
}

Handler.bind("/mapStolenOne", {
    onInvoke: function(handler, message) {
        if(deviceURL != "") handler.invoke(new Message(deviceURL + "tileOneCord"), Message.JSON);
    },
    onComplete: function(handler, message, json) {
        if(json) {
            mapContainer.tileone.coordinates = { left: mapX(json.validTiles[0]), bottom: mapY(json.validTiles[1]) };
        }
    }
});

Handler.bind("/mapStolenTwo", {
    onInvoke: function(handler, message) {
        if(deviceURL != "") handler.invoke(new Message(deviceURL + "tileTwoCord"), Message.JSON);
    },
    onComplete: function(handler, message, json) {
        if(json) {
            mapContainer.tiletwo.coordinates = { left: mapX(json.validTiles[0]), bottom: mapY(json.validTiles[1]) };
        }
    }
});

Handler.bind("/mapStolenThree", {
    onInvoke: function(handler, message) {
        if(deviceURL != "") handler.invoke(new Message(deviceURL + "tileThreeCord"), Message.JSON);
    },
    onComplete: function(handler, message, json) {
        if(json) {
            mapContainer.tilethree.coordinates = { left: mapX(json.validTiles[0]), bottom: mapY(json.validTiles[1]) };
        }
    }
});

Handler.bind("/mapStolenFour", {
    onInvoke: function(handler, message) {
        if(deviceURL != "") handler.invoke(new Message(deviceURL + "tileFourCord"), Message.JSON);
    },
    onComplete: function(handler, message, json) {
        if(json) {
            mapContainer.tilefour.coordinates = { left: mapX(json.validTiles[0]), bottom: mapY(json.validTiles[1]) };
        }
    }
});

/**
 * Main container
 */
var mainContainer = new Container({
	left: 0, right: 0, top: 0, bottom: 0, skin: grayTransparentSkin
});

/**
 * Theft Alert Screen
 */
var policeButton = new Line({left:0, right:0, top:0, active:true,
    contents: [
        new Picture({name:"pic", left:0, top:8, height:35, width:40, url:"assets/wifi-light.png"}),
        new Label({name:"label", left:5, top:15, height:20, string:"NOTIFY POLICE", style:STYLE.textStyle}),
    ]
});

policeButton.behavior = Object.create(Behavior.prototype, {
    onTouchBegan: { value: function(content, id, x, y, ticks){
		content.label.style = darkerTextStyle;
		content.pic.url = "assets/wifi.png";
	}},
	onTouchEnded: { value: function(content, id, x, y, ticks){
        content.label.style = STYLE.textStyle;
        content.pic.url = "assets/wifi-light.png";
        //mainContainer.run(new TRANSITIONS.TimeTravel(), theftAlertContainer, theftMapColumn, { direction : "forward", easeType : "sineEaseIn", duration : 300 });
	}}
});

var mapButton = new Line({left:0, right:0, top:0, active:true,
    contents: [
        new Picture({name:"pic", left:0, top:10, height:30, width:40, url:"assets/map-light.png"}),
        new Label({name:"label", left:0, top:15, height:20, string:"MAP", style:STYLE.textStyle}),
    ]
});

mapButton.behavior = Object.create(Behavior.prototype, {
    onTouchBegan: { value: function(content, id, x, y, ticks){
		content.label.style = darkerTextStyle;
		content.pic.url = "assets/map.png";
	}},
	onTouchEnded: { value: function(content, id, x, y, ticks){
        content.label.style = STYLE.textStyle;
        content.pic.url = "assets/map-light.png";
        mainContainer.run(new TRANSITIONS.TimeTravel(), theftAlertContainer, theftMapColumn, { direction : "forward", easeType : "sineEaseIn", duration : 300 });
	}}
});

var alertButtons = new Line({left:35, right:0, top:85, skin:STYLE.whiteGrayTopSkin, 
    contents: [policeButton, mapButton]
}); 

var alertInfoColumn = new Column({
    left:20, right:0, top:0, bottom:0,
    contents: [
        new Line({left:0, right:0, top:0,
            contents: [new Label({left:0, top:0, height:25, string:"Theft Alert", style:STYLE.titleStyle}),]
        }),
        new Line({left:0, right:0, top:0, name:"count",
            contents: [new Label({left:0, top:0, height:18, style:altTextStyle}),]
        }),
        new Line({left:0, right:0, top:0, name:"value",
            contents: [new Label({left:0, top:0, height:18, style:STYLE.textStyle}),]
        }),
    ]
});

alertInfoColumn.behavior = Object.create(Behavior.prototype, {
    onDisplaying: { value: function(content){
        var count = numItems(stolenItems);
        content.start();
        content.interval = 500;
        if(count == 0) {
            application.remove(mainContainer);
            theft = false;       
        } else if (count == 1) {
            content.count.first.string = count + " Stolen Item";
        } else {
            content.count.first.string = count + " Stolen Items";
        } 
		content.value.first.string = "$" + sumItems(stolenItems) + " Value";
    }},
    onTimeChanged: { value: function(content){
        var count = numItems(stolenItems);
		if(count == 0) {
		    application.remove(mainContainer);
            theft = false;
        } else if (count == 1) {
            content.count.first.string = count + " Stolen Item";
        } else {
            content.count.first.string = count + " Stolen Items";
        } 
		content.value.first.string = "$" + sumItems(stolenItems) + " Value";
    }},
});

var theftAlertContainer = new Container({
	left: 10, right: 10, top: 200, bottom: 200, active:true, skin: STYLE.whiteSkin,
	contents: [
	    new Line({left:0, right:0, top:10, skin: STYLE.whiteSkin,
	        contents: [
	            new Picture({left:13, top:3, height:50, width:50, url:"assets/exclaim.png"}),
	            alertInfoColumn
	        ]
	    }),
	    alertButtons
	]
});
 
/**
 * Map Screen
 */
function mapX(x) {
    //maps 0-100 to 0-290
    return x*290/100;
}

function mapY(y) {
    //maps 0-100 to 10-260
    return 10 + y*250/100;
}

function displayLocationMarkers(content) {
    if(stolenItems[0]) {
        mapContainer.tileone.visible = true;
        content.invoke(new Message("/mapStolenOne"));
    } else {
        mapContainer.tileone.visible = false;
    }
    if(stolenItems[1]) {
        mapContainer.tiletwo.visible = true;
        content.invoke(new Message("/mapStolenTwo"));
    } else {
        mapContainer.tiletwo.visible = false;
    }
    if(stolenItems[2]) {
        mapContainer.tilethree.visible = true;
        content.invoke(new Message("/mapStolenThree"));
    } else {
        mapContainer.tilethree.visible = false;
    }
    if(stolenItems[3]) {
        mapContainer.tilefour.visible = true;
        content.invoke(new Message("/mapStolenFour"));
    } else {
        mapContainer.tilefour.visible = false;
    }
    placeDetectItemsButton();
}
 
var mapContainer = new Container({
    left:0, right:0, top:0, bottom:0, skin: STYLE.whiteSkin,
    contents: [
        new Picture({left:0, right:0, top:0, height:300, url:"assets/streetmap.png"}),
        new Picture({left:mapX(X), bottom:mapY(Y), width:30, height:30, url:"assets/location-blue.png"}),
        new Picture({name:"tileone", left:mapX(0), bottom:mapY(0), width:30, height:30, url:"assets/location-red.png"}),
        new Picture({name:"tiletwo", left:mapX(0), bottom:mapY(0), width:30, height:30, url:"assets/location-red.png"}),
        new Picture({name:"tilethree", left:mapX(0), bottom:mapY(0), width:30, height:30, url:"assets/location-red.png"}),
        new Picture({name:"tilefour", left:mapX(0), bottom:mapY(0), width:30, height:30, url:"assets/location-red.png"}),    
    ]
});

mapContainer.behavior = Object.create(Behavior.prototype, {
    onDisplaying: { value: function(content) {
        displayLocationMarkers(content);
        content.start();
    }},
    onTimeChanged: { value: function(content) {
        displayLocationMarkers(content);
    }}
});

var detectItemsButton = new Line({left:10, right:10, top:45, bottom:10, skin: STYLE.redSkin, active:true,
    contents: [
        new Label({left:0, right:0, height:40, string:"Detect Stolen Items on Thief", style:STYLE.whiteButtonStyle}),
    ],
    behavior: Object.create(Behavior.prototype, { 
        onTouchBegan: { value: function(content, id, x, y, ticks){
            if(deviceURL != "") content.invoke(new Message("/scan"));
            content.skin = STYLE.darkerRedSkin;
        }},
        onTouchEnded: { value: function(content, id, x, y, ticks){
	        content.skin = STYLE.redSkin;
	        mainContainer.run( new TRANSITIONS.Push(), theftMapColumn, theftDetectionColumn, { direction : "left", duration : 400 } );
		}},
	})
});
 
var theftMapColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active:true, skin: STYLE.whiteSkin,
	contents: [
	    new Line({left:0, right:0, top:0, skin:STYLE.redSkin,
	        contents: [
	            new Label({left:10, top:5, height:40, string:"Thief Map", style:STYLE.whiteButtonStyle}),
	        ]
	    }),
	    new Line({left:0, right:0, top:0,
	        contents: [mapContainer]
	    }),
	    new Line({left:0, right:0, top:0, skin: STYLE.whiteGrayBottomSkin,
	        contents: [
	            new Picture({left:10, top:0, bottom:10, width:30, height:30, url:"assets/location-red.png"}),
	            new Label({left:20, top:0, bottom:0, string:"Stolen Item", style:STYLE.textStyle}),
	        ]
	    }),
	    new Line({left:0, right:0, top:0, skin: STYLE.whiteGrayBottomSkin,
	        contents: [
	            new Picture({left:10, top:10, bottom:10, width:30, height:30, url:"assets/location-blue.png"}),
	            new Label({left:20, top:0, bottom:0, string:"Current Location", style:STYLE.textStyle}),
	        ]
	    }),
	],
});
 
/**
 * Stolen Item Detecting Screen
 */
var DetectionLine = Line.template(function($) { return {
    left:0, right:0, top:0, skin: STYLE.whiteGrayTopSkin,
    contents: [
        Picture($, {left:10, top:10, bottom:10, width:60, height:80, url:$.picURL}),
        Column($, {
            left:20, right:0, top:10, bottom:0,
            contents: [
                Label($, {left:0, top:0, height:30, string:$.name, style:STYLE.titleStyle}),
                Label($, {left:0, top:0, height:20, string:"Quantity: " + $.quantity, style:STYLE.textStyle}),
            ]
        }),
        Picture($, {right:15, bottom:8, width:40, height:40, url:"assets/wifi.png"}),
    ],
}});

var theftDetectionColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active:true, skin: STYLE.whiteSkin,
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
				            mainContainer.run( new TRANSITIONS.Push(), theftDetectionColumn, theftMapColumn, { direction : "right", duration : 400 } );
						}}
					})
	            }),
	            new Label({left:-5, top:5, height:40, string:"Detected Items", style:STYLE.whiteButtonStyle}),
	        ]
	    }),
	    new Column({ name:"items", left:0, right:0, top:0, skin: STYLE.whiteSkin}),
	    new Line({left:50, right:50, top:20, skin: STYLE.redSkin, active:true,
	        contents: [
	            new Label({left:0, right:0, height:40, string:"Done", style:STYLE.whiteButtonStyle}),
	        ],
	        behavior: Object.create(Behavior.prototype, { 
	            onTouchBegan: { value: function(content, id, x, y, ticks){
		            content.skin = STYLE.darkerRedSkin;
	            }},
	            onTouchEnded: { value: function(content, id, x, y, ticks){
	                content.skin = STYLE.redSkin;
			        mainContainer.run( new TRANSITIONS.Push(), theftDetectionColumn, theftConfirmationColumn, { direction : "left", duration : 400 } );
				}},
			})
	    }),
	]
});

theftDetectionColumn.behavior = Object.create(Behavior.prototype, {
    onDisplaying: { value: function(content){
        quantityOverride = {};
        theftDetectionColumn.items.empty();
        var items = {};
        content.start();
        content.interval = 500;
        if(stolenItems.length > 0) {
            for(var i = 0; i < detectedItems.length; i++) {
                if(detectedItems[i] && stolenItems[i]) {
                     var name = NAMES[i];
                     if(name in items) {
                         items[name].quantity++;
                     } else {
                         items[name] = { thumbnail: THUMBNAILS[i], quantity: 1 };
                     }
                }        
            }
        }
        for (var itemName in items) {
            theftDetectionColumn.items.add(new DetectionLine({ 
                picURL:items[itemName].thumbnail, name: itemName, quantity: items[itemName].quantity 
            }));
        }        
    }},
    /*onTimeChanged: { value: function(content){
        if(deviceURL != "") handler.invoke(new Message(deviceURL + "scanTiles"), Message.JSON);
    }},
    onComplete: { value: function(content, message, json){
        if(json) {
            detectedItems = json.validTiles;
        }
    }},*/
}); 

/**
 * Confirmation Screen
 */
var quantityOverride = {};
var QuantityField = Container.template(function($) { return {
  left:0, right:0, skin: STYLE.whiteGrayTopSkin, contents: [
    Scroller($, { 
      left: 0, right:0, top: 0, bottom:0, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 10, height:40, skin: THEME.fieldLabelSkin, style: STYLE.textStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         	    onFocused: { value: function(label){
         	        KEYBOARD.show();
         	        theftConfirmationColumn.details.visible = false;
         	        theftConfirmationColumn.done.visible = false;
         	    }},
         		onEdited: { value: function(label){
         			var data = this.data;
         			data.name = label.string;
         			var newQuantity = new Object();
         			newQuantity[$.recoverOrLost] = ( data.name.length == 0 ) ? 0 : data.name;
                    label.container.hint.visible = ( data.name.length == 0 );
                    quantityOverride[$.itemName] = newQuantity;
         		}}
         	}),
         }),
         Picture($, {
             right:0, height:30, url:"assets/edit.png"
         }),
         Label($, {
   			 left:5, style:hintStyle, string:"Tap to edit", name:"hint"
         }),
      ]
    })
  ]    
}});

var Header = Line.template(function($) { return {
    left:0, right:0, top:0,
	contents: [
	    Label($, {left:10, top:0, height:40, string:$.header, style:STYLE.textStyle}),
	]
}});

var Name = Line.template(function($) { return {
    left:1, right:1, top:0, bottom:1, skin: STYLE.whiteGrayTopSkin,
	contents: [
	    Label($, {left:10, top:0, height:40, string:$.name, style:STYLE.textStyle}),
	]
}});

var Quantity = Line.template(function($) { return {
    left:1, right:1, top:0, bottom:1, skin: STYLE.whiteGrayTopSkin,
	contents: [
	    new QuantityField({ name: $.quantity, itemName: $.item, recoverOrLost: $.recoverOrLost }),
	]
}});

var recoveredItemName = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: whiteGrayBoxSkin,
});

var recoveredItemQuantity = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: whiteGrayBoxSkin,
});

var lostItemName = new Column({
    left: 0, right: 0, top: 0, skin: whiteGrayBoxSkin,
});

var lostItemQuantity = new Column({
    left: 0, right: 0, top: 0, skin: whiteGrayBoxSkin,
});

var theftConfirmationColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active:true, skin: STYLE.whiteSkin,
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
			                mainContainer.run( new TRANSITIONS.Push(), theftConfirmationColumn, theftDetectionColumn, { direction : "right", duration : 400 } );
						}}
					})
	            }),
	            new Label({left:-5, top:5, height:40, string:"Confirmation", style:STYLE.whiteButtonStyle}),
	        ]
	    }),
	    new Line({left:0, right:0, top:5,
	        contents: [
	            new Label({left:10, top:0, height:40, string:"Items Recovered", style:redTitleStyle}),
	        ]
	    }),
	    new Line({left:5, right:5, top:0, skin: STYLE.whiteSkin,
	        contents: [recoveredItemName, recoveredItemQuantity]
	    }),
	    new Line({left:0, right:0, top:5,
	        contents: [
	            new Label({left:10, top:0, height:40, string:"Items Lost", style:redTitleStyle}),
	        ]
	    }),
	    new Line({left:5, right:5, top:0, bottom:0, skin: STYLE.whiteSkin,
	        contents: [lostItemName, lostItemQuantity]
	    }),
	    new Line({name:"details", left:10, right:10, bottom:5, skin:STYLE.redSkin, active:true,
	        contents: [
	            new Label({left:0, right:0, height:40, string:"Item Details", style:STYLE.whiteButtonStyle}),
	        ],
	        behavior: Object.create(Behavior.prototype, { 
		        onTouchBegan: { value: function(content, id, x, y, ticks){
		            content.skin = STYLE.darkerRedSkin;
		        }},
		        onTouchEnded: { value: function(content, id, x, y, ticks){
		            content.skin = STYLE.redSkin;
		            mainContainer.run( new TRANSITIONS.Push(), theftConfirmationColumn, theftDetailsColumn, { direction : "left", duration : 400 } );
				}}
			})
	    }),
	    new Line({name:"done", left:10, right:10, bottom:10, skin:STYLE.redSkin, active:true,
	        contents: [
	            new Label({left:0, right:0, height:40, string:"Done", style:STYLE.whiteButtonStyle}),
	        ],
	        behavior: Object.create(Behavior.prototype, { 
		        onTouchBegan: { value: function(content, id, x, y, ticks){
		            content.skin = STYLE.darkerRedSkin;
		        }},
		        onTouchEnded: { value: function(content, id, x, y, ticks){
		            content.skin = STYLE.redSkin;
		            mainContainer.add(theftConfirmationDialogContainer);
				}}
			})
	    }),
	]
});

function addNamesAndQuantities() {
    recoveredItemName.empty();
    recoveredItemQuantity.empty();
    lostItemName.empty();
    lostItemQuantity.empty();
    recoveredItemName.add(new Header({ header: "Item Name" }));
    recoveredItemQuantity.add(new Header({ header: "Quantity" }));
    lostItemName.add(new Header({ header: "Item Name" }));
    lostItemQuantity.add(new Header({ header: "Quantity" }));
    var recoveredItems = {};
    var lostItems = {};
    if(stolenItems.length > 0) {
        for(var i = 0; i < stolenItems.length; i++) {
            if(stolenItems[i]) {
                var name = NAMES[i];
                if(detectedItems[i]) {
                    if(name in recoveredItems) recoveredItems[name].quantity++;
                    else recoveredItems[name] = { quantity: 1 };
                } else {
                    if(name in lostItems) lostItems[name].quantity++;
                    else lostItems[name] = { quantity: 1 };
                }
            }
        }
    }
    for(var override in quantityOverride) {
        if("recovered" in quantityOverride[override]) {
            recoveredItems[override] = { quantity: quantityOverride[override]["recovered"] }; 
        }
        if("lost" in quantityOverride[override]) {
            lostItems[override] = { quantity: quantityOverride[override]["lost"] };
        }
    }
    // Recovered item names and quantities
    for(var recoveredItem in recoveredItems) {
        recoveredItemName.add(new Name({ name: recoveredItem }));
        recoveredItemQuantity.add(new Quantity({ 
           quantity: recoveredItems[recoveredItem].quantity, item: recoveredItem, recoverOrLost: "recovered"
        }));
    }
    // Lost item names and quantities
    for(var lostItem in lostItems) {
        lostItemName.add(new Name({ name: lostItem }));
        lostItemQuantity.add(new Quantity({ 
            quantity: lostItems[lostItem].quantity, item: lostItem, recoverOrLost: "lost"
        }));
    }
}

theftConfirmationColumn.behavior = Object.create(Behavior.prototype, {
    onDisplaying: { value: function(content) {
        addNamesAndQuantities();
    }},
    onTouchEnded: { value: function(content) {
        KEYBOARD.hide();
        content.focus();
        theftConfirmationColumn.details.visible = true;
        theftConfirmationColumn.done.visible = true;
    }}
});

/**
 * Confirmation Dialog
 */
var theftConfirmationDialog = new Column({
    left: 10, right: 10, top: 200, bottom: 200, active:true, skin: STYLE.whiteSkin,
    contents: [
	    new Line({left:0, right:0, top:0, bottom:0, skin: STYLE.whiteGrayBottomSkin,
	        contents: [
	            new Label({left:20, right:0, top:0, bottom:0, height:40, string:"Are you sure?", style:STYLE.textStyle}),
	        ]
	    }),
	    new Line({left:0, right:0, top:0, bottom:0,
	        contents: [
	            new Label({left:60, right:0, top:0, bottom:0, height:10, skin: whiteGrayRightSkin, active:true,
	               string:"No", style:STYLE.textStyle,
	                behavior: Object.create(Behavior.prototype, { 
				        onTouchBegan: { value: function(content, id, x, y, ticks){
				        }},
				        onTouchEnded: { value: function(content, id, x, y, ticks){
				            mainContainer.remove(theftConfirmationDialogContainer);
						}}
					})
	            }),
	            new Label({left:60, right:0, top:0, bottom:0, height:10, active:true,
	                string:"Yes", style:STYLE.textStyle,
	                behavior: Object.create(Behavior.prototype, {
	                    onTouchBegan: { value: function(content, id, x, y, ticks){
				        }},
				        onTouchEnded: { value: function(content, id, x, y, ticks){
				            mainContainer.remove(theftConfirmationDialogContainer);
				            theft = false;
				            application.remove(mainContainer);
						}}
					})
	            }),
	        ]
	    }),        
    ],
});

var theftConfirmationDialogContainer = new Container({
    left: 0, right: 0, top: 0, bottom: 0, skin: grayTransparentSkin,
    contents: [theftConfirmationDialog]
});

/**
 * Item Details Screen
 */
var DetailLine = Line.template(function($) { return {
    left:0, right:0, top:0, skin: STYLE.whiteGrayBottomSkin,
    contents: [
        Picture($, {left:10, top:0, bottom:5, width:60, height:100, url:$.picURL}),
        Column($, {
            left:20, right:0, top:5, bottom:0, name: "details",
            contents: [
                Label($, {left:0, top:0, height:30, string:$.name, style:STYLE.titleStyle}),
                Label($, {left:0, top:0, height:20, string:$.recovered + " Recovered, " + $.lost + " Still Lost", style:STYLE.textStyle}),
                Label($, {left:0, top:0, height:20, string:"$" + $.recoveredAmt + " Recovered, $" + $.lostAmt + " Lost", style:STYLE.textStyle}),
            ]
        }),
    ],
}});

var theftDetailsColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active:true, skin: STYLE.whiteSkin,
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
				            mainContainer.run( new TRANSITIONS.Push(), theftDetailsColumn, theftConfirmationColumn, { direction : "right", duration : 400 } );
						}}
					})
	            }),
	            new Label({left:-5, top:5, height:40, string:"Item Details", style:STYLE.whiteButtonStyle}),
	        ]
	    }),
	    new Column({ name:"items", left:0, right:0, top:0, bottom:0, skin: STYLE.whiteSkin}),
	]
});

theftDetailsColumn.behavior = Object.create(Behavior.prototype, {
    onDisplaying: { value: function(content){
        theftDetailsColumn.items.empty();
        var items = {};
        //content.start();
        //content.interval = 500;
	    if(stolenItems.length > 0) {
	        for(var i = 0; i < stolenItems.length; i++) {
	            if(stolenItems[i]) {
	                var name = NAMES[i];
	                if(name in quantityOverride) {
	                    var recovered = ("recovered" in quantityOverride[name]) ? quantityOverride[name]["recovered"] : 0;
	                    var lost = ("lost" in quantityOverride[name]) ? quantityOverride[name]["lost"] : 0;
	                    items[name] = {
	                        thumbnail: THUMBNAILS[i], recoveredAmt: PRICES[i]*recovered, recoveredQuantity: recovered,
	                        lostAmt: PRICES[i]*lost, lostQuantity: lost
	                    };
	                } else if(detectedItems[i]) {
	                    if(name in items) {
	                        items[name].recoveredQuantity++;
	                        items[name].recoveredAmt += PRICES[i];
	                    } else {
	                        items[name] = { 
	                            thumbnail: THUMBNAILS[i], recoveredAmt: PRICES[i], recoveredQuantity: 1,
	                            lostAmt: 0, lostQuantity: 0
	                        };
	                    }
	                } else {
	                    if(name in items) {
	                        items[name].lostQuantity++;
	                        items[name].lostAmt += PRICES[i];
	                    } else {
	                        items[name] = { 
	                            thumbnail: THUMBNAILS[i], lostAmt: PRICES[i], lostQuantity: 1,
	                            recoveredAmt: 0, recoveredQuantity: 0
	                        };
	                    }
	                }
	            }
	        }
	    }
	    for(var item in items) {
	        var detailLine = new DetailLine({ 
                picURL: items[item].thumbnail, name: item, recovered: items[item].recoveredQuantity,
                recoveredAmt: items[item].recoveredAmt, lost: items[item].lostQuantity, lostAmt: items[item].lostAmt
            });
	        theftDetailsColumn.items.add(detailLine);
	    } 
    }}
});

//TEMPLATES
var TemplateLine = Line.template(function($) { return {
    left:0, right:0, top:0, skin: STYLE.whiteGrayBottomSkin,
    contents: [
        Picture($, {left:10, top:0, bottom:5, width:60, height:100, url:$.picURL}),
        Column($, {
            left:20, right:0, top:5, bottom:0,
            contents: [
                Label($, {left:0, top:0, height:30, string:"Some details", style:STYLE.titleStyle}),
                Label($, {left:0, top:0, height:20, string:"Some other details", style:STYLE.textStyle}),
            ]
        }),
        Container($, { 
            left:0, right:5, bottom:10, skin:STYLE.redBorderSkin, active:true,
            contents: [
                Label($, {height:30, string:"Find", style:STYLE.redButtonStyle}),
            ],
            behavior: Object.create(Behavior.prototype, { 
		        onTouchBegan: { value: function(content, id, x, y, ticks){
		            content.skin = STYLE.darkerRedBorderSkin;
		        }},
		        onTouchEnded: { value: function(content, id, x, y, ticks){
		            content.skin = STYLE.redBorderSkin;
				}}
			})
        }),
    ],
}});

var TemplateTwoLine = Line.template(function($) { return {
    left:0, right:0, top:0, skin: STYLE.whiteGrayTopSkin,
    contents: [
        Thumbnail($, {left:5, top:5, bottom:5, width:STYLE.thumbnailWidth, height:STYLE.thumbnailHeight, url:$.picURL}),
        Column($, {
            left:20, right:0, top:5, bottom:0,
            contents: [
                Label($, {left:0, top:5, height:28, string:$.name, style:STYLE.titleStyle}),
                Label($, {left:0, top:0, height:18, string:"Price Per Item: $" + $.price, style:STYLE.textStyle}),
                Label($, {left:0, top:0, height:18, string:"Quantity: " + $.quantity, style:STYLE.textStyle}),
            ]
        }),
        Picture($, {bottom:10, height:30, url:"assets/edit-dark.png"}),
    ],
}});

var templateColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active:true, skin: STYLE.whiteSkin,
	contents: [
	    new Line({left:0, right:0, top:0, skin:STYLE.redSkin,
	        contents: [
	            new Label({left:10, top:5, height:40, string:"Test Header", style:STYLE.whiteButtonStyle}),
	        ]
	    }),
	    // REPLACE WITH YOUR PICS
	    new TemplateLine({picURL: THUMBNAILS[0]}),
	    new TemplateLine({picURL: THUMBNAILS[1]}),
	    new TemplateLine({picURL: THUMBNAILS[2]}),
	    new Line({left:25, right:25, top:60, bottom:5, skin:STYLE.redSkin, active:true,
	        contents: [
	            new Label({left:0, right:0, height:40, string:"Button 1", style:STYLE.whiteButtonStyle}),
	        ],
	        behavior: Object.create(Behavior.prototype, { 
		        onTouchBegan: { value: function(content, id, x, y, ticks){
		            content.skin = STYLE.darkerRedSkin;
		        }},
		        onTouchEnded: { value: function(content, id, x, y, ticks){
		            content.skin = STYLE.redSkin;
				}}
			})
	    }),
	    new Line({left:25, right:25, bottom:30, skin:STYLE.redSkin, active:true,
	        contents: [
	            new Label({left:0, right:0, height:40, string:"Button 2", style:STYLE.whiteButtonStyle}),
	        ],
	        behavior: Object.create(Behavior.prototype, { 
		        onTouchBegan: { value: function(content, id, x, y, ticks){
		            content.skin = STYLE.darkerRedSkin;
		        }},
		        onTouchEnded: { value: function(content, id, x, y, ticks){
		            content.skin = STYLE.redSkin;
		            // REPLACE MAINCONTAINER WITH WHATEVER YOU USE TO RUN YOUR TRANSITIONS
		            mainContainer.run( new TRANSITIONS.Push(), templateColumn, templateColumnTwo, { direction : "left", duration : 400 } );
				}}
			})
	    }),
	],
});

var SearchField = Container.template(function($) { return {
  left:0, right:10, skin: STYLE.whiteGrayBottomSkin, contents: [
    Scroller($, { 
      left: 0, right:0, top: 0, bottom:0, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 10, height:40, skin: THEME.fieldLabelSkin, style: STYLE.textStyle, anchor: 'SEARCH',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         	    onFocused: { value: function(label){
         	        KEYBOARD.show();
         	    }},
         		onEdited: { value: function(label){
         			var data = this.data;
         			data.name = label.string;
                    label.container.hint.visible = ( data.name.length == 0 );
         		}}
         	}),
         }),
         Label($, {
   			 left:5, style:hintStyle, string:"Search for Items", name:"hint"
         }),
      ]
    })
  ]    
}});

var templateColumnTwo = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active:true, skin: STYLE.whiteSkin,
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
				            mainContainer.run( new TRANSITIONS.Push(), templateColumnTwo, templateColumn, { direction : "right", duration : 400 } );
						}}
					})
	            }),
	            new Label({left:-5, top:5, height:40, string:"Test Header Two", style:STYLE.whiteButtonStyle}),
	        ]
	    }),
	    new Line({
	        left:0, right:0, top:0, skin:STYLE.graySkin,
	        contents: [
	            new Container({
	                left:0, right:0, skin: STYLE.redBottomSkin,
	                contents: [
	                    new Label({left:0, right:0, top:0, bottom:0, height:40, string:"History", style:STYLE.redButtonStyle}),
	                ]
	            }),
	            new Container({
	                left:0, right:0,
	                contents: [
	                    new Label({left:0, right:0, top:0, bottom:0, height:40, string:"Inventory", style:STYLE.darkerGrayButtonStyle}),
	                    new Label({right:3, top:3, width:20, height:20, skin:STYLE.redNotificationSkin, string:"2", style:STYLE.grayButtonStyle}),
	                    
	                ]
	            }),
	            new Container({
	                left:0, right:0,
	                contents: [
	                    new Label({left:0, right:0, top:0, bottom:0, height:40, string:"Sold", style:STYLE.darkerGrayButtonStyle}),
	                ]
	            }),
	        ]
	    }),
	    new Line({
	        left:0, right:0, top:0,
	        contents: [
	            new Picture({ left:0, url:"assets/search.png" }),
	            new SearchField({name:""}),
	        ]
	    }),
	    new TemplateTwoLine({picURL: THUMBNAILS[0], name: NAMES[0], quantity: 5, price: PRICES[0] }),
	    new TemplateTwoLine({picURL: THUMBNAILS[1], name: NAMES[1], quantity: 10, price: PRICES[1] }),
	    new TemplateTwoLine({picURL: THUMBNAILS[2], name: NAMES[2], quantity: 2, price: PRICES[2] }),
	    new Line({left:210, right:10, top:60, bottom:20, skin:STYLE.redSkin, active:true,
	        contents: [
	            new Label({left:5, right:5, height:40, string:"Upselling", style:STYLE.whiteButtonStyle}),
	        ],
	        behavior: Object.create(Behavior.prototype, { 
		        onTouchBegan: { value: function(content, id, x, y, ticks){
		            content.skin = STYLE.darkerRedSkin;
		        }},
		        onTouchEnded: { value: function(content, id, x, y, ticks){
		            content.skin = STYLE.redSkin;
		            mainContainer.run( new TRANSITIONS.Push(), templateColumnTwo, templateColumn, { direction : "right", duration : 400 } );
				}}
			})
	    }),
	],
});

templateColumnTwo.behavior = Object.create(Behavior.prototype, {
    onTouchEnded: { value: function(content) {
        KEYBOARD.hide();
        content.focus();
    }}
});

// END OF TEMPLATES

application.invoke(new Message("/theftCheck"));