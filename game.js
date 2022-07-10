var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var start=0;
var level=0;


var themeMusic=new Audio("sounds/bgm.mp3");
$(document).keydown(function(){
    if(start==0)
    {
        themeMusic.play();
        themeMusic.loop=true;

        $("#level-title").text("Level "+level);
        start=1;
        nextSequence();
    }
});

$(".btn").click(function (){
    // console.log(this.id);
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    makeSound("sounds/"+this.id+".mp3");

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
        // console.log("success");

        if(userClickedPattern.length==gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();},1000);
        }
    }
    else
    {
        console.log("wrong");
        themeMusic.pause();
        
        $("body").addClass("game-over");
        makeSound("sounds/wrong.mp3");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);

        startOver();
    }
    
}

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*3)+1;
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
     
    var soundSrc="sounds/"+randomChosenColour+".mp3";
    makeSound(soundSrc);
}

function makeSound(soundSrc)
{
    var sound=new Audio(soundSrc);
    sound.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
}

function startOver()
{
    level=0;
    gamePattern=[];
    start=0;
}
var pause=false;
$(".mute-button").click(function(){
    $(".mute-button").toggleClass("pressed");
    pause= !pause;
    themeMusic.muted=pause;
})
