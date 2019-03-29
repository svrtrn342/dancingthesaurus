nextId = 0
wordData = []
globalData = {}
dancing = false

//you can pretend this is the size of the dance floor when doing stuff with words, it will be scaled automatically
//thus the website will work with different sized windows/devices
floorWidth = 100;
floorHeight = 100;
//the height the dance floor actually is
floorScreenHeight = 450;

var unit=1;
var xlim=100;
var ylim=100;
var tileArray=[];
var counter2=0;
var increase = Math.PI / 10;
var isPaused=false;
$(document).ready(function(){
  $("#closeanimation").click(function(){
   isPaused=true;
  
  });
  
  });

function setUnits(){
	
	
	    unit= window.innerHeight/100;
        xlim=100* ((window.innerWidth)/window.innerHeight) ;
		ylim=100;
		floorWidth=xlim;
		floorHeight=ylim;
	
	//console.log(floorWidth);
	//console.log(floorHeight);
}

function firstDance(elements, data) {
    data.testWordNumber = 0;
}

function danceStart(elements, data) {
    data.newWordTimerMax = 30 * 6;
    data.newWordTimer = data.newWordTimerMax;
}

function danceUpdate(elements, data) {
    if (data.newWordTimer <= 0) {
        //create a new word every 6 seconds
        newWord("test_" + data.testWordNumber);
        data.testWordNumber++;
        data.newWordTimer = data.newWordTimerMax;
    }
    data.newWordTimer--;
}

function wordCreate(elements, id, data, pos, width, height, floorWidth, floorHeight) {
    data.vspeed = 0;
    data.hspeed = 1;
    //start in a random position
    pos.x = Math.random() * (floorWidth - width);
    pos.y = Math.random() * (floorHeight - height);
}


function wordUpdatesine(elements, id, data, pos, width, height, floorWidth, floorHeight){
	console.log(counter2);
	
	
	pos.x +=.1;
	console.log(increase);
	console.log(counter2 );
  pos.y += Math.sin( counter2 );
  counter2 += increase;
  console.log(pos.y);
	  
    
    //bounce off the sides
    if (pos.y + height + data.vspeed > floorHeight)
        data.vspeed = -Math.abs(data.vspeed);
    
    if (pos.y + data.vspeed < 0)
        data.vspeed = Math.abs(data.vspeed);
    
    if (pos.x + width + data.hspeed > floorWidth)
        data.hspeed = -Math.abs(data.hspeed);
        
    if (pos.x + data.hspeed < 0)
        data.hspeed = Math.abs(data.hspeed);
	
	
        
   // pos.x += data.hspeed;
   // pos.y += data.vspeed;
   //pos.x+=20* Math.cos(45)//data.hspeed;
   //pos.y+=20* Math.sin(45);
   
   var increase = Math.PI * 2 / 10;
   pos.x+=data.hspeed;
   pos.y += Math.sin( data.vspeed ) / 2 + 0.5;
   console.log(pos.y);
   data.vspeed += increase;
    
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
    data.hspeed = Math.min(5,Math.max(-5, data.hspeed));
    data.vspeed = Math.min(5,Math.max(-5, data.vspeed));
	
	
	
}

function wordUpdate(elements, id, data, pos, width, height, floorWidth, floorHeight) {
    data.vspeed += 0.1;
    
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
    data.hspeed = Math.min(5,Math.max(-5, data.hspeed));
    data.vspeed = Math.min(5,Math.max(-5, data.vspeed));
}

$(document).ready(function (){
    $(".dance-btn").click(function (){
        $("#prompt").hide();
        isPaused=false;
		
        var enteredWords = [
            $("#word1").val(),
         //   $("#word2").val(),
         //   $("#word3").val(),
        //    $("#word4").val()
        ];
		
		
		tileArray.push($("#word1").val());
		tileArray.push($("#word2").val());
		tileArray.push($("#word3").val());
	    tileArray.push($("#word4").val());
		
		
		newWord("hello1");
		

	//	 setInterval(P1Motion, 33);
		
		
		    var floorWidthScale = floorWidth / ($(window).width() - $("#dance-floor").position().left * 2);
    var floorHeightScale = floorHeight / floorScreenHeight;
	
	console.log(floorWidthScale );
	console.log(floorHeightScale);
		
		
		
		
		
		
		
		
	//	return;
		
		
        
        //clear the dance floor
        nextId = 0
        wordData = []
        $("#dance-floor").html("");
        
        //add each word entered to the dance floor
        var i;
        for (i = 0; i < enteredWords.length; i++) {
            if (enteredWords[i] !== "") {
                newWord(enteredWords[i]);
            }
        }
        
        words = $(".dancing-word");
        
        if (dancing === false)
            firstDance(words, globalData);
        
        danceStart(words, globalData);
        
        //call the dance function 30 times a second
        if (dancing === false) {
            dancing = true;

           thread= setInterval(dance, 33);
        }
    });
});
function P1Motion(){
	
		setUnits();
	
	
    var words = $(".dancing-word");
    var floorWidthScale = floorWidth / ($(window).width() - $("#dance-floor").position().left * 2);
    var floorHeightScale = floorHeight / floorScreenHeight;
	
	words.each(function ( index ) {
	        var pos = {};
        
        pos.x = Number($(this).attr("dance-x"));
        pos.y = Number($(this).attr("dance-y"));
        var width = $(this).width() * floorWidthScale;
        var height = $(this).height() * floorHeightScale;
        var id = Number($(this).attr("dance-id"));
        
        //wordCreate will be called right before wordUpdate is called for a given word if it hasn't been called yet
        if (wordData[id] === undefined) {
            wordData[id] = {};
            wordCreate(words, id, wordData[id], pos, width, height, floorWidth, floorHeight);
			console.log("creating word");
            $(this).show();
        }
        
        wordUpdatesine(words, id, wordData[id], pos, width, height, floorWidth, floorHeight);
        
        $(this).css({"left": Math.floor(pos.x / floorWidthScale) + "px", "top": Math.floor(pos.y / floorHeightScale) + "px"});
        $(this).attr("dance-x", pos.x);
        $(this).attr("dance-y", pos.y);
	});
	
}

function dance() {
	
	if(!isPaused){
	setUnits();
	
	
    var words = $(".dancing-word");
    var floorWidthScale = floorWidth / ($(window).width() - $("#dance-floor").position().left * 2);
    var floorHeightScale = floorHeight / floorScreenHeight;
    
    words.each(function ( index ) {
        //get the coordinates of the word from its css
        var pos = {};
        
        pos.x = Number($(this).attr("dance-x"));
        pos.y = Number($(this).attr("dance-y"));
        var width = $(this).width() * floorWidthScale;
        var height = $(this).height() * floorHeightScale;
        var id = Number($(this).attr("dance-id"));
        
        //wordCreate will be called right before wordUpdate is called for a given word if it hasn't been called yet
        if (wordData[id] === undefined) {
            wordData[id] = {};
            wordCreate(words, id, wordData[id], pos, width, height, floorWidth, floorHeight);
            $(this).show();
        }
        
        wordUpdate(words, id, wordData[id], pos, width, height, floorWidth, floorHeight);
        
        $(this).css({"left": Math.floor(pos.x / floorWidthScale) + "px", "top": Math.floor(pos.y / floorHeightScale) + "px"});
        $(this).attr("dance-x", pos.x);
        $(this).attr("dance-y", pos.y);
    });
    
    danceUpdate(words, globalData);
	}
}

function newWord(word) {
    $("#dance-floor").append('<span class="dancing-word" dance-x="0" dance-y="0" dance-id=' + nextId + ' style="display: none;">' + word + "</span>");
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