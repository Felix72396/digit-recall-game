$timeRecord.textContent = timeRecord || "00:00:00"

function showXs() {
    hidden = true
    if (!started) return
    if (gameIndex === 1 && flashMode) return

    $randomNumberContainer.innerHTML = ""
    $randomNumberContainer2.innerHTML = ""

    let length = gameIndex === 0 ? digitAmount : digitAmount2

    for (let index = 0; index < length; index++) {
        if (gameIndex === 0) $randomNumberContainer.innerHTML += "X "
        else $randomNumberContainer2.innerHTML += "X "
    }
}

showXs()


// $randomNumberContainer.onmouseout = showXs
// $randomNumberContainer2.onmouseout = showXs

$btnShow.onclick = () => {

    if (!started) return
    let html = showRandomFigure()
    $randomNumberContainer.innerHTML = html
    $btnShow.classList.add("d-none")

    clear()

}

$btnShow2.onclick = () => {
    if (!started) return




    if (!started) return
    let html = showRandomFigure()
    $randomNumberContainer2.innerHTML = html
    $btnShow2.classList.add("d-none")
    clear()

}
// $randomNumberContainer.onmouseover = () => {
//     if (!started) return
//     let html = showRandomFigure()
//     $randomNumberContainer.innerHTML = html
// }

// $randomNumberContainer2.onmouseover = () => {
//     if (!started) return
//     if (gameIndex === 1 && flashMode) return
//     let html = showRandomFigure()
//     $randomNumberContainer2.innerHTML = html
// }



function generateRandomFigure(length) {
    randomFigureString = ""
    for (let index = 0; index < length; index++) {
        let randomNumber = getRandomNumber()
        randomFigureString += randomNumber
    }
}

function showRandomFigure() {
    if (randomFigureString === "") return
    let html = ""
    for (let index = 0; index < randomFigureString.length; index++) {
        html += `<span class="main__random-digit">${randomFigureString[index]}</span>`
    }

    return html

}

function getRandomNumber() {
    return Math.floor(Math.random() * (9 + 0)) + 0
}

$btnSwitch.onclick = () => {


    if (gameIndex === 0) {
        gameIndex = 1
        $digitRecallGameContainer.style.display = "none"
        $reversedDigitRecallGameContainer.style.display = "block"

        $btnSwitch.textContent = "GO TO SUPER-RECALL-CULUS GAME"
    }
    else if (gameIndex === 1) {
        gameIndex = 2
        $reversedDigitRecallGameContainer.style.display = "none"
        $superRecallCulusGameContainer.style.display = "block"

        $btnSwitch.textContent = "GO TO DIGIT RECALL GAME"
        $randomNumberContainer2.innerHTML = ""
    }
    else {
        gameIndex = 0
        $superRecallCulusGameContainer.style.display = "none"
        $digitRecallGameContainer.style.display = "block"

        $btnSwitch.textContent = "GO TO REVERSED DIGIT RECALL GAME"
        $timeSpan2.textContent = `60 seg`
        clearXs()
    }

    restarted = true
    restart()
}

function generateFigures() {
    clear()
    hidden = false
    $btnShow.classList.add("d-none")

    generateRandomFigure(digitAmount)

    let html = showRandomFigure()
    $randomNumberContainer.innerHTML = html
    if (!started) {
        time()
        started = true
    }
}

$btnGenerate.onclick = () => generateFigures()

$btnGenerate2.onclick = () => {
    if (!timeout) return

    clear()

    $btnShow2.classList.add("d-none")
    hidden = false


    $randomNumberContainer2.innerHTML = ""
    generateRandomFigure(digitAmount2)


    if (flashMode) {

        if (timeout) {
            let milliseconds = 1000 / speed,
                index = 0

            timeout = false
            time1 = setInterval(() => {
                $randomNumberContainer2.innerHTML = `<span class="main__random-digit reversed">${randomFigureString[index++]}</span>`

                if (index === digitAmount2) {
                    clearInterval(time1)
                    // started = false
                    index = 0
                    timeout = true
                }
            }, milliseconds)
        }
    }
    else {
        let html = showRandomFigure()
        $randomNumberContainer2.innerHTML = html
        // $btnShow2.classList.remove("d-none")

    }
    started = true
}

function clear() {
    recalledFigureString = ""
    $textArea1.value = ""
    $textArea2.value = ""
    hidden = false

    showRecalledFigure()
}

$btnClear.onclick = clear

$btnClear2.onclick = clear


function restart() {
    // aler
    if (!started) return

    if (!restarted) {
        let ok = confirm("Are you sure you want to restart?")
        if (!ok) return
    }
    else {
        restarted = false
    }

    // if(gameIndex !== 1)


    showXs()

    hours = 0
    minutes = 0
    seconds = 0
    figureCounter = 0
    started = false
    // left = 0

    timeout = true

    $timeSpan.textContent = `${getFormattedDigits(hours)}:${getFormattedDigits(minutes)}:${getFormattedDigits(seconds)}`
    $figureCounterSpan.textContent = `0/${figureAmount}`

    clear()



    $btnShow.classList.add("d-none")

    $btnShow2.classList.add("d-none")
    $btnHint.classList.add("d-none")


    const $parent = $timeSpan2.parentElement
    $parent.classList.remove("d-none")
    $timeSpan2.textContent = `60 seg`

    $btnStop.classList.add("d-none")
    $tBody.innerHTML = ""


    spansTemplate = ""
    recalledFigureString = ""
    randomFigureString = ""
    // winLossTrackerArray = []
    // showRecalledFigure()

    clearInterval(time1)
}

$btnRestart.onclick = () => restart()

$btnTest.onclick = async () => {

    if (recalledFigureString === "") return

    if (randomFigureString === recalledFigureString) {
        recalledFigureString = ""
        showRecalledFigure()

        attemptCounter++

        if (attemptCounter === attemptAmount) {
            // winLossTrackerArray.push(1)
            // checkRecord()

            attemptCounter = 0
            figureCounter++
            generateFigures()
        }

        $figureCounterSpan.textContent = `${figureCounter}/${figureAmount}`
        $attemptCounterSpan.textContent = `${attemptCounter}/${attemptAmount}`

        if (figureCounter === figureAmount) {
            // winLossTrackerArray.push(1)
            // checkRecord()
            checkTimeRecord()


            restarted = true

            restart()
            celebrate()
            // alert("Congratulations!")
        }

    }
    else {
        alert("Try it again 😥")
    }

    clear()
}

$btnTest2.onclick = () => {
    if (recalledFigureString === "") return

    let reversedFigureString = randomFigureString.split("").reverse().join("")

    console.log(reversedFigureString, recalledFigureString)

    if (reversedFigureString === recalledFigureString) {
        recalledFigureString = ""
        showRecalledFigure()

        // alert("Congratulations!")
        celebrate()
        $btnGenerate2.click()

        restarted = false


    }
    else {
        alert("Try it again 😥")
    }
    clear()

}

$textArea1.onkeypress = (e) => {
    let pattern = /\d/

    if (!pattern.test(e.key) || !started) {
        e.preventDefault()
        return
    }

    if (!hidden) {
        e.preventDefault()
        showXs()
        $btnShow.classList.remove("d-none")
    }
}

$textArea2.onkeypress = (e) => {
    let pattern = /\d/

    if (!pattern.test(e.key) || !started) {
        e.preventDefault()
        return
    }

    if (!timeout && flashMode) {
        e.preventDefault()
        return
    }

    if (!flashMode && !hidden) {

        e.preventDefault()
        showXs()
        $btnShow2.classList.remove("d-none")
    }
}

$textArea1.addEventListener("touchstart", () => {
    if(hidden) return
    showXs()
    $btnShow.classList.remove("d-none")
})

$textArea2.addEventListener("touchstart", () => {
    if(hidden) return
    
    showXs()
    $btnShow2.classList.remove("d-none")
})

$textArea1.oninput = () => {
    recalledFigureString = $textArea1.value
   
}
$textArea2.oninput = () => {
    recalledFigureString = $textArea2.value
}

window.onkeyup = (e) => {

    // console.log("jhj")

    // if($textArea1.style.display !== "none" || $textArea2.style.display !== "none") return

    let pattern = /Backspace|[\dsgcrth]/

    if (e.key === "Control" || e.key === "Enter" || /F/g.test(e.key))
        return

    if (gameIndex === 0) {
        if (e.key == "s") {
            $btnSave2.click()
        }
        if (!pattern.test(e.key) || !started && e.key !== "g")
            return

        if (!hidden && (/\d/.test(e.key))) {
            showXs()
            $btnShow.classList.remove("d-none")
        }


        switch (e.key) {
            case "g":

                generateFigures()
                break

            case "c":
                clear()
                break

            case "r":
                restart()
                break

            case "t":
                $btnTest.click()
                break

            case "h":
                $btnShow.click()
                break

            case "Backspace":
                if (recalledFigureString !== "")
                    recalledFigureString = recalledFigureString.slice(0, -1)
                break

            default:
                if (recalledFigureString.length < digitAmount) {
                    recalledFigureString += e.key
                }

        }

        showRecalledFigure()
    }

    if (gameIndex === 1) {

        if (flashMode && !timeout) return

        if (e.key == "s") {
            $btnSave2.click()
        }

        pattern = /Backspace|[\dgcth]/

        if (!pattern.test(e.key) && started) return

        if (!hidden && (/\d/.test(e.key) && !flashMode && started)) {
            showXs()

            $btnShow2.classList.remove("d-none")
        }

        switch (e.key) {
            case "g":

                $btnGenerate2.click()
                break

            case "c":
                $btnClear2.click()
                break

            case "t":
                $btnTest2.click()
                break

            case "h":
                $btnShow2.click()
                break

            case "Backspace":
                if (recalledFigureString !== "")
                    recalledFigureString = recalledFigureString.slice(0, -1)
                break

            default:
                if (!started) return
                if (recalledFigureString.length < digitAmount2) {
                    recalledFigureString += e.key
                }
                break

        }
        showRecalledFigure()

    }
}

function showRecalledFigure() {
    const $inputContainer = gameIndex === 0 ? document.querySelector("#input-container") : document.querySelector("#input-container2")
    $inputContainer.innerHTML = ""
    let len = recalledFigureString.split("").length

    for (let index = 0; index < len; index++) {
        $inputContainer.innerHTML += `<span class="main__random-digit">${recalledFigureString[index]}</span>`
    }

}

