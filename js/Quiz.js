class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide()

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    textSize(30);
    text("Result",400,50);

    //call getContestantInfo( ) here
    Contestant.getContestantInfo();

    //write condition to check if contestantInfor is not undefined
    if (allContestants !== undefined) {
      var displayPos = 250; 

      //write code to add a note here
      fill("Blue")
      textSize(20)
      text("Note: contestant who answered correct are highlighted in green color!",130,230)

      //write code to highlight contest who answered correctly
      for(var plr in allContestants){
        var correctAns = 2;
        if(allContestants[plr].answer == correctAns)
          fill("green");
        else
        fill("red");

        displayPos += 30;

        textSize(15)
        text(allContestants[plr].name +":"+ allContestants[plr].answer, 120,displayPos)
      }
    }
  }

}
