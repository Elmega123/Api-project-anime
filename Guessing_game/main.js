

 const tries = 10 ;
 const lowNum = 1;
 const highNum = 100;

 let answer = Math.floor(Math.random()* (highNum-lowNum + 1)) + lowNum;
 let guess = 0;
 let tryCount = 1;
 let clue = "";


 document.querySelector("#guessButton").addEventListener("click", guessCheck  )

 function guessCheck(){
     guess = document.querySelector("#guessInput").value
     clue = ""

     if(isNaN(guess) || guess == "" ){
     document.querySelector("#guessOutput").innerText = "Please enter a real number dummy"
    //  This is for when they click a button and their input isn't a number or is an empty string in guess output put that text
    }else if (guess > highNum || guess < lowNum  ){
        document.querySelector("#guessOutput").innerText = "Please enter a number between 1 and 100"
        // we are making sure users guess is between out parameters which are 1 and 100
    }else if (tryCount> tries){
        document.querySelector("#guessOutput").innerText = "Out of tries. Refrest to start again"
        endGame();
        // if too many tries game over    add end game 
    }else if (guess == answer){
        document.querySelector("#guessOutput").innerText = `You guessed correctly ${answer} is the answer good job`
        endGame();
        // idk why ${this isn't working}  if guess = answer then he guess correctly   add end game scnario
    }else {
        if(guess < answer ){
            document.querySelector("#guessOutput").innerText = "your guess is it low. try again"
            clue = " - too low";
        }
        else if(guess > answer ){
            document.querySelector("#guessOutput").innerText = "your guess is it high. try again"; 
            clue = " - too high";
        }else {
            document.querySelector("#guessOutput").innerText = "unknown exception"; 
        }
        let node = document.createElement("li")
        node.appendChild(document.createTextNode(guess + clue))
        document.querySelector("ol").appendChild(node);
        // no need to understand what's happening
        tryCount++;
    }
    

}
function endGame(){
    resetButton = document.createElement("button")
    resetButton.textContent = "Start New Game";
    document.body.append(resetButton);
    // video at 1hr:31
    resetButton.addEventListener("click",resetGame);
}

function resetGame(){
    answer = Math.floor(Math.random()* (highNum-lowNum + 1)) + lowNum;
    guess = 0;
    tryCount = 1;
    let guessList = document.getElementById("guessList");
    guessList.innerHTML = "";
    document.querySelector("#guessOutput").innerText = "";
    resetButton.parentNode.removeChild(resetButton);

}











// for (let i = 1; i < 5; i++){
//     if(i % 2 !==0 )console.log(i);
// }



// const tries = 10 

// const lownum = 1

// const highnum = 100

// let answer = math.floor(math.random()* (highnum-lownum + 1)) + lownum;  
// let guess = "";
// let message = "Guess a number between ${lownum} and ${highnum}: ";

// for (let i=1;  i <= tries; i++){
//     guess = prompt(message, guess);
// }

//  if (guess) == null){
//         alert("exiting");
//         break;
// }else if (isNaN(guess) || guess == ""  ){
//     alert("plz enter a number")
// }else{
//     guess = +guess;
// }

// if(guess ==  answer ){
//     alert("nice  ${guess} was the right answer  ");
//     break;
// } else if (guess < lownum){
//     alert("your guess should be greater or equal to ${lownum}")
// }else if (guess > highnum){
//     alert("your guess should be greater or equal to ${highnum}")
// }else if (guess> answer ){
//     alert("your guess is to high")
// }else if (guess < answer ){
//     alert("your guess is to low")
// }else {
//    alert ("error exception");
//    break;
// }

// if(i == tries){
//     alert("you ran out of tries. The answer was ${answer}. ");
// }
// }






