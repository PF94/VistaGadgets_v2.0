//---------------------------------------------
//  THIS CODE IS NOT APPROVED FOR USE IN/ON ANY OTHER UI ELEMENT OR PRODUCT COMPONENT.  
//  Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
// ----------------------------------------------
//This JS files contains all the information realted to the setting and is included in both the gadget file and the setting file
function calculatorSettings()
{   
   //calls to save and load a gadget
	this.save=saveSettingToDisk;
	this.load=loadSettingFromDisk;
	//add the setting you wish to use
	this.showResultInDisplay=false;
	this.showResultInHistory=true;
	this.clearAfterEqual=false;
	//this.startSizeMode=true;
}
//to load the information from disk
function loadSettingFromDisk()
{
	var settingExist=System.Gadget.Settings.read("settingExist");
	if(settingExist)
	{
		//start reading the new and comparing
		this.showResultInDisplay=System.Gadget.Settings.read("showResultInDisplay");
		this.showResultInHistory=System.Gadget.Settings.read("showResultInHistory");
		this.clearAfterEqual=System.Gadget.Settings.read("clearAfterEqual");
		//this.startSizeMode=System.Gadget.Settings.read("startSizeMode");
	}
}
//to save the information
function saveSettingToDisk()
{
	System.Gadget.Settings.write("showResultInDisplay",this.showResultInDisplay);
	System.Gadget.Settings.write("showResultInHistory",this.showResultInHistory);
	System.Gadget.Settings.write("clearAfterEqual",this.clearAfterEqual);
	//gadget.Settings.Write("startSizeMode",this.startSizeMode);
	System.Gadget.Settings.write("SettingExist",true);
}