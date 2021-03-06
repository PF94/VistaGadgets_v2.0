////////////////////////////////////////////////////////////////////////////////
//
//  THIS CODE IS NOT APPROVED FOR USE IN/ON ANY OTHER UI ELEMENT OR PRODUCT COMPONENT.
//  Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
util =
{
    objects:
    {
        coordinates: function(s)
        {
            var p = {x:0,y:0};
            var o;

            if (typeof s == "string")
            {
                o = document.getElementById(s);
            }
            else {
                o = s;
            }
            
            if (o != null)
            {
                while (o)
                {
                    p.x += o.offsetLeft;
                    p.y += o.offsetTop;
                    o = o.offsetParent;
                }
            }

            return p;
        },
        append: function(id, x, y, w, h, z, bg, fi, parent)
        {
            var o;
            var b = true;
                        
            if (document.getElementById(id) != null)
            {
                o = document.getElementById(id);
                b = false;
            }
            else
            {
                o = document.createElement("DIV");
                o.id = id;
            }
            
            o.unselectable = "on";
            
            with (o.style)
            {
                position = "absolute";
                
                if (x != null)
                {
                    left = x + "px";
                }
                
                if (y != null)
                { 
                    top = y + "px";
                }
                
                if (w != null)
                {
                    width = w + "px";
                }
                
                if (h != null)
                {
                    height = h + "px";
                }
                
                if (z != null)
                {
                    zIndex = z;
                }
                
                if (bg != null)
                {
                    background = bg;
                }
                
                if (fi != null)
                {
                    filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + fi + ")";
                }
            }
            
            if (parent)
            {
                parent.appendChild(o);
            }
            else if (b)
            {
                document.body.appendChild(o);
            }
            
            return o;
        },
        remove: function(s)
        {
            var o;
            
            if (typeof s == "string")
            {
                o = document.getElementById(s);
            }
            else {
                o = s;
            }

            if (o)
            {
                with (o)
                {
                    style.visibility = "hidden";
                    innerHTML = "";
                }
                
                document.body.removeChild(o);
            }
        }
    },
    image:
    {
        animate:
        {
            objects: [],
            add: function(o, s, x, w, h, speed)
            {
                var o1 = document.createElement("DIV");
                
                with (o1)
                {
                    id = o.id + "_animate_0";
                    style.width = x + "px";
                    style.height = h + "px";
                    style.overflow = "hidden";
                    
                    unselectable = "on";
                   
                    var oImg1 = document.createElement("IMG");
                    oImg1.id = o.id + "_animate_1";
                    oImg1.src = s;
                    oImg1.disabled = false;
                    oImg1.style.position = "absolute";
                    oImg1.style.top = "0px";
                    oImg1.style.left = "0px";
                    o1.appendChild(oImg1);
                }
                
                o.appendChild(o1);
                
                var n = -1;
                
                for (var i = 0; i < util.image.animate.objects.length; i++)
                {
                    if (util.image.animate.objects[i] == null)
                    {
                        util.image.animate.objects[i] = [o, null];
                        n = i;
                    }
                }
                
                if (n == -1)
                {
                    util.image.animate.objects.push([o, null]);
                    n = util.image.animate.objects.length - 1;
                }
                
                util.image.animate.objects[n][1] = setTimeout("util.image.animate.rotate(" + n + "," + x + "," + w + "," + speed + ")", speed);
                
                return n;
            },
            remove: function(n)
            {
                if (util.image.animate.objects[n] != null)
                {
                    var o = document.getElementById(util.image.animate.objects[n][0].id + "_animate_0");
                    
                    if (o)
                    {
                        o.innerHTML = "";
                        
                        util.image.animate.objects[n][0].removeChild(o);
                    }
                    
                    clearTimeout(util.image.animate.objects[n][1]);
                    util.image.animate.objects[n] = null;
                }
            },
            rotate: function(n, x, w, speed)
            {
                var o = document.getElementById(util.image.animate.objects[n][0].id + "_animate_1");

                if (o != null) 
                {
                    var x0 = parseInt(o.style.left) - x;
                    
                    if (Math.abs(x0) >= w)
                    {
                        x0 = 0;
                    }
                    
                    o.style.left = x0 + "px";
                    
                    util.image.animate.objects[n][1] = setTimeout("util.image.animate.rotate(" + n + "," + x + "," + w + "," + speed + ")", speed);
                }
            }
        },
        update: function(o, s)
        {
            if (o && o.style.visibility != "hidden" && !o.disabled)
            {
                o.src = s;
            }
        }
    },
    text:
    {
        ellipse: "...",
        regex:
        {
            invalid: /[^a-zA-Z0-9]+/
        },
        test:
        {
            font: function(o, s, oImg)
            {
                var o1 = util.objects.append(stocks.objects.data.id + "_test");
                
                with (o1)
                {
                    style.visibility = "hidden";
                    var oTable1 = document.createElement("TABLE");
                    oTable1.cellSpacing = "0";
                    oTable1.cellPadding = "0";
                    oTable1.border = "0";
                    var oRow1 = oTable1.insertRow();
                    var oCell1 = oRow1.insertCell();
                    oCell1.id = stocks.objects.data.id + '_testfont';
                    oCell1.style.whiteSpace = "nowrap";
                    if(oImg != null)
                    {
                       oCell1.appendChild(oImg);
                    }
                    if(s != null)
                    {
                       oCell1.innerText += s + "";
                    }
                    o1.innerHTML = "";
                    o1.appendChild(oTable1);
                }
                
                o1 = document.getElementById(stocks.objects.data.id + "_testfont");
                
                with (o1)
                {
                    className = o.className;
                    style.fontFamily = o.style.fontFamily;
                    style.fontSize = o.style.fontSize;
                    style.fontWeight = o.style.fontWeight;
                }
                
                return o1;
            }
        },
        trim: function(o, s, w0, w1, oImg)
        {   
            var o1 = util.text.test.font(o, s, oImg);            
            
            if (w0 == null)
            {
                //Adding to width because offsetWidth is calculated incorrectly
                //when we use appendChild
                return o1.offsetWidth + (stocks.config.docked ? 9 : 16);
            }
            
            if (o1.offsetWidth > w0)
            {
                var n = s.length - 1;

                do
                {
                    n--;
                    o1.innerText = s.substring(0, n) + util.text.ellipse;
                }
                while ((o1.offsetWidth > w0 && n > 0) || util.text.regex.invalid.test(s.charAt(n)))

                s = s.substring(0, n) + util.text.ellipse;
            }

            if (w1 != null)
            {
                w1 = Math.max(w1, o1.offsetWidth);
            }
            
            util.objects.remove(stocks.objects.data.id + "_test");
            
            return (w1 == null ? s : [s, w1]);
        },
        align: function(o, s, s1, w0)
        {
            s = util.text.strip.spaces(s);
            return s;
        },
        fill: function(s, s1)
        {
            return (s != null ? s : s1);
        },
        strip:
        {
            id: function(o)
            {
                if(o.hasChildNodes())
                {
                   for(var i = 0;i < o.all.length;++i)
                   {
                      o.all(i).id = "";
                   }
                }
                return o;
            },
            spaces: function(s)
            {
                return s.replace(/^[\s]+/g,"").replace(/[\s]+$/g,"");
            }
        }
    },
    web:
    {
        url: function(s)
        {
            //Verify the link starts with http://
            var prefixIndex = s.search("http://");
            if(prefixIndex == 0)
            {
                System.Shell.execute(s);
            }
        }
    }
}