var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");
var TRANSITIONS = require('transitions');

/**
 * Skins
 */
var whiteSkin = new Skin( { fill:"white" } );
var whiteGrayBorderSkin = new Skin( { fill:"white", borders:{top:1}, stroke:"#D6D6D6" } );
var graySkin = new Skin( { fill:"#2B2B2B" } );
var redSkin = new Skin( { fill:"#FF4136" } );
 
/**
 * Styles
 */
var titleStyle = new Style( { font:"25px", color:"black" } );
var altTextStyle = new Style( { font:"17px", color:"#FF4136" } );
var textStyle = new Style( { font:"17px", color:"gray" } );
var buttonStyle = new Style( { font:"25px", color:"white" } );
 
/**
 * Miscel Variables, Constants, and Functions
 */
var IMGS = ["white-tee-large.jpg", "hat-large.jpg", "shorts-large.jpg", "blazer-large.jpg"];
var THUMBNAILS = ["white-tee-thumbnail.jpg", "hat-thumbnail.jpg", "shorts-thumbnail.jpg", "blazer-thumbnail.jpg"];
var PRICES = [15, 40, 45, 75];
var NAMES = ["Zara Men's White Tee", "New Era Snapback", "Sperry Print Shorts", "J. Crew Blazer"];
var theft = false;
var stolenItems = [];
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
        else handler.invoke(new Message("/delay"));
    },
    onComplete: function(handler, message, json) {
        if(json && json.validTiles.indexOf(1) != -1 && !theft) {
            //polling should continue and data should update properly, but there shouldn't be multiple theft alerts at once 
            theft = true;
            stolenItems = json.validTiles;
            mainContainer.run(new TRANSITIONS.TimeTravel(), defaultColumn, theftAlertContainer, { direction : "forward", easeType : "sineEaseIn", duration : 100 });
        }
        handler.invoke(new Message("/delay"));
    }
});

Handler.bind("/delay", {
    onInvoke: function(handler, message) {
        handler.wait(500);
    },
    onComplete: function(handler, message, json) {
        handler.invoke(new Message("/theftCheck"));
    }
});

/**
 * Main container
 */
var mainContainer = new Container({
	left: 0, right: 0, top: 0, bottom: 0, skin: graySkin
});

/**
 * Default Screen
 */
var defaultColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, skin: graySkin,
});

/**
 * Theft Alert Screen
 */
var alertInfoColumn = new Column({
    left:13, right:0, top:0, bottom:0,
    contents: [
        new Line({left:0, right:0, top:0,
            contents: [new Label({left:0, top:0, height:25, string:"Theft Alert", style:titleStyle}),]
        }),
        new Line({left:0, right:0, top:0,
            contents: [new Label({left:0, top:0, height:18, name:"count", style:altTextStyle}),]
        }),
        new Line({left:0, right:0, top:0,
            contents: [new Label({left:0, top:0, height:18, name:"value", style:textStyle}),]
        }),
        new Line({left:0, right:0, top:10, skin: whiteGrayBorderSkin,
            contents: [
                new Label({left:0, top:15, height:20, string:"LOCATE THIEF", style:textStyle}),
            ]
        })
    ]
});

var theftAlertContainer = new Container({
	left: 10, right: 10, top: 200, bottom: 200, active:true, skin: whiteSkin,
	contents: [
	    new Line({left:0, right:0, top:10, skin: whiteSkin,
	        contents: [
	            new Picture({left:13, top:3, height:50, width:50, url:"exclaim.png"}),
	            alertInfoColumn
	        ]
	    }),
	]
});
 
/**
 * Map Screen
 */
var theftMapColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active:true, skin: whiteSkin,
	contents: [
	    new Line({left:0, right:0, top:5, skin: whiteSkin,
	        contents: [
	            new Label({right:0, top:0, height:40, string:"Thief Map", style:titleStyle}),
	        ]
	    }),
	]
});
 
/**
 * Scanning Screen
 */
var theftScanColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active:true, skin: whiteSkin,
	contents: [
	    new Line({left:0, right:0, top:5, skin: whiteSkin,
	        contents: [
	            new Label({right:0, top:0, height:40, string:"Connecting...", style:titleStyle}),
	        ]
	    }),
	]
});

/**
 * Confirmation Screen
 */
var theftConfirmationColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active:true, skin: whiteSkin,
	contents: [
	    new Line({left:0, right:0, top:5, skin: whiteSkin,
	        contents: [
	            new Label({right:0, top:0, height:40, string:"Confirmation", style:titleStyle}),
	        ]
	    }),
	]
});
 
/**
 * Item Details Screen
 */
var theftDetailsColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active:true, skin: whiteSkin,
	contents: [
	    new Line({left:0, right:0, top:5, skin: whiteSkin,
	        contents: [
	            new Label({right:0, top:0, height:40, string:"Item Details", style:titleStyle}),
	        ]
	    }),
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

mainContainer.add(defaultColumn);
var ApplicationBehavior = Behavior.template({
    onLaunch: function(application, data) {
        application.add(mainContainer);
        application.invoke(new Message("/theftCheck"));
    },
	onDisplayed: function(application) {
		application.discover("rougeplat");
	},	
	onQuit: function(application) {
		application.forget("rougeplat");
	},
});

application.behavior = new ApplicationBehavior();