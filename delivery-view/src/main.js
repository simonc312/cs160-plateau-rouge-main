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
		deviceURL = JSON.parse(message.requestText).url;
		if (hasFoundDevice()){
			 //handler.invoke(new Message("/foundServerDialog"));
			 handler.invoke(new Message("/getNotifications"));
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
			tabsRow.behavior.update(storageTabButton,json.stored);
			tabsRow.behavior.update(soldTabButton,json.sold);
			tabsRow.behavior.update(inventoryTabButton,json.inventoried);
			contentRow.behavior.addItem(inventoryPane,json.inventoryItem);
			contentRow.behavior.addItem(storagePane,json.storageItem);
			contentRow.behavior.addItem(soldPane,json.soldItem);
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

// for switching view to upselling
var buttonTemplate = BUTTONS.Button.template(function($){ return{
	 right: ($.right ? $.right : 0), left: $.left, width: $.width, height:50, skin: STYLE.redSkin,
	contents: [
		 Label($, {
	   			 	left:4, right:4, top:4, bottom:4, width: 48, skin: $.skin, string:($.string ? $.string : ""), name:$.name
	         })
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			if(content == upsellButton){
				UPSELLING.mainContainer.empty();
				UPSELLING.mainContainer.add(UPSELLING.scanColumn);
				application.run(new TRANSITIONS.TimeTravel(), main, UPSELLING.mainContainer, { direction : "forward", duration : 400 });
			}
		}},
		onComplete: { value: function(content, message, json){

			if(json.warning == true){

			}
		}}
	})
}});

//var historyButton = new buttonTemplate({ skin: STYLE.scanSkin, name: "history-button", width: STYLE.button.width.sm});
var upsellButton = new buttonTemplate({name: "scan-button",string: "Upselling", width: STYLE.button.width.lg, bottom: 10});
var MySearchField = Container.template(function($) { return { left:10, top: 0, bottom: 0,
  width: 315, height: 40, contents: [
  	new Line({left: 0, right: 0, top: 0, bottom: 0, contents: [
  		new Picture({ left:0, height:40, url:"assets/search.png" }),
	    Scroller($, { 
	      left: 0, top: 0, bottom: 0, width: 240, skin: STYLE.whiteGrayBottomSkin, active: true, 
	      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
	        Label($, { 
	          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: STYLE.fieldStyle, anchor: 'NAME',
	          editable: true, string: $.name,
	         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
	         		onEdited: { value: function(label){
	         		  var data = this.data;
		              data.name = label.string;
		              label.container.hint.visible = ( data.name.length == 0 );
		              var currentTabAction = tabsRow.behavior.currentTabString();
		              var message = new Message(deviceURL+"searchFilter");
		              message.requestText = JSON.stringify({filter: label.string});	
		              label.invoke(message);
		              contentRow.behavior.switchLists(currentTabAction);
		          
	         		}}
	         	}),
	         }),
	         Label($, {
	   			 	left:0, right:4, top:0, bottom:0, style:STYLE.fieldHintStyle, string:"Search By Name", name:"hint"
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

var TimeListItemLine = Line.template(function($) { 

	return { left: 0, right: 0, active: true, skin: THEME.lineSkin, behavior: Object.create((ListItemLine.behaviors[0]).prototype), contents: [

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
					{ style: STYLE.storageItemNameStyle, string: $.timeDifference }	
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
	    this.onTouchCancelled(line, id); 
	},
});

var ListPane = Body.template(function($) { return { behavior: Object.create((ListPane.behaviors[0]).prototype),contents: [

	SCROLLER.VerticalScroller($, { clip: true, contents: [

		Column($, {left: 0, right: 0, width: 325, top: 0, anchor: 'LIST', behavior: Object.create((ListPane.behaviors[1]).prototype), }),

		SCROLLER.VerticalScrollbar($, { }),

		SCROLLER.TopScrollerShadow($, { }),

		SCROLLER.BottomScrollerShadow($, { }),
	], }),
], }});
ListPane.behaviors = [];
ListPane.behaviors[0] = Behavior.template({
	addItem: function(list,newItem){
		list.first.first.insert(newItem,list.first.first.first);
	}
});
ListPane.behaviors[1] = SCREEN.ListBehavior.template({
	addItemLine: function(list, item) {
						if(item.timeDifference == undefined)
							list.add(new ListItemLine(item));
						else
						 	list.add(new TimeListItemLine(item));
					},
	createMessage: function(list,data){
		return new Message(deviceURL + "get"+data.action+"Tags");
	},
	getItems: function(list,message,result){
		return ( result && ( "items" in result ) ) ? result.items : null;
	},
})


var headerRow = new Line({left:0, right:0, top:0});
var footerRow = new Line({left:0, right:0, bottom:0});
var titleLabel = new MyLabel ( { text: "Plateau Rouge", style: STYLE.headerTitleStyle } );
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
var soldItems = [];
var storagePane = new ListPane({ items: null, more: false, action: "Storage"});
var inventoryPane = new ListPane({ items: null, more: false, action: "Inventory"});
var soldPane = new ListPane({ items: null, more: false, action: "Sold"});

var contentRow = new Line({left:0, right:0, top: STYLE.content.top ,bottom: STYLE.content.bottom,width: 325, height: 450, behavior: {
		onCreate:  function(container, data){
			this.data = data;
			this.loaded = false;
			this.currentContent = storagePane;
			this.switchLists = function(listType){
					var newContent = inventoryPane;
					var tmpContent = new ListPane({items: null, more:false, action: listType});
					switch(listType){
						case 'Storage': storagePane = tmpContent; newContent = storagePane; break;
						case 'Inventory': inventoryPane = tmpContent; newContent = inventoryPane; break;
						case 'Sold': soldPane = tmpContent; newContent = soldPane; 
					}
					contentRow.run( new TRANSITIONS.CrossFade(), contentRow.behavior.currentContent , newContent,{duration:100});
					contentRow.behavior.currentContent = newContent;
			}
			this.addItem = function(list,newItem){
				if(contentRow.behavior.loaded == false || (this.currentContent == list && newItem && newItem.refresh == true)){
					contentRow.behavior.switchLists(tabsRow.behavior.currentTabString());
					contentRow.behavior.loaded = true;	
				}
				else if(newItem && this.currentContent == list && list.first.first.length == 1) {
					contentRow.behavior.switchLists(tabsRow.behavior.currentTabString());
				} else if(newItem && this.currentContent == list) { 
					list.behavior.addItem(list,new TimeListItemLine(newItem));
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
			var tmpPane = false;
			var buttonString = content.first.string;	
			//if no server don't try to fetch server list just display old unsynced lists 
			if(hasFoundDevice()){
				tmpPane = new ListPane({items:null,more:false, action: buttonString});
				if(content.hasOwnProperty('notificationBubble')){
					content.invoke(new Message(deviceURL + "reset"+buttonString+"Notifications"));
					content.remove(content.notificationBubble);
				}
			}
			
			var formerContent = contentRow.behavior.currentContent;
			var newContent = inventoryPane;
			var direction = "left";
			
			
			switch(buttonString){
			case "Storage": 
				storagePane = hasFoundDevice() ? tmpPane : storagePane;
				newContent = storagePane;
				direction = "right";
			break;
			case "Inventory":
				inventoryPane = hasFoundDevice() ? tmpPane : inventoryPane;
				newContent = inventoryPane;
				if(formerContent == storagePane)
					direction = "left";
				else
					direction = "right";
			break;
			case "Sold":
				soldPane = hasFoundDevice() ? tmpPane : soldPane;
				newContent = soldPane;
			break;
			
			}
			if(formerContent == newContent)
				return;
			contentRow.run( new TRANSITIONS.Push(), formerContent , newContent,{duration:300,direction: direction});
			contentRow.behavior.currentContent = newContent;
			//titleLabel.string = "Plateau Rouge " + buttonString;
			
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
				if(tabSection.hasOwnProperty('notificationBubble'))
					tabSection.notificationBubble.first.string = numNotifications;
				else
					tabSection.add(new MyNotificationBubble({name:"notificationBubble",text:numNotifications}));
			} else if(tabSection.hasOwnProperty('notificationBubble'))
				tabSection.remove(tabSection.notificationBubble);
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

