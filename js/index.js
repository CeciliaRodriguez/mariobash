var speachInit = ["<b>¡Bienvenido a MarioBash!</b>", "Peach necesita que la rescaten, para lograrlo deberás ganar los tres mundos que se encuentran en <b>/home/mario</b>", "Dentro de cada mundo se encuentra un archivo con las instrucciones para ganarlo", "Para leerlas utilizá el comando '<b>cat instrucciones.txt</b>'", "Mirá lo que hay dentro de cada directorio ejecutando '<b>ls</b>' <i>(los directorios se verán azules y los archivos blancos)</i>","Movete entre los directorios usando '<b>cd [directorio]</b>'","Para volver un directorio hacia atrás usá '<b>cd ..</b>' y si no te acordás donde estás podés saberlo con '<b>pwd</b>'", "Acordate que siempre podés consultar por un comando escribiendo '<b>man [comando]</b>'","Vamos, ¡Peach TE está esperando!"];

$(document).ready(function() {
    $("#myDiv").click(function() {
        $("#final-overlay").show();
       var mario = document.getElementById('mario');
       var peach = document.getElementById('peach');
       mario.style.display = 'block';
       peach.style.display = 'block';
       // Mario y Peach se quedan en el medio
        mario.addEventListener('webkitAnimationEnd',function( event ) {
        mario.style.position = 'absolute';
        mario.style.top = '15%';
        mario.style.right = '330px';
        }, false);
        peach.addEventListener('webkitAnimationEnd',function( event ) {
        peach.style.position = 'absolute';
        peach.style.top = '15%';
        peach.style.left = '330px';
        }, false);
    });
});


$(function() {
                var ctx;
                var imgBg;
                var imgDrops;
                var x = 0;
                var y = 0;
                var noOfDrops = 50;
                var fallingDrops = [];
                var windowHeight = $(document).height();
                var windowWidth = $(document).width();

                function drawBackground(){  
                    ctx.drawImage(imgBg, 0, 0); //Background
                }

                function draw() {
                    drawBackground();
                    
                    for (var i=0; i< noOfDrops; i++)
                    {
                    ctx.drawImage (fallingDrops[i].image, fallingDrops[i].x, fallingDrops[i].y); //The rain drop

                    fallingDrops[i].y += fallingDrops[i].speed; //Set the falling speed
                    if (fallingDrops[i].y > windowHeight) {  //Repeat the raindrop when it falls out of view
                    fallingDrops[i].y = -25 //Account for the image size
                    fallingDrops[i].x = Math.random() * windowWidth;    //Make it appear randomly along the width    
                    }
                    
                    }
                }

                function setup() {
                  var canvas = document.getElementById('canvasRegn');

                  canvas.height = $(document).height();
                  canvas.width = $(document).width();

                  if (canvas.getContext) {
                    ctx = canvas.getContext('2d');
                    imgBg = new Image();
                    imgBg.src = "img/bkg.jpg";
                    setInterval(draw, 36);
                  
                    for (var i = 0; i < noOfDrops; i++) {
                      var fallingDr = new Object();
                      fallingDr["image"] =  new Image();
                      fallingDr.image.src = 'img/heart.png';    
                      fallingDr["x"] = Math.random() * windowWidth;
                      fallingDr["y"] = Math.random() * windowHeight;
                      fallingDr["speed"] = 3 + Math.random() * 20;
                      fallingDrops.push(fallingDr);
                    }
                  }
                }

                setup();
            });

function saltear_intro() {
                window[term].resume();    
}

function showMap() {
    $(document).ready(function(){
        if ($('.text_container').hasClass("hidden"))
            $('.text_container').removeClass("hidden").addClass("visible");
        else
            $('.text_container').removeClass("visible").addClass("hidden");
    });

    var cy = cytoscape({
          container: document.getElementById('cy'),
          
          style: cytoscape.stylesheet()
            .selector('node')
              .css({
                'height': 100,
                'width': 100,
                'background-fit': 'cover',
                'background-color': 'white',
                'border-color': '#0f0f0f',
                'border-width': 6,
                'border-opacity': 0.8,
                'content': 'data(name)',
                'text-valign': 'bottom',
                'color': '#fff',
                'font-size': '2em',
                'text-outline-width': 3,
                'text-outline-color': '#000'
              })
            .selector('edge')
              .css({
                'width': 8,
                'target-arrow-shape': 'triangle',
                'line-color': '#0f0f0f',
                'target-arrow-color': '#0f0f0f'
              })
          .selector('#world')
              .css({
                'background-image': 'img/world.png'
              })
          .selector('#mario')
              .css({
                'background-image': 'img/mario.png'
              })
          .selector('#luigi')
              .css({
                'background-image': 'img/luigi.png'
              })
          .selector('#yoshi')
              .css({
                'background-image': 'img/yoshi.png'
              })
          .selector('#king_boo')
              .css({
                'background-image': 'img/king_boo.png'
              })
          .selector('#wario')
              .css({
                'background-image': 'img/wario.png'
              })
          .selector('#king_koopa')
              .css({
                'background-image': 'img/king_koopa.png'
              })
          .selector('#star')
              .css({
                'background-image': 'img/star.png'
              })
          .selector('#chest')
              .css({
                'background-image': 'img/chest.png'
              }),
          

          elements: {
            nodes: [
              { data: { id: 'world', name: 'Home' } },
              { data: { id: 'mario', name: 'Mario' } },
              { data: { id: 'luigi', name: 'Luigi' } },
              { data: { id: 'yoshi', name: 'Yoshi' } },
              { data: { id: 'king_boo', name: 'Mundo Nube' } },
              { data: { id: 'wario', name: 'Mundo Hongo' } },
              { data: { id: 'king_koopa', name: 'Mundo Desierto' } },
              { data: { id: 'chest', name: 'Cofre' } }
            ],
            edges: [
              { data: { source: 'world', target: 'luigi' } },
              { data: { source: 'world', target: 'mario' } },
              { data: { source: 'world', target: 'yoshi' } },
              { data: { source: 'mario', target: 'king_boo' } },
              { data: { source: 'mario', target: 'wario' } },
              { data: { source: 'mario', target: 'king_koopa' } },
              { data: { source: 'king_boo', target: 'chest' } }
            ]
          },
          
          layout: {
            name: 'breadthfirst',
            directed: true,
            padding: 10
          }
          
        }); // cy init

}


//MODAL window
var si = document.getElementById('modalSI');
var no = document.getElementById('modalNO');

si.onclick = function() {
    ToadSpeaking(speachInit);
}

no.onclick = function() {
    var speachNoIntro = ["<b>¡Bienvenido a MarioBash!</b>"];
    ToadSpeaking(speachNoIntro);
    window[term].resume();
}

function displayModal () {
  $(document).ready(function() {
    $("#modalBtn").trigger('click');
});
}


