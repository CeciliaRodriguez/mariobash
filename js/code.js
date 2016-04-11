$(function(){ // on dom ready

// photos from flickr with creative commons license
  
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
      { data: { id: 'star', name: 'Estrella' } },
      { data: { id: 'chest', name: 'Cofre' } }
    ],
    edges: [
      { data: { source: 'world', target: 'luigi' } },
      { data: { source: 'world', target: 'mario' } },
      { data: { source: 'world', target: 'yoshi' } },
      { data: { source: 'mario', target: 'king_boo' } },
      { data: { source: 'mario', target: 'wario' } },
      { data: { source: 'mario', target: 'king_koopa' } },
      { data: { source: 'king_boo', target: 'star' } },
      { data: { source: 'king_boo', target: 'chest' } }
    ]
  },
  
  layout: {
    name: 'breadthfirst',
    directed: true,
    padding: 10
  }

  
}); // cy init
  
cy.on('tap', 'node', function(){
  var nodes = this;
  var tapped = nodes;
  var food = [];
  
  nodes.addClass('eater');
  
  for(;;){
    var connectedEdges = nodes.connectedEdges(function(){
      return !this.target().anySame( nodes );
    });
    
    var connectedNodes = connectedEdges.targets();
    
    Array.prototype.push.apply( food, connectedNodes );
    
    nodes = connectedNodes;
    
    if( nodes.empty() ){ break; }
  }
        
  var delay = 0;
  var duration = 500;
  for( var i = food.length - 1; i >= 0; i-- ){ (function(){
    var thisFood = food[i];
    var eater = thisFood.connectedEdges(function(){
      return this.target().same(thisFood);
    }).source();
            
    thisFood.delay( delay, function(){
      eater.addClass('eating');
    } ).animate({
      position: eater.position(),
      css: {
        'width': 10,
        'height': 10,
        'border-width': 0,
        'opacity': 0
      }
    }, {
      duration: duration,
      complete: function(){
        thisFood.remove();
      }
    });
    
    delay += duration;
  })(); } // for
  
}); // on tap

}); // on dom ready