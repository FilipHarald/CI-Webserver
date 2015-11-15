


var width = 100;
var height = 100;
var RGBColor = "#FF0000";
var xmlhttp;

function init(){
	var canvas = document.getElementById("canvas");
	canvas.addEventListener("mousedown", getPosition, false);
}
function getSpotifyUser(){
	var userName = document.getElementById("spotifyUser").value;

	xmlhttp = new XMLHttpRequest();
	var apiUrl = "https://api.spotify.com/v1/users/" +userName
	console.log(apiUrl);
	xmlhttp.onreadystatechange=function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var myArr = JSON.parse(xmlhttp.responseText);
		console.log(myArr.images[0].url);
		document.getElementById("spotifyImage").src = myArr.images[0].url; 

    	console.log(myArr.display_name);
	    for(i = 0; i < myArr.length; i++){
	    	//console.log(myArr[i])
	    }
    }
}

	xmlhttp.open("GET", apiUrl, true);

	//xmlhttp.setRequestHeader("Accept", "application/json");
	xmlhttp.send();
}




function getPosition(event){

	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,400,300);
	var rect = canvas.getBoundingClientRect();
	var x = event.x;
	var y = event.y;
	//alert("Mouse x " + x + " Mouse y " + y);
	ctx.fillStyle = RGBColor;
	
	var drawX =event.clientX - rect.left-width/2;
	var drawY = event.clientY - rect.top-height/2;

    ctx.fillRect(drawX,drawY,width,height);
}

function changeWidth(value){
	width = value;	
}
function changeHeight(value){
	height = value;	
}
function changeSize(){

	changeWidth(document.getElementById("widthBox").value);
	changeHeight(document.getElementById("heightBox").value);
}
function changeColor(){
	RGBColor = document.getElementById("rgbBox").value;
}