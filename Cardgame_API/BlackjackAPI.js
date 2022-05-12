//Get the deck
let deckId = ''

if(localStorage.getItem('win')){
    console.log("all good")
    document.querySelector("#timeswon").innerHTML= localStorage.getItem('win')
  }else{
    (localStorage.setItem('win',0))
  }
  


fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        deckId = data.deck_id
        console.log(deckId)
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });




 document.querySelector('#start').addEventListener('click', drawcards)





function drawcards(){
    askforbet()
    
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`

    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector("#dealercard").src = data.cards[0].image
        document.querySelector("#player1").src = data.cards[1].image
        document.querySelector("#player1img2").src = data.cards[2].image
        let dealerval = convertToNum((data.cards[0].value))
        let player1val1 = convertToNum((data.cards[1].value))
        let player2val2 = convertToNum((data.cards[2].value))
        let twocardplayerval = player1val1 + player2val2
        console.log(twocardplayerval)
        document.querySelector("#actualvalue").innerHTML = twocardplayerval
        document.querySelector("#dealervall").innerHTML = dealerval
        localStorage.setItem("dealerval",dealerval)
        
        hidedrawcards()
        checkifuserover21()
        askforstandordraw()

        
      })
    //   .catch(err => {
    //       console.log(`error ${err}`)
    //   });

}

function convertToNum(val){
    if(val === "ACE"){
       return 11
    //   in the future need to make it return 11 or 1  
    }else if (val === "KING"){
      return 10
    }else if(val === "QUEEN"){
      return 10
    }else if(val === "JACK"){
      return 10
    }else{
      return Number(val)
    }
  }

  

  function askforbet(){
    let balance = document.getElementById("balancenum").innerHTML
    console.log(balance)
   let bet = prompt(`How much do you wanna bet your current balance is ${balance}  `)
   let actualbalance =  balance - bet
   console.log(actualbalance)

   document.querySelector("#balancenum").innerText = actualbalance
   localStorage.setItem("bet",bet)

//    youwon(bet)
  }

function askforstandordraw(){
    document.getElementById("standd").style.display = "block"
    document.getElementById("draww").style.display = "block"

}
    document.getElementById("draww").addEventListener("click", drawanothacard )
    document.getElementById("standd").addEventListener("click", standdd )

    function drawanothacard(){

        const url2 = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`


    fetch(url2)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
          console.log(data)
       let card3 = document.createElement("img")
       card3.id = "thecard3"
       card3.src = data.cards[0].image
       document.getElementById("playerimgs").appendChild(card3)
    //    card3.insertBefore(document.getElementById("player1img2").innerHTML,null)
        // document.querySelector("thecard3").innerHTML = "data.cards[0].image"
        let actual = document.getElementById("actualvalue").innerHTML
        let newval = convertToNum((data.cards[0].value))
        let newactual = (parseInt(actual) + newval)
        console.log(newactual)
        document.querySelector("#actualvalue").innerHTML = newactual
        checkifuserover21()
        

        


        
          
        
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
      
}


function standdd() {
    let dealerVal = document.querySelector("#dealervall");
    const url3 = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
  
    fetch(url3)
      .then((res) => res.json()) // parse response as JSON
      .then((data) => {
        // create card img
        let card4 = document.createElement("img");
        card4.id = "thecard4"
        card4.src = data.cards[0].image;
        document.getElementById("dealerimgs").appendChild(card4);
  
        // Reassess new dealer val
        let actualdealer = dealerVal.innerHTML;
        let newdealerval = convertToNum(data.cards[0].value);
        let newdealeractual = parseInt(actualdealer) + newdealerval;
        dealerVal.innerHTML = newdealeractual;
        console.log("added card of value", newdealerval);
        console.log("newdealeractual", newdealeractual);
        
        // if the new dealer value is less than 17, call function again
        if (newdealeractual < 17) {
          //console.log("running standd again");
          standdd();
          
        }
        checkwhowonafterstand()
        
      });
      
  }




  function youwon(){

    let win = localStorage.getItem('win')
    win = parseInt(win) + 1
    localStorage.setItem("win",win)
    let actualbalance = document.querySelector("#balancenum").innerHTML
    let payment = localStorage.getItem("bet") * 2
    document.querySelector("#balancenum").innerHTML =  (Number(actualbalance) + Number(payment))
    document.querySelector("#timeswon").innerHTML= localStorage.getItem('win')
      alert(`congratulations you won ${payment} has been added to you balance  `)
     

  }

  function youlost(){
      alert("You lost :( press the play button if you want to try again")



  }

  function tie(){
    let actualbalance = document.querySelector("#balancenum").innerHTML
    let payment = localStorage.getItem("bet")
    document.querySelector("#balancenum").innerHTML =  (Number(actualbalance) + Number(payment))
    alert(`we got a tie ${payment} has been added to you balance  `)


  }

  function checkifuserover21(){

    let userval = document.querySelector("#actualvalue").innerHTML 
    localStorage.setItem("userval",userval)
    let realuserval =  localStorage.getItem("userval")


    if(realuserval<21){
        console.log("it's cool it's under 21")
    }else if(realuserval==21){
        console.log("woah we have a blackjack")
        youwon()
    }else if(realuserval>21){
        console.log("the number is over 21 you lost")
        youlost()

    }
}


function checkwhowonafterstand(){
    let dealervalue =  document.querySelector("#dealervall").innerHTML

    localStorage.setItem("dealerval", dealervalue )

    
    if(document.querySelector("#dealervall").innerHTML>21){
        console.log("bust goes the dealer you won")
        youwon()
    }else if(document.querySelector("#dealervall").innerHTML==document.querySelector("#actualvalue").innerHTML){
        console.log("it's a tie")
        tie()
    }else if(document.querySelector("#dealervall").innerHTML==21){
        console.log("unlucky dealer has blackjack")
        youlost()
    }else if(document.querySelector("#dealervall").innerHTML>document.querySelector("#actualvalue").innerHTML && document.querySelector("#dealervall").innerHTML> 16  ){
        console.log("unlucky the dealer value is higher than yours")
        youlost()
    }else if(document.querySelector("#dealervall").innerHTML<document.querySelector("#actualvalue").innerHTML && document.querySelector("#dealervall").innerHTML> 16){
        console.log("congrats you won your value is higher than the dealer's")
        youwon()
    }


}

document.getElementById("hidecards").addEventListener("click", clearextracards)

function clearextracards(){


    let userval =  localStorage.getItem("userval")
    let dealerval =  localStorage.getItem("dealerval")



    // testing out another code
    if(document.getElementById("thecard3")&&document.getElementById("thecard4")){

        console.log("plz work")
        hidehidebutton()
        clearextradealercards()
        clearextraplayercards()

    }else if(dealerval>21 && dealerval>userval&&!!document.getElementById("thecard3")){
        console.log("0")
        hidehidebutton()
        clearextradealercards()
        clearextraplayercards()

    }
     else if(dealerval>21 && dealerval>userval ) {
        // this is when no extra user cards where needed
        console.log("1")
        hidehidebutton()
        clearextradealercards()
    }else if(dealerval==userval && !document.getElementById("thecard3")){
        console.log("2.3")
        hidehidebutton()
        clearextradealercards()
    }
    else if(dealerval==userval){
        console.log("2")
        hidehidebutton()
        clearextradealercards()
        clearextraplayercards()
    }else if(dealerval==21){
        console.log("3")
        hidehidebutton()
        clearextradealercards()
    }else if(dealerval>userval && dealerval> 16  ){
        console.log("4")
        hidehidebutton()
        clearextradealercards()
    }else if(dealerval<userval && dealerval> 16 && document.getElementById("thecard3" )){
        console.log("5.3")
        hidehidebutton()
        clearextradealercards()
        clearextraplayercards()

    }
    else if(dealerval<userval && dealerval> 16){
        console.log("5")
        hidehidebutton()
        clearextradealercards()

    }else if(userval<21){
        console.log("6")
        clearextraplayercards()
        clearextradealercards()
    }else if(userval==21){
        console.log("7")
        // user got a blackjack no need for dealer cards
        hidehidebutton()
        clearextraplayercards()
    }else if(userval>21 && dealerval<16){
        // this is when user went over 21 without dealer drawing
        console.log("8")
        hidehidebutton()
        clearextraplayercards()
        
        

    }
    // clearextradealercards()
    // clearextraplayercards()
    drawcards()

}

function clearextraplayercards(){
    document.getElementById("thecard3").outerHTML = ""

    if(document.getElementById("thecard3")){
        console.log("removed player card")
        clearextracards()
       
    //   }else if(document.getElementById("thecard4")){
    //     clearextracards()
    //     console.log("removed dealer card")
      }  
   
}
function clearextradealercards(){
    document.getElementById("thecard4").outerHTML = ""

    if(document.getElementById("thecard4")){
        console.log("removed dealer card")
        clearextradealercards()
        
    //   }else if(document.getElementById("thecard4")){
    //     clearextracards()
    //     console.log("removed dealer card")
      }  
}

function hidedrawcards(){
    document.getElementById("start").style.display = "none"
    document.getElementById("hidecards").style.display = "block"

}
// document.getElementById("idkk").addEventListener("click", hidehidebutton)
function hidehidebutton(){
    document.getElementById("hidecards").style.display = "none"
    document.getElementById("start").style.display = "block"
}
