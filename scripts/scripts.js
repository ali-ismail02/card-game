const cards = document.querySelectorAll(".temp")
const button = document.getElementById("reset")
const array = [0,1,2,3,4,5]

// functions

const shuffle = () => {
    const array2=array.sort(() => Math.random() - 0.5 )
    for(let i = 0 ; i< array.length ; i++ ){
        cards[array2[i]].classList.add(`card-${Math.floor[i/2]}`)
    }
}