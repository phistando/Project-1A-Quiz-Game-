
$(document).ready(function() {

//define Question object using constructor method
function Question (qn, ans, correctAnsIndex) {
  this.question = qn;
  this.choices = ans;
  this.correctAnswer = correctAnsIndex;
}

var qn0 = new Question('World War 1 began after the assassination of Arch-Duke Ferdinand of the Austro-Hungarian empire in 1914.', ['True', 'False'], 0);
var qn1 = new Question('Adolf Hitler was born in Munich, Germany.', ['True', 'False'], 1);
var qn2 = new Question('The first successful printing press was developed by Johannes Gutenburg.', ['True', 'False'], 0);
var qn3 = new Question('The disease that killed a third of Europe population in the 14th century is known as The Black Plague', ['True', 'False'], 1);
var qn4 = new Question('The Hundred Years War was fought between France and Germany.', ['True', 'False'], 1);
var qn5 = new Question('Roman Emperor Hadrian built a massive wall across Northern Britain in 122 A.D', ['True', 'False'], 0);
var qn6 = new Question("Atilla the Hun was a famous 5th century A.D conqueror known as 'The Scourge of God'.", ['True', 'False'], 0);
var qn7 = new Question('Marco Polo was the first Western explorer to reach China.', ['True', 'False'], 0);
var qn8 = new Question('Athens is the birthplace for democracy', ['True', 'False'], 0);
var qn9 = new Question('Renaissance began in Milan in the 14th century.', ['True', 'False'], 1);
var qn10 = new Question('The Great Wall of China was built in the Tang dynasty', ['True', 'False'], 1);
var qn11 = new Question('Tanks were invented by the Germans in World War 1 to overcome trenches.', ['True', 'False'], 1);
var qn12 = new Question('Saladin defeated the Crusaders at the battle of Hattin and took back Jerusalem in 1187.', ['True', 'False'], 0);
var qn13 = new Question('Albert Einstein was known as the ‘father of the atomic bomb’', ['True', 'False'], 1);
var qn14 = new Question('The Berlin Wall was demolished in 1985.', ['True', 'False'], 1);
var qn15 = new Question('World War 2 began after the invasion of Poland by Germany in 1939', ['True', 'False'], 0);


//define Quiz Object with total quiz questions, default players score points and game progress status
var quiz = {
  currentQns: 0,
  totalQns: [qn0, qn1, qn2, qn3, qn4, qn5, qn6, qn7, qn8, qn9, qn10, qn11, qn12, qn13, qn14, qn15],
  isGameOver: false,
  player1Points: 0,
  player2Points: 0,
};

//1. numberOfQuestions()
//It should return an integer that is the number of questions in a game
function numberOfQuestions(){
  return 10;
}

// to shuffle the array: totalQns
function shuffle (a) {
  var j, x, i;
  for (i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

shuffle(quiz.totalQns);

//2. currentQuestion()
// It should return an integer that is the zero-based index of the current question in the quiz
function currentQuestion(){
  return quiz.currentQns;
}

//3. correctAnswer()
// It should return an integer that is the zero-based index the correct answer for the currrent question

function correctAnswer(){
  return quiz.totalQns[currentQuestion()].correctAnswer;
}

//4. numberOfChoices()
// It should return an integer that is the number of choices for the current question
function numberOfChoices(){
  return quiz.totalQns[quiz.currentQns].choices.length; //not necessary in this quiz
}


//5. playTurn(choice)
// It should take a single integer, which specifies which choice the current player wants to make. It should return a boolean true/false if the answer is correct.
function playTurn(selection){
  var playerAns;

  if (quiz.isGameOver === true) //to stop player turn when quiz.isGameOver is true
  {
    return false;
  }

  if (correctAnswer() === selection)
  {
  playerAns = true;
    if (quiz.currentQns % 2 === 0){
      quiz.player1Points ++;
    }else if(quiz.currentQns % 2 !== 0){
      quiz.player2Points ++;
    }
  }

  if (correctAnswer() !== selection)
  {
    playerAns = false;
  }
  quiz.currentQns++;

  if (currentQuestion() === numberOfQuestions()) {
    quiz.isGameOver = true;
}
return playerAns;
}

//6. isGameOver()
// It should return a true or false if the quiz is over.
function isGameOver() {
  if (quiz.isGameOver === true){
    return true;
  }else{
  return false;
  }
}

//7. whoWon()
// It should return 0 if the game is not yet finished. Else it should return either 1 or 2 depending on which player won. It should return 3 if the game is a draw.
function whoWon() {
  if (isGameOver() === false)
  {
    return 0;
  }
  else if
  (quiz.player1Points > quiz.player2Points)
  {
    return 1;
  }
  else if
  (quiz.player2Points > quiz.player1Points)
  {
    return 2;
  }
  else if
  (quiz.player1Points === quiz.player2Points)
  {
  return 3;
  }
}
//8. restart()
// It should restart the game so it can be played again.
function restart() {
  quiz.currentQns = 0;
  quiz.isGameOver = false;
  quiz.player1Points = 0;
  quiz.player2Points = 0;
  location.reload();        //to reload browser page
}

//function to update scores,questions and quiz outcome after click selections from players
function updateQuiz() {
  $('#QnNo').html('Question ' + (currentQuestion() + 1));
  $('#quizQns').html(quiz.totalQns[currentQuestion()].question);
  $('#player1Score').html('Player One: ' + quiz.player1Points);
  $('#player2Score').html('Player Two: ' + quiz.player2Points);

  if (isGameOver() === true) {
    $('#QnNo').text('');
    if (whoWon() === 3) {
      $('#quizQns').text("It's a Draw!");
    } else {
      $('#quizQns').text('Game Over! Player ' + whoWon() + ' wins!');
    }
    $('#replayBtn').toggle(); //display replay-quiz button when game is over
  }
}

//To get click selections from players and update quiz content
$('.ansButton').click(function() {
  var selection;
  var choice = this.id;
  if (choice === 'trueBtn')
  {
    selection = 0;
  }
  if (choice === 'falseBtn')
  {
    selection = 1;
  }

  if (isGameOver() === true)
  {
    $j('.ansButton').attr('onclick','').unbind('click'); //to stop ansButton when game is over
  }

  playTurn(selection);
  updateQuiz();
});

//To hide startQuizBtn button after clicking and display quiz content
function hide() {
$('#startQuizBtn').style.display = 'none';
}

$('#startQuizBtn').click(function() {
    $('.container').toggle();
    $('#startQuizBtn').hide();
    updateQuiz();
});

//click replay-quiz button function to activate restart quiz function defined earlier
$('#replayBtn').click(function() {
  restart();
});

});
