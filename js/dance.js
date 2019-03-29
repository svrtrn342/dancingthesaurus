nextId = 0
wordData = [];
globalData = {}
dancing = false;
var isPaused=false;
var timerthread;
var speed=.5;
var maxwordcounts=10;
var maxexecutioncycles=10;
var newwordseconds=[3,0];
var synonyms=[];

	   var  xlim;
		var ylim;

		var xunit=1;
	var yunit=1;
var singletest=true;

//you can pretend this is the size of the dance floor when doing stuff with words, it will be scaled automatically
//thus the website will work with different sized windows/devices
floorWidth = 100;
floorHeight = 100;
var universalunit=100;
//the height the dance floor actually is
floorScreenHeight = 450;



function firstDance(elements, data) {
    data.testWordNumber = 0;
}

function danceStart(elements, data) {
 //   data.newWordTimerMax = 30 * 2/speed;
 //   data.newWordTimer = data.newWordTimerMax;
}

function danceUpdate(elements, data) {
	

   
//if(data.testWordNumber<maxwordcounts){
  // if (data.newWordTimer <= 0) {
	   
//var rand=Math.floor(Math.random()*50);
if(newwordseconds[1]<=0){
newwordseconds[1]=newwordseconds[0];

	   
	   
        //create a new word every 6 seconds
		var choosekeywordtype=Math.floor(Math.random()*synonyms.length);
	
		
		var choosesynonym=synonyms[choosekeywordtype]["words"][Math.floor(Math.random()*synonyms[choosekeywordtype]["words"].length)];
	
		newWord({"text":choosesynonym,"dancepattern":synonyms[choosekeywordtype]["pattern"]});
		
      //  data.testWordNumber++;
		
      //  data.newWordTimer = data.newWordTimerMax;
}
   // }
   // data.newWordTimer--;
//}

}

function wordCreate(id,tilename,dancepattern, data, pos, width, height) {

 /*   data.vspeed = 0;
    data.hspeed = 1;
	
	data.id=id;
	data.tilename=tilename;
	data.dancepattern=dancepattern;
	*/
    //start in a random position
    pos.x = Math.random() * (floorWidth - width);
    pos.y = Math.random() * (floorHeight - height);
		data.push({"id":id,"vspeed":0,"hspeed":1,"tilename":tilename,"dancepattern":dancepattern,"current_position":null,"journey_index":[0,0],"tile_direction":[0,0],"tile_width":0,"tile_height":0,"previous_position":null,"current_position":null,"next_position":null,"distance_from_center":0});
	
}

function P3Motion(elements, id, data, pos, width, height, floorWidth, floorHeight) {
 //   data.vspeed += 0.1;
//	data.hspeed+=0.1;

data["tile_width"]=width;
data["tile_height"]=height;


////////////////////new code starts//////////////////////////

	//data["current_position"]=pos;
	
			if(data["previous_position"]==null){

		data["previous_position"]=[0,universalunit];
	
		data["current_position"]=data["previous_position"];
		data["tile_direction"]=[1,1];
        data["journey_index"][1]=0;
		
	
		}else{
			
					data["previous_position"]=data["current_position"];
		data["current_position"]=[data["current_position"][0]+(data["tile_direction"][0]*speed),data["current_position"][1]-(speed)];
			
			
			
		}
		
		
		
		if((data["current_position"][0]+width+speed>floorWidth) || (data["current_position"][1]-height-speed<0)){
			//$(".dancing-word[dance-id="+data["id"]+"]").hide();
			
			        data["journey_index"][1]++;
		
		data["previous_position"]=[Math.abs(data["current_position"][0]),universalunit];
		data["current_position"]=data["previous_position"];
		
	    data["tile_direction"]=[data["tile_direction"][0]*-1,1];
		if(data["journey_index"][1]>=2){
			
			
		data["journey_index"][0]++;
		data["previous_position"]=null;
		data["current_position"]=null;
			if(data["journey_index"][0]>=maxexecutioncycles){
	
	
							   		try{
				
	//	if(wordData.length>=maxwordcounts){
		
		
		var tempid=data["id"];
			wordData.splice(wordData.findIndex(function(element){return element["id"] == data["id"];}),1);
			
			
			
			wordData.find(function(element) {return element["id"] == id;})
		if($(".dancing-word[dance-id="+tempid+"]")){$(".dancing-word[dance-id="+tempid+"]").remove()};
		
		//}
	}catch(ex){}
	
		
		
		}
		
		}
	
        return;
			
			
			
		}
		
		

    
    //cap the speed to stop things getting crazy
    //data.hspeed = Math.min(5,Math.max(-5, data.hspeed));
    //data.vspeed = Math.min(5,Math.max(-5, data.vspeed));
	//data.current_position=pos;
		

	
				if(data["current_position"]!=null){

	
		 $(".dancing-word[dance-id="+data["id"]+"]").css({"left": Math.abs(data["current_position"][0]*xunit) + "px", "top": Math.abs((universalunit-data["current_position"][1])*yunit) + "px"});
		

	}
	
	
	
	//data.vspeed += 0.1;
	//data.hspeed+=0.1;


/////////////////////new code finishes//////////////////////

    /*
    //bounce off the sides
    if (pos.y + height + data.vspeed > floorHeight)
        data.vspeed = -Math.abs(data.vspeed);
    
    if (pos.y + data.vspeed < 0)
        data.vspeed = Math.abs(data.vspeed);
    
    if (pos.x + width + data.hspeed > floorWidth)
        data.hspeed = -Math.abs(data.hspeed);
        
    if (pos.x + data.hspeed < 0)
        data.hspeed = Math.abs(data.hspeed);
        
    pos.x += data.hspeed;
    pos.y += data.vspeed;
    
    //Magnetically repel words from eachother
    //This shows how to get words to interact with eachother
    elements.each(function ( index ) {
        var word = getWordData($(this));
        if (word.id != id) {
            var distance = Math.sqrt(Math.pow(word.x + word.width / 2 - pos.x - width / 2, 2) + Math.pow(word.y + word.height / 2 - pos.y - height / 2, 2));
            var direction = Math.atan2(word.y - pos.y, word.x - pos.x);
            if (distance < 10) {
                data.hspeed -= Math.cos(direction) * (10 - distance) / 10;
                data.vspeed -= Math.sin(direction) * (10 - distance) / 10;
            }
        }
    });
    
    //cap the speed to stop things getting crazy
    //data.hspeed = Math.min(5,Math.max(-5, data.hspeed));
    //data.vspeed = Math.min(5,Math.max(-5, data.vspeed));
	data.current_position=pos;*/
}


function P2Motion(elements, id, data, pos, width, height, floorWidth, floorHeight) {
 //   data.vspeed += 0.1;
//	data.hspeed+=0.1;

data["tile_width"]=width;
data["tile_height"]=height;


////////////////////new code starts//////////////////////////

	//data["current_position"]=pos;
	
			if(data["previous_position"]==null){

		
		
		
			data["previous_position"]=[50,universalunit];
		data["current_position"]=data["previous_position"];
		data["tile_direction"]=[-1,1];
        data["journey_index"][1]=0;
		
		
		
	
		}else{
			
			//		data["previous_position"]=data["current_position"];
		//data["current_position"]=[data["current_position"][0]+(data["tile_direction"][0]*speed),data["current_position"][1]-(speed)];

		}
		
		
			if(data["journey_index"][1]==0){
			localspeedx=speed;
		localspeedy=(universalunit-88)*speed/(universalunit-50);
		}else if(data["journey_index"][1]==1){
			localspeedx=speed;
		localspeedy=(88-50-data["tile_height"]/2)*speed/(universalunit);
		
		}else if(data["journey_index"][1]==2){
			localspeedx=speed;
		localspeedy=(50-12-data["tile_height"]/2)*speed/(universalunit);
		
		}else if(data["journey_index"][1]==3){
			localspeedx=speed;
		localspeedy=(12-0-data["tile_height"]/2)*speed/(universalunit);
		
		}
		
		
			data["previous_position"]=data["current_position"];
		data["current_position"]=[data["current_position"][0]+(data["tile_direction"][0]*localspeedx),data["current_position"][1]-(localspeedy)];
		
		
		
		
		
		
	
		
		
		
if((data["current_position"][0]+width+localspeedx>floorWidth) || (data["current_position"][0]<0) || (data["current_position"][1]-height-localspeedy<0)){
		
		console.log("changing direction");
			console.log(data["current_position"]);
		
		
		     data["journey_index"][1]++;
	    data["tile_direction"]=[data["tile_direction"][0]*-1,1];
		if(data["journey_index"][1]>=4){
		data["journey_index"][0]++;
		data["previous_position"]=null;
		data["current_position"]=null;
		
			if(data["journey_index"][0]>=maxexecutioncycles){
		
		//tileArray[i]["wordArray"].splice(j,1);
		//$(thisid).remove();
		
								   		try{
	
		var tempid=data["id"];
			wordData.splice(wordData.findIndex(function(element){return element["id"] == data["id"];}),1);
			
			
			
			wordData.find(function(element) {return element["id"] == id;})
		if($(".dancing-word[dance-id="+tempid+"]")){$(".dancing-word[dance-id="+tempid+"]").remove()};
		
		//}
	}catch(ex){}
		
		
		
		}
		
		
		
		}
        return;
			
			
			
		}
		

	
	if(data["current_position"]!=null){

	
		  $(".dancing-word[dance-id="+data["id"]+"]").css({"left": Math.abs((data["current_position"][0])*xunit) + "px", "top": Math.abs((universalunit-data["current_position"][1])*yunit) + "px"});
		
		

	}
	
	

	
	
	
	//data.vspeed += 0.1;
	//data.hspeed+=0.1;


/////////////////////new code finishes//////////////////////

    /*
    //bounce off the sides
    if (pos.y + height + data.vspeed > floorHeight)
        data.vspeed = -Math.abs(data.vspeed);
    
    if (pos.y + data.vspeed < 0)
        data.vspeed = Math.abs(data.vspeed);
    
    if (pos.x + width + data.hspeed > floorWidth)
        data.hspeed = -Math.abs(data.hspeed);
        
    if (pos.x + data.hspeed < 0)
        data.hspeed = Math.abs(data.hspeed);
        
    pos.x += data.hspeed;
    pos.y += data.vspeed;
    
    //Magnetically repel words from eachother
    //This shows how to get words to interact with eachother
    elements.each(function ( index ) {
        var word = getWordData($(this));
        if (word.id != id) {
            var distance = Math.sqrt(Math.pow(word.x + word.width / 2 - pos.x - width / 2, 2) + Math.pow(word.y + word.height / 2 - pos.y - height / 2, 2));
            var direction = Math.atan2(word.y - pos.y, word.x - pos.x);
            if (distance < 10) {
                data.hspeed -= Math.cos(direction) * (10 - distance) / 10;
                data.vspeed -= Math.sin(direction) * (10 - distance) / 10;
            }
        }
    });
    
    //cap the speed to stop things getting crazy
    //data.hspeed = Math.min(5,Math.max(-5, data.hspeed));
    //data.vspeed = Math.min(5,Math.max(-5, data.vspeed));
	data.current_position=pos;*/
}



$(document).ready(function (){
	$("#pauseplaybutton").click(function(){
		
		if($(this).hasClass("pausestate")){
			isPaused=true;
			$(this).removeClass("pausestate");
			$(this).attr("src","img/dancing/Play.svg");
			$(this).addClass("playstate");
			
		}else{
			isPaused=false;
			$(this).removeClass("playstate");
			$(this).attr("src","img/dancing/Pause.svg");
			$(this).addClass("pausestate");
			
		}
		
	});
	
	$("#closeanimation").click(function(){
		
		isPaused=true;
		
		clearInterval(timerthread);
		synonyms=[];
		//nextId = 0;
        wordData = [];
        globalData = {};

            $("#pauseplaybutton").removeClass("playstate");
			$("#pauseplaybutton").attr("src","img/dancing/Pause.svg");
			$("#pauseplaybutton").addClass("pausestate");
			
			$("#pauseplaybutton").hide();
			$(this).hide();
		
		$("#dance-floor").html("").hide();
		$("#prompt").show();
		$("#word-entry").show();
		$("#word1").css("border","");
		
	});
	
    $(".dance-btn").click(function (){


        

       
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



 
		
		
		   $("#pauseplaybutton").removeClass("playstate");
			$("#pauseplaybutton").attr("src","img/dancing/Pause.svg");
			$("#pauseplaybutton").addClass("pausestate");
		
		nextId = 0;
		$("#word1").css("border","");
		$("#word-entry").hide();
		clearInterval(timerthread);
		isPaused=false;
		$("#pauseplaybutton").show();
		$("#closeanimation").show();
		
        $("#prompt").hide();
		$("#dance-floor").show();
		
		       //clear the dance floor
       // nextId = 0
        wordData = [];
		globalData={};
        $("#dance-floor").html("");
		
		
        
        //add each word entered to the dance floor
        var i;
        for (i = 0; i < synonyms.length; i++) {
         
		var choosekeywordtype=synonyms[i]["id"];
		var choosesynonym=synonyms[i]["words"][Math.floor(Math.random()*synonyms[i]["words"].length)];
		
		 
             //   newWord({"text":choosesynonym,"dancepattern":synonyms[i]["pattern"]});
           
        }
	
        
        words = $(".dancing-word");
        
      //  if (dancing === false)
            firstDance(words, globalData);
        
        danceStart(words, globalData);
          timerthread= setInterval(dance, 50/speed);
        //call the dance function 30 times a second
       // if (dancing === false) {
        //    dancing = true;
         
       // }
    }).fail(function() {
    alert( "Error getting synonyms" );
  });
		
});
	
});

function dance() {
	
	if(!isPaused){
		newwordseconds[1]-=(speed*50/1000);
			     xlim=100;//100*($("#dance-floor").width())/$("#dance-floor").height() ;
	ylim=100;
	xunit=($("#dance-floor").width())/100;
	 yunit=$("#dance-floor").height()/100;

						   		try{
				
	
		if(wordData.length>maxwordcounts){
			
			
		var tempid=wordData[0]["id"];
		
			wordData.splice(0,1);
		if($(".dancing-word[dance-id="+tempid+"]")){$(".dancing-word[dance-id="+tempid+"]").remove()};
		}
		//}
	}catch(ex){}
	
	 
		
		
    var words = $(".dancing-word");
    var floorWidthScale = floorWidth / ($(window).width() - $("#dance-floor").position().left * 2);
    var floorHeightScale = floorHeight / floorScreenHeight;
    /*
	if(words.length>maxwordcounts){
		for(var i=0;i<words.length-maxwordcounts;i++){
		
		words[i].remove();
	}
	}
	*/
	
	
    words.each(function ( index ) {
        //get the coordinates of the word from its css
        var pos = {};
        
        pos.x = Number($(this).attr("dance-x"));
        pos.y = Number($(this).attr("dance-y"));
        var width = $(this).width() * floorWidthScale;
        var height = $(this).height() * floorHeightScale;
        var id = Number($(this).attr("dance-id"));
		var dancetext=$(this).attr("dance-text");
		var dancepattern=$(this).attr("dance-pattern");
        
        //wordCreate will be called right before wordUpdate is called for a given word if it hasn't been called yet
       /* if (wordData[id] === undefined) {
            wordData[id] = {};
            wordCreate(words, id,dancetext,dancepattern, wordData[id], pos, width, height);
           
        }*/
		;
		$(this).show();
        if(dancepattern==3){
        P3Motion(words, id, wordData.find(function(element) {return element["id"] == id;}), pos, width, height, floorWidth, floorHeight);
        }else if(dancepattern==2){
			
	    P2Motion(words, id, wordData.find(function(element) {return element["id"] == id;}), pos, width, height, floorWidth, floorHeight);
   
			
		}
      //  $(this).css({"left": Math.floor(pos.x / floorWidthScale) + "px", "top": Math.floor(pos.y / floorHeightScale) + "px"});
        $(this).attr("dance-x", pos.x);
        $(this).attr("dance-y", pos.y);
    });
    
    danceUpdate(words, globalData);
	

	

	
	}
}




function newWord(word) {
	
	    var floorWidthScale = floorWidth / ($(window).width() - $("#dance-floor").position().left * 2);
    var floorHeightScale = floorHeight / floorScreenHeight;
	/*var nextId=wordData.length;
	wordData.push({"tilename":word,"pattern":3,"tile_synonyms":["hello","how","are","you"],"id":nextId,"status":"0","journey_index":[0,0],"tile_direction":[0,0],"current_string":word,"tile_width":0,"tile_height":0,"previous_position":null,"current_position":null,"next_position":null,"distance_from_center":0});
	*/
	var newid=wordData.length;
	
	var pos = {};
	if(word.dancepattern==3){
		
		pos.x=0;
		pos.y=0;
	}else{
		pos.x=0;
		pos.y=0;
		
	}
	
	
    $("#dance-floor").append('<span class="dancing-word" dance-x="'+pos.x+'" dance-y="'+pos.y+'" dance-pattern="'+word.dancepattern+'" dance-text="'+word.text+'" dance-id=' + nextId + ' style="display: none;">' + word.text + "</span>");
	
	var thisid=$(".dancing-word[dance-id="+nextId+"]");

	    
        
        pos.x = Number($(thisid).attr("dance-x"));
        pos.y = Number($(thisid).attr("dance-y"));
        var width = $(thisid).width() * floorWidthScale;
        var height = $(thisid).height() * floorHeightScale;
        var id = Number($(thisid).attr("dance-id"));
		var dancetext=$(thisid).attr("dance-text");
		var dancepattern=$(thisid).attr("dance-pattern");
  
        //wordCreate will be called right before wordUpdate is called for a given word if it hasn't been called yet
       
	wordCreate( id,dancetext,dancepattern, wordData, pos, width, height);    
	//$(thisid).show();	
	 /*  if (wordData[newid] === undefined) {
            wordData[newid] = {};
        
		
        }
		*/
		

		

	




	nextId++;
}

//get all the relevant data for a given word
function getWordData(element) {
    var floorWidthScale = floorWidth / ($(window).width() - $("#dance-floor").position().left * 2);
    var floorHeightScale = floorHeight / floorScreenHeight;
    var data = {};
    data.x = Number(element.attr("dance-x"));
    data.y = Number(element.attr("dance-y"));
    data.width = element.width() * floorWidthScale;
    data.height = element.height() * floorHeightScale;
    data.id = Number(element.attr("dance-id"));
    data.data = wordData[data.id];
    return data;
}