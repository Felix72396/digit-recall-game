const $randomNumberContainer = document.querySelector("#random-number"),
    $randomNumberContainer2 = document.querySelector("#random-number2"),
    $btnSwitch = document.querySelector("#btn-switch"),
    $btnGenerate = document.querySelector("#btn-generate"),
    $btnGenerate2 = document.querySelector("#btn-generate2"),
    $btnClear = document.querySelector("#btn-clear"),
    $btnClear2 = document.querySelector("#btn-clear2"),
    $btnRestart = document.querySelector("#btn-restart"),
    $btnTest = document.querySelector("#btn-test"),
    $btnTest2 = document.querySelector("#btn-test2"),
    $timeRecord = document.querySelector("#time-record"),
    $digitRecallGameContainer = document.querySelector(".main__content-container.digit-recall-game"),
    $reversedDigitRecallGameContainer = document.querySelector(".main__content-container.reversed-digit-recall-game")


let randomFigureString = "",
    recalledFigureString = "",
    started = false,
    gameIndex = 0,
    timeRecord = localStorage.getItem("time")



$timeRecord.textContent = timeRecord || "00:00:00"

function showXs() {
    if (!started) return
    if (gameIndex === 1 && $flashModeInput.checked) return

    if (gameIndex === 0) $randomNumberContainer.innerHTML = ""
    else $randomNumberContainer2.innerHTML = ""

    let len = parseInt($digitAmountInput2.value)

    for (let index = 0; index < len; index++) {
        if (gameIndex === 0) $randomNumberContainer.innerHTML += "X "
        else $randomNumberContainer2.innerHTML += "X ";
    }
}

showXs()


$randomNumberContainer.onmouseout = showXs
$randomNumberContainer2.onmouseout = showXs

$randomNumberContainer.onmouseover = () => {
    if (!started) return
    let html = showRandomFigure()
    $randomNumberContainer.innerHTML = html
}

$randomNumberContainer2.onmouseover = () => {
    if (!started) return
    if (gameIndex === 1 && $flashModeInput.checked) return
    let html = showRandomFigure()
    $randomNumberContainer2.innerHTML = html
}



function generateRandomFigure(len) {
    randomFigureString = ""
    for (let index = 0; index < len; index++) {
        let randomNumber = getRandomNumber();
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

    if ($btnSwitch.textContent === "GO TO REVERSED DIGIT RECALL GAME") {
        $digitRecallGameContainer.style.display = "none"
        $reversedDigitRecallGameContainer.style.display = "block"
        $btnSwitch.textContent = "GO TO DIGIT RECALL GAME"
        gameIndex = 1
    }
    else {
        $digitRecallGameContainer.style.display = "block"
        $reversedDigitRecallGameContainer.style.display = "none"
        $btnSwitch.textContent = "GO TO REVERSED DIGIT RECALL GAME"
        gameIndex = 0
    }
}

$btnGenerate.onclick = () => {
    let len = parseInt($digitAmountInput.value)
    generateRandomFigure(len)

    let html = showRandomFigure()
    $randomNumberContainer.innerHTML = html
    if (!started) {
        time()
        started = true
    }

}

$btnGenerate2.onclick = () => {
    let len = parseInt($digitAmountInput2.value)
    generateRandomFigure(len)

    
    if ($flashModeInput.checked) {
        let milliseconds = 1000 / $speed.value

        let index = 0
        if (!started) {
            time2 = setInterval(() => {

                $randomNumberContainer2.innerHTML = `<span class="main__random-digit reversed">${randomFigureString[index++]}</span>`

                if (index === len) {
                    clearInterval(time2)
                    started = false
                }
            }, milliseconds)
            started = true
        }

        
    }
    else {
        let html = showRandomFigure()
        $randomNumberContainer2.innerHTML = html
    }
}

$btnClear.onclick = () => {
    recalledFigureString = ""
    showRecalledFigure()
}

$btnClear2.onclick = () => {
    recalledFigureString = ""
    showRecalledFigure()
}



$btnRestart.onclick = () => {

   if(!saved)
   {
    let ok = confirm("Are you sure you want to restart?")
    if(!ok) return
   }
   else{
    saved = false
   }

    if (started)
        clearInterval(time1)

    showXs()
    hours = 0
    minutes = 0
    seconds = 0
    figureCounter = 0
    started = false
    $timeSpan.textContent = `${getFormattedDigits(hours)}:${getFormattedDigits(minutes)}:${getFormattedDigits(seconds)}`
    $figureCounterSpan.textContent = `0/${setting.figure_amount}`
    spansTemplate = ""
    recalledFigureString = ""
    randomFigureString = ""
    winLossTrackerArray = []
    showRecalledFigure()
}

$btnTest.onclick = () => {
    if (recalledFigureString === "") return

    if (randomFigureString === recalledFigureString) {
        recalledFigureString = ""
        showRecalledFigure()

        attemptCounter++
        if (attemptCounter === setting.attempt_amount) {
            winLossTrackerArray.push(1)
            checkRecord()

            attemptCounter = 0
            figureCounter++

            $btnGenerate.click()
        }

        $figureCounterSpan.textContent = `${figureCounter}/${setting.figure_amount}`
        $attemptCounterSpan.textContent = `${attemptCounter}/${setting.attempt_amount}`

        if (figureCounter === setting.figure_amount) {
            checkTimeRecord()

            alert("Congratulations!")

            $btnRestart.click()
        }

    }
    else {
        alert("Try it again 😥")
    }
}

$btnTest2.onclick = () => {
    if (recalledFigureString === "") return

    randomFigureString = randomFigureString.split("").reverse().join("")

    if (randomFigureString === recalledFigureString) {
        recalledFigureString = ""
        showRecalledFigure()

        alert("Congratulations!")

        $btnGenerate2.click()
        $btnClear2.click()

        
    }
    else{
        alert("Try it again 😥")
    }

}

    window.onkeyup = (e) => {

        let pattern = /Backspace|[\dsgcrt]/



        if (gameIndex === 0) {
            if (e.key == "s") {
                $btnSave2.click()
            }

            if (!pattern.test(e.key) || started === false && e.key !== "g")
                return

            switch (e.key) {
                case "g":

                    $btnGenerate.click()
                    break

                case "c":
                    $btnClear.click()
                    break

                case "r":
                    $btnRestart.click()
                    break

                case "t":
                    $btnTest.click()
                    break

                case "Backspace":
                    if (recalledFigureString !== "")
                        recalledFigureString = recalledFigureString.slice(0, -1)
                    break

                default:
                    if (recalledFigureString.length < setting.digit_amount) {
                        recalledFigureString += e.key
                    }

            }

            showRecalledFigure()
        }
        else if (gameIndex === 1) {

            if (e.key == "s") {
                $btnSave2.click()
            }

            pattern = /Backspace|[\dgct]/
            if (!pattern.test(e.key)) return

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

                case "Backspace":
                    if (recalledFigureString !== "")
                        recalledFigureString = recalledFigureString.slice(0, -1)
                    break

                default:
                    if (recalledFigureString.length < setting2.digit_amount) {
                        recalledFigureString += e.key
                    }

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
