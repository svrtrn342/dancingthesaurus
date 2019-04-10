
			var elements = [];
			var bodies = [];
			var properties = [];
			var world;
			var worldAABB;
			 var stage = [];
			 var mouseOnClick = [];
			var edgeBounce;
			var iterations = 10;
			var timeStep = 1000 / 10000; 
			var constraints;
			var isMouseDown = false;
			var mouseJoint;
			var mouse = { x: 0, y: 0 };
			var attractorbehavior;
			var accelerationbehavior;
			
			var timerthread;
			var synonyms=[];
			var nextid=0;
			  var renderer;
			 var step = 0, radius = 200, speed = 0.005;
              var isPaused=true;
			  var maxwordcounts=10;
			  var ismagnet=false;
$(document).ready(function(){
 $("#dance-floor").css("width","100%");
	   $("#dance-floor").css("height",$("#dance-floor").css("width"));
$("#pausebutton").click(function(){
world.pause();
//world.removeBehavior(attractorbehavior);

});
$("#playbutton").click(function(){
world.unpause();

});



		document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

				document.addEventListener( 'keyup', onDocumentKeyUp, false );


				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
				document.addEventListener( 'touchend', onDocumentTouchEnd, false );

				window.addEventListener( 'deviceorientation', onWindowDeviceOrientation, false );


      window.addEventListener('resize', function() {
	  $("#dance-floor").css("width","100%");
	   $("#dance-floor").css("height",$("#dance-floor").css("width"));


      }, true);




  
  

	

  

  
  
  
  
 // Physics.util.ticker.subscribe( loop );
				

  // start the ticker




});			

function initworld(){

stage=[ 0, 0, $("#dance-floor").width(), $("#dance-floor").height() ];
worldAABB = Physics.aabb.apply(null, stage);
	
	
	world = Physics({
					timestep: timeStep,
					maxIPF: iterations
				});
				

  var viewWidth = $("#dance-floor").width();
  var viewHeight = $("#dance-floor").height();

  

  
    renderer = Physics.renderer('dom', {
		            el: document.getElementById('dance-floor'),
		            width: viewWidth,
		            height: viewHeight,
		        });
				

  world.add( renderer );


  edgeBounce=
  
  Physics.behavior('edge-collision-detection', {
      aabb: worldAABB,
      restitution: .99,
      cof: .5
  })
  
  
  world.add(edgeBounce);
  
world.add( Physics.behavior('body-collision-detection', { checkAll: false }) );
		        world.add( Physics.behavior('sweep-prune') );
		        world.add( Physics.behavior('body-impulse-response') );
				    world.add( Physics.behavior('interactive', { el: renderer.el }) );

	  
	//  world.add(bodies);
 

  

  // ensure objects bounce when edge collision is detected
 world.add( Physics.behavior('constant-acceleration') );
  //  world.add( Physics.behavior('newtonian') );

 attractorbehavior=Physics.behavior('attractor',{  order: 0,
    strength: .005}).applyTo(bodies);
 
  world.on({
    'interact:poke': function (pos) {
      //  world.wakeUpAll();
	  	   attractorbehavior=Physics.behavior('attractor',{  order: 0,
    strength: .005}).applyTo(bodies);
        attractorbehavior.position({'x':pos.x,'y':pos.y});
        world.add(attractorbehavior);
    }
    , 'interact:move': function (pos) {
        attractorbehavior.position({'x':pos.x,'y':pos.y});
		
    }
    , 'interact:release': function () {
       // this.wakeUpAll();
        world.remove(attractorbehavior);
    }
});


  Physics.util.ticker.on(function( time, dt ){

  
  				if (getBrowserDimensions()){
					setWalls();
                 }
			

				//mouseDrag();
				world.step( time );
				
				// only render if not paused
	            if ( !world.isPaused() ){
	                world.render();
	            }
  
     
  });
  
    Physics.util.ticker.start();
  
}

  			function create_physics_body(i){
			

						
	 var element=document.getElementById("physics-"+i);

					properties[i] = getElementProperties( element );
console.log(properties[i]);
			
		
	 
	

	 element.style.position = 'absolute';
				//	element.style.left = 0;//( - properties[i][2]/2) + 'px'; // will be set by renderer
				//	element.style.top = 0;//( - properties[i][3]/2) + 'px';
					
				//	element.style.left = ( - 10) + 'px'; // will be set by renderer
				//	element.style.top = ( - 10) + 'px';
					
				//	element.style.width = properties[i][2] + 'px';
					element.addEventListener( 'mousedown', onElementMouseDown, false );
					element.addEventListener( 'mouseup', onElementMouseUp, false );
					element.addEventListener( 'click', onElementClick, false );

	 


	 
	 
	 
	 		var word= Physics.body('convex-polygon', {
						x: stage[2]/2,//properties[i][0] + properties[i][2]/2,
						y:0,// properties[i][1] + properties[i][3]/2,
						vx:1,
						vy:1,
						vertices: [
							{ x: 0, y: 0 },
							{ x: properties[i][2], y: 0 },
							{ x: properties[i][2], y: properties[i][3] },
							{ x: 0, y: properties[i][3] }
						]
					});
					

					
				
					word.view=element;
				
	bodies.push(word);
					  world.add(word);
					 
						
				
				
						
						
						
						
						
					
				  
				  
}


            function onDocumentMouseDown( event ) {

				isMouseDown = true;

			}

			function onDocumentMouseUp( event ) {

				isMouseDown = false;

			}
			
			function onDocumentMouseMove( event ) {

				

				mouse.x = event.clientX;
				mouse.y = event.clientY;

			}
			function onDocumentKeyUp( event ) {

				if ( event.keyCode == 13 ) search();

			}

			function onDocumentTouchStart( event ) {

				if ( event.touches.length == 1 ) {

				
					mouse.x = event.touches[0].pageX;
					mouse.y = event.touches[0].pageY;
					isMouseDown = true;
				}
			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length == 1 ) {

					event.preventDefault();

					mouse.x = event.touches[0].pageX;
					mouse.y = event.touches[0].pageY;

				}

			}

			function onDocumentTouchEnd( event ) {

				if ( event.touches.length == 0 ) {

					isMouseDown = false;
				}

			}

			function onWindowDeviceOrientation( event ) {

			

			}
			
            	function mouseDrag() {

				// mouse press
				if (isMouseDown && !mouseJoint) {
  
					var body = getBodyAtMouse();

					if (body) {

						var md = Physics.body('point', {
							x: mouse.x,
							y: mouse.y
						});
						mouseJoint = constraints.distanceConstraint(md, body, 0.2);
					}
				}

				// mouse release
				if (!isMouseDown) {

					if (mouseJoint) {

						constraints.remove( mouseJoint );
						mouseJoint = null;
					}
				}

				// mouse move
				if (mouseJoint) {

					mouseJoint.bodyA.state.pos.set(mouse.x, mouse.y);
				}
			}

			function getBodyAtMouse() {

				return world.findOne({ $at: Physics.vector(mouse.x, mouse.y) });
			}

            function setWalls() {

				worldAABB = Physics.aabb.apply(null, stage);
            	edgeBounce.setAABB( worldAABB );

			}

			function getElementsByClass( searchClass ) {

				var classElements = [];
				var els = document.getElementsByTagName('*');
				var elsLen = els.length

				for (i = 0, j = 0; i < elsLen; i++) {

					var classes = els[i].className.split(' ');
					for (k = 0; k < classes.length; k++)
						if ( classes[k] == searchClass )
							classElements[j++] = els[i];
				}

				return classElements;
			}

			function getElementProperties( element ) {

				var x = 0;
				var y = 0;
				var width = element.offsetWidth;
				var height = element.offsetHeight;
				
				do {
					
					x += element.offsetLeft;
					y += element.offsetTop;

				} while ( element = element.offsetParent );
				
				return [ x, y, width, height ];
			}
			
			
			
						function onElementMouseDown( event ) {

				event.preventDefault();

				mouseOnClick[0] = event.clientX;
				mouseOnClick[1] = event.clientY;

			}

			function onElementMouseUp( event ) {

				event.preventDefault();

			}

			function onElementClick( event ) {

				var range = 5;

				if ( mouseOnClick[0] > event.clientX + range || mouseOnClick[0] < event.clientX - range &&
				     mouseOnClick[1] > event.clientY + range || mouseOnClick[1] < event.clientY - range ) {

					event.preventDefault();

				}


			}
			
				function getBrowserDimensions() {
				



				var changed = false;

				if ( stage[0] != $("#dance-floor").position().left ) {

					// delta[0] = (window.screenX - stage[0]) * 50;
					stage[0] = 0;//$("#dance-floor").position().left;
					changed = true;
				}

				if ( stage[1] != $("#dance-floor").position().top ) {

					// delta[1] = (window.screenY - stage[1]) * 50;
					stage[1] = 0;//$("#dance-floor").position().top;
					changed = true;
				}

				if ( stage[2] != $("#dance-floor").width() ) {

					stage[2] = $("#dance-floor").width();
					changed = true;
				}

				if ( stage[3] != $("#dance-floor").height() ) {

					stage[3] = $("#dance-floor").height();
					changed = true;
				}
			

				return changed;
			}
			
			
			
$(document).ready(function(){





$('#ex23').slider({
	formatter: function(value) {
		return value ;
		
	}
	
}).on("slide", function(slideEvt) {
	
				if(slideEvt.value>=100){

				speed=100;
				//jQuery("#speed").val(1);

			}else{
speed=slideEvt.value;
world.timestep(timeStep+(speed/500));
//world.timestep(timeStep*speed);

			//jQuery("#speed").val(slideEvt.value);

			}

	
});

$('#ex24').slider({
	formatter: function(value) {
		return value ;
		
	}
	
}).on("slide", function(slideEvt) {
	
				if(slideEvt.value<=1){
maxwordcounts=1;
				//jQuery("#speed").val(1);

			}else{
maxwordcounts=slideEvt.value;
			//jQuery("#speed").val(slideEvt.value);

			}
			

	
	
});


$(".motionselection .selected-display").click(function(){
$(this).parent().find(".no-display").toggle(0);


});

$(".motionselection .no-display").click(function(){
$(this).parent().find(".selected-display").addClass("no-display");
$(this).parent().find(".selected-display").removeClass("selected-display");
$(this).removeClass("no-display");
$(this).addClass("selected-display");
$(this).parent().find(".no-display").hide();
});


});


$(document).ready(function (){
	$("#pauseplaybutton").click(function(){
		
		if($(this).hasClass("pausestate")){
		world.pause();
			isPaused=true;
			$(this).removeClass("pausestate");
			$(this).attr("src","img/dancing/Play.svg");
			$(this).addClass("playstate");
			
		}else{
		world.unpause();
			isPaused=false;
			$(this).removeClass("playstate");
			$(this).attr("src","img/dancing/Pause.svg");
			$(this).addClass("pausestate");
			
		}
		
	});
	
	$("#closeanimation").click(function(){
		
		isPaused=true;
		world.destroy();
		
		clearInterval(timerthread);
		
		//nextId = 0;
        wordData = [];
        globalData = {};
  var maxwordcounts=10;
			  var ismagnet=false;
            $("#pauseplaybutton").removeClass("playstate");
			$("#pauseplaybutton").attr("src","img/dancing/Pause.svg");
			$("#pauseplaybutton").addClass("pausestate");
			 $(".dance-btn").find("img").attr("src","img/dancing/DanceButtonIcon.png");
			$("#pauseplaybutton").hide();
			$(this).hide();
		synonyms=[];
		$("#dance-floor").html("").hide();
		$("#prompt").show();
		$("#word-entry").show();
		$("#word1").css("border","");
		
	});
	
    $(".dance-btn").click(function (){

var thisbutton=this;
        

       
$(".inputkeyword").each(function(){
	
	if($(this).val().trim()!=""){
		
		var pattern=Number($(this).next().find(".selected-display").attr("data-pattern"));
		
		//var pattern=Number($(this).attr("id").replace("word","").trim());
		if(pattern==4){
			
			pattern=2;
		}
		if(pattern==1){
			
			pattern=3;
		}
		
			synonyms.push({"id":$(this).attr("id"),"pattern":pattern,"words":[$(this).val()]});

		
	}
	
	
});		
		
		//synonyms.push({"id":$("#word1").attr("id"),"pattern":2,"words":[$("#word1").val().trim(),"how", "are","you"]});
	   // synonyms.push({"id":$("#word2").attr("id"),"pattern":3,"words":[$("#word2").val().trim(),"apple", "orange","banana"]});
		
	
	

  
  
 
		
		
		
		if(synonyms.length<1){
			
			$("#word1").css("border","1px solid red");
			return;
		}
		
		
		
		
						$.post( "/synonym", { word1: jQuery("#word1").val(),word2: jQuery("#word2").val(),word3: jQuery("#word3").val(),word4: jQuery("#word4").val() })
	.done(function( data ) {

//synonyms=data;

//console.log(data);


for(var j=0;j<synonyms.length;j++){
	
	synonyms[j]["words"]=synonyms[j]["words"].concat(data[synonyms[j]["id"]+"_synonyms"][1]);
	
	
}



 
		
		if(isPaused){
		 $("#pauseplaybutton").removeClass("playstate");
	    $("#pauseplaybutton").attr("src","img/dancing/Pause.svg");
		$("#pauseplaybutton").addClass("pausestate");
		$(thisbutton).find("img").attr("src","img/dancing/magnetPNG.png");
		nextId = 0;
		$("#word1").css("border","");
		//$("#word-entry").hide();
	//	clearInterval(timerthread);
		isPaused=false;
		$("#pauseplaybutton").show();
		$("#closeanimation").show();
		
        $("#prompt").hide();
		$("#dance-floor").show();
		
		       //clear the dance floor
       // nextId = 0
        wordData = [];
		globalData={};
    
		initworld();
		timerthread= setInterval(dance, 4000);
        }else{
		if(!ismagnet){
		   attractorbehavior=Physics.behavior('attractor',{  order: 0,
    strength: .05}).applyTo(bodies);
        attractorbehavior.position({'x':stage[2]/2,'y':stage[3]/2});
        world.add(attractorbehavior);
		ismagnet=!ismagnet;
		}else{
		 world.remove(attractorbehavior);
		 ismagnet=!ismagnet;
		}
		}
		
		
		



         
       // }
    }).fail(function() {
    alert( "Error getting synonyms" );
  });
		
});




	
});

function dance(){
var synonymkind=Math.floor(Math.random()*synonyms.length);
var choosesynonym=synonyms[synonymkind]["words"][Math.floor(Math.random()*synonyms[synonymkind]["words"].length)];

$("#dance-floor").append('<span style="" class="physics-element" id="physics-'+nextid+'">'+choosesynonym+'</span>');
        
		var element=document.getElementById("physics-"+nextid);
		
		var offsets = $("#physics-"+nextid).offset();
var top = offsets.top;
var left = offsets.left;
		console.log(offsets);
		
		while(bodies.length>maxwordcounts){
		world.remove(bodies[0]);
		bodies.splice(0,1);
		}
			 create_physics_body(nextid);
           nextid++;

}