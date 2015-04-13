// store all the asset and style and skin and template properties

exports.mainColor = "#FF4136"


//STYLES						   
exports.itemNameStyle = new Style({  font: 'bold', horizontal: 'null', vertical: 'null', lines: 1, });
exports.headerTitleStyle = new Style({  font: 'bold 24px', horizontal: 'center', vertical: 'middle', lines: 1, });
exports.testPicture = new Picture({left:0,right:0,top:0,bottom:0,scale:{x:0.1,y:0.1},url:'assets/blazer-large.jpg'});
exports.nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray',});
exports.fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
exports.fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
exports.labelStyle = new Style( { font: "bold 30px", color:"black" } );
exports.buttonStyle = new Style( { font: "bold 20px", color:"white", horizontal: 'center', vertical: 'middle' } );

//SKINS
exports.whiteS = new Skin( { fill:"white" } );
exports.searchButtonSkin = new Skin({ fill:'#FF4136'});
exports.tabButtonSkin = new Skin({width: 50, height: 50, borders:{left:0,right:0,top:0,bottom:0}, fill:mainColor});
exports.tabSkin = new CONTROL.Skin(new Texture('assets/search-white.png'),THEME.tabDisabledEffect, THEME.tabEnabledEffect, THEME.tabSelectedEffect);
exports.separatorSkin = new Skin({ fill: 'silver',});
exports.searchSkin = new Skin({width: 48,
						   height: 48,
						   texture: new Texture('assets/search-white.png')
						   });
						   
exports.scanSkin = new Skin({width: 48,
						   height: 48,
						   texture: new Texture('assets/scan-icon.png')
						   });

