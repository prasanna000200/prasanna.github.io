
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(".bttn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(".butt").click(function(){
    if(!started)
    {
        $("#change-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);   
        }
    }else
        {
            playSound("wrong");
            $(".colu-right").addClass("game-over");
            $("#change-title").text("Game Over, Press start to Restart");
            setTimeout(function(){
                $(".colu-right").removeClass("game-over");
            },200);
            startover();
        }
}

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#change-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function startover(){
    level=0;
    gamePattern=[];
    started=false;
}
