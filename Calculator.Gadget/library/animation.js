//---------------------------------------------
//  THIS CODE IS NOT APPROVED FOR USE IN/ON ANY OTHER UI ELEMENT OR PRODUCT COMPONENT.  
//  Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
// ----------------------------------------------
//TODO:Need to clean the output tags
//TODO:add a pointer to a scroll bar object
/***Important Information
To use the scrolling functions, there is the following assumtions
1- that your object will be contained in a div that has its width and height properly set in px
2- The div overflow is set to hidden
3- your object position is set to absolute and its left and top positions are set to zero

To use the move funtion, there is the following assumetions
1- Your object position is set to absolute and its left and top positions are set properly in px
***/
function animation(object,distancePerFrame,frameRate)
{
	//general
	this.clip=document.getElementById(object);
	this.frameRate=frameRate || 10;//how mant mill seconds considered a frame
	this.moving=false;//to indicate whether we are moving or not 
	this.direction=0;//0 for scroll up 1 for scroll down 2 for  scroll left 3 for scroll right 4 for normal motion
	this.stopAnimation=stopMotion;//function to stop the animation
	//srcolling realted
	this.distance=distancePerFrame || 1;//distance pixel per frameRate
	this.location=this.clip.style.posTop;//where is the clip at this momonet with refence to its 	parent
	this.xlocation=this.clip.style.posLeft;
	this.maskWidth=this.clip.parentNode.style.posWidth;//the witdth of the mask;
	this.maskHeight=this.clip.parentNode.style.posHeight;//the height of the mask;
	this.scrollWidth=this.clip.scrollWidth;//the width for scrolling for object
	this.scrollHeight=this.clip.scrollHeight;//the height for scrolling for object
	this.hScrollClipEnabled=false;//whethere there is a horizonal clip and it is enabled
	this.vScrollClipEnabled=false;//whethere there is a vertical clip and it is enabled
	this.hScrollZeroIndex=0;
	this.vScrollZeroIndex=0;
	//this.hScrollClipLocation=0;
	//this.vScrollClipLocation=0;
	this.onScrollDown=null;//pointer to the interval function for going down
	this.onScrollUp=null;//pointer to the interval function for going up
	this.onScrollLeft=null;//pointer to the interval function for going left
	this.onScrollRight=null;//pointer to the interval function for going right
	this.scrollUp=scrollUp;//function to scroll up
	this.scrollDown=scrollDown;//function to scroll down
	this.scrollLeft=scrollLeft;//function to scroll up
	this.scrollRight=scrollRight;//function to scroll down
	this.attachHScroll=attachHScroll;//function to attach horizontal scroll
	this.attachVScroll=attachVScroll;//function to attach vertical scroll
	this.scrollDownPerFrame=scrollDownPerFrame;//private function to scroll per frameRate
	this.scrollUpPerFrame=scrollUpPerFrame;//private function to scroll per frameRate
	this.scrollLeftPerFrame=scrollLeftPerFrame;//private function to scroll per frameRate
	this.scrollRightPerFrame=scrollRightPerFrame;//private function to scroll per frameRate
	this.startHScrollDrag=startHScrollDrag;
	this.endScrollDrag=endScrollDrag;
	this.scrollDrag=scrollDrag;
	//more related to moving motion
	this.currentDistance=0;//the current distance traveled by the object
	this.totalDistance=0;//the distance that need to be travled between 2 points
	this.distancePerFrame=0;//distance that need to be move between 2 points in one frame
	this.heightPerFrame=0;//distance to be traved up or down in one frame
	this.widthPerFrame=0;//distance to be traved left or right in one frame
	this.verticalDirection=true;//direction of the vertical motion true Up false down
	this.horizontalDirection=true;//direction of the horizontal motion true left false right
	this.leftPostion=this.clip.style.posLeft;//the left position of the item at the moment of motion
	this.topPosition=this.clip.style.posTop;//the top position of the item at the moment of motion 
	this.onMove=null;//pointer to the interval function that does the moving
	this.moveToPoint=moveToPoint;//function pointer for the motion
	this.doneMoveToPoint=null;
	this.moverPerFrame=moverPerFrame;//function pointer to one motion at a time
	var me=this;//pointer to itself for refrence inside the interval functions
	//more related to changing size
	this.sizePerFrame=0;
	this.targetHeight=0;
	this.onIncreaseHeight=null;
	this.onDecreaseHeight=null;
	this.changeHPosition=true;
	this.HStretch=HStretch;
	this.increaseHeight=increaseHeight;
	this.decreaseHeight=decreaseHeight;
	//for the moving down
	function increaseHeight()
	{
		var newHeight=me.clip.height+me.sizePerFrame;
		//output.innerHTML+=":"+newHeight;
		if(newHeight<=me.targetHeight)
		{
			me.clip.height=newHeight;
			if(me.changeHPosition)
				me.clip.style.posTop-=me.sizePerFrame;
		}
		else
			clearInterval(me.onIncreaseHeight);
	}
	
	function decreaseHeight()
	{
		var newHeight=me.clip.height-me.sizePerFrame;
		if(newHeight>me.targetHeight)
		{
			me.clip.height=newHeight;
			if(me.changeHPosition)
				me.clip.style.posTop+=me.sizePerFrame;
		}
		else
			clearInterval(me.onDecreaseHeight);
	}
	
	function scrollDownPerFrame()
	{
		if(me.location<=0)// 0 or more is the maxium you can go
		{
			me.clip.style.top=me.location;
			if(me.hScrollClipEnabled)
				me.hScrollClip.style.top=me.hScrollZeroIndex+Math.abs(me.location*me.hScrollRatio);
			me.location+=me.distance;// for the next interval
		}
		else
		{
			me.stopAnimation();
		}
	}
	//for the moving up
	function scrollUpPerFrame()
	{
		if(me.location>me.maskHeight-me.scrollHeight)
		{
			me.clip.style.top=me.location;
			if(me.hScrollClipEnabled)
				me.hScrollClip.style.top=me.hScrollZeroIndex+Math.abs(me.location*me.hScrollRatio);
			me.location-=me.distance;
		}
		else
		{
			me.stopAnimation();
		}
	}
	
	function scrollRightPerFrame()
	{
		if(me.xlocation<0)// 0 or more is the maxium you can go
		{
			me.clip.style.left=me.xlocation;
			if(me.vScrollClipEnabled)
				me.vScrollClip.style.left=me.vScrollZeroIndex+Math.abs(me.xlocation*me.vScrollRatio);
			me.xlocation+=me.distance;// for the next interval
		}
		else
		{
			me.stopAnimation();
		}
	}
	//for the moving up
	function scrollLeftPerFrame()
	{
		if(me.xlocation>me.maskWidth-me.scrollWidth)
		{
			me.clip.style.left=me.xlocation;
			if(me.vScrollClipEnabled)
				me.vScrollClip.style.left=me.vScrollZeroIndex+Math.abs(me.xlocation*me.vScrollRatio);
			me.xlocation-=me.distance;
		}
		else
		{
			me.stopAnimation();
		}
	}
	
	function moverPerFrame()
	{
		//	output.innerHTML=me.currentDistance+" "+me.distance+" "+me.distancePerFrame+" "+me.heightPerFrame+" "+me.widthPerFrame+" "+me.verticalDirection+" "+me.horizontalDirection;
		//output.innerHTML+="wow";
		if(me.currentDistance<me.totalDistance)
		{
			//output.innerHTML+="wow";
			//move the vertical
			if(me.horizontalDirection)
				me.leftPostion-=me.widthPerFrame;
			else
				me.leftPostion+=me.widthPerFrame;
			me.clip.style.left=Math.round(me.leftPostion);
			//move the horizontal
			if(me.verticalDirection)
				me.topPosition-=me.heightPerFrame;
			else
				me.topPosition+=me.heightPerFrame;
			me.clip.style.top=Math.round(me.topPosition);
			//increase the distance
			me.currentDistance+=me.distancePerFrame;
			//output.innerHTML+=me.leftPostion+" "+me.topPosition+"<br>";
		}
		else
		{
			me.stopAnimation();
		}
	}//morePerFrame
}

function HStretch(newHeight,time,changeHPosition)
{
	this.changeHPosition=changeHPosition;
	var diff=newHeight-this.clip.height;
	var frameNumbers=Math.round(time/this.frameRate);
	this.sizePerFrame=Math.ceil(Math.abs(diff)/frameNumbers);
	this.targetHeight=newHeight;
	if(diff>0)
		this.onIncreaseHeight=setInterval(this.increaseHeight,this.frameRate);
	else
		this.onDecreaseHeight=setInterval(this.decreaseHeight,this.frameRate);
}


//the x, y position that i want my item to go to and the time for that motion
function moveToPoint(x,y,time,callBack)
{
	var h=Math.abs(this.clip.style.posTop-y);
	var w=Math.abs(this.clip.style.posLeft-x);
	this.currentDistance=0;
	this.totalDistance=Math.sqrt((h*h)+(w*w));
	this.distancePerFrame=this.totalDistance*this.frameRate/time;
	this.heightPerFrame=(h*this.distancePerFrame)/this.totalDistance;
	this.widthPerFrame=(w*this.distancePerFrame)/this.totalDistance;
	if(y<this.clip.style.posTop)
		this.verticalDirection=true;//Up subtract
	else
		this.verticalDirection=false;//Down Add
	if(x<this.clip.style.posLeft)
		this.horizontalDirection=true;//Left subtract
	else
		this.horizontalDirection=false;//Right Add
	this.leftPostion=this.clip.style.posLeft;
	this.topPosition=this.clip.style.posTop;
	this.moving=true;
	this.direction=4;
	this.doneMoveToPoint= callBack || null;
	//output.innerHTML=this.currentDistance+" "+this.distance+" "+this.distancePerFrame+" "+this.heightPerFrame+" "+this.widthPerFrame+" "+this.verticalDirection+" "+this.horizontalDirection+" l= "+this.clip.style.left+" t= "+this.clip.style.posTop;
	this.onMove=setInterval(this.moverPerFrame,this.frameRate);
}

function attachHScroll(object,barLength,zeroIndex,enableScrollDrag)
{
	this.hScrollClip=document.getElementById(object);
	this.hScrollClipDistance=barLength-(this.hScrollClip.style.posHeight ? this.hScrollClip.style.posHeight : this.hScrollClip.height);
	this.hScrollClipEnabled=true;
	this.hScrollZeroIndex=zeroIndex || this.hScrollClip.style.posTop;
	if(enableScrollDrag)
	{
		this.hScrollClip.onmousedown=this.startHScrollDrag;
		this.hScrollClip.onmouseup=this.endScrollDrag;
		this.hScrollClip.onmousemove=this.scrollDrag;
		this.hScrollClip.scrollObjMin=this.hScrollZeroIndex;
		this.hScrollClip.scrollObjMax=this.hScrollClipDistance;
		this.hScrollClip.myClip=this;
		this.hScrollClip.clipLength=(this.hScrollClip.style.posHeight ? this.hScrollClip.style.posHeight : this.hScrollClip.height);
	}
}

function attachVScroll(object,barLength,zeroIndex)
{
	this.vScrollClip=document.getElementById(object);
	this.vScrollClipDistance=barLength-this.vScrollClip.style.posWidth;
	this.vScrollClipEnabled=true;
	this.vScrollZeroIndex=zeroIndex || this.vScrollClip.style.posLeft;
}

function scrollUp(scrollHeight)
{
	if(this.moving)//it is previously in motion
		this.stopAnimation();
	this.moving=true;
	this.direction=0;
	//we reobtaing the height of mask and scroll height in case it was changed between creation of object and this calling
	this.maskHeight=this.clip.parentNode.style.posHeight;
	this.scrollHeight=scrollHeight || this.clip.scrollHeight;
	if(this.hScrollClipEnabled)
	{
		var distanceToTravel=this.scrollHeight-this.maskHeight;
		this.hScrollRatio=this.hScrollClipDistance/distanceToTravel;
	}
	this.location=this.clip.style.posTop;
	//output.innerHTML+="<br>"+this.frameRate+" "+myThumbs.distance;
	this.onScrollUp=setInterval(this.scrollUpPerFrame,this.frameRate);
}

function scrollDown(scrollHeight)
{
	if(this.moving)//it is previously in motion
		this.stopAnimation();
	this.moving=true;
	this.direction=1;
	//we reobtaing the height of mask and scroll height in case it was changed between creation of object and this calling
	this.maskHeight=this.clip.parentNode.style.posHeight;
	this.scrollHeight=scrollHeight || this.clip.scrollHeight;	
	if(this.hScrollClipEnabled)
	{
		var distanceToTravel=this.scrollHeight-this.maskHeight;
		this.hScrollRatio=this.hScrollClipDistance/distanceToTravel;
	}
	this.location=this.clip.style.posTop;
	//output.innerHTML+="<br>"+this.frameRate+" "+myThumbs.distance;
	this.onScrollDown=setInterval(this.scrollDownPerFrame,this.frameRate);
}

function scrollLeft()
{
	if(this.moving)//it is previously in motion
		this.stopAnimation();
	this.moving=true;
	this.direction=2;
	//we reoptaing the height of mask and scroll height in case it was changed between creation of object and this calling
	this.maskWidth=this.clip.parentNode.style.posWidth;
	this.scrollWidth=this.clip.scrollWidth;
	if(this.vScrollClipEnabled)
	{
		var distanceToTravel=this.scrollWidth-this.maskWidth;
		this.vScrollRatio=this.vScrollClipDistance/distanceToTravel;
	}
	this.onScrollLeft=setInterval(this.scrollLeftPerFrame,this.frameRate);
}

function scrollRight()
{
	if(this.moving)//it is previously in motion
		this.stopAnimation();
	this.moving=true;
	this.direction=3;
	//we reoptaing the height of mask and scroll height in case it was changed between creation of object and this calling
	this.maskWidth=this.clip.parentNode.style.posWidth;
	this.scrollWidth=this.clip.scrollWidth;
	if(this.vScrollClipEnabled)
	{
		var distanceToTravel=this.scrollWidth-this.maskWidth;
		this.vScrollRatio=this.vScrollClipDistance/distanceToTravel;
	}
	this.onScrollRight=setInterval(this.scrollRightPerFrame,this.frameRate);
}

function stopMotion()
{
	if(this.moving)
	{
		if(this.direction==0)
			clearInterval(this.onScrollUp);
		else if (this.direction==1)
			clearInterval(this.onScrollDown);
		else if (this.direction==2)
			clearInterval(this.onScrollLeft);
		else if (this.direction==3)
			clearInterval(this.onScrollRight);
		else if(this.direction==4)
		{
			clearInterval(this.onMove);
			if(this.doneMoveToPoint!=null)
				this.doneMoveToPoint();
		}
		this.moving=false;
	}
}

function startHScrollDrag() {
	this.scrollObj=event.srcElement;
	this.scrollObjDirection=true;//true for up and down false for right and left
  	this.scrollObj.setCapture();
	var distanceToTravel=this.myClip.scrollHeight-this.myClip.maskHeight;
	this.scrollRatio=distanceToTravel/(this.scrollObjMax-this.scrollObjMin);//this.myClip.hScrollClipDistance;
	//output.innerHTML=this.hScrollRatio+":"+this.myClip.scrollHeight+":"+this.myClip.maskHeight;
    //this.scrollObjOffsetX= event.clientX - ((this.scrollObj.offsetLeft) ? this.scrollObj.offsetLeft : 0);
    this.scrollObjoffsetY = event.clientY - ((this.scrollObj.offsetTop) ? this.scrollObj.offsetTop : 0);
	//output.innerHTML="start"+this.scrollObj.id;
   return false;
}

// Drag an element
function scrollDrag() {
    if (this.scrollObj) 
	{
		//output.innerHTML=this.scrollObjMin;
		if(this.scrollObjDirection)
		{
			var newP=event.clientY-this.scrollObjoffsetY;
			if(newP>=this.scrollObjMin && newP<=this.scrollObjMax)
			{
				var change=newP-this.scrollObjMin;
				this.myClip.clip.style.posTop=0-(change*this.scrollRatio);
				/*var change=(newP-this.scrollObj.style.posTop)*this.scrollRatio;
				this.myClip.clip.style.posTop=this.clipLength-(newP*this.scrollRatio);
				output.innerHTML=this.myClip.clip.style.posTop*/
				//this.myClip.clip.style.posTop=this.myClip.clip.style.posTop-(change);
				this.scrollObj.style.posTop=newP;
				
				//me.hScrollClip.style.top=me.hScrollZeroIndex+Math.abs(me.location*me.hScrollRatio);
			//me.location+=me.distance;// for the next interval
			}
		}
		else
		{
			var newP=event.clientX-this.scrollObjoffsetX;
			if(newP>=this.scrollObjMin && newP<=this.scrollObjMax)
				this.scrollObj.style.posLeft=newP;
		}
		//selectedObj.style.posLeft=event.clientX-offsetX;
		
     	event.cancelBubble = true;
        return false;
   }
}

// Turn selected element off
function endScrollDrag() {
	if (this.scrollObj) 
       	this.scrollObj.releaseCapture();
   this.scrollObj = null;
   
}