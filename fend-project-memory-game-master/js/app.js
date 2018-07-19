let displaySeconds = 0;
let j = 0;
let matchedPairs = 0;
let countMoves = 0;
let stars = 0;
const listOfEightCard = [
  "fa fa-anchor",
  "fa fa-bicycle",
  "fa fa-bolt",
  "fa fa-bomb",
  "fa fa-cube",
  "fa fa-diamond",
  "fa fa-leaf",
  "fa fa-paper-plane-o"
];
const listOfCards = listOfEightCard.concat(listOfEightCard);
shuffle(listOfCards); // shuffle the cards
displayCards(listOfCards); // display the cards on the screen
flipTwoCards();

/** Shuffle function from http://stackoverflow.com/a/2450976
 * @description  Shuffles the cards randomly
 * @param {string} array - List of 16 cards
 * @returns {string} listOfCards - Shuffled array
 */
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return listOfCards;
}

/** Function to display the cards on the screen
 * @description  Displays all the cards facing down as an <li class="card">
 */
function displayCards() {
  for (const listOfCard of listOfCards) {
    const eachNewCard = document.createElement("li"); //create a new <li>
    eachNewCard.className = "card"; //add a class of "card" to <li>
    const cardIcon = document.createElement("i"); //create an <i> tage
    cardIcon.className = listOfCard;
    const list = document.getElementsByClassName("deck")[0]; //take <ul>
    list.appendChild(eachNewCard); // add <li> to it
    eachNewCard.appendChild(cardIcon);
  }
}

/** Function - Timer
* @description  Generates a timer.
                Displays seconds in score board.                   
* @returns  When all 8 pairs matched, generates score message. 
*/
function myTimer() {
  j++;
  let d = new Date();
  let s = d.getSeconds();
  if (matchedPairs == 8) {
    clearInterval(displaySeconds);
    document.querySelector(".howManySeconds").innerHTML = j - 1;
    document.querySelector(".howManyMoves").innerHTML = countMoves;
    document.querySelector(".howManyStars").innerHTML = stars;
    document.querySelector(".modal").style.visibility = "visible";
    return;
  }
  document.getElementById("timerInSeconds").innerHTML = j;
}
/** Function to flip 2 cards
 * @description Flips 2 cards.  Checks if they match or not.
 */
function flipTwoCards() {
  let counter = 0;
  let flippedCard1 = 0;
  let flippedCard2 = 0;
  let flippedCardIcon1 = 0;
  let flippedCardIcon2 = 0;
  let startTimer = 0;
  // Loop to add event handler click to all the <li>s
  for (let i = 0; i < listOfCards.length; i++) {
    const g = document.querySelectorAll(".card")[i];
    /** Function to Show Cards When Clicked
     * @description  Displays the icon of the card when clicked
     */
    g.addEventListener("click", function showCard(event) {
      counter++; // Counts the 1st and 2nd flipped card
      // Start the Timer
      if (startTimer == 0) {
        displaySeconds = setInterval(myTimer, 1000);
      }
      // Flip First Card
      if (counter == 1) {
        startTimer = 1;
        flippedCard1 = this.setAttribute("class", "card open show");
        flippedCard1 = this.setAttribute("id", "flipped1");
        flippedCardIcon1 = this.firstChild.classList;
        let deactivate = this.removeEventListener("click", showCard);
        // End of "Flip First Card"

        // Flip Second Card
      } else if (counter == 2) {
        flippedCard2 = this.setAttribute("class", "card open show");
        flippedCard2 = this.setAttribute("id", "flipped2");
        flippedCardIcon2 = this.firstChild.classList;

        // Check If Two Cards Match
        let stringOfFirst = flippedCardIcon1.toString();
        let stringOfSecond = flippedCardIcon2.toString();

        // If Match - Keep Them Flipped
        if (stringOfFirst == stringOfSecond) {
          document.getElementById("flipped1").removeAttribute("id", "flipped1");
          document.getElementById("flipped2").removeAttribute("id", "flipped2");
          counter = 0;
          matchedPairs++; //Looking for 8 Matched Pairs
          // End of if statement for "If Match - Keep Them Flipped"

          // If Not Match - Flip Them Back
        } else {
          setTimeout(closeCard, 500);
          function closeCard() {
            // Close First Card
            let activate = document
              .getElementById("flipped1")
              .addEventListener("click", showCard);
            document.getElementById("flipped1").setAttribute("class", "card");
            document
              .getElementById("flipped1")
              .removeAttribute("id", "flipped1");
            // Close Second Card
            document.getElementById("flipped2").setAttribute("class", "card");
            document
              .getElementById("flipped2")
              .removeAttribute("id", "flipped2");
          } // End of CloseCard Function
          counter = 0; // Reset Counter to Zero
        } // End of else for "If Not Match - Flip Them Back"
        countMoves++; // Counts the moves to display on the screen
        // Count the Moves -  lessen the stars at 9, 18, 27 moves
        // Display the Number of Moves
        document.getElementById("moves").innerHTML = countMoves;
        // Check for 9 ,18 and 27 moves
        if (countMoves == 9) {
          $("#star3").hide();
          stars = 2;
        } else if (countMoves == 18) {
          $("#star2").hide();
          stars = 1;
        } else if (countMoves == 27) {
          $("#star1").hide();
          stars = 0;
        }
      } // End of else if statement for "Flip Second Card"
    }); // End of "ShowCard function" and "click"
  } // End of "for i = 0 loop" that displays listOfCards
} // End of "FlipTwoCards Function"
