//---------------------------------------------
//  THIS CODE IS NOT APPROVED FOR USE IN/ON ANY OTHER UI ELEMENT OR PRODUCT COMPONENT.  
//  Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
// ----------------------------------------------
       
        var maxHistoryRowsAllowed = 100;
		var hold = 0;
		var cssFile = "";
		var calculator = new myCalcObject();
		var keyCodeArray = '27,keyCLR:977,keyM:980,keyMPLUS:982,keyMR:976,keyMC:950,keySQRT:8,keyBKSP:907,keyPLUS:107,keyPLUS:953,keyPERCENT:111,keyDIVIDE:191,keyDIVIDE:106,keyMULTIPLY:187,keyEQUAL:13,keyEQUAL:189,keySUBTRACT:109,keySUBTRACT:120,keyPLUSMINUS:110,keyPERIOD:190,keyPERIOD:48,keyL_0:49,keyL_1:50,keyL_2:51,keyL_3:52,keyL_4:53,keyL_5:54,keyL_6:55,keyL_7:56,keyL_8:57,keyL_9:96,keyL_0:97,keyL_1:98,keyL_2:99,keyL_3:100,keyL_4:101,keyL_5:102,keyL_6:103,keyL_7:104,keyL_8:105,keyL_9:121,keyRECIPROCAL:122,keySQUARE';
		var myKeyCode = new myKeyCodeObject( keyCodeArray.split(":") );
		var myHistory = null;
		var gInfinity = "Infinity";
		
		myKeyCode.initKeyCodeDictionary();
		
	    System.Gadget.settingsUI = "settings.html"

        /**********************MAIN EVENTS***********************/
        function myOnBlur(x)
        {        
            DISPLAY.innerHTML = (x==1?"":"blur");
        }

        function gadgetLoad()
        {
            myHistory = new myHistoryObject(DISPLAY_HISTORY_TABLE);
            mySettings.loadSettings();
            checkState();
            calculator_rtn();
            mySettings.loadHistory();    
        }
        
        function calculator_rtn()
        {
	        var zone=[3,2,3,101];
	        createDragItem("scrollBar",zone,null,true,"historyDisplay");

	        largeMode=false;//oldLargeMode;

	        sideBarArea.style.visibility="hidden";

	        if(historyDisplay.style.posTop<=0)
	        {
		        scrollBarConatiner.style.visibility="visible";
		    }

	        mode=0;//desktop
	        document.focus();		        
        }        
        
        function myHistoryObject(oDISPLAY_HISTORY_TABLE)
        {
            this.historyTable = oDISPLAY_HISTORY_TABLE;
            
            this.clearHistory = function()
            {
                var rowCount = this.historyTable.rows.length;
                for (var i=0;i<rowCount;++i)
                {
                    this.historyTable.deleteRow();
                }
            }
            this.addRow = function(input,operation)
            {
                var row = null;
                var cell = null;
              
                if (!mySettings.showHistory) return null;
                
                if (this.historyTable.rows.length > maxHistoryRowsAllowed)
                {
                    this.historyTable.deleteRow(0);
                }
                   
                row = this.historyTable.insertRow();
                cell = row.insertCell();
                cell.style.width = "159px";
                cell.style.fontSize = "9pt";
                cell.style.fontFamily = "Segoe UI", 
                cell.style.lineHeight = "9pt";
                cell.style.textAlign = "right";
    
                cell.innerHTML = input;  
                
                cell = row.insertCell();              
                cell.style.fontSize = "9pt";
                cell.style.fontFamily = "Segoe UI",
                cell.style.width = "18px"; 
                cell.style.lineHeight = "9pt";  

                if (operation == "*")
                {
                    cell.style.fontSize = "6pt";
                    operation = "x";
                }
             
                if (operation == "x2")
                {
                    cell.style.fontSize = "6pt";
                    operation = "x<sup>2</sup>";
                }
               if (operation == "1/x")
                {
                    cell.style.fontSize = "6pt";
                    operation = "<sup>1</sup>/x";
                } 
               if (operation == "/")
                {
                    cell.style.fontSize = "6pt";
                    operation = "÷";
                }                                
                cell.innerHTML = operation;
            }
        }        
        
        function checkState()
        {
            //gadget.BeginTransition();  
            //Size clock accordingly
            if(!System.Gadget.docked) 
            {
                undockedState();
            } 
            else if (System.Gadget.docked)
            {
                dockedState(); 
            }
            calculator.displayMemoryIndicator(calculator.memory=="" ? false : true);
        }
        
        function undockedState()
        {
           if (mySettings.showHistory)
           {
                displayCalcWithHistory();
           }
           else
           {    
               displayCalcWithoutHistory();
           }
        } 
        
        function displayCalcWithHistory()
        {
        with(memoryDisplayIndicator.style)
            visibility="hidden",
            width=15;
            
        with(historyContainer.style)
            width=165,
            height=100,
            position="relative",            
            overflow="hidden";
            
            
            
        with(DISPLAY_TABLE_CELL.style)
            width=160;
                    
        with(DISPLAY.style)
            fontSize=20,
            fontFamily="lcd",
            overflow="hidden",
            fontWeight="bold",
            width=148;                  
        
        with(displayHistory.style)
            display="",
            height=100;
        
        with(CLR.style)
            display="";        
        with(M.style)
            display="";
        with(MPLUS.style)
            display="";	        
        with(MR.style)
            display="";	  
        with(MC.style)
            display="";	
                    
        with(document.body.style)
            width=242,
            height=351,
            position="absolute",
            zIndex=-1;
            
        System.Gadget.background = getBackgroundImage("WITH_HISTORY");
            
        with(ScreenGrid.style)
            width=200,
            height=118,
            backgroundImage="url(images/"+BIDI+"_BtnDefault.png)",
            position="absolute",
            left=19,
            top=209,
            zIndex=1;
             
        with(ClipGrid.style)
            width=200,
            height=118,
            backgroundImage="url(images/"+BIDI+"_BtnPressed.png)",
            position="absolute",
            left=0,
            top=0,
            zIndex=1,
            clip="rect(0px,0px,0px,0px)";

        with(ScreenMin.style)
            width=200,
            height=173,
	        backgroundImage="url(images/ScreenHistoryUndocked.png)",
            position="absolute",
	        backgroundRepeat="no-repeat",
            left=19,
            top=30;
           
        with (dirScreenMinPannel.style)
            direction=BIDI;
             
	    with(ScreenMinPannel.style)
            position="relative",
	        top=70,
	        left=9;
	        
	    with(keyCLR.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=19,
	        width=33,
	        backgroundImage="url(images/BtnClear.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontSize=9;

	    with(keyM.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=19,
	        width=35,
	        backgroundImage="url(images/btnRound.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontSize=9;

	    with(keyMPLUS.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=19,
	        width=35,
	        backgroundImage="url(images/btnRound.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontSize=9;
      
	    with(keyMR.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=19,
	        width=35,
	        backgroundImage="url(images/btnRound.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontSize=9;
      
	    with(keyMC.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=19,
	        width=35,
	        backgroundImage="url(images/btnRound.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontSize=9;

        with (dirKeyPadPannel.style)
            direction=BIDI;

        with(KeyPadPannel.style)
            position="absolute",
            left=4,
            top=5,
            zIndex=100;

        with(displayWindow.style)
            position="absolute",
            direction=BIDI,
            left=28,
            top=40,
            zIndex=1,
            width=179,
            overflow="hidden"; 

        with(SPACER1.style)
            height=2;
            
        with(SPACER2.style)
            height=0;
            
        with(SQRT.style)
            fontSize=12;

        with(MRDISPLAY.style)
            POSITION="relative",
            color="red",
	        fontFamily="Segoe UI",
	        fontSize=9,
	       // lineHeight=11,
	        fontWeight="bold";
         
	    with(L_7.style)
	        overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";        
	
	    with(L_8.style)
	        overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";    	        

	    with(L_9.style)
	        overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  
            
	    with(SQRT.style)
	        overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";               

	    with(BKSP.style)
	        overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
            position="relative",
            color="black",
	        fontFamily="Lucida Sans Unicode";        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  
    
    	with(L_4.style)
    	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  
            
    	with(L_5.style)
    	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";     
            
     	with(L_6.style)
     	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";             
            
    	with(PERCENT.style)
    	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  

    	with(DIVIDE.style)
    	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  

     	with(L_1.style)
     	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   

     	with(L_2.style)
     	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";               
            
     	with(L_3.style)
     	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   
            
    	with(RECIPROCAL.style)
    	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";              
                 
    	with(MULTIPLY.style)
    	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   
            
    	with(EQUAL.style)
    	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   

    	with(PLUS.style)
    	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";               

     	with(L_0.style)
     	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";                  

    	with(PLUSMINUS.style)
    	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   

    	with(PERIOD.style)
    	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   

    	with(SQUARE.style)
    	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   
 
 
    	with(SUBTRACT.style)
    	    overflow="hidden",
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   

        keyL_7.rec="0,35,31,0"
        keyL_8.rec="0,68,31,33"
        keyL_9.rec="0,101,31,68"
        keySQRT.rec="0,134,31,101"
        keyBKSP.rec="0,167,31,134" 
        keyPLUS.rec="0,240,60,167" 
        keyL_4.rec="29,35,60,2"
        keyL_5.rec="29,68,60,34" 
        keyL_6.rec="29,101,60,67" 
        
        
        keySQUARE.rec="29,134,60,100" 
        
        keyDIVIDE.rec="29,167,60,133"
        keyL_1.rec="58,35,89,0"
        keyL_2.rec="58,68,89,35"
        keyL_3.rec="58,101,89,67"
        keyRECIPROCAL.rec="58,134,89,100" 
        keyMULTIPLY.rec="58,167,89,133"
        keyEQUAL.rec="58,240,149,167"
        keyL_0.rec="87,35,118,0"
        keyPLUSMINUS.rec="87,68,118,35" 
        keyPERIOD.rec="87,101,118,67" 
        
        keyPERCENT.rec="87,134,118,100"
        
        keySUBTRACT.rec="87,167,118,133"        
	        
        return null;
        }        
        
        
        
        function displayCalcWithoutHistory()
        {
        with(memoryDisplayIndicator.style)
            visibility="hidden",            
            width=15;
                    
        with(displayHistory.style)
            display="none";        
        with(CLR.style)
            display="";        
        with(M.style)
            display="";
        with(MPLUS.style)
            display="";	        
        with(MR.style)
            display="";	  
        with(MC.style)
            display="";	
                    
        with(document.body.style)
            width=242,
            height=271,
            position="absolute",
            zIndex=-1;
        
        System.Gadget.background= getBackgroundImage("WITHOUT_HISTORY");
            
        with(ScreenGrid.style)
            width=200,
            height=118,
            backgroundImage="url(images/"+BIDI+"_BtnDefault.png)",
            position="absolute",
            left=19,
            top=130,
            zIndex=1;
             
        with(ClipGrid.style)
            width=200,
            height=118,
            backgroundImage="url(images/"+BIDI+"_BtnPressed.png)",
            position="absolute",
            left=0,
            top=0,
            zIndex=1,
            clip="rect(0px,0px,0px,0px)";

        with(ScreenMin.style)
            width=200,
            height=93,
	        backgroundImage="url(images/ScreenMin.png)",
            position="absolute",
	        backgroundRepeat="no-repeat",
            left=19,
            top=30;

	    with(keyCLR.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=19,
	        width=33,
	        backgroundImage="url(images/BtnClear.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontSize=9;

	    with(keyM.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=19,
	        width=35,
	        backgroundImage="url(images/btnRound.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontSize=9;

	    with(keyMPLUS.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=19,
	        width=35,
	        backgroundImage="url(images/btnRound.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontSize=9;
      
	    with(keyMR.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=19,
	        width=35,
	        backgroundImage="url(images/btnRound.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontSize=9;
      
	    with(keyMC.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=19,
	        width=35,
	        backgroundImage="url(images/btnRound.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontSize=9;

        with (dirKeyPadPannel.style)
            direction=BIDI;
            
        with(KeyPadPannel.style)
            position="absolute",
            left=4,
            top=5,
            zIndex=100;

        with(DISPLAY.style)
            fontSize=17,
            fontFamily="lcd",
            overflow="hidden",
            width=148;  


        with(displayWindow.style)
            position="absolute",
            direction=BIDI,
            left=28,
            top=63,
            zIndex=1,
            width=179,
            overflow="hidden"; 

        with(SPACER1.style)
            height=2;
            
        with(SPACER2.style)
            height=0;
            
        with(SQRT.style)
            fontSize=12;

        with(MRDISPLAY.style)
            POSITION="relative",
            color="red",
	        fontFamily="Segoe UI",
	        fontSize=9,
	        fontWeight="bold";
         
	    with(L_7.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";        
	
	    with(L_8.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";    	        

	    with(L_9.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  
            
	    with(SQRT.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";               

	    with(BKSP.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
            position="relative",
            color="black",
	        fontFamily="Lucida Sans Unicode";        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  
    
    	with(L_4.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  
            
    	with(L_5.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";     
            
     	with(L_6.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";             
            
    	with(PERCENT.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  

    	with(DIVIDE.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  

     	with(L_1.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   


     	with(L_2.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";               


     	with(L_3.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   
            
    	with(RECIPROCAL.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";              
            
            
    	with(MULTIPLY.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   
            
    	with(EQUAL.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   

    	with(PLUS.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";               

     	with(L_0.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";                  

    	with(PLUSMINUS.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   


    	with(PERIOD.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   


    	with(SQUARE.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   
 
 
    	with(SUBTRACT.style)
	        fontSize=13,
	        zIndex=1,
	        width=32,
	        height=29,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   

        with (dirScreenMinPannel.style)
            direction=BIDI;
            
	    with(ScreenMinPannel.style)
            position="relative",
	        top=30,
	        left=9;
	        
  
        keyL_7.rec="0,35,31,0"
        keyL_8.rec="0,68,31,33"
        keyL_9.rec="0,101,31,68"
        keySQRT.rec="0,134,31,101"
        keyBKSP.rec="0,167,31,134" 
        keyPLUS.rec="0,240,60,167" 
        keyL_4.rec="29,35,60,2"
        keyL_5.rec="29,68,60,34" 
        keyL_6.rec="29,101,60,67" 
        
        
        keySQUARE.rec="29,134,60,100" 
        
        keyDIVIDE.rec="29,167,60,133"
        keyL_1.rec="58,35,89,0"
        keyL_2.rec="58,68,89,35"
        keyL_3.rec="58,101,89,67"
        keyRECIPROCAL.rec="58,134,89,100" 
        keyMULTIPLY.rec="58,167,89,133"
        keyEQUAL.rec="58,240,149,167"
        keyL_0.rec="87,35,118,0"
        keyPLUSMINUS.rec="87,68,118,35" 
        keyPERIOD.rec="87,101,118,67" 
        
        keyPERCENT.rec="87,134,118,100"
        
        keySUBTRACT.rec="87,167,118,133"        
	        
        return null;
        }
        
                
        function dockedState()
        {
        with(displayHistory.style)
            display="none";
            
        with(DISPLAY_TABLE_CELL.style)
            width=94;
        
        with(memoryDisplayIndicator.style)
            visibility="hidden",
            width=10;
              
        with(document.body.style)
            width=130,
            height=153,
            position="absolute",
            zIndex=-1;
            
        System.Gadget.background = getBackgroundImage("DOCKED");
        
        with(ScreenGrid.style)
            width=116,
            height=70,
            backgroundImage="url(images/"+BIDI+"_BtnDockedDefault.png)",
            position="absolute",
            left=6,
            top=75,
            zIndex=1;
             
        with(ClipGrid.style)
            width=116,
            height=70,
            backgroundImage="url(images/"+BIDI+"_BtnDockedPressed.png)",
            position="absolute",
            left=0,
            top=0,
            zIndex=1,
            clip="rect(0px,0px,0px,0px)";

        with(ScreenMin.style)
            width=200,
            height=93,
	        backgroundImage="url(images/ScreenDocked.png)",
            position="absolute",
	        backgroundRepeat="no-repeat",
            left=6,
            top=15;
           
        with(CLR.style)
            display="none";

	    with(keyCLR.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=13,
	        width=20,
	        backgroundImage="url(images/BtnDockedTextClear.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontSize=7;
	        
	    with(keyM.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=13,
	        width=20,
	        backgroundImage="url(images/BtnDockedMRound.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontSize=7;
	        
        with(M.style)
            display="none";
        with(MPLUS.style)
            display="none";	        
        with(MR.style)
            display="none";	  
        with(MC.style)
            display="none";	   
                        
	    with(keyMPLUS.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=13,
	        width=20,
	        backgroundImage="url(images/BtnDockedMPlusRound.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontWeight="bold",
	        fontSize=7;

       
	    with(keyMR.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="left",
	        height=13,
	        width=20,
	        backgroundImage="url(images/BtnDockedMRRound.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="green",
	        fontFamily="Segoe UI",
	        fontSize=7;
            
                     
	    with(keyMC.style)
	        cursor="default",
	        direction="ltr",
	        textAlign="center",
	        height=13,
	        width=20,
	        backgroundImage="url(images/BtnDockedMCRound.png)",
            backgroundRepeat="no-repeat",
            zIndex=1,  
            color="white",
	        fontFamily="Segoe UI",
	        fontSize=7;
	        display="none";

        with (dirKeyPadPannel.style)
            direction=BIDI;
	                          
        with(KeyPadPannel.style)
            position="absolute",
            left=2,
            top=2,
            zIndex=100;

        with(DISPLAY.style)
            fontSize=12,
            fontFamily="lcd",
            overflow="hidden",
            fontWeight="normal",
            width=90;  

        with(displayWindow.style)
            position="absolute",
            direction=BIDI,
            left=11,
            top=30,
            zIndex=1,
            width=100,
            overflow="hidden"; 

        with(SPACER1.style)
            height=4;
        with(SPACER2.style)
            height=2;
            
        with(SQRT.style)
            fontSize=12;

        with(MRDISPLAY.style)
            POSITION="relative",
            color="red",
	        fontFamily="Segoe UI",
	        fontSize=8,
	        fontWeight="bold";

	    with(L_7.style)
	        height=13,
	        fontSize=9,
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";        
	
	    with(L_8.style)
	        height=13,
	        fontSize=9,
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";    	        

	    with(L_9.style)
	        fontSize=9,
	        height=13,	        
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  
            
	    with(SQRT.style)
	        fontSize=9,
	        height=13,	        
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";               

	    with(BKSP.style)
	        fontSize=10,
	        height=13,	        
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Lucida Sans Unicode";        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  
    
    	with(L_4.style)
	        fontSize=9,
	        height=13,	        
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  
            
    	with(L_5.style)
	        fontSize=9,
	        height=13,	        
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";     
            
     	with(L_6.style)
	        fontSize=9,
	        height=13,	        
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";             
            
    	with(PERCENT.style)
	        fontSize=9,
	        height=13,	        
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  

    	with(DIVIDE.style)
	        fontSize=12,
	        height=13,	        
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";  

     	with(L_1.style)
	        fontSize=9,
	        height=13,	        
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   


     	with(L_2.style)
	        fontSize=9,
	        height=13,	        
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";               


     	with(L_3.style)
	        height=13,     	
	        fontSize=9,
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   
            
    	with(RECIPROCAL.style)
	        height=13,    	
	        fontSize=10,
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";              
            
            
    	with(MULTIPLY.style)
	        height=13,    	
	        fontSize=10,
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   
            
    	with(EQUAL.style)
	        height=13,    	
	        fontSize=10,
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   

    	with(PLUS.style)
	        fontSize=10,
	        
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";               

     	with(L_0.style)
	        height=13,     	
	        fontSize=9,
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";                  

    	with(PLUSMINUS.style)
	        height=13,    	
	        fontSize=10,
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   


    	with(PERIOD.style)
	        height=13,    	
	        fontSize=10,
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   


    	with(SQUARE.style)
	        height=13,    	
	        fontSize=10,
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",        
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   
 
 
    	with(SUBTRACT.style)
	        height=13,
	        fontSize=10,
	        zIndex=1,
	        width=19,
            position="relative",
            color="black",
	        fontFamily="Segoe UI",       
            cursor="default",
            direction="ltr",
            textAlign="center",
            backgroundRepeat="no-repeat";   
            
        with(SPACER2.style)
            height=4;

        with (dirScreenMinPannel.style)
            direction=BIDI;
            
	    with(ScreenMinPannel.style)
            position="relative",
	        top=1,
	        left=2;


        keyL_7.rec="0,19,17,0"
        keyL_8.rec="0,38,17,19"
        keyL_9.rec="0,57,17,39"
        keySQRT.rec="0,76,17,58"
        keyBKSP.rec="0,95,17,77" 
        keyPLUS.rec="0,116,34,97"
        keyL_4.rec="17,19,34,0"
        keyL_5.rec="17,38,34,19"
        keyL_6.rec="17,57,34,39"
        
        keySQUARE.rec="17,76,34,58" 
        
        keyDIVIDE.rec="17,95,34,77"
        keyL_1.rec="34,19,52,0"
        keyL_2.rec="34,38,52,19"
        keyL_3.rec="34,57,52,39"
        keyRECIPROCAL.rec="34,76,52,58" 
        keyMULTIPLY.rec="34,95,52,77"
        keyEQUAL.rec="34,116,86,97"
        keyL_0.rec="52,19,69,0"
        keyPLUSMINUS.rec="52,38,69,19"
        keyPERIOD.rec="52,57,69,39"
        
        
        keyPERCENT.rec="52,76,69,58"
        
        keySUBTRACT.rec="52,95,69,77" 
                         
        return null;
        
        }
        


		function keyCodeObj(keyCode,oid)
		{
			this.keyCode = keyCode;
			this.oid = oid;
		}
		
		function myKeyCodeObject(keyCodeArray)
		{
			this.keyCodeArray = keyCodeArray;
			this.Dictionary = new Array();
			
			this.initKeyCodeDictionary = function ()
			{
				for (var i=0; i<this.keyCodeArray.length; i++)
				{
					this.Dictionary[this.Dictionary.length] = new keyCodeObj(this.keyCodeArray[i].split(",")[0],this.keyCodeArray[i].split(",")[1]);
				}
			}
			this.find = function(keyCode)
			{
				var sRetVal = null;
	
				for (var i=0; i < this.Dictionary.length; i++)
				{
					if (this.Dictionary[i].keyCode == keyCode)
					{
						sRetVal = this.Dictionary[i].oid;
						break;
					}
				}
				return sRetVal;
			}
		}

		function myCalcObject()
		{
			this.keyLabelObject = null;
			this.keyCode = null;
			this.leftOperand = null;
			this.rightOperand= null;
			this.result = "";
			this.memory = "";
			this.operand = "";
			this.operandSelected="LEFT";
			this.tdObj = new Object;
			this.clearDisplayOnNextKey = true;
			this.clearCounter = 2;
			this.operandCounter = 1;
            
            this.resetOperandCounters = function()
            {
                this.operandCounter = 1;
            }
            
			this.processMouseDown = function(o)
			{
			    this.tdObj = o;
				this.keyLabelObject = getKeyLabel(o.id);
				this.shiftKeyDisplay();
			}
			
			this.processMouseUp = function()
			{
				this.resetKeyDisplay();	
			}
			this.processKeyDown = function(o)
			{ 
				if (this.keyCode==null)
				{
					this.keyToPress = getKeyToPress(event);
	
					if (this.keyToPress != null)
					{
						this.keyLabelObject = getKeyLabel(this.keyToPress);
						this.tdObj = document.getElementById(this.keyToPress);
						this.shiftKeyDisplay();
					}
				}
			}
			
			this.processKeyUp = function(o)
			{
				this.keyToPress = null;
				this.resetKeyDisplay();		
			}
			
			this.resetKeyDisplay = function(s)
			{
			    if (this.keyLabelObject != null)
			    {
			        clipBtn("0,0,0,0");
				    this.keyLabelObject.style.pixelLeft=0;
				    this.keyLabelObject.style.pixelTop=0;
				    if (s==null)
				    {
				        this.evalKey();
				    }
				    this.keyLabelObject = null;
				    this.tdObj = null;
				}
			}
			
			this.shiftKeyDisplay = function()
			{
			  clipBtn(this.tdObj.rec);
			  this.keyLabelObject.style.pixelLeft = 1;
			  this.keyLabelObject.style.pixelTop = 1;			
			}

			this.displayMemoryIndicator = function(tfDisplay)
			{
			    memoryDisplayIndicator.style.visibility= (tfDisplay? "visible" : "hidden");
			}
			this.clearDisplay = function(tfClearResults)
			{
			    this.leftOperand = "";
			    DISPLAY.innerHTML = ( tfClearResults == null ? 0 : DISPLAY.innerHTML) ;
			    this.clearDisplayOnNextKey = true; 
			}
			this.resetClearCounter = function()
			{
			    this.clearCounter = 2;
			}
			this.clearAll = function()
			{

			    this.leftOperand = null;
			    this.operand = "";
			    this.rightOperand = null;
			    DISPLAY.innerHTML = 0;
			    this.clearDisplayOnNextKey = true; 	
			    if (this.clearCounter <= 0)
			    {
			        this.resetClearCounter();
			        myHistory.clearHistory();
			    }			    
			}
			this.evalKey = function()
			{
				var oid = this.keyLabelObject.id.split("key")[0];
                if ( oid == "CLR" )
                {
                    --this.clearCounter;
                }
                else
                {
                    this.resetClearCounter();
                }
                
				switch (oid) 
				{
					case "CLR": this.clearAll();break;
					
					case "M": this.setMemory();break;
					
					case "MPLUS": this.addToMemory();break;
					
					case "MR": this.recallMemory();break;
					
					case "MC": this.clearMemory();break;
					
					case "SQRT": this.squareRoot();break;
					
					case "BKSP": this.backspace();break;
					
					case "PERCENT": this.percent();break;
					
					case "DIVIDE": this.divide();break;					
					
					case "PLUS": this.add();break;		

					case "RECIPROCAL": this.reciprocal();break;						
					
					case "MULTIPLY": this.multiply();break;		
					
					case "EQUAL": this.equal();break;		
					
					case "PLUSMINUS": this.plusMinus();break;	
					
					case "PERIOD": this.period();break;	
					
					case "SQUARE": this.square();break;	
					
					case "SUBTRACT": this.subtract();break;	
					
					case "L_0":
					case "L_1":
					case "L_2":
					case "L_3":
					case "L_4":
					case "L_5":
					case "L_6":
					case "L_7":
					case "L_8":
					case "L_9":


					    if ( (DISPLAY.innerHTML.length < maxLength) | (this.clearDisplayOnNextKey) )
					    {				    
						    this.number(oid.split("L_")[1] );
						}
						else
						{
						    System.Sound.beep();
						}
						break;
				}
				this.saveCalcSettings();
			}
			
			this.saveCalcSettings = function()
			{
			    mySettings.leftOperand = this.leftOperand;
			    mySettings.rightOperand = this.rightOperand;
			    mySettings.memory = this.memory;
			    mySettings.operand = this.operand;
			    mySettings.save(); 
			}
			this.getHistoryTableContent = function()
			{
			    return "History";
			}
			this.setMemory = function()
			{
			    if (DISPLAY.innerHTML != L_INVALID_INPUT_ERROR)
			    {
			        this.displayMemoryIndicator(true);
			        this.memory = DISPLAY.innerHTML;
			    }
			    else
			    {
			        System.Sound.beep();
			    }
			    this.clearDisplayOnNextKey = true;
			}
			this.addToMemory = function()
			{
			
			    if (DISPLAY.innerHTML != L_INVALID_INPUT_ERROR)
			    {			
				    this.displayMemoryIndicator(true);
				    this.memory = formatResult( (this.memory *1) + (DISPLAY.innerHTML*1) );
				}
				else
				{
				     System.Sound.beep();
				}
				this.clearDisplayOnNextKey = true;
			}
			this.recallMemory = function()
			{
			    if (this.memory != "")
			    {
				    DISPLAY.innerHTML = this.memory;
				    this.clearDisplayOnNextKey = false;	
				}
			}
			this.clearMemory = function()
			{
			    this.memory = "";
				this.displayMemoryIndicator(false);
				this.clearDisplayOnNextKey = true;	
			}			
			this.squareRoot = function()
			{
                if (DISPLAY.innerHTML == L_INVALID_INPUT_ERROR)
			    {
			        System.Sound.beep();
			        this.clearDisplayOnNextKey = true;
			        return null;  
			    }
                var result= formatResult(Math.sqrt(DISPLAY.innerHTML*1));
			    DISPLAY.innerHTML = result;
                this.clearDisplayOnNextKey = true;
	
			}
	
			this.backspace = function()
			{
				var s = DISPLAY.innerHTML;
			
			    if (DISPLAY.innerHTML == L_INVALID_INPUT_ERROR | DISPLAY.innerHTML == gInfinity) 
			    {
			        this.clearDisplayOnNextKey = true;
			        System.Sound.beep();
			        return null;
			    }	
				
                if (isNaN(s))
                {
                    DISPLAY.innerHTML = L_INVALID_INPUT_ERROR;
                }
                else
                {               
				    if (s.length > 0)
				    {
				        DISPLAY.innerHTML = s.substring(0,s.length-1);
				    }
				    if ( DISPLAY.innerHTML == "")
				    {
				        DISPLAY.innerHTML = "0";
				        this.clearDisplayOnNextKey = true;
				        return null;
				    }
				}
				this.clearDisplayOnNextKey = false;
			}	
						
			this.percent = function()
			{
                            if (DISPLAY.innerHTML == L_INVALID_INPUT_ERROR)
			    {
			        System.Sound.beep();
			        this.clearDisplayOnNextKey = true;
			        return null;  
			    }
                            var result= formatResult((this.leftOperand*1)*((DISPLAY.innerHTML*1) / 100));
			    DISPLAY.innerHTML = result;
                            this.clearDisplayOnNextKey = true;
			}

			this.divide = function()
			{
			    
			    if (DISPLAY.innerHTML == L_INVALID_INPUT_ERROR)
			    {
			        System.Sound.beep();
			        this.clearDisplayOnNextKey = true;
			        return null;  
			    }
			   if (this.leftOperand == null)
                           {

				 //needed history
			      this.leftOperand = DISPLAY.innerHTML*1;
                           }
                           else if (!this.clearDisplayOnNextKey)
			   {
			       this.rightOperand = DISPLAY.innerHTML*1;
			       var result = this.evaluator();
			       DISPLAY.innerHTML = result;
    			       if (result != L_INVALID_INPUT_ERROR)
				{
				 //needed history
				  this.leftOperand = result*1; 
					
				}
				
			   }

			    this.rightOperand = null;
			    this.operand = "/";
			    this.clearDisplayOnNextKey = true;
			}
	
			this.add = function()
			{
			    
			    if (DISPLAY.innerHTML == L_INVALID_INPUT_ERROR)
			    {
			        System.Sound.beep();
			        this.clearDisplayOnNextKey = true;
			        return null;  
			    }
			   if (this.leftOperand == null)
                           {
			       
			      this.leftOperand = DISPLAY.innerHTML*1;
                           }
                           else if (!this.clearDisplayOnNextKey)
			   {
			       this.rightOperand = DISPLAY.innerHTML*1;
			       var result = this.evaluator();
			       DISPLAY.innerHTML = result;
    			       if (result != L_INVALID_INPUT_ERROR)
				{
				  this.leftOperand = result*1; 
					
				}
				
			   }

			    this.rightOperand = null;
			    this.operand = "+";
			    this.clearDisplayOnNextKey = true;
			}	
			this.reciprocal = function()
			{
                            if (DISPLAY.innerHTML == L_INVALID_INPUT_ERROR)
			    {
			        System.Sound.beep();
			        this.clearDisplayOnNextKey = true;
			        return null;  
			    }
                            var result= formatResult( 1 / (DISPLAY.innerHTML * 1) );
			    DISPLAY.innerHTML = result;
                            this.clearDisplayOnNextKey = true;
			}

			
			
			this.multiply = function()
			{
			    
			    if (DISPLAY.innerHTML == L_INVALID_INPUT_ERROR)
			    {
			        System.Sound.beep();
			        this.clearDisplayOnNextKey = true;
			        return null;  
			    }
			   if (this.leftOperand == null)
                           {

				 //needed history
			      this.leftOperand = DISPLAY.innerHTML*1;
                           }
                           else if (!this.clearDisplayOnNextKey)
			   {
			       this.rightOperand = DISPLAY.innerHTML*1;
			       var result = this.evaluator();
			       DISPLAY.innerHTML = result;
    			       if (result != L_INVALID_INPUT_ERROR)
				{
				 //needed history
				  this.leftOperand = result*1; 
					
				}
				
			   }

			    this.rightOperand = null;
			    this.operand = "*";
			    this.clearDisplayOnNextKey = true;
			}			
			this.equal = function()
			{
				var result =  0; 
	
				 DISPLAY.innerHTML *= 1;
				 if (DISPLAY.innerHTML == L_INVALID_INPUT_ERROR | this.operand == "")
				 {
			            System.Sound.beep();
			            this.clearDisplayOnNextKey = true;
			            return null;
                                  }

		
                                if (this.rightOperand==null)
                                 {
					this.rightOperand = DISPLAY.innerHTML*1;
				 }

                                 if (this.leftOperand==null)
                                 {
					this.leftOperand = DISPLAY.innerHTML*1;
				 }

				    result = this.evaluator();

				    if (result != L_INVALID_INPUT_ERROR)
				    {
				        var op = (this.operand == "*" ? "x" : this.operand);
				        
				     //   addToHistory( op + " " + this.rightOperand);
				     //   addToHistory("=" + " " + result);

					this.leftOperand  = null; //result*1;				    
				    }
				    
				    DISPLAY.innerHTML = result;
				    this.clearDisplayOnNextKey = true;

			}                   

			this.evaluator = function()
                        {
				var result =  0; 
				try
				{
				if (isNaN(eval ("(this.leftOperand*1)" + this.operand + "(this.rightOperand * 1)")   )  )
				    {
					    result = L_INVALID_INPUT_ERROR;
				    }		
				    else
				    {  
				        result = eval ("(this.leftOperand*1)" + this.operand + "(this.rightOperand * 1)");
				        result = formatResult(result);
				    }
				    switch (result)
				    {
					    case Infinity:
					    result = L_INVALID_INPUT_ERROR;
					    break;
				    }	
				}
				catch(e)
				{
					result=L_INVALID_INPUT_ERROR;
				}	
				
		            	addToHistory(" " + this.leftOperand);
				addToHistory(this.operand+" " + this.rightOperand);
		            	addToHistory("= " + result);				

				return result;
                         }
	
			this.plusMinus = function()
			{
				var s = DISPLAY.innerHTML;
			
                if (isNaN(s))
                {	
                    DISPLAY.innerHTML = L_INVALID_INPUT_ERROR; 
                    System.Sound.beep();               
                }
                else
                {		
				    if (DISPLAY.innerHTML != "")
				    {
					    DISPLAY.innerHTML *= -1;
				    }
				}
			}
			this.period = function()
			{
				var s = DISPLAY.innerHTML;
                if (isNaN(s))
                {
                    DISPLAY.innerHTML = L_INVALID_INPUT_ERROR;
                    System.Sound.beep();  
                }
                else
                {
                    if (this.clearDisplayOnNextKey)
                    {
                        s=DISPLAY.innerHTML = "0";
                        this.clearDisplayOnNextKey = false;
                    }
                    
				    if (s.indexOf(".")==-1)
				    {
					    DISPLAY.innerHTML += ".";
				    }
		
				}
			}	
			this.square = function()
			{
                            if (DISPLAY.innerHTML == L_INVALID_INPUT_ERROR)
			    {
			        System.Sound.beep();
			        this.clearDisplayOnNextKey = true;
			        return null;  
			    }
                            var result= formatResult((DISPLAY.innerHTML*1) * (DISPLAY.innerHTML*1));
			    DISPLAY.innerHTML = result;
                            this.clearDisplayOnNextKey = true;
			}


			this.subtract = function()
			
			{
			    
			    if (DISPLAY.innerHTML == L_INVALID_INPUT_ERROR)
			    {
			        System.Sound.beep();
			        this.clearDisplayOnNextKey = true;
			        return null;  
			    }
			   if (this.leftOperand == null)
                           {

				 //needed history
			      this.leftOperand = DISPLAY.innerHTML*1;
                           }
                           else if (!this.clearDisplayOnNextKey)
			   {
			       this.rightOperand = DISPLAY.innerHTML*1;
			       var result = this.evaluator();
			       DISPLAY.innerHTML = result;
    			       if (result != L_INVALID_INPUT_ERROR)
				{
				 //needed history
				  this.leftOperand = result*1; 
					
				}
				
			   }

			    this.rightOperand = null;
			    this.operand = "-";
			    this.clearDisplayOnNextKey = true;
			 
			}
			this.number = function(number)
			{
				if (this.clearDisplayOnNextKey)
				{
					DISPLAY.innerHTML = "";
					this.clearDisplayOnNextKey = false;
				}
				DISPLAY.innerHTML += number;
				
				if (this.operandCounter > 2)
				{
				    this.operandCounter = 2;
				}
				this.rightOperand = null;
			}																																
		}		

		function formatResult(iNumber)
		{
		    var sNumber = Math.abs(iNumber).toString();
		    var iNumberLength = sNumber.length;
		    var _a="";
		    var _b="";
		    var _c="";
		    var a=0;
		    var b=0;
		    var b1=0;
		    var b2=0;
		    var c=0;
		    var ma=0;
		    var mb=0;
		    var isNegative=false;
            var precision = maxLength;
		
		   try
		    {
			if (isNaN(iNumber))
                         {	
	 		     return L_INVALID_INPUT_ERROR;
                         }

			isNegative = (iNumber < 0 ? true : false );
                        
			
			if (isNegative)
		        {
			   iNumber*= -1;
           precision -= 1;
			}

		        if (iNumber.toString().indexOf("e") == -1)
		        {
		            _a = sNumber.split(".")[0];
		            _b = sNumber.split(".")[1];
    		  
		            a = ( _b == undefined ? 0 : _a.length );
		            b = ( _b == undefined ? 0 : _b.length );

		            if ( maxLength - sNumber.length < 0 )
		            {
		                mb = precision - a;
		                if ( mb > 0 )
		                {
		                    if ( mb - b < 0 )
		                    {
		                        _b = _b.substring(0,mb) + "." + _b.substring(mb);
		                        iNumber = (_a*1) + ( Math.round(_b*1) / Math.pow(10,mb) );
		                    }
		                }
		            }
		        }

	                iNumber = iNumber.toPrecision(precision );	
                
        	        if (iNumber.toString().indexOf("e") == -1)
                	{
	                    iNumber *= 1;           
        	        }
                        else
                        {
                	    iNumber = (iNumber*1).toPrecision(precision -5);	
                        }	
		           
		    }
		    catch(e)
		    {
		        iNumber = L_INVALID_INPUT_ERROR;
		    }
			


		   	    
		    if (iNumber != L_INVALID_INPUT_ERROR)
                    {
			if (isNegative && iNumber > 0)
		        {
			   iNumber*= -1;
			}
                    }


		    return iNumber
		    
		        
		}
		
		
		function clipBtn(s)
		{
		    try
		    {
		        if (BIDI == "ltr")
		        {
		            var c =  document.getElementById("ClipGrid");
		            var a = s.split(",");
		            c.style.clip='rect('+a[0]+'px '+a[1]+'px '+a[2]+'px '+a[3]+'px)';
		        }
            }
            catch(e)
            {
                DISPLAY.innerHTML = e.message
            }
		    
		}		
		function clearDisplay()
		{
			DISPLAY.innerHTML = "";
			
		}
		function getKeyLabel(oid)
		{
			return document.getElementById( oid.split("key")[1] ) ;
		}
		
		function getKeyToPress(event)
		{	
		    var keyCode = mapKeyToID(event);
		    
			return myKeyCode.find(keyCode);
		}
		
        function mapKeyToID(event)
		{
			var key=event.keyCode;
			
			if(event.shiftKey)
			{
				switch(key)
				{
					case 50:
						return 950;
					case 53:
						return 953;
					case 56:
						return 106;						
				    case 187:
				        return 907;
				}
				return 0;
			}

            if (event.ctrlKey)
            {
                if (event.button == 1)
                {
                    DISPLAY.innerHTML = "clear";
                    return 0;
                }
            }

			if(event.ctrlKey)
			{			    
				switch(key)
				{	    
					case 82:
						return 982;
					case 77:
						return 977;
					case 80:
						return 980;						
				    case 76:
				        return 976;
				    case 67:
				        // copy into clipbord
				        break;
				    case 86:
				        // paste from clipboard		        
				        break;				        
				}
				return 0;
			}
	
            return key;
		}
				
        function getBackgroundImage(s)
        {
            var background = "";
            switch (s)
            {
                case "WITH_HISTORY":
                        switch (colorIndex)
                        {
                            case 1 : background = "url(images/BackgroundHistoryGrey.png)";break;
                            case 2 : background = "url(images/BackgroundHistoryPink.png)";break;
                            case 3 : background = "url(images/BackgroundHistoryYellow.png)";break;
                        }
                        break;
                        
                case "WITHOUT_HISTORY":
                        switch (colorIndex)
                        {
                            case 1 : background = "url(images/BackgroundGrey.png)";break;
                            case 2 : background = "url(images/BackgroundPink.png)";break;
                            case 3 : background = "url(images/BackgroundYellow.png)";break;
                        }
                        break;  
                        
                case "DOCKED":
                        switch (colorIndex)
                        {
                            case 1 : background = "url(images/BackgroundDockedGrey.png)";break;
                            case 2 : background = "url(images/BackgroundDockedPink.png)";break;
                            case 3 : background = "url(images/BackgroundDockedYellow.png)";break;
                        }
                        break;                                                
            }
            
            return background;
        }
        
        
