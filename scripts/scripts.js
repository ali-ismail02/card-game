const cards = document.querySelectorAll(".temp")
const scoreH1 = document.getElementById("score")
const cardDivs = document.querySelectorAll(".card")
const button = document.getElementById("reset")
const array = [0,1,2,3,4,5]
let solved = 0
let score = 0


// functions

const flip = () => {
    for(const i of cardDivs){
        i.classList.toggle("is-flipped")
    }
}


function sleep (time) { // waits for time = ms
    return new Promise((resolve) => setTimeout(resolve, time));
  }

const shuffle = () => {
    const array2=array.sort(() => Math.random() - 0.5 ) // shuffled array to use it as indexes of cards
    for(let i = 0 ; i< array.length ; i++ ){
        cards[array2[i]].classList.add(`card-${Math.floor(i/2)}`) // added different classes to cards depending on the prev suffled array
    }
}

for(const i of cardDivs){
    i.addEventListener('click', () => {
        if(!i.classList.contains("display-none")){
            i.classList.toggle("is-flipped")
            for(const j of cardDivs){
                if(i!=j && j.classList.contains("is-flipped")){// checks for other flipped cards
                    let flag = 0
                    for(let x = 0 ; x <3 ; x++) { // checks if they are of the same type
                        if(j.lastElementChild.classList.contains(`card-${x}`) && i.lastElementChild.classList.contains(`card-${x}`)){
                            i.classList.add("display-none")
                            j.classList.add("display-none")
                            solved++
                            flag = 1
                            if(solved == 2){
                                score++
                                scoreH1.innerHTML = `Score: ${score}`
                            }
                        }
                    }
                    if(flag == 0){
                        sleep(500).then(() => {
                            i.classList.remove("is-flipped")
                            j.classList.remove("is-flipped")
                            score--
                            scoreH1.innerHTML = `Score: ${score}`
                        });
                    }
                }
            }
        }
    })
}

flip()

sleep(4000).then(() => {
    flip()
});

shuffle()