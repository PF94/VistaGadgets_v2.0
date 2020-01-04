//---------------------------------------------
//  THIS CODE IS NOT APPROVED FOR USE IN/ON ANY OTHER UI ELEMENT OR PRODUCT COMPONENT.  
//  Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
// ----------------------------------------------
var runner, slideAnimation;
var delta;
var stretchWidth;
var rb_fileCount;
var rb_fileSize;
var binType; // 0: default empty; 1: default full; 2 hover empty; 3: hover full
var lastBinType;
var imgFolder;

var defaultEmptyImg;
var defaultFullImg;
var hoverEmptyImg;
var hoverFullImg;
var sliderInterval;
var runnerLeave;
var oldBinType;
var tfSetTimeOut;

//
// Note: Recycle Bin has two timers
//
// One timer is running at the background all the time. It's used to detect if any file is added into recycle bin.
// Another timer is only running when the sliding drawer is triggered. 
// 




 
function onLoad()
{
    System.Gadget.settingsUI = "settings.html";

    setImages();
    reset();
    System.Shell.RecycleBin.onRecycleBinChanged = checkBinType;
    System.Gadget.onSettingsClosed = SettingsClosed;
    System.Gadget.onShowSettings = ShowSettings;

    onMouseLeave();

}

function ShowSettings()
{
}

function SettingsClosed(event)
{
    if (event.closeAction == event.Action.commit)
    {
        onSettingChanged();
    }
}

function openBinFolder()
{
    var ssfBitBucket = 0xa;
    var rbfldr = System.Shell.Explorer.NameSpace(ssfBitBucket);
    rbfldr.Self.InvokeVerb('open');
}
function onSettingChanged()
{
    setImages();
    onMouseLeave();
}

function setImages()
{
    var folder = System.Gadget.Settings.read("ImageFolder");
    var prefix;
    if (folder)
    {                          
        imgFolder = folder.replace("/", "\\"); //changes slashes to accomodate gadget.background
    }
    else
    {
        imgFolder = "view1\\";
    }
    prefix = imgFolder.replace("\\", "_");
    // set RB images
    defaultEmptyImg = imgFolder + prefix + "default.png";
    defaultFullImg = imgFolder + prefix + "default_full.png";
    hoverEmptyImg = imgFolder + prefix + "hover.png";
    hoverFullImg = imgFolder + prefix + "hover_full.png";
    slide_right_img.src = imgFolder + prefix + "slider_right.gif";
    slide_stretch_img.src = imgFolder + prefix + "slider_stretch.gif";
    slide_left_img.src = imgFolder + prefix + "slider_left.gif";
}

function showDrawerParts()
{
    slide_right_img.style.visibility = "visible";
    slide_stretch_img.style.visibility = "visible";
    slide_left_img.style.visibility = "visible";
    main.style.visibility = "visible";
}

function hideDrawerParts()
{
    slide_right_img.style.visibility = "hidden";
    slide_stretch_img.style.visibility = "hidden";
    slide_left_img.style.visibility = "hidden";
    main.style.visibility = "hidden";
}

function reset()
{
    hideDrawerParts();
    
    slideAnimation = 0; // 1: slideout; 2: slidein
    stretchWidth = 1;
    delta = 5;
    if (runner)
        clearInterval(runner);
    runner = null;
}

function adjustPosition(pos, delta)
{
    pos = delta + parseInt(pos.replace("px", "")) + "px";
    return pos;
}

function getFolderSize()
{
    return System.Shell.RecycleBin.sizeUsed;
}

function getFolderFileCount()
{
   var iRetVal = 0;
   try
   {
        iRetVal = System.Shell.RecycleBin.fileCount + System.Shell.RecycleBin.folderCount;
   }
   catch(e)
   {   
   }
   return iRetVal;
   
}

function emptyRB()
{
    try
    {
        if ( getFolderFileCount() > 0)
        { 
            System.Shell.RecycleBin.emptyAll();
            slideAnimation = 2;
            onMouseLeave();
            System.Sound.beep();
        }
    }
    catch(e)
    {
    }
   
}

function checkBinType()
{
    // check bin type
    if (parseInt(getFolderFileCount()))
        binType = (oldBinType > 1 ? 3 : 1);
    else
        binType = (oldBinType > 1 ? 2 : 0);

    //if (binType != oldBinType)
        changeBinType();
}

function sliding(delta)
{
    stretchWidth += delta;
    slide_stretch_img.style.left = adjustPosition(slide_stretch_img.style.left, -delta);
    slide_stretch_img.width = stretchWidth;
    slide_left_img.style.left = adjustPosition(slide_left_img.style.left, -delta);
    L_EMPTYBUTTON.style.left = rbItems.style.left = rbSize.style.left = adjustPosition(rbSize.style.left, -delta);
}
    
function animation(){
    imgs = document.getElementById("main").getElementsByTagName("img");

    if (slideAnimation == 1)
    {
        if (stretchWidth < 62)
        { // 1 is the minimum of stretchWidth. 
            showDrawerParts();        
            sliding(delta);
            setTimeout( "animation()", 2 );
         }  
    }
    if (slideAnimation == 2)
    { 
        if (stretchWidth > 0)
        { // 1 is the minimum of stretchWidth. 
            sliding(-delta);
            setTimeout( "animation()", 2 );
        }   
        else 
        {
             hideDrawerParts();
        }  
    }

}


function onMouseUp()
{
    if (!slideAnimation)
        slideAnimation = 1;
    else
        slideAnimation = 3 - slideAnimation; // alternate between 1 and 2. 1 is slide-out; 2 is slide-in
        
      animation();           
      
    if (slideAnimation == 1)
    {
        // query size and format text
        rb_fileSize = parseFloat(getFolderSize());
        if (rb_fileSize > (1024 * 1024) * 1024)
            rb_fileSize = Math.floor(rb_fileSize / ((1024 * 1024) * 1024)) + ((rem = Math.floor(rb_fileSize / ((1024 * 1024) * 1024) * 100) % 100) ? "." + rem : "") + " " + L_GB_text;
        else if (rb_fileSize > 1024 * 1024)
            rb_fileSize = Math.floor(rb_fileSize / (1024*1024)) + ((rem = Math.floor(rb_fileSize / (1024*1024) * 100) % 100) ? "." + rem : "") + " " + L_MB_text;
        else if (rb_fileSize > 1024)
            rb_fileSize = Math.floor(rb_fileSize / 1024) + ((rem = Math.floor(rb_fileSize / 1024 * 100) % 100) ? "." + rem : "") + " " + L_KB_text;
        else
            if (rb_fileSize == 0)
                rb_fileSize = rb_fileSize + " " + L_KB_text;
            else
                rb_fileSize = rb_fileSize + " " + L_B_text;
            
        rb_fileCount = getFolderFileCount() + " " + L_ITEM_text + (getFolderFileCount()>0 ? L_S_text : "");
        
        rbSize.innerHTML = rb_fileSize;
        rbItems.innerHTML = rb_fileCount;        
    }

    changeBinType();
}

function disableEmptyButton(tf)
{
    L_EMPTYBUTTON.disabled = tf;
}
function changeBinType()
{
    switch (binType)
    {
    case 0:
       System.Gadget.background = "url(" + defaultEmptyImg + ")";
       disableEmptyButton(true);
        break;
    case 1:
        System.Gadget.background = "url(" + defaultFullImg + ")";
         disableEmptyButton(false);
        break;
    case 2:
        System.Gadget.background = "url(" + hoverEmptyImg + ")";
         disableEmptyButton(true);
        break;
    case 3:
        System.Gadget.background = "url(" + hoverFullImg + ")";
         disableEmptyButton(false);
        break;
    }
    oldBinType = binType
}

function onMouseOver()
{
    if (parseInt(getFolderFileCount()))
    {
        binType = 3;            
    }
    else
    {
        binType = 2;
     }   
    changeBinType();
}

function onMouseLeave()
{
  if (parseInt(getFolderFileCount()))
  {
        binType = 1; // full
  }
  else
  {
        binType = 0; // empty
  }
  changeBinType();
  
}  
function slideIn()
{
    slideAnimation = 1;
    onMouseUp(); 
}
function slideOut()
{
    if ( tfSetTimeOut )
    {
        slideAnimation = 2;
        onMouseUp();
    }
}
function delaySlideOut()
{
        tfSetTimeOut = true;
        setTimeout('slideOut()', 1200);
}

function delaySlideIn()
{
        tfSetTimeOut=false;
        setTimeout('slideIn()', 180);
}

function onDropFile()
{
    var item;
    var index = 0;
    do
    { 
        item = System.Shell.itemFromFileDrop(event.dataTransfer, index);
        if (item)
        {
            System.Shell.RecycleBin.deleteItem(item.path);
        }
        index++;
    } while (item != null);
    slideAnimation = null;
    onMouseUp(); 
    changeBinType();
}

