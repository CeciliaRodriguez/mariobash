    var ctx;
    var imgBg;
    var imgDrops;
    var x = 0;
    var y = 0;
    var noOfDrops = 50;
    var fallingDrops = [];

    function drawBackground(){  
        ctx.drawImage(imgBg, 0, 0); //Background
    }

    function draw() {
        drawBackground();
        
        for (var i=0; i< noOfDrops; i++)
        {
        ctx.drawImage (fallingDrops[i].image, fallingDrops[i].x, fallingDrops[i].y); //The rain drop

        fallingDrops[i].y += fallingDrops[i].speed; //Set the falling speed
        if (fallingDrops[i].y > 450) {  //Repeat the raindrop when it falls out of view
        fallingDrops[i].y = -25 //Account for the image size
        fallingDrops[i].x = Math.random() * 600;    //Make it appear randomly along the width    
        }
        
        }
    }

    function setup() {
        var canvas = document.getElementById('canvasRegn');

        if (canvas.getContext) {
                ctx = canvas.getContext('2d');
            
                    imgBg = new Image();
            imgBg.src = "http://lorempixel.com/600/600/sports/";
        setInterval(draw, 36);
        for (var i = 0; i < noOfDrops; i++) {
            var fallingDr = new Object();
            fallingDr["image"] =  new Image();
        		fallingDr.image.src = '../img/heart.png';
                
            fallingDr["x"] = Math.random() * 600;
            fallingDr["y"] = Math.random() * 5;
            fallingDr["speed"] = 3 + Math.random() * 5;
            fallingDrops.push(fallingDr);
            }

        }
    }

setup();