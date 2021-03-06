//---------------------------------------------
//  THIS CODE IS NOT APPROVED FOR USE IN/ON ANY OTHER UI ELEMENT OR PRODUCT COMPONENT.  
//  Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
// ----------------------------------------------
var selecteFolder;
var selectedIndex = 0;
var availFolders;




function launchSetting()
{
   
    System.Shell.RecycleBin.showRecycleSettings();

    return false;
}


function getNumOfFolders()
{
    // check how many RB image folder, like view1, view2...
    var gadgetPath = System.Gadget.path;
    var count = 0;    
    var items = System.Shell.itemFromPath(gadgetPath).SHFolder.Items;
    var tempFolders = new Array(items.count);
    
    for (i = 0; i < items.count; ++i)
    {
        var item = items.item(i);
        if (item.name.match(/^view\d+$/i) && item.isFolder)
            tempFolders[count++] = item.name;
    }
    
    if (count > 0)
    {
        availFolders = new Array(count);
        for (i = 0; i < count; i++)
            availFolders[i] = tempFolders[i];
    }            

    return count;    
}

function updateText()
{
    L_LEFTNUMBER_text.innerHTML = L_CHOICE_text[(selectedIndex + 1)];
    L_RIGHTNUMBER_text.innerHTML = L_CHOICE_text[availFolders.length];
}

function updateImages()
{
    var view = availFolders[selectedIndex];
   
    emptyImg.src = view + "/" + view + "_settingsEmpty.png";
    fullImg.src = view + "/" + view + "_settingsFull.png";
}

function onSelLeft()
{
    selectedIndex--;
    if (selectedIndex < 0)
        selectedIndex = availFolders.length - 1;
    
    updateText();
    updateImages();
}

function onSelRight()
{
    selectedIndex++;
    if (selectedIndex >= availFolders.length)
        selectedIndex = 0;

    updateText();
    updateImages();
}

function setCurrentFolder(folder)
{
    // write folder id to setting file
    System.Gadget.Settings.write("ImageFolder", folder);
}

function getCurrentFolder()
{

    // read folder id from setting file
    var folder = System.Gadget.Settings.read("ImageFolder");
   
    if (folder == null)
        folder = "view1/";
        
    return folder;        
}

function findDefaultIndex()
{
    var currentFolder = getCurrentFolder();
    
    for (var i in availFolders)
    {
        if (availFolders[i]+"/" == currentFolder)
            return (i * 1);
    }
    return 0;
}

function SaveSettings()
{
    setCurrentFolder(availFolders[selectedIndex] + "/");
}

function onLoad()
{
    getNumOfFolders();
    selectedIndex = findDefaultIndex();
    
    updateText();
    updateImages();
    
    System.Gadget.onSettingsClosing = SettingsClosing;
}


function SettingsClosing(event)
{
    if (event.closeAction == event.Action.commit)
    {
        SaveSettings();
    }
    else if(event.closeAction == event.Action.cancel)
    {
    }
}
