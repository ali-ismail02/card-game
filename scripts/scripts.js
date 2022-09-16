
const cards = document.querySelectorAll(".temp")
const scoreH1 = document.getElementById("score")
const cardDivs = document.querySelectorAll(".card")
const array = [0,1,2,3,4,5]
let solved = 0
let score = 0
let canPlay = 1

// functions

const flip = async() => { // flips all cards
    for(const z of cardDivs){
        z.classList.toggle("is-flipped")
    }
}


function delay(milliseconds){ // allows for delay
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

const shuffle = async () => {
    const array2=array.sort(() => Math.random() - 0.5 ) // shuffled array to use it as indexes of cards
    for(let y = 0 ; y< array.length ; y++ ){
        if(cards[array2[y]].classList.contains(`card-0`)) cards[array2[y]].classList.remove(`card-0`)
        if(cards[array2[y]].classList.contains(`card-1`)) cards[array2[y]].classList.remove(`card-1`)
        if(cards[array2[y]].classList.contains(`card-2`)) cards[array2[y]].classList.remove(`card-2`)
        cards[array2[y]].classList.add(`card-${Math.floor(y/2)}`) // added different classes to cards depending on the prev suffled array
        cardDivs[y].classList.toggle("is-flipped")
    }
}

const removeDisplayNone = async () => { // returns all cards back into display
    for(const i of cardDivs){
        if(i.classList.contains("display-none")){
            i.classList.remove("display-none")
        }
    }
}

const boardReset = async () => { // resets the board after a win
    canPlay=0
    await delay(500)
    score++
    scoreH1.innerHTML = `Score: ${score}`
    solved = 0
    shuffle()
    removeDisplayNone()
    await delay(3000)
    flip()
    canPlay=1
}

const checkCards = async (i) => {
    for (let j of cardDivs) {
        if (i != j && j.classList.contains("is-flipped")) {// checks for other flipped cards
            let flag = 0
            for (let x = 0; x < 3; x++) { // checks if their faces are of the same type
                if (j.lastElementChild.classList.contains(`card-${x}`) && i.lastElementChild.classList.contains(`card-${x}`)) { // 
                    await delay(200)
                    i.classList.add("display-none")
                    j.classList.add("display-none")
                    i.classList.remove("is-flipped")
                    j.classList.remove("is-flipped")
                    j.lastElementChild.classList.remove(`card-${x}`)
                    i.lastElementChild.classList.remove(`card-${x}`)
                    solved++
                    if (solved == 3) { // checks if all cards are matched
                        boardReset()
                    }
                    flag = 1
                }
            }
            if (flag == 0) {// removes 1 from score if they weren't the same and reflips them
                await delay(200)
                i.classList.remove("is-flipped")
                j.classList.remove("is-flipped")
                score--
                scoreH1.innerHTML = `Score: ${score}`
            }
        }
    }
}

const events = async () => { // adds event listeners to the cards
    for (const i of cardDivs) {
        i.addEventListener('click', async () => {
            if (!i.classList.contains("display-none") && canPlay) { // allows only visible cars to be pressed
                i.classList.toggle("is-flipped")
                checkCards(i)
            }
        })
    }
}

const flipp  = async () => { // awaits 3 seconds before flipping the cards
    await delay(3000)
    flip()
    events()
}

shuffle()
flipp()