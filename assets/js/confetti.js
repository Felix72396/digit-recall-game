// (async () => {



// const color = {
//     0:"rgb(255, 0, 0)",
//     1:"rgb(0, 0, 255)",
//     2:"rgb(60, 255, 1)",
//     3:"rgb(255, 225, 1)",
//     4:"#fff"
// }

// let randomNumber = () => Math.floor(Math.random() * 5)
const $body = document.documentElement
// (async () => {

//     const options = {
//         method: 'GET',
//         headers: {
//             "Content-type": "text/html"
//         }
//     }
    
//     const response = await fetch("assets/partials/confetti.html", options),
//     confetti = await response.text()

    
//     $body.innerHTML += confetti


// })()

function celebrate() {
    
    const $confetti = document.querySelector(".confetti")

    $confetti.classList.remove("d-none")
    $confetti.classList.add("explotion")

    const $confettiList = document.querySelectorAll(".confetti span")

    $confettiList.forEach(item => {


        let offsetWidth = $body.offsetWidth,
            offsetHeight = $body.offsetHeight,
            x = Math.random() * offsetWidth + 1
        y = Math.random() * offsetHeight + 1,
            baseHue = Math.random() * 360,
            shapeIndex = Math.floor(Math.random() * 3),
            size = Math.ceil(Math.random() * 3),
            rotateTurns = Math.floor(Math.random() * 5)


        item.style.setProperty("--offsetX", `calc(${x}px - 50vw)`)
        item.style.setProperty("--offsetY", `calc(${y}px - 50vh)`)
        item.style.setProperty("--hue", baseHue)

        item.style.setProperty("--size", `${size}vmin`)
        item.style.setProperty("--turns", `${rotateTurns}turn`)


        if (shapeIndex === 0) item.classList.add("rounded")

        if (shapeIndex === 1) item.classList.add("parallelogram")

        // item.style.backgroundColor = color[randomNumber()]

        // if(index % 2 === 0) item.classList.add("rounded")
        // if(index % 3 === 0) item.classList.add("parallelogram")
    })


    $confetti.addEventListener("animationend", () => {
        $confetti.classList.remove("explotion")
        $confetti.classList.add("d-none")
        // $confetti.remove()
    
    })
}


// celebrate()

// })()


