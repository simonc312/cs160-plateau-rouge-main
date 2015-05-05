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
var UPSELLING = require('upselling.js');
var THEFT = require('theft.js');

//GLOBALS
var deviceURL = "";
hasFoundDevice = function(){return deviceURL != "";}


//HANDLERS
Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		//trace('inside discover\n');
		deviceURL = JSON.parse(message.requestText).url;
		if (hasFoundDevice()){
			 //trace('found device\n');
			 //handler.invoke(new Message("/foundServerDialog"));
			 handler.invoke(new Message("/getNotifications"));
		 	 //resourceChart.invoke(new Message("/getResources"));
	    }
		//else
			//handler.invoke(new Message("/noServerWarning"));
	}
}));

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));

Handler.bind("/getNotifications", {
    onInvoke: function(handler, message){
        if (hasFoundDevice()) handler.invoke(new Message(deviceURL + "getNotifications"), Message.JSON);
    },
    onComplete: function(handler, message, json){
    	if(json){
			var numNewSold = json.sold;
			var numNewDelivered = json.delivered;
			var newDeliveredItem = json.deliveredItem;
			var newSoldItem = json.soldItem;
			tabsRow.behavior.update(storageTabButton,numNewDelivered);
			tabsRow.behavior.update(soldTabButton,numNewSold);
			contentRow.behavior.addDeliveryItem(newDeliveredItem);
			contentRow.behavior.addSoldItem(newSoldItem);
			handler.invoke( new Message("/delay"));
         }
    }
});

Handler.bind("/delay", {
    onInvoke: function(handler, message){
        handler.wait(1000); //will call onComplete after 1 seconds
    },
    onComplete: function(handler, message){
        handler.invoke(new Message("/getNotifications"));
    }
});


var MyLabel = Label.template(function($) { return {
  left:0, right:0, height: 40, string:$.text, style:$.style 
}});

var MyNotificationBubble = Container.template(function($) { return {top: 2, right:5, height: 20, skin: STYLE.redNotificationSkin, name: $.name, contents: [ 
  	new Label({width: 20, height: 20, string:$.text, style: STYLE.notificationNumberStyle})] 
}});


var buttonTemplate = BUTTONS.Button.template(function($){ return{
	 right: ($.right ? $.right : 0), left: $.left, width: $.width, height:50, skin: STYLE.redSkin,
	contents: [
		 Label($, {
	   			 	left:4, right:4, top:4, bottom:4, width: 48, skin: $.skin, string:($.string ? $.string : ""), name:$.name
	         })
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			if(/*content == scanButton || */content == upsellButton){
				application.remove(main);
				application.add(UPSELLING.mainContainer);
			}
		}},
		onComplete: { value: function(content, message, json){

			if(json.warning == true){

			}
		}}
	})
}});

//var searchButton = new buttonTemplate({skin: STYLE.searchSkin, name: "search-button", width: STYLE.button.width.sm});
//var scanButton = new buttonTemplate({ skin: STYLE.scanSkin, name: "scan-button", width: STYLE.button.width.sm});
var upsellButton = new buttonTemplate({name: "scan-button",string: "Upselling", width: STYLE.button.width.lg, bottom: 10});
var MySearchField = Container.template(function($) { return { left:10, top: 0, bottom: 0,
  width: 315, height: 50, contents: [
  	new Line({left: 0, right: 0, top: 0, bottom: 0, contents: [
  		new Picture({ left:10, height:40, url:"assets/search.png" }),
	    Scroller($, { 
	      left: 5, top: 0, bottom: 0, width: 240, skin: STYLE.whiteGrayBottomSkin, active: true, 
	      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
	        Label($, { 
	          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: STYLE.fieldStyle, anchor: 'NAME',
	          editable: true, string: $.name,
	         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
	         		onEdited: { value: function(label){
	         		  var data = this.data;
		              data.name = label.string;
		              label.container.hint.visible = ( data.name.length == 0 );
		              var message = new Message(deviceURL+"searchFilter");
		              message.requestText = JSON.stringify({filter: label.string});	
		              label.invoke(message);
		              contentRow.invoke(new Message(deviceURL+""));
	         		}}
	         	}),
	         }),
	         Label($, {
	   			 	left:4, right:4, top:4, bottom:0, style:STYLE.fieldHintStyle, string:"Search By Name", name:"hint"
	         })
	      ]
	    }),
         
    ]})
  ]
}});

var ItemThumbnail = Container.template(function($) { return { left: 0, width: $.width, top: 0, height: $.height, active: true, contents: [

	Thumbnail($, { left: 2, right: 2, top: 2, bottom: 2, url: $.url, }),
], }});



var Header = SCREEN.EmptyHeader.template(function($) { return { contents: [

	Label($, { left: 0, right: 0, top: 0, bottom: 0, style: STYLE.headerTitleStyle, anchor: 'TITLE', string: $.title, }),
], }});

var Body = SCREEN.EmptyBody.template(function($) { return { skin: STYLE.whiteS, }});

var ListItemLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: THEME.lineSkin, behavior: Object.create((ListItemLine.behaviors[0]).prototype), contents: [

	Column($, { left: 0, right: 0, contents: [

		Line($, { left: 0, right: 0, height: 1, skin: STYLE.separatorSkin, }),

		Line($, { left: 2, right: 2, height: 82, contents: [

			ItemThumbnail({width: STYLE.thumbnailWidth, height: STYLE.thumbnailHeight, url: $.image}),

			Column($, { left: 20,right: 10, contents: [
				Text($, { left: 4, right: 0, 
				blocks: [
					{ style: STYLE.itemNameStyle, string: $.name }	
				], }),
				Text($, { left: 4, right: 0, 
				blocks: [
					{ style: STYLE.itemPropertyStyle, string: "quantity: "+$.quantity }	
				], }),
				Text($, { left: 4, right: 0, 
				blocks: [
					{ style: STYLE.itemPropertyStyle, string: "price/unit: "+$.price }	
				], }),
			]})
			
		], }),
		
		
			
	], }),
], }});

var StorageListItemLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: THEME.lineSkin, behavior: Object.create((ListItemLine.behaviors[0]).prototype), contents: [

	Column($, { left: 0, right: 0, contents: [

		Line($, { left: 0, right: 0, height: 1, skin: STYLE.separatorSkin, }),

		Line($, { left: 2, right: 2, height: 82, contents: [

			ItemThumbnail({width: STYLE.thumbnailWidth, height: STYLE.thumbnailHeight, url: $.image}),

			Column($, { left: 20,right: 10, contents: [
				Text($, { left: 4, right: 0, 
				blocks: [
					{ style: STYLE.itemNameStyle, string: $.name }	
				], }),
				Text($, { left: 4, right: 0, 
				blocks: [
					{ style: STYLE.storageItemNameStyle, string: "added: "+$.timeDifference }	
				], }),
				Text($, { left: 4, right: 0, 
				blocks: [
					{ style: STYLE.itemPropertyStyle, string: "quantity: "+$.quantity }	
				], }),
				
			]})
			
		], }),
		
		
			
	], }),
], }});


ListItemLine.behaviors = new Array(1);
ListItemLine.behaviors[0] = SCREEN.ListItemBehavior.template({
	onTouchEnded: function(line, id, x, y, ticks) {
				this.onTouchCancelled(line, id, x, y, ticks);
				//if(deviceURL != "") line.invoke(new Message(deviceURL + "scanTiles"), Message.JSON);
				trace("Inside onTouchEnded \n");
			},
	onComplete: function(content, message, json) {
			trace("Inside onComplete \n");
	        if(json && json.validTiles.indexOf(1) != -1) {
                //UPSELLING.scannedItems = json.validTiles;
                //application.remove(main);
                //application.add(UPSELLING.mainContainer);
                //UPSELLING.mainContainer.run(new TRANSITIONS.TimeTravel(), UPSELLING.scanColumn, UPSELLING.upsellingColumn, { direction : "forward", easeType : "sineEaseIn", duration: 100 });
	        
	        }
	    }
});


var ItemView = Body.template(function($) { return { contents: [
	Row($, { left: 0, right: 0, top: 0, contents: [
		ItemThumbnail({width: STYLE.itemImageWidth, height: STYLE.itemImageHeight, url: $.image}),
		Column($, { left: 20,right: 10, contents: [
				Text($, { left: 4, right: 0, 
				blocks: [
					{ style: STYLE.itemNameStyle, string: $.name }	
				], }),
				Text($, { left: 4, right: 0, 
				blocks: [
					{ style: STYLE.itemPropertyStyle, string: "quantity: "+$.quantity }	
				], }),
				Text($, { left: 4, right: 0, 
				blocks: [
					{ style: STYLE.itemPropertyStyle, string: "price: "+$.price }	
				], })
		]})
	]}),
	
	Row($, { left: 0, right: 0, top: 0, contents: []})
]}});

var ListPane = Body.template(function($) { return { contents: [

	SCROLLER.VerticalScroller($, { clip: true, contents: [

		Column($, { left: 0, right: 0, width: 325, top: 0, anchor: 'LIST', behavior: Object.create((ListPane.behaviors[0]).prototype), }),

		SCROLLER.VerticalScrollbar($, { }),

		SCROLLER.TopScrollerShadow($, { }),

		SCROLLER.BottomScrollerShadow($, { }),
	], }),
], }});
ListPane.behaviors = new Array(1);
ListPane.behaviors[0] = SCREEN.ListBehavior.template({

	addItemLine: function(list, item) {
						if(item.timeDifference == undefined)
							list.add(new ListItemLine(item));
						else
							list.add(new StorageListItemLine(item));
					},
	createMessage: function(list,data){
		var tagPath = "";
		if(data.action == "Sold")
			tagPath = "getSoldTags";
		else if(data.action == "Storage")
			tagPath = "getNewTags";
		else if(data.action == "Inventory")
			tagPath = "getActiveTags";
		return new Message(deviceURL + tagPath);
	},
	getItems: function(list,message,result){
		return ( result && ( "items" in result ) ) ? result.items : null;
	},
})






var headerRow = new Line({left:0, right:0, top:0});




var footerRow = new Line({left:0, right:0, bottom:0});

var titleLabel = new MyLabel ( { text: "Plateau Rouge Storage", style: STYLE.headerTitleStyle } );

	

var MainContainerTemplate = Container.template(function($) { return {
  left: 0, right: 0, top: 0, bottom: 0, skin: STYLE.whiteS, active: true,
  behavior: Object.create(Container.prototype, {
    onTouchEnded: { value: function(content){
      KEYBOARD.hide();
      content.focus();
    }}
  })
}});

var searchBarfield = new MySearchField({ name: "" });
var main = new MainContainerTemplate();

var headerColumn = new Column({left:0,top:0,bottom:0,top:0});
var titleScanRow = new Line({skin: STYLE.redSkin, left:0, right: 0, top:0,bottom:0,top:0, clip: true});
var storageItems = [
								{name: "New Era Snapback", image: "assets/hat-thumbnail.jpg", quantity: 3, price: 30},
								{name: "Sperry Navy Shorts", image: "assets/shorts-thumbnail.jpg", quantity: 5, price: 35}
								
							];
var inventoryItems = [
								{name: "New Era Snapback", image: "assets/hat-thumbnail.jpg",quantity: 3, price: 30},
								{name: "Sperry Navy Shorts", image: "assets/shorts-thumbnail.jpg",quantity: 3, price: 30},
								{name: "Zara Men's White Tee", image: "assets/white-tee-thumbnail.jpg",quantity: 20, price: 15},
								{name: "J Crew Blazer", image: "assets/blazer-thumbnail.jpg",quantity: 1, price: 70}
								
							];
var soldItems = [];
var storagePane = new ListPane({ items: storageItems,more: false});
							
var inventoryPane = new ListPane({ items: inventoryItems, more: false});

var soldPane = new ListPane({ items: null, more: false, action: "sold"});

var contentRow = new Line({left:0, right:0, top: STYLE.content.top ,bottom: STYLE.content.bottom,width: 325, height: 450, behavior: {
		onCreate:  function(container, data){
			this.data = data;
			this.currentContent = storagePane;
			//this.updateTabStyle(this.currentContent); //run once onCreate
			this.switchLists = function(listType, direction){
					var newContent = new ListPane({items: null, more:false, action: listType});
					contentRow.run( new TRANSITIONS.CrossFade(), contentRow.behavior.currentContent , newContent,{duration:100,});
					contentRow.behavior.currentContent = newContent;
			}
			this.addDeliveryItem = function(newItem){
				if(newItem && this.currentContent == storagePane){
					this.switchLists("Storage","up");
					storagePane = this.currentContent;
				}
			}
			this.addSoldItem = function(newItem){
				if(newItem && this.currentContent == soldPane){
					this.switchLists("Sold","up");
					soldPane = this.currentContent;
				}
			}
		},}});

var tabButtonTemplate = BUTTONS.Button.template(function($){ return{
	left:$.left, right: $.right, width:60, height:50, skin: STYLE.tabButtonSkin,
	contents: [
		new MyLabel({text:$.text, style: STYLE.darkerGrayButtonStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			tabsRow.behavior.updateTabStyle(content);
			if(content.notificationBubble != null || content.notificationBubble != undefined){
				if(content.first.string == "Storage")
					content.invoke(new Message(deviceURL + "resetDeliveryNotifications"));
				else
					content.invoke(new Message(deviceURL + "resetSoldNotifications"));
				content.remove(content.notificationBubble);
			}
			var formerContent = contentRow.behavior.currentContent;
			var newContent = inventoryPane;
			var direction = "left";
			var buttonString = content.first.string;
			var tmpPane = new ListPane({items:null,more:false, action: buttonString});
			switch(buttonString){
			case "Storage": 
				storagePane = tmpPane;
				newContent = storagePane;
				direction = "right";
			break;
			case "Inventory":
				inventoryPane = tmpPane;
				newContent = inventoryPane;
				if(formerContent == storagePane)
					direction = "left";
				else
					direction = "right";
			break;
			case "Sold":
				soldPane = tmpPane;
				newContent = soldPane;
			break;
			
			}
			if(formerContent == newContent)
				return;
			contentRow.run( new TRANSITIONS.Push(), formerContent , newContent,{duration:300,direction: direction});
			contentRow.behavior.currentContent = newContent;
			titleLabel.string = "Plateau Rouge " + buttonString;
			}},
		onComplete: { value: function(content, message, json){
		}}
	})
}});

var storageTabButton = new tabButtonTemplate ( { left:0, right:0, text: "Storage"} );
var inventoryTabButton = new tabButtonTemplate ( { left:1, right: 1, text: "Inventory"} );
var soldTabButton = new tabButtonTemplate ( { left:0, right:0, text: "Sold"} );

var tabsRow = new Line({left:0, right:0, bottom:0, skin:STYLE.graySkin, behavior: Object.create(Container.prototype,{
	onCreate: { value: function(content,data){
		trace('inside tabsRow onCreate \n');
		this.data = data;
		this.currentTab = storageTabButton;
		this.currentTabString = function(){return tabsRow.behavior.currentTab.first.string;}
		this.updateTabStyle = function(newTab){
				tabsRow.behavior.currentTab.skin = STYLE.tabButtonSkin;
				tabsRow.behavior.currentTab.first.style = STYLE.darkerGrayButtonStyle;
				newTab.skin = STYLE.redBottomSkin;
				newTab.first.style = STYLE.redButtonStyle;
				tabsRow.behavior.currentTab = newTab;			
			}
		this.update = function(tabSection,numNotifications){
			if(numNotifications != 0){
				if(tabSection.notificationBubble != null && tabSection.notificationBubble != undefined)
					tabSection.notificationBubble.first.string = numNotifications;
				else
					tabSection.add(new MyNotificationBubble({name:"notificationBubble",text:numNotifications}));
			}
		}
		}
	}
}) });

tabsRow.behavior.updateTabStyle(storageTabButton);



//ADD COMPONENTS TO MAIN 		
application.add(main);
titleScanRow.add(titleLabel);
//titleScanRow.add(scanButton);
headerColumn.add(titleScanRow);
headerColumn.add(tabsRow);
headerColumn.add(searchBarfield);
headerRow.add(headerColumn);
contentRow.add(storagePane);
tabsRow.add(storageTabButton);
tabsRow.add(inventoryTabButton);
tabsRow.add(soldTabButton);
footerRow.add(upsellButton);
main.add(contentRow);
main.add(headerRow);
main.add(footerRow);


//MAIN APPLICATION BEHAVIOR
var ApplicationBehavior = Behavior.template({
	_onScreenBegan: { value: "onScreenBegan", writable: false },
	_onScreenEnding: { value: "onScreenEnding", writable: false },
	_onScreenRotated: { value: "onScreenRotated", writable: false },
	onDisplayed: function(application) {
		application.discover("smart.tag.server");
		this.dialog = null;
	},
	onQuit: function(application) {
		application.forget("smart.tag.server");
	},
	openDialog: function(dialog) {
					if (this.dialog)
						this.closeDialog()
					this.dialog = dialog;
					application.run(new THEME.DialogOpenTransition, dialog);
			},
	closeDialog: function() {
			application.run(new THEME.DialogCloseTransition, this.dialog);
			this.dialog = null;	
		}
})

application.behavior = new ApplicationBehavior();

