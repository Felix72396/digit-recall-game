




// $btnDigitClose.onclick = () => {
//     $digitContainer.style.display = "none"
// }
let $td

window.onclick = (e) => {
    
    if(e.target.matches("td"))
    {
        $digitContainer.style.display = "flex"
        $td = e.target
    }

    if(e.target.matches(".main__digits button:not([class='main__x'] button)"))
    {
        $td.textContent = e.target.textContent
        $td.classList.add("white-text")
        $digitContainer.style.display = "none"
    }

    if(e.target.matches("#btn-digit-close"))
    {
        $digitContainer.style.display = "none"
    }

    if(e.target.matches(".super-recall-culus-game .main__btn.clear"))
    {
        const $tdList = document.querySelectorAll("td")
        $tdList.forEach(td => {
            td.textContent = "X"
            td.classList.remove("white-text")
        })
    }

    if(e.target.matches(".super-recall-culus-game .main__btn.generate"))
    {
        if(!started)
        {
            alert("Pick a matrix size")
            return
        }

        $tBody.innerHTML = ""
        for (let row = 0; row < matrixSize; row++) 
        {
            let html = `<tr>`
            for (let column = 0; column < matrixSize; column++) 
            {
                let randomNumber = getRandomNumber()
                html += `<td data-number="${randomNumber}">X</td>`
            }
            html += `</tr>`
            $tBody.innerHTML += html
        }
    }

    if(e.target.matches(".super-recall-culus-game .main__btn.test"))
    {
        const $tdList = document.querySelectorAll("td")

        for (const td of $tdList) {
            if(td.textContent === "X"){
                alert("Fill all the squares!")
                return
            }
        }
    }

    if(e.target.matches("[data-matrix-size]"))
    {
        const $btnList = document.querySelectorAll("[data-matrix-size]")

        $btnList.forEach(btn => btn.classList.remove("blue-button"))

        e.target.classList.add("blue-button")
        matrixSize = parseInt(e.target.getAttribute("data-matrix-size"))

        started = true
    }
        
}